import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: Request, { params }: { params: { sessionId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`revoke-session:${session.user.id}`, { limit: 20, windowMs: 15 * 60 * 1000 })
    const ipLimit = checkRateLimit(`revoke-session-ip:${ip}`, { limit: 40, windowMs: 15 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
    }

    const targetId = params.sessionId

    if (targetId === session.user.sessionId) {
      return NextResponse.json(
        { error: 'Use the sign-out button to end your current session.' },
        { status: 400 }
      )
    }

    const result = await adminDb.query({
      sessions: { $: { where: { id: targetId } } },
    })
    const target = result.sessions?.[0]

    // Only allow revoking a session that actually belongs to this user -
    // never trust the ID alone.
    if (!target || target.userId !== session.user.id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    await adminDb.transact([
      adminDb.tx.sessions[targetId].update({ revokedAt: Date.now() }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Revoke session] Failed:', error)
    return NextResponse.json({ error: 'Unable to sign out that device.' }, { status: 500 })
  }
}
