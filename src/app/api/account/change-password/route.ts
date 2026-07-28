import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { notifyUser } from '@/lib/notifications'

const MIN_PASSWORD_LENGTH = 8

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`change-password:${userId}`, { limit: 5, windowMs: 15 * 60 * 1000 })
    const ipLimit = checkRateLimit(`change-password-ip:${ip}`, { limit: 20, windowMs: 15 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { currentPassword, newPassword } = await req.json()

    if (typeof currentPassword !== 'string' || !currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 })
    }

    if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
        { status: 400 }
      )
    }

    const result = await adminDb.query({
      users: {
        $: { where: { id: userId } },
      },
    })

    const user = result.users?.[0]

    if (!user?.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentMatches = await bcrypt.compare(currentPassword, user.password)
    if (!currentMatches) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }

    const sameAsOld = await bcrypt.compare(newPassword, user.password)
    if (sameAsOld) {
      return NextResponse.json(
        { error: 'New password must be different from your current password.' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const nextTokenVersion = (typeof user.tokenVersion === 'number' ? user.tokenVersion : 1) + 1

    // Bumping tokenVersion here invalidates every other active session for this
    // user (see the jwt() callback in auth-options.ts) - the current request's
    // session will be refreshed on its next request rather than logged out
    // immediately, since NextAuth's own JWT cookie doesn't change server-side.
    await adminDb.transact([
      adminDb.tx.users[userId].update({
        password: hashedPassword,
        tokenVersion: nextTokenVersion,
      }),
    ])

    notifyUser({
      userId,
      type: 'security_password_changed',
      title: 'Password changed',
      message: 'Your password was changed. You were signed out of all other devices.',
      link: '/dashboard/settings',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Change password] Failed:', error)
    return NextResponse.json(
      { error: 'Unable to change password. Please try again.' },
      { status: 500 }
    )
  }
}
