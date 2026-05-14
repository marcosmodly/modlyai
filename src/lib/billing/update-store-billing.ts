import Stripe from 'stripe'
import { adminDb } from '@/lib/instant-admin'
import { isCheckoutPlan } from '@/lib/plans'

export type StoreBillingReadBack = {
  id: string
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
  subscriptionStatus?: string | null
  subscriptionPlan?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
  updatedAt?: string | null
}

export function stringId(value: string | { id: string } | null | undefined) {
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

export function currentPeriodEndIso(subscription: Stripe.Subscription) {
  return periodEndIso(getStripeCurrentPeriodEnd(subscription))
}

export function cancelAtPeriodEnd(subscription: Stripe.Subscription) {
  return Boolean((subscription as any).cancel_at_period_end || (subscription as any).cancel_at)
}

export function subscriptionPlanFromStripe(subscription?: Stripe.Subscription, fallbackPlan?: string | null) {
  const metadataPlan = subscription?.metadata?.plan
  if (isCheckoutPlan(metadataPlan)) return metadataPlan

  const priceIds = subscription
    ? subscription.items.data
        .map((item) => item.price?.id)
        .filter(Boolean)
    : []
  const starterPrice = process.env.STRIPE_PRICE_STARTER
  const growthPrice = process.env.STRIPE_PRICE_GROWTH

  if (starterPrice && priceIds.includes(starterPrice)) return 'starter'
  if (growthPrice && priceIds.includes(growthPrice)) return 'growth'

  if (isCheckoutPlan(fallbackPlan)) return fallbackPlan
  return undefined
}

async function readStoreById(storeId: string) {
  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
  })

  return (result.stores[0] as StoreBillingReadBack | undefined) ?? null
}

function compactUpdate(update: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(update).filter(([, value]) => value !== undefined && value !== null)
  )
}

function assertReadBackMatches({
  storeId,
  plan,
  subscription,
  customerId,
  currentPeriodEnd,
  cancelingAtPeriodEnd,
  readBack,
}: {
  storeId: string
  plan: string
  subscription: Stripe.Subscription
  customerId?: string
  currentPeriodEnd?: string
  cancelingAtPeriodEnd: boolean
  readBack: StoreBillingReadBack | null
}) {
  const failures: string[] = []

  if (!readBack) {
    failures.push('store read-back returned no store')
  } else {
    if (readBack.id !== storeId) failures.push(`read-back storeId ${readBack.id} did not match ${storeId}`)
    if (readBack.subscriptionPlan !== plan) {
      failures.push(`subscriptionPlan ${String(readBack.subscriptionPlan)} did not match ${plan}`)
    }
    if (readBack.subscriptionStatus !== subscription.status) {
      failures.push(`subscriptionStatus ${String(readBack.subscriptionStatus)} did not match ${subscription.status}`)
    }
    if (customerId && readBack.stripeCustomerId !== customerId) {
      failures.push(`stripeCustomerId ${String(readBack.stripeCustomerId)} did not match ${customerId}`)
    }
    if (readBack.stripeSubscriptionId !== subscription.id) {
      failures.push(`stripeSubscriptionId ${String(readBack.stripeSubscriptionId)} did not match ${subscription.id}`)
    }
    if (currentPeriodEnd && readBack.currentPeriodEnd !== currentPeriodEnd) {
      failures.push(`currentPeriodEnd ${String(readBack.currentPeriodEnd)} did not match ${currentPeriodEnd}`)
    }
    if (readBack.cancelAtPeriodEnd !== cancelingAtPeriodEnd) {
      failures.push(`cancelAtPeriodEnd ${String(readBack.cancelAtPeriodEnd)} did not match ${String(cancelingAtPeriodEnd)}`)
    }
  }

  if (failures.length > 0) {
    throw new Error(`Store billing update did not persist for ${storeId}: ${failures.join('; ')}`)
  }
}

export async function updateStoreBillingFromSubscription({
  storeId,
  plan,
  subscription,
  customerId,
}: {
  storeId: string
  plan?: string | null
  subscription: Stripe.Subscription
  customerId?: string | null
}) {
  const normalizedStoreId = String(storeId || '').trim()
  const resolvedPlan = subscriptionPlanFromStripe(subscription, plan)
  const resolvedCustomerId = String(customerId || stringId(subscription.customer) || '').trim() || undefined

  if (!normalizedStoreId) {
    throw new Error('Missing storeId for Stripe billing update.')
  }

  if (!isCheckoutPlan(resolvedPlan)) {
    throw new Error(`Missing paid plan for Stripe billing update on store ${normalizedStoreId}.`)
  }

  const currentPeriodEnd = currentPeriodEndIso(subscription)
  const cancelingAtPeriodEnd = cancelAtPeriodEnd(subscription)
  const update = compactUpdate({
    subscriptionPlan: resolvedPlan,
    subscriptionStatus: subscription.status,
    stripeCustomerId: resolvedCustomerId,
    stripeSubscriptionId: subscription.id,
    currentPeriodEnd,
    cancelAtPeriodEnd: cancelingAtPeriodEnd,
    updatedAt: new Date().toISOString(),
  })

  await adminDb.transact([
    adminDb.tx.stores[normalizedStoreId].update(update),
  ])

  const readBack = await readStoreById(normalizedStoreId)

  assertReadBackMatches({
    storeId: normalizedStoreId,
    plan: resolvedPlan,
    subscription,
    customerId: resolvedCustomerId,
    currentPeriodEnd,
    cancelingAtPeriodEnd,
    readBack,
  })

  return readBack as StoreBillingReadBack
}
