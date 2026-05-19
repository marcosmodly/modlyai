import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { paddle } from '@/lib/paddle'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { paddleCustomerId } = (await req.json()) as { paddleCustomerId?: unknown }
    const customerId = typeof paddleCustomerId === 'string' ? paddleCustomerId.trim() : ''

    if (!customerId) {
      return NextResponse.json({ error: 'No customer ID' }, { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    const storeCustomerId = String(store?.paddleCustomerId ?? '').trim()

    if (!store || storeCustomerId !== customerId) {
      return NextResponse.json({ error: 'Customer ID does not match current store' }, { status: 403 })
    }

    const portalSession = await paddle.customerPortalSessions.create(customerId, [])

    return NextResponse.json({
      url: portalSession.urls.general.overview,
    })
  } catch (error) {
    console.error('[Paddle portal session failed]', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    return NextResponse.json({ error: 'Unable to open billing portal' }, { status: 500 })
  }
}
