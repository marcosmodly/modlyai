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
    const rateLimit = checkRateLimit(`forgot-password:${normalizedEmail}`, { limit: 5, windowMs: 60 * 60 * 1000 })
    const ipRateLimit = checkRateLimit(`forgot-password-ip:${ip}`, { limit: 20, windowMs: 60 * 60 * 1000 })

    // Always respond success either way below, but still enforce the limit
    // so this can't be used to spam an inbox even without revealing whether
    // the account exists.
    if (!rateLimit.allowed || !ipRateLimit.allowed) {
      return NextResponse.json({ success: true })
    }

    const result = await adminDb.query({
      users: { $: { where: { email: normalizedEmail } } },
    })
    const user = result.users?.[0]

    // Don't reveal whether the account exists.
    if (!user) {
      return NextResponse.json({ success: true })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[Forgot password] Missing RESEND_API_KEY')
      return NextResponse.json({ success: true })
    }

    const code = String(crypto.randomInt(100000, 1000000))
    const expiry = Date.now() + 30 * 60 * 1000 // 30 minutes - a bit longer than signup/email-change codes since this one may be typed from memory after digging up an email

    await adminDb.transact([
      adminDb.tx.users[user.id].update({
        resetPasswordCode: code,
        resetPasswordCodeExpiry: expiry,
      }),
    ])

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'ModlyAI <hello@modlyai.tech>',
      to: normalizedEmail,
      subject: 'Reset your ModlyAI password',
      text: `Your password reset code is: ${code}. Expires in 30 minutes. If you didn't request this, you can ignore this email - your password will not change.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
          <p>Your password reset code is: <strong>${code}</strong>.</p>
          <p>Expires in 30 minutes.</p>
          <p>If you didn't request this, you can ignore this email - your password will not change.</p>
        </div>
      `,
    })

    if (error) {
      console.error('[Forgot password] Resend error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Forgot password] Failed:', error)
    // Still return success to avoid leaking any information via error responses.
    return NextResponse.json({ success: true })
  }
}
