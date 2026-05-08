import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { adminDb } from '@/lib/instant-admin'

async function getStoreForUser(userId: string) {
  const result = await adminDb.query({
    stores: {
      $: { where: { userId } },
    },
  })

  const stores = [...(result.stores ?? [])].sort((a: any, b: any) => {
    const aDate = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
    const bDate = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime()
    return bDate - aDate
  })

  return stores[0] ?? null
}

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

          const result = await adminDb.query({
            users: {
              $: { where: { email: credentials.email } },
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

            const store = await getStoreForUser(user.id)

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              storeId: store?.id,
              storeName: store?.name,
              apiKey: store?.apiKey,
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
        token.storeId = user.storeId
        token.storeName = user.storeName
        token.apiKey = user.apiKey
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
      session.user.storeId = token.storeId
      session.user.storeName = token.storeName
      session.user.apiKey = token.apiKey
      return session
    },
    async redirect({ baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/dashboard`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
