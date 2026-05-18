import type { Subscription } from '@paddle/paddle-node-sdk'
import { adminDb } from '@/lib/instant-admin'
import { isCheckoutPlan } from '@/lib/plans'

export type StoreBillingReadBack = {
  id: string
  paddleCustomerId?: string | null
  paddleSubscriptionId?: string | null
  subscriptionStatus?: string | null
  subscriptionPlan?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
  trialStartedAt?: string | null
  trialEndsAt?: string | null
  updatedAt?: string | null
}

export function stringId(value: string | { id: string } | null | undefined) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value.id
}

export function readCustomDataValue(customData: unknown, key: string) {
  if (!customData || typeof customData !== 'object') return undefined
  const value = (customData as Record<string, unknown>)[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

export function currentPeriodEndIso(subscription: Subscription) {
  return subscription.currentBillingPeriod?.endsAt ?? undefined
}

export function cancelAtPeriodEnd(subscription: Subscription) {
  return subscription.scheduledChange?.action === 'cancel'
}

export function trialDatesFromSubscription(subscription: Subscription) {
  const trialPeriod = subscription.items.find((item) => item.trialDates)?.trialDates

  return {
    trialStartedAt: trialPeriod?.startsAt ?? undefined,
    trialEndsAt: trialPeriod?.endsAt ?? undefined,
  }
}

export function subscriptionPlanFromPaddle(subscription?: Subscription, fallbackPlan?: string | null) {
  const metadataPlan = subscription ? readCustomDataValue(subscription.customData, 'plan') : undefined
  if (isCheckoutPlan(metadataPlan)) return metadataPlan

  const priceIds = subscription
    ? subscription.items
        .map((item) => item.price?.id)
        .filter(Boolean)
    : []
  const starterPrice = process.env.PADDLE_PRICE_STARTER
  const growthPrice = process.env.PADDLE_PRICE_GROWTH

  if (starterPrice && priceIds.includes(starterPrice)) return 'starter'
  if (growthPrice && priceIds.includes(growthPrice)) return 'growth'

  if (isCheckoutPlan(fallbackPlan)) return fallbackPlan
  return undefined
}

export function normalizePaddleSubscriptionStatus(status?: string | null) {
  const normalized = String(status || '').trim().toLowerCase()
  if (!normalized) return undefined

  if (normalized === 'past_due' || normalized === 'past due') return 'past_due'
  return normalized
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
  subscription: Subscription
  customerId?: string
  currentPeriodEnd?: string
  cancelingAtPeriodEnd: boolean
  readBack: StoreBillingReadBack | null
}) {
  const failures: string[] = []
  const expectedStatus = normalizePaddleSubscriptionStatus(subscription.status)

  if (!readBack) {
    failures.push('store read-back returned no store')
  } else {
    if (readBack.id !== storeId) failures.push(`read-back storeId ${readBack.id} did not match ${storeId}`)
    if (readBack.subscriptionPlan !== plan) {
      failures.push(`subscriptionPlan ${String(readBack.subscriptionPlan)} did not match ${plan}`)
    }
    if (expectedStatus && readBack.subscriptionStatus !== expectedStatus) {
      failures.push(`subscriptionStatus ${String(readBack.subscriptionStatus)} did not match ${expectedStatus}`)
    }
    if (customerId && readBack.paddleCustomerId !== customerId) {
      failures.push(`paddleCustomerId ${String(readBack.paddleCustomerId)} did not match ${customerId}`)
    }
    if (readBack.paddleSubscriptionId !== subscription.id) {
      failures.push(`paddleSubscriptionId ${String(readBack.paddleSubscriptionId)} did not match ${subscription.id}`)
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
  subscription: Subscription
  customerId?: string | null
}) {
  const normalizedStoreId = String(storeId || '').trim()
  const resolvedPlan = subscriptionPlanFromPaddle(subscription, plan)
  const resolvedCustomerId = String(customerId || subscription.customerId || '').trim() || undefined
  const { trialStartedAt, trialEndsAt } = trialDatesFromSubscription(subscription)

  if (!normalizedStoreId) {
    throw new Error('Missing storeId for Paddle billing update.')
  }

  if (!isCheckoutPlan(resolvedPlan)) {
    throw new Error(`Missing paid plan for Paddle billing update on store ${normalizedStoreId}.`)
  }

  const currentPeriodEnd = currentPeriodEndIso(subscription)
  const cancelingAtPeriodEnd = cancelAtPeriodEnd(subscription)
  const update = compactUpdate({
    subscriptionPlan: resolvedPlan,
    subscriptionStatus: normalizePaddleSubscriptionStatus(subscription.status),
    paddleCustomerId: resolvedCustomerId,
    paddleSubscriptionId: subscription.id,
    currentPeriodEnd,
    cancelAtPeriodEnd: cancelingAtPeriodEnd,
    trialStartedAt,
    trialEndsAt,
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

export async function updateStoreBillingFields({
  storeId,
  update,
}: {
  storeId: string
  update: Record<string, unknown>
}) {
  const normalizedStoreId = String(storeId || '').trim()
  if (!normalizedStoreId) {
    throw new Error('Missing storeId for Paddle billing update.')
  }

  const payload = compactUpdate({
    ...update,
    updatedAt: new Date().toISOString(),
  })

  await adminDb.transact([
    adminDb.tx.stores[normalizedStoreId].update(payload),
  ])

  return readStoreById(normalizedStoreId)
}
