import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { notifyUser } from '@/lib/notifications'

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function normalizeCode(value: unknown) {
  return String(value || '').trim()
}

function codesMatch(a: string, b: string) {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`confirm-email:${userId}`, { limit: 10, windowMs: 60 * 60 * 1000 })
    const ipLimit = checkRateLimit(`confirm-email-ip:${ip}`, { limit: 30, windowMs: 60 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new code and try again later.' },
        { status: 429 }
      )
    }

    const { code } = await req.json()
    const submittedCode = normalizeCode(code)

    if (!/^\d{6}$/.test(submittedCode)) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    const result = await adminDb.query({
      users: { $: { where: { id: userId } } },
    })

    const user = result.users?.[0]
    const storedCode = normalizeCode(user?.pendingEmailCode)
    const expiry = Number(user?.pendingEmailCodeExpiry || 0)
    const pendingEmail = String(user?.pendingEmail || '').trim().toLowerCase()

    if (!user || !storedCode || !pendingEmail || !codesMatch(storedCode, submittedCode) || expiry <= Date.now()) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // Re-check the pending email hasn't been claimed by someone else in the
    // window between requesting the change and confirming it.
    const conflict = await adminDb.query({
      users: { $: { where: { email: pendingEmail } } },
    })
    const conflictingUser = conflict.users?.find((u: { id: string }) => u.id !== userId)
    if (conflictingUser) {
      return NextResponse.json(
        { error: 'That email is no longer available. Please start again with a different address.' },
        { status: 409 }
      )
    }

    await adminDb.transact([
      adminDb.tx.users[userId].update({
        email: pendingEmail,
        emailVerified: true,
        pendingEmail: null,
        pendingEmailCode: null,
        pendingEmailCodeExpiry: null,
        // Email is part of your login identity, so treat confirming a change
        // the same way as a password change: invalidate every other active
        // session. This session stays valid because the client calls
        // next-auth/react's update() right after this succeeds, which the
        // jwt() callback's trigger === 'update' branch re-syncs instead of
        // rejecting.
        tokenVersion: (typeof user.tokenVersion === 'number' ? user.tokenVersion : 1) + 1,
      }),
    ])

    notifyUser({
      userId,
      type: 'security_email_changed',
      title: 'Email address changed',
      message: `Your account email was changed to ${pendingEmail}.`,
      link: '/dashboard/settings',
    })

    return NextResponse.json({ success: true, email: pendingEmail })
  } catch (error) {
    console.error('[Confirm email change] Failed:', error)
    return NextResponse.json(
      { error: 'Unable to confirm email change. Please try again.' },
      { status: 500 }
    )
  }
}
