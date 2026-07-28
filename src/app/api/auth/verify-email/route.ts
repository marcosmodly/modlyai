import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'

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

// Constant-time comparison so response timing doesn't leak how many leading
// digits of the code were correct. Codes are always exactly 6 digits, so this
// is safe from length-based timing leaks too.
function codesMatch(a: string, b: string) {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()
    const normalizedEmail = normalizeEmail(email)
    const submittedCode = normalizeCode(code)

    if (!normalizedEmail || !/^\d{6}$/.test(submittedCode)) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      )
    }

    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`verify-email:${normalizedEmail}`, { limit: 10, windowMs: 60 * 60 * 1000 })
    const ipRateLimit = checkRateLimit(`verify-email-ip:${ip}`, { limit: 30, windowMs: 60 * 60 * 1000 })

    if (!rateLimit.allowed || !ipRateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new code and try again later.' },
        { status: 429 }
      )
    }

    const result = await adminDb.query({
      users: {
        $: { where: { email: normalizedEmail } },
      },
    })

    const user = result.users?.[0]
    const storedCode = normalizeCode(user?.verificationCode)
    const expiry = Number(user?.verificationCodeExpiry || 0)

    if (!user || !storedCode || !codesMatch(storedCode, submittedCode) || expiry <= Date.now()) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      )
    }

    await adminDb.transact([
      adminDb.tx.users[user.id].update({
        emailVerified: true,
        verificationCode: null,
        verificationCodeExpiry: null,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Verify email] Failed:', error)
    return NextResponse.json(
      { error: 'Invalid or expired code' },
      { status: 500 }
    )
  }
}
