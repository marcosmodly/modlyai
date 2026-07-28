import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export async function POST(req: Request, { params }: { params: { notificationId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      notifications: { $: { where: { id: params.notificationId } } },
    })
    const notification = result.notifications?.[0]

    // Only allow marking a notification read if it actually belongs to this
    // user - never trust the ID alone.
    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
    }

    await adminDb.transact([
      adminDb.tx.notifications[params.notificationId].update({ read: true }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Mark notification read] Failed:', error)
    return NextResponse.json({ error: 'Unable to update notification.' }, { status: 500 })
  }
}
