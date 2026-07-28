import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      sessions: {
        $: { where: { userId: session.user.id } },
      },
    })

    const sessions = (result.sessions ?? [])
      .filter((s: { revokedAt?: number | null }) => !s.revokedAt)
      .filter((s: { id: string }) => s.id !== session.user.sessionId)
      .sort((a: { lastSeenAt: number }, b: { lastSeenAt: number }) => b.lastSeenAt - a.lastSeenAt)
      .map((s: { id: string; userAgent?: string; ip?: string; createdAt: number; lastSeenAt: number }) => ({
        id: s.id,
        userAgent: s.userAgent || 'unknown',
        ip: s.ip || 'unknown',
        createdAt: s.createdAt,
        lastSeenAt: s.lastSeenAt,
        isCurrent: false,
      }))

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('[List sessions] Failed:', error)
    return NextResponse.json({ error: 'Unable to load sessions.' }, { status: 500 })
  }
}
