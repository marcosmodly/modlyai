import Stripe from 'stripe'
import {
  stringId,
  subscriptionPlanFromStripe,
  updateStoreBillingFromSubscription,
  type StoreBillingReadBack,
} from '@/lib/billing/update-store-billing'

type CheckoutSyncResult<TStore> = {
  store: TStore | StoreBillingReadBack
  updated: boolean
  failed: boolean
  reason?: string
  stripeSessionMetadataStoreId?: string
  targetStoreId: string
  readBack?: StoreBillingReadBack
}

function expandedSubscription(value: Stripe.Checkout.Session['subscription']) {
  if (value && typeof value !== 'string') return value as Stripe.Subscription
  return null
}

function activePaidStore(store?: StoreBillingReadBack | null) {
  return (
    (store?.subscriptionPlan === 'starter' || store?.subscriptionPlan === 'growth') &&
    store.subscriptionStatus === 'active'
  )
}

function stripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured.')
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-04-22.dahlia',
  })
}

export async function syncCheckoutSessionToCurrentStore<TStore extends { id: string }>({
  sessionId,
  currentStore,
}: {
  sessionId?: string
  currentStore: TStore
}): Promise<CheckoutSyncResult<TStore>> {
  const targetStoreId = String(currentStore.id || '').trim()

  if (!sessionId) {
    return { store: currentStore, updated: false, failed: false, targetStoreId }
  }

  try {
    const stripe = stripeClient()
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })
    const subscription =
      expandedSubscription(checkoutSession.subscription) ??
      (typeof checkoutSession.subscription === 'string'
        ? await stripe.subscriptions.retrieve(checkoutSession.subscription)
        : null)
    const stripeSessionMetadataStoreId = checkoutSession.metadata?.storeId ?? subscription?.metadata?.storeId
    const plan = checkoutSession.metadata?.plan ?? (subscription ? subscriptionPlanFromStripe(subscription) : undefined)

    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Billing post-checkout Stripe session]', {
        sessionId,
        stripeSessionMetadataStoreId,
        currentStoreId: targetStoreId,
        plan,
        subscriptionId: subscription?.id,
      })
    }

    if (!subscription) {
      throw new Error(`Stripe checkout session ${sessionId} did not include a subscription.`)
    }

    if (stripeSessionMetadataStoreId !== targetStoreId) {
      console.error('Stripe session store does not match current user store', {
        sessionId,
        stripeSessionMetadataStoreId,
        currentStoreId: targetStoreId,
      })
      return {
        store: currentStore,
        updated: false,
        failed: true,
        reason: 'store-mismatch',
        stripeSessionMetadataStoreId,
        targetStoreId,
      }
    }

    const readBack = await updateStoreBillingFromSubscription({
      storeId: targetStoreId,
      plan,
      subscription,
      customerId: stringId(checkoutSession.customer) ?? stringId(subscription.customer),
    })

    if (!activePaidStore(readBack)) {
      throw new Error(
        `Post-checkout read-back for store ${targetStoreId} was ${String(readBack.subscriptionPlan)}/${String(readBack.subscriptionStatus)}.`
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Billing post-checkout read-back]', {
        targetStoreId,
        subscriptionPlan: readBack.subscriptionPlan,
        subscriptionStatus: readBack.subscriptionStatus,
        stripeCustomerId: readBack.stripeCustomerId,
        stripeSubscriptionId: readBack.stripeSubscriptionId,
      })
    }

    return {
      store: readBack,
      updated: true,
      failed: false,
      stripeSessionMetadataStoreId,
      targetStoreId,
      readBack,
    }
  } catch (error) {
    console.error('[Billing post-checkout sync failed]', {
      sessionId,
      targetStoreId,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return {
      store: currentStore,
      updated: false,
      failed: true,
      reason: error instanceof Error ? error.message : String(error),
      targetStoreId,
    }
  }
}
