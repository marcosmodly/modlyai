import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await getCurrentStoreForUser(session.user)
  const storeId = store?.id ? String(store.id).trim() : ''

  if (!store || !storeId) {
    return NextResponse.json({ error: 'Missing store for checkout.' }, { status: 400 })
  }

  return NextResponse.json({
    storeId,
    email: session.user.email ?? null,
    paddleCustomerId: store.paddleCustomerId ?? null,
  })
}
