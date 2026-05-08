import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { updateStore } from '@/lib/store-catalog'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body?.storeId || body.storeId !== session.user.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await updateStore(body.storeId, {
      url: typeof body.url === 'string' ? body.url : '',
    })

    return NextResponse.json({ store })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update store'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
