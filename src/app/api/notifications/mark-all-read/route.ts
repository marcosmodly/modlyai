import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      notifications: { $: { where: { userId: session.user.id, read: false } } },
    })

    const unread = result.notifications ?? []
    if (unread.length === 0) {
      return NextResponse.json({ success: true })
    }

    await adminDb.transact(
      unread.map((n: { id: string }) => adminDb.tx.notifications[n.id].update({ read: true }))
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Mark all notifications read] Failed:', error)
    return NextResponse.json({ error: 'Unable to update notifications.' }, { status: 500 })
  }
}
