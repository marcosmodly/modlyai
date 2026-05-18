import type { Subscription } from '@paddle/paddle-node-sdk'
import { adminDb, adminDbLenient } from '@/lib/instant-admin'
import {
  cancelAtPeriodEnd,
  currentPeriodEndIso,
  normalizePaddleSubscriptionStatus,
} from '@/lib/billing/update-store-billing'
import { isCheckoutPlan } from '@/lib/plans'
import { paddle } from '@/lib/paddle'

type BillingStoreForPeriodSync = {
  id?: string | null
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  paddleCustomerId?: string | null
  paddleSubscriptionId?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
}

function hasValue(value?: string | null): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function logSkip(reason: string, store: BillingStoreForPeriodSync) {
  if (process.env.NODE_ENV === 'production') return

  console.warn('[Billing currentPeriodEnd sync skipped]', {
    reason,
    storeId: store.id,
    subscriptionPlan: store.subscriptionPlan,
    paddleSubscriptionId: store.paddleSubscriptionId,
    currentPeriodEnd: store.currentPeriodEnd,
  })
}

export async function syncMissingCurrentPeriodEndForBillingStore<TStore extends BillingStoreForPeriodSync>(
  store: TStore,
  currentStoreId: string,
  options: { force?: boolean } = {}
): Promise<TStore> {
  const force = options.force === true

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[Billing currentPeriodEnd sync start]', {
      storeId: store.id,
      subscriptionPlan: store.subscriptionPlan,
      subscriptionStatus: store.subscriptionStatus,
      paddleSubscriptionId: store.paddleSubscriptionId,
      currentPeriodEnd: store.currentPeriodEnd,
      cancelAtPeriodEnd: store.cancelAtPeriodEnd,
      force,
    })
  }

  if (store.id !== currentStoreId) {
    logSkip('store mismatch', store)
    return store
  }
  if (!isCheckoutPlan(store.subscriptionPlan)) {
    logSkip('not paid plan', store)
    return store
  }
  if (!hasValue(store.paddleSubscriptionId)) {
    logSkip('missing paddleSubscriptionId', store)
    return store
  }
  if (!force && hasValue(store.currentPeriodEnd)) {
    logSkip('currentPeriodEnd already exists', store)
    return store
  }

  const subscriptionId = store.paddleSubscriptionId

  try {
    const subscription: Subscription = await paddle.subscriptions.get(subscriptionId)
    const currentPeriodEnd = currentPeriodEndIso(subscription)

    if (!currentPeriodEnd) {
      logSkip('subscription current billing period end missing', store)
      return store
    }

    if (
      store.paddleCustomerId &&
      subscription.customerId &&
      store.paddleCustomerId !== subscription.customerId
    ) {
      console.error('[Billing currentPeriodEnd sync customer mismatch]', {
        storeId: store.id,
        subscriptionId: subscription.id,
      })
      return store
    }

    const update = {
      currentPeriodEnd,
      cancelAtPeriodEnd: cancelAtPeriodEnd(subscription),
      subscriptionStatus: normalizePaddleSubscriptionStatus(subscription.status),
      updatedAt: new Date().toISOString(),
    }

    await adminDbLenient.transact([
      adminDbLenient.tx.stores[currentStoreId].update(update),
    ])

    const readBack = await adminDb.query({
      stores: {
        $: { where: { id: currentStoreId } },
      },
    })
    const updatedStore = readBack.stores[0] as TStore | undefined

    return updatedStore ?? { ...store, ...update }
  } catch (error) {
    console.error('[Billing currentPeriodEnd sync failed]', {
      storeId: store.id,
      subscriptionId,
      message: error instanceof Error ? error.message : String(error),
    })
    return store
  }
}
