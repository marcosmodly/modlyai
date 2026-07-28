import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      emailVerified?: boolean
      storeId?: string
      storeName?: string
      apiKey?: string
      sessionId?: string
    }
  }

  interface User {
    id: string
    emailVerified?: boolean
    storeId?: string
    storeName?: string
    apiKey?: string
    tokenVersion?: number
    sessionId?: string
    userAgent?: string
    ip?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    emailVerified?: boolean
    storeId?: string
    storeName?: string
    apiKey?: string
    tokenVersion?: number
    sessionId?: string
  }
}
