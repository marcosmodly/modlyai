import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { Resend } from 'resend'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const ip = getClientIp(req)
    const rateLimit = checkRateLimit(`send-verification:${normalizedEmail}`, { limit: 5, windowMs: 60 * 60 * 1000 })
    const ipRateLimit = checkRateLimit(`send-verification-ip:${ip}`, { limit: 20, windowMs: 60 * 60 * 1000 })

    if (!rateLimit.allowed || !ipRateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many verification requests. Please try again later.' },
        { status: 429 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[Verification email] Missing RESEND_API_KEY')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const result = await adminDb.query({
      users: {
        $: { where: { email: normalizedEmail } },
      },
    })

    const user = result.users?.[0]
    if (!user) {
      // Don't reveal whether the account exists - respond the same as success.
      return NextResponse.json({ success: true })
    }

    // Code is always generated server-side using a CSPRNG - never accept a
    // client-supplied code, or anyone could verify any email address themselves
    // without ever receiving this email.
    const verificationCode = String(crypto.randomInt(100000, 1000000))
    const verificationCodeExpiry = Date.now() + 10 * 60 * 1000

    await adminDb.transact([
      adminDb.tx.users[user.id].update({
        emailVerified: false,
        verificationCode,
        verificationCodeExpiry,
      }),
    ])

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'ModlyAI <hello@modlyai.tech>',
      to: normalizedEmail,
      subject: 'Verify your ModlyAI account',
      text: `Your verification code is: ${verificationCode}. Expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
          <p>Your verification code is: <strong>${verificationCode}</strong>.</p>
          <p>Expires in 10 minutes.</p>
        </div>
      `,
    })

    if (error) {
      console.error('[Verification email] Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Verification email] Failed:', error)
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    )
  }
}
