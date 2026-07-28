import { NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { notifyUser } from '@/lib/notifications'

const MIN_PASSWORD_LENGTH = 8

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function normalizeCode(value: unknown) {
  return String(value || '').trim()
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function codesMatch(a: string, b: string) {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export async function POST(req: Request) {
  try {
    const { email, code, newPassword } = await req.json()
    const normalizedEmail = normalizeEmail(email)
    const submittedCode = normalizeCode(code)

    if (!normalizedEmail || !/^\d{6}$/.test(submittedCode)) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
        { status: 400 }
      )
    }

    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`reset-password:${normalizedEmail}`, { limit: 10, windowMs: 60 * 60 * 1000 })
    const ipRateLimit = checkRateLimit(`reset-password-ip:${ip}`, { limit: 30, windowMs: 60 * 60 * 1000 })

    if (!rateLimit.allowed || !ipRateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new code and try again later.' },
        { status: 429 }
      )
    }

    const result = await adminDb.query({
      users: { $: { where: { email: normalizedEmail } } },
    })
    const user = result.users?.[0]
    const storedCode = normalizeCode(user?.resetPasswordCode)
    const expiry = Number(user?.resetPasswordCodeExpiry || 0)

    if (!user || !storedCode || !codesMatch(storedCode, submittedCode) || expiry <= Date.now()) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const nextTokenVersion = (typeof user.tokenVersion === 'number' ? user.tokenVersion : 1) + 1

    await adminDb.transact([
      adminDb.tx.users[user.id].update({
        password: hashedPassword,
        resetPasswordCode: null,
        resetPasswordCodeExpiry: null,
        // A forgotten-password reset is a strong enough signal to invalidate
        // every existing session, the same as a normal password change.
        tokenVersion: nextTokenVersion,
      }),
    ])

    notifyUser({
      userId: user.id,
      type: 'security_password_changed',
      title: 'Password reset',
      message: 'Your password was reset. You were signed out of all other devices.',
      link: '/dashboard/settings',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Reset password] Failed:', error)
    return NextResponse.json({ error: 'Unable to reset password. Please try again.' }, { status: 500 })
  }
}
