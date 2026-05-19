import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { adminDb } from '@/lib/instant-admin'

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function normalizeCode(value: unknown) {
  return String(value || '').trim()
}

export async function POST(req: Request) {
  try {
    const { email, code, expiry } = await req.json()
    const normalizedEmail = normalizeEmail(email)
    const verificationCode = normalizeCode(code)

    if (!normalizedEmail || !/^\d{6}$/.test(verificationCode)) {
      return NextResponse.json(
        { error: 'email and a 6-digit code are required' },
        { status: 400 }
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
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const now = Date.now()
    const requestedExpiry = Number(expiry)
    const verificationCodeExpiry =
      Number.isFinite(requestedExpiry) && requestedExpiry > now
        ? Math.min(requestedExpiry, now + 10 * 60 * 1000)
        : now + 10 * 60 * 1000

    await adminDb.transact([
      adminDb.tx.users[user.id].update({
        emailVerified: false,
        verificationCode,
        verificationCodeExpiry,
      }),
    ])

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'ModlyAI <onboarding@resend.dev>',
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
