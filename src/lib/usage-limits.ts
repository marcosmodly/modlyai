import { adminDb } from '@/lib/instant-admin'
import { getPlanLimits, isTrialExpired, plans, type PlanId } from '@/lib/plans'

export type UsageKind = 'aiChat' | 'roomPlanner'

type StoreLike = {
  id: string
  apiKey?: string
  domain?: string
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  trialEndsAt?: string | null
  aiChatsUsed?: number | string | null
  roomPlannerAnalysesUsed?: number | string | null
  productCount?: number | string | null
}

type StoreLookup = {
  storeId?: string | null
  apiKey?: string | null
  domain?: string | null
}

function normalizeDomain(value?: string | null) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
}

function toCount(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

export function getCurrentPlan(store?: StoreLike | null): PlanId {
  if (!store || store.subscriptionStatus !== 'active') return 'free_trial'
  return store.subscriptionPlan === 'starter' || store.subscriptionPlan === 'growth'
    ? store.subscriptionPlan
    : 'free_trial'
}

export function getUsageSnapshot(store: StoreLike | null | undefined, productCount?: number) {
  const plan = getCurrentPlan(store)
  const limits = getPlanLimits(plan)

  return {
    plan,
    planLabel: plans[plan].label,
    limits,
    aiChatsUsed: toCount(store?.aiChatsUsed),
    roomPlannerAnalysesUsed: toCount(store?.roomPlannerAnalysesUsed),
    productCount: productCount ?? toCount(store?.productCount),
  }
}

export function checkAiChatLimit(store: StoreLike | null | undefined) {
  const snapshot = getUsageSnapshot(store)
  const limit = snapshot.limits.aiChatLimit
  const trialExpired = isTrialExpired(store)

  return {
    allowed: !trialExpired && (limit === null || snapshot.aiChatsUsed < limit),
    trialExpired,
    used: snapshot.aiChatsUsed,
    limit,
    plan: snapshot.plan,
  }
}

export function checkRoomPlannerLimit(store: StoreLike | null | undefined) {
  const snapshot = getUsageSnapshot(store)
  const limit = snapshot.limits.roomPlannerLimit
  const trialExpired = isTrialExpired(store)

  return {
    allowed: !trialExpired && (limit === null || snapshot.roomPlannerAnalysesUsed < limit),
    trialExpired,
    used: snapshot.roomPlannerAnalysesUsed,
    limit,
    plan: snapshot.plan,
  }
}

export function checkProductLimit(store: StoreLike | null | undefined, nextProductCount: number) {
  const snapshot = getUsageSnapshot(store, nextProductCount)
  const limit = snapshot.limits.productLimit
  const trialExpired = isTrialExpired(store)

  return {
    allowed: !trialExpired && (limit === null || nextProductCount <= limit),
    trialExpired,
    used: nextProductCount,
    limit,
    plan: snapshot.plan,
  }
}

export async function findStoreForUsage({ storeId, apiKey, domain }: StoreLookup) {
  if (storeId) {
    const result = await adminDb.query({
      stores: {
        $: { where: { id: storeId } },
      },
    })
    return (result.stores[0] as StoreLike | undefined) ?? null
  }

  if (apiKey) {
    const result = await adminDb.query({
      stores: {
        $: { where: { apiKey } },
      },
    })
    return (result.stores[0] as StoreLike | undefined) ?? null
  }

  const normalizedDomain = normalizeDomain(domain)
  if (normalizedDomain) {
    const result = await adminDb.query({
      stores: {
        $: { where: { domain: normalizedDomain } },
      },
    })
    return (result.stores[0] as StoreLike | undefined) ?? null
  }

  return null
}

export async function getProductCountForStore(storeId: string) {
  const result = await adminDb.query({
    products: {
      $: { where: { storeId } },
    },
  })

  return result.products?.length ?? 0
}

export async function incrementUsage(storeId: string, usageKind: UsageKind, currentValue: unknown) {
  const field = usageKind === 'aiChat' ? 'aiChatsUsed' : 'roomPlannerAnalysesUsed'

  await adminDb.transact([
    adminDb.tx.stores[storeId].update({
      [field]: toCount(currentValue) + 1,
      updatedAt: new Date().toISOString(),
    }),
  ])
}

// TODO: Add monthly usage reset when billing periods are modeled in InstantDB.
