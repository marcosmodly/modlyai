import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { Resend } from 'resend'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

// Handles both name changes (applied immediately) and email changes (kicks off
// verification - the live `email` field is never touched until the new address
// is confirmed via /api/account/confirm-email-change, same pattern used for
// signup verification).
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`update-profile:${userId}`, { limit: 10, windowMs: 60 * 60 * 1000 })
    const ipLimit = checkRateLimit(`update-profile-ip:${ip}`, { limit: 30, windowMs: 60 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, avatarUrl, controlPanelAvatarUrl } = await req.json()
    const updates: Record<string, unknown> = {}
    let pendingEmailVerificationRequired = false

    if (typeof name === 'string') {
      const trimmedName = name.trim()
      if (!trimmedName) {
        return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
      }
      updates.name = trimmedName
    }

    if (typeof avatarUrl === 'string') {
      // Empty string clears the avatar (falls back to the generated initial).
      // Otherwise expect either a data URL (from /api/uploads/image) or a
      // regular http(s) URL if someone pastes a link instead.
      const trimmedAvatar = avatarUrl.trim()
      if (trimmedAvatar && !trimmedAvatar.startsWith('data:image/') && !/^https?:\/\//i.test(trimmedAvatar)) {
        return NextResponse.json({ error: 'That does not look like a valid image.' }, { status: 400 })
      }
      updates.avatarUrl = trimmedAvatar || null
    }

    if (typeof controlPanelAvatarUrl === 'string') {
      const trimmed = controlPanelAvatarUrl.trim()
      if (trimmed && !trimmed.startsWith('data:image/') && !/^https?:\/\//i.test(trimmed)) {
        return NextResponse.json({ error: 'That does not look like a valid image.' }, { status: 400 })
      }
      updates.controlPanelAvatarUrl = trimmed || null
    }

    if (typeof email === 'string' && email.trim()) {
      const newEmail = email.trim().toLowerCase()
      const currentEmail = String(session.user.email || '').trim().toLowerCase()

      if (!EMAIL_RE.test(newEmail)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
      }

      if (newEmail !== currentEmail) {
        const existing = await adminDb.query({
          users: { $: { where: { email: newEmail } } },
        })

        if (existing.users?.[0]) {
          return NextResponse.json(
            { error: 'That email is already in use.' },
            { status: 409 }
          )
        }

        if (!process.env.RESEND_API_KEY) {
          console.error('[Update profile] Missing RESEND_API_KEY')
          return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
        }

        const code = String(crypto.randomInt(100000, 1000000))
        updates.pendingEmail = newEmail
        updates.pendingEmailCode = code
        updates.pendingEmailCodeExpiry = Date.now() + 10 * 60 * 1000
        pendingEmailVerificationRequired = true

        const resend = new Resend(process.env.RESEND_API_KEY)
        const { error: sendError } = await resend.emails.send({
          from: 'ModlyAI <hello@modlyai.tech>',
          to: newEmail,
          subject: 'Confirm your new ModlyAI email address',
          text: `Your confirmation code is: ${code}. Expires in 10 minutes. If you didn't request this, you can ignore this email.`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
              <p>Your confirmation code is: <strong>${code}</strong>.</p>
              <p>Expires in 10 minutes.</p>
              <p>If you didn't request this, you can ignore this email.</p>
            </div>
          `,
        })

        if (sendError) {
          console.error('[Update profile] Resend error:', sendError)
          return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 })
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
    }

    await adminDb.transact([adminDb.tx.users[userId].update(updates)])

    return NextResponse.json({ success: true, pendingEmailVerificationRequired })
  } catch (error) {
    console.error('[Update profile] Failed:', error)
    return NextResponse.json(
      { error: 'Unable to save changes. Please try again.' },
      { status: 500 }
    )
  }
}
