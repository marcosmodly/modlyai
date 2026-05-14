import Stripe from 'stripe'
import { adminDb, adminDbLenient } from '@/lib/instant-admin'
import { isCheckoutPlan } from '@/lib/plans'

type BillingStoreForPeriodSync = {
  id?: string | null
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
}

function stringId(value: string | { id: string } | null | undefined) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value.id
}

function getStripeCurrentPeriodEnd(subscription: Stripe.Subscription): number | null {
  const direct = (subscription as any).current_period_end
  if (typeof direct === 'number') return direct

  const itemPeriodEnd = (subscription.items?.data?.[0] as any)?.current_period_end
  if (typeof itemPeriodEnd === 'number') return itemPeriodEnd

  return null
}

function periodEndIso(periodEnd: number | null) {
  return typeof periodEnd === 'number' && periodEnd > 0 ? new Date(periodEnd * 1000).toISOString() : undefined
}

function isSubscriptionEnding(subscription: Stripe.Subscription) {
  return Boolean((subscription as any).cancel_at_period_end || (subscription as any).cancel_at)
}

function logMissingStripeCurrentPeriodEnd(subscription: Stripe.Subscription) {
  console.error('[Stripe currentPeriodEnd missing]', {
    subscriptionId: subscription.id,
    status: subscription.status,
    keys: Object.keys(subscription),
    firstItemKeys: subscription.items?.data?.[0]
      ? Object.keys(subscription.items.data[0])
      : [],
  })
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
    stripeSubscriptionId: store.stripeSubscriptionId,
    currentPeriodEnd: store.currentPeriodEnd,
  })
}

function stripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return null

  return new Stripe(secretKey, {
    apiVersion: '2026-04-22.dahlia',
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
      stripeSubscriptionId: store.stripeSubscriptionId,
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
  if (!hasValue(store.stripeSubscriptionId)) {
    logSkip('missing stripeSubscriptionId', store)
    return store
  }
  if (!force && hasValue(store.currentPeriodEnd)) {
    logSkip('currentPeriodEnd already exists', store)
    return store
  }

  const stripe = stripeClient()
  if (!stripe) {
    logSkip('missing Stripe secret', store)
    return store
  }

  const subscriptionId = store.stripeSubscriptionId

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    if (process.env.NODE_ENV !== 'production') {
      console.warn(force ? '[Billing portal return Stripe subscription sync]' : '[Stripe subscription raw keys]', {
        subscriptionId: subscription.id,
        keys: Object.keys(subscription),
        status: subscription.status,
        current_period_end: (subscription as any).current_period_end,
        currentPeriodEnd: (subscription as any).currentPeriodEnd,
        cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
        cancelAt: (subscription as any).cancel_at,
        itemsCount: subscription.items?.data?.length,
        firstItemCurrentPeriodEnd: (subscription.items?.data?.[0] as any)?.current_period_end,
        firstItemCurrentPeriodStart: (subscription.items?.data?.[0] as any)?.current_period_start,
      })
    }

    const periodEnd = getStripeCurrentPeriodEnd(subscription)
    const currentPeriodEnd = periodEndIso(periodEnd)

    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Stripe currentPeriodEnd selected]', {
        subscriptionId: subscription.id,
        periodEnd,
        currentPeriodEnd,
      })
    }

    if (!currentPeriodEnd) {
      logMissingStripeCurrentPeriodEnd(subscription)
      logSkip('subscription current_period_end missing', store)
      return store
    }

    const subscriptionCustomerId = stringId(subscription.customer)
    if (store.stripeCustomerId && subscriptionCustomerId && store.stripeCustomerId !== subscriptionCustomerId) {
      console.error('[Billing currentPeriodEnd sync customer mismatch]', {
        storeId: store.id,
        subscriptionId: subscription.id,
      })
      return store
    }

    const update = {
      currentPeriodEnd,
      cancelAtPeriodEnd: isSubscriptionEnding(subscription),
      subscriptionStatus: subscription.status,
      updatedAt: new Date().toISOString(),
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(force ? '[Billing portal return update payload]' : '[Billing currentPeriodEnd update payload]', {
        storeId: currentStoreId,
        update,
      })
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

    if (process.env.NODE_ENV !== 'production') {
      console.warn(force ? '[Billing portal return read-back]' : '[Billing currentPeriodEnd read-back]', {
        storeId: currentStoreId,
        currentPeriodEnd: updatedStore?.currentPeriodEnd,
        cancelAtPeriodEnd: updatedStore?.cancelAtPeriodEnd,
        subscriptionStatus: updatedStore?.subscriptionStatus,
      })
    }

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
