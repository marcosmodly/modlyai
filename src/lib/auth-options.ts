import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb, id } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { notifyUser } from '@/lib/notifications'

function getClientIp(req?: { headers?: Record<string, string> }) {
  const forwardedFor = req?.headers?.['x-forwarded-for']
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function getUserAgent(req?: { headers?: Record<string, string> }) {
  return req?.headers?.['user-agent'] || 'unknown'
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }
          const email = credentials.email.trim().toLowerCase()
          const ip = getClientIp(req as { headers?: Record<string, string> } | undefined)

          // Rate limit by email+IP so a brute-force attempt against one account,
          // or a script trying many accounts from one IP, both get slowed down.
          const emailLimit = checkRateLimit(`login-email:${email}`, { limit: 10, windowMs: 15 * 60 * 1000 })
          const ipLimit = checkRateLimit(`login-ip:${ip}`, { limit: 30, windowMs: 15 * 60 * 1000 })

          if (!emailLimit.allowed || !ipLimit.allowed) {
            throw new Error('Too many login attempts. Please try again in a few minutes.')
          }

          const result = await adminDb.query({
            users: {
              $: { where: { email } },
              store: {},
            },
          })

          const users = [...(result.users ?? [])].sort((a: any, b: any) =>
            String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? ''))
          )

          for (const user of users) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password)
            if (!passwordMatch) {
              continue
            }

            const store = await getCurrentStoreForUser({ id: user.id, email: user.email })

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              emailVerified: user.emailVerified === true,
              storeId: store?.id,
              storeName: store?.name ?? undefined,
              apiKey: store?.apiKey ?? undefined,
              tokenVersion: typeof user.tokenVersion === 'number' ? user.tokenVersion : 1,
              ip,
              userAgent: getUserAgent(req as { headers?: Record<string, string> } | undefined),
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, trigger }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.emailVerified = user.emailVerified
        token.storeId = user.storeId
        token.storeName = user.storeName
        token.apiKey = user.apiKey
        token.tokenVersion = typeof user.tokenVersion === 'number' ? user.tokenVersion : 1

        // Mint a tracked session record for this sign-in so it can be listed
        // and individually revoked later (see /dashboard/settings > Active
        // sessions, and /api/account/sessions/[id]/revoke).
        const sessionId = id()
        const now = Date.now()
        try {
          await adminDb.transact([
            adminDb.tx.sessions[sessionId].update({
              userId: String(user.id),
              userAgent: user.userAgent || 'unknown',
              ip: user.ip || 'unknown',
              createdAt: now,
              lastSeenAt: now,
            }),
          ])
          token.sessionId = sessionId

          // A browser only ever holds one session cookie at a time, so
          // logging in again from the same browser (e.g. logging out and
          // back in) makes any *previous* session from that exact
          // browser+IP permanently unusable the moment this new cookie is
          // set - but its row would otherwise sit un-revoked forever,
          // showing up in Active Sessions as if it were still a real other
          // device. Auto-supersede those here so the list only ever shows
          // sessions that could actually still be used.
          try {
            const priorSessions = await adminDb.query({
              sessions: {
                $: {
                  where: {
                    userId: String(user.id),
                    ip: user.ip || 'unknown',
                    userAgent: user.userAgent || 'unknown',
                  },
                },
              },
            })
            const staleSessionIds = (priorSessions.sessions ?? [])
              .filter((s: { id: string; revokedAt?: number | null }) => s.id !== sessionId && !s.revokedAt)
              .map((s: { id: string }) => s.id)

            if (staleSessionIds.length > 0) {
              await adminDb.transact(
                staleSessionIds.map((staleId) =>
                  adminDb.tx.sessions[staleId].update({ revokedAt: now })
                )
              )
            }
          } catch (supersedeError) {
            console.error('[Auth] Failed to supersede prior sessions:', supersedeError)
          }

          notifyUser({
            userId: String(user.id),
            storeId: user.storeId,
            type: 'security_new_signin',
            title: 'New sign-in',
            message: `A new sign-in to your account was detected${user.ip && user.ip !== 'unknown' ? ` from ${user.ip}` : ''}.`,
            link: '/dashboard/settings',
          })
        } catch (error) {
          // Don't block sign-in if session tracking fails to write - the
          // tokenVersion check below still provides the "sign out everywhere"
          // safety net even without a tracked sessionId.
          console.error('[Auth] Failed to create session record:', error)
        }

        return token
      }

      // The client explicitly asked to refresh this token (via next-auth/react's
      // update()), e.g. right after this same session changed its own password.
      // Re-sync tokenVersion (and other DB-backed fields) from the current DB
      // state instead of comparing/throwing, so the device that made the change
      // doesn't get logged out along with every other device.
      if (trigger === 'update' && token.id) {
        const result = await adminDb.query({
          users: {
            $: { where: { id: String(token.id) } },
          },
        })
        const currentUser = result.users?.[0]
        if (currentUser) {
          token.name = currentUser.name
          token.email = currentUser.email
          token.emailVerified = currentUser.emailVerified === true
          token.tokenVersion = typeof currentUser.tokenVersion === 'number' ? currentUser.tokenVersion : 1
        }
        return token
      }

      // Existing token being reused on a later request (not a fresh sign-in,
      // not an explicit update). Re-check the user's current tokenVersion in
      // the DB - if it doesn't match what this token was issued with, the
      // password was changed from another device/session since then, so this
      // token should no longer be valid. Throwing here causes
      // getServerSession/useSession to treat this as logged out, which is the
      // standard way to force-expire a stateless JWT session without a
      // server-side session store.
      if (token.id) {
        const result = await adminDb.query({
          users: {
            $: { where: { id: String(token.id) } },
          },
        })
        const currentUser = result.users?.[0]

        if (!currentUser) {
          // The user row itself is gone (e.g. account deleted) - this one is
          // unambiguous.
          throw new Error('Session invalidated: user not found')
        }

        const currentVersion = typeof currentUser.tokenVersion === 'number' ? currentUser.tokenVersion : 1
        const tokenVersion = typeof token.tokenVersion === 'number' ? token.tokenVersion : 1

        if (currentVersion !== tokenVersion) {
          throw new Error('Session invalidated: tokenVersion mismatch')
        }

        // Independent per-device check: even if the global tokenVersion still
        // matches, this specific session may have been individually revoked
        // from the Active sessions list. Only treat an *actually revoked* row
        // as fatal - if the row simply isn't found (e.g. a read shortly after
        // it was created hasn't caught up yet), don't log the person out over
        // an ambiguous read; the tokenVersion check above is the sturdier
        // signal in that case, since it reads the same `users` row that
        // authorize() itself just read at sign-in.
        if (token.sessionId) {
          const sessionResult = await adminDb.query({
            sessions: { $: { where: { id: String(token.sessionId) } } },
          })
          const sessionRow = sessionResult.sessions?.[0]

          if (sessionRow?.revokedAt) {
            throw new Error('Session revoked: signed out from this device')
          }

          if (sessionRow) {
            // Throttle lastSeenAt writes to roughly once every 5 minutes per
            // session, instead of on every single request, to keep this from
            // adding a DB write to every page load.
            const now = Date.now()
            if (now - (sessionRow.lastSeenAt || 0) > 5 * 60 * 1000) {
              adminDb
                .transact([adminDb.tx.sessions[String(token.sessionId)].update({ lastSeenAt: now })])
                .catch((error) => console.error('[Auth] Failed to update session lastSeenAt:', error))
            }
          }
        }
      }

      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
      session.user.emailVerified = token.emailVerified === true
      session.user.sessionId = token.sessionId
      const store = token.id
        ? await getCurrentStoreForUser({
            id: String(token.id),
            email: session.user.email ?? token.email ?? null,
            storeId: token.storeId ?? null,
          })
        : null

      session.user.storeId = store?.id ?? undefined
      session.user.storeName = store?.name ?? token.storeName
      session.user.apiKey = store?.apiKey ?? token.apiKey
      return session
    },
    async redirect({ baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/dashboard`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
