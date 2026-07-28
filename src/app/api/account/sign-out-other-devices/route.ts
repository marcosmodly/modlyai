import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { notifyUser } from '@/lib/notifications'

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

// Bumps tokenVersion without touching the password or email - lets someone
// sign out of every other device/browser on demand (e.g. "I think I left
// myself logged in on a shared computer"), not just as a side effect of
// changing their password.
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`sign-out-others:${userId}`, { limit: 10, windowMs: 15 * 60 * 1000 })
    const ipLimit = checkRateLimit(`sign-out-others-ip:${ip}`, { limit: 30, windowMs: 15 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const result = await adminDb.query({
      users: { $: { where: { id: userId } } },
    })
    const user = result.users?.[0]

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const nextTokenVersion = (typeof user.tokenVersion === 'number' ? user.tokenVersion : 1) + 1

    await adminDb.transact([
      adminDb.tx.users[userId].update({ tokenVersion: nextTokenVersion }),
    ])

    notifyUser({
      userId,
      type: 'security_signed_out_other_devices',
      title: 'Signed out of other devices',
      message: 'All other devices and browsers were signed out of your account.',
      link: '/dashboard/settings',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Sign out other devices] Failed:', error)
    return NextResponse.json(
      { error: 'Unable to sign out other devices. Please try again.' },
      { status: 500 }
    )
  }
}
