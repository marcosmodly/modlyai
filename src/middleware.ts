import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Runs before any React render, so a request that fails either check never
// reaches DashboardShell (a 'use client' layout with no error boundary) with
// a Server Component page underneath it trying to redirect() past it - that
// combination is what was producing a 500 instead of a clean 307/redirect on
// every /dashboard/* route, including the emailVerified check that only
// /dashboard itself used to run. This only replaces those two guards; the
// storeId/store existence checks are business logic, not auth, and stay in
// the pages.
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    if (req.nextUrl.pathname === '/dashboard' && token?.emailVerified !== true) {
      const verifyUrl = req.nextUrl.clone()
      verifyUrl.pathname = '/auth/verify-email'
      verifyUrl.search = ''
      verifyUrl.searchParams.set('email', typeof token?.email === 'string' ? token.email : '')
      return NextResponse.redirect(verifyUrl)
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: '/auth/signin',
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*'],
}
