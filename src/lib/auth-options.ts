import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }
          const email = credentials.email.trim().toLowerCase()

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
              storeId: store?.id,
              storeName: store?.name ?? undefined,
              apiKey: store?.apiKey ?? undefined,
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
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.storeId = user.storeId
        token.storeName = user.storeName
        token.apiKey = user.apiKey
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
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
