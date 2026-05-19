import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/instant-admin'

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase()
}

function normalizeCode(value: unknown) {
  return String(value || '').trim()
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

    const result = await adminDb.query({
      users: {
        $: { where: { email: normalizedEmail } },
      },
    })

    const user = result.users?.[0]
    const storedCode = normalizeCode(user?.verificationCode)
    const expiry = Number(user?.verificationCodeExpiry || 0)

    if (!user || storedCode !== submittedCode || expiry <= Date.now()) {
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
