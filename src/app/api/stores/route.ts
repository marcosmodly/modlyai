import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { createStore, getStoreAnalytics, listStores } from '@/lib/store-catalog'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stores = await listStores(session.user.id)
  const withAnalytics = await Promise.all(
    stores.map(async (store) => ({
      ...store,
      analytics: await getStoreAnalytics(store.id),
    }))
  )

  return NextResponse.json({ stores: withAnalytics })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

    const store = await createStore({ name, userId: session.user.id })
    return NextResponse.json({ store, apiKey: store.apiKey }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create store'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
