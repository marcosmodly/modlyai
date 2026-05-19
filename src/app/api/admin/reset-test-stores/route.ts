import { NextResponse } from 'next/server'
import { adminDbLenient as db } from '@/lib/instant-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type StoreRecord = {
  id?: unknown
  stripeCustomerId?: unknown
  paddleCustomerId?: unknown
}

function isResetEndpointBlocked() {
  return process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_BILLING_RESET !== 'true'
}

function hasValue(value: unknown) {
  return String(value ?? '').trim().length > 0
}

export async function POST() {
  if (isResetEndpointBlocked()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const result = await db.query({
      stores: {},
    })

    const storesToReset = ((result.stores ?? []) as StoreRecord[]).filter((store) => {
      return hasValue(store.id) && hasValue(store.stripeCustomerId) && !hasValue(store.paddleCustomerId)
    })

    const resetPayload = {
      subscriptionStatus: null,
      subscriptionPlan: null,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
      trialEndsAt: null,
      trialStartedAt: null,
    }

    if (storesToReset.length > 0) {
      await db.transact(
        storesToReset.map((store) => {
          return db.tx.stores[String(store.id)].update(resetPayload)
        })
      )
    }

    return NextResponse.json({
      success: true,
      resetCount: storesToReset.length,
      storeIds: storesToReset.map((store) => String(store.id)),
    })
  } catch (error) {
    console.error('[Reset test stores failed]', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    return NextResponse.json({ error: 'Failed to reset test stores' }, { status: 500 })
  }
}
