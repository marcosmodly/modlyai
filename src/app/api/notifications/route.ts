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
      notifications: { $: { where: { userId: session.user.id } } },
    })

    const notifications = (result.notifications ?? []).sort(
      (a: { createdAt: number }, b: { createdAt: number }) => b.createdAt - a.createdAt
    )
    const unreadCount = notifications.filter((n: { read: boolean }) => !n.read).length

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    console.error('[List notifications] Failed:', error)
    return NextResponse.json({ error: 'Unable to load notifications.' }, { status: 500 })
  }
}
