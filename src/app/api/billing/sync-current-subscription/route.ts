import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { syncMissingCurrentPeriodEndForBillingStore } from '@/lib/billing/sync-current-period-end'
import { getCurrentStoreForUser } from '@/lib/current-store'

export const runtime = 'nodejs'

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    const storeId = store?.id ? String(store.id) : ''

    if (!store || !storeId) {
      return NextResponse.json({ error: 'No current store found.' }, { status: 404 })
    }

    if (!store.paddleSubscriptionId) {
      return NextResponse.json({ error: 'No Paddle subscription found for current store.' }, { status: 400 })
    }

    const updatedStore = await syncMissingCurrentPeriodEndForBillingStore(store, storeId, {
      force: true,
    })

    return NextResponse.json({
      storeId: updatedStore.id,
      paddleSubscriptionId: updatedStore.paddleSubscriptionId,
      subscriptionStatus: updatedStore.subscriptionStatus,
      currentPeriodEnd: updatedStore.currentPeriodEnd,
      cancelAtPeriodEnd: updatedStore.cancelAtPeriodEnd,
      updatedAt: updatedStore.updatedAt,
    })
  } catch (error) {
    console.error('[Billing current subscription sync failed]', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    return NextResponse.json(
      { error: 'Unable to sync current subscription.' },
      { status: 500 }
    )
  }
}
