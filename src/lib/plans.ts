export const plans = {
  free_trial: {
    label: 'Free Trial',
    priceLabel: '14 days',
    aiChatLimit: 100,
    roomPlannerLimit: 20,
    storeLimit: 1,
    productLimit: 50,
    whiteLabel: false,
    modlyBranding: true,
    requiresCard: false,
  },
  starter: {
    label: 'Starter',
    priceMonthly: 299,
    paddlePriceEnv: 'PADDLE_PRICE_STARTER',
    aiChatLimit: 1000,
    roomPlannerLimit: 150,
    storeLimit: 1,
    productLimit: 500,
    whiteLabel: true,
    csvImport: true,
    basicAnalytics: true,
    support: 'Email support',
  },
  growth: {
    label: 'Growth',
    priceMonthly: 599,
    paddlePriceEnv: 'PADDLE_PRICE_GROWTH',
    aiChatLimit: 5000,
    roomPlannerLimit: 750,
    storeLimit: 3,
    productLimit: 5000,
    whiteLabel: true,
    shopifySync: true,
    advancedAnalytics: true,
    support: 'Priority support',
  },
  scale: {
    label: 'Scale',
    priceLabel: 'Custom',
    custom: true,
  },
} as const

export type PlanId = keyof typeof plans
export type CheckoutPlanId = 'starter' | 'growth'

export const checkoutPlanIds = ['starter', 'growth'] as const
const MS_PER_DAY = 24 * 60 * 60 * 1000
const PAYMENT_GRACE_PERIOD_DAYS = 7
const PAYMENT_GRACE_PERIOD_MS = PAYMENT_GRACE_PERIOD_DAYS * MS_PER_DAY

type TrialStoreLike = {
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  trialEndsAt?: string | Date | null
}

type BillingAccessStoreLike = {
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  currentPeriodEnd?: string | Date | null
  cancelAtPeriodEnd?: boolean | string | null
}

export function isCheckoutPlan(plan: unknown): plan is CheckoutPlanId {
  return plan === 'starter' || plan === 'growth'
}

export function getPaddlePriceId(plan: CheckoutPlanId) {
  const priceEnvName = plans[plan].paddlePriceEnv
  return process.env[priceEnvName] || ''
}

function periodEndTime(currentPeriodEnd?: string | Date | null) {
  if (!currentPeriodEnd) return null

  const time = new Date(currentPeriodEnd).getTime()
  return Number.isFinite(time) ? time : null
}

export function isCancelAtPeriodEnd(value: unknown) {
  return value === true || value === 'true'
}

export function hasCurrentPeriodEnded(currentPeriodEnd?: string | Date | null, now = Date.now()) {
  const endTime = periodEndTime(currentPeriodEnd)
  return endTime !== null && now >= endTime
}

export function isCurrentPeriodFuture(currentPeriodEnd?: string | Date | null, now = Date.now()) {
  const endTime = periodEndTime(currentPeriodEnd)
  return endTime !== null && now < endTime
}

export function hasPaidPlanAccess(store?: BillingAccessStoreLike | null, now = Date.now()) {
  if (!store || !isCheckoutPlan(store.subscriptionPlan)) return false

  const status = store.subscriptionStatus
  const endTime = periodEndTime(store.currentPeriodEnd)
  const periodEnded = endTime !== null && now >= endTime

  if ((status === 'active' || status === 'trialing') && !periodEnded) return true

  if ((status === 'past_due' || status === 'unpaid') && endTime !== null) {
    return now < endTime + PAYMENT_GRACE_PERIOD_MS
  }

  return false
}

export function getPlanLimits(plan: PlanId | null | undefined) {
  const planConfig = plan && plan in plans ? plans[plan] : plans.free_trial

  return {
    aiChatLimit: 'aiChatLimit' in planConfig ? planConfig.aiChatLimit : null,
    roomPlannerLimit: 'roomPlannerLimit' in planConfig ? planConfig.roomPlannerLimit : null,
    storeLimit: 'storeLimit' in planConfig ? planConfig.storeLimit : null,
    productLimit: 'productLimit' in planConfig ? planConfig.productLimit : null,
  }
}

export function formatLimit(value: number | null) {
  return value === null ? 'Custom' : value.toLocaleString('en-US')
}

export function getTrialDaysRemaining(trialEndsAt?: string | Date | null) {
  if (!trialEndsAt) return 0

  const endDate = new Date(trialEndsAt)
  const endTime = endDate.getTime()
  if (!Number.isFinite(endTime)) return 0

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime()

  return Math.max(0, Math.round((endDay - today) / MS_PER_DAY))
}

export function isTrialExpired(store?: TrialStoreLike | null) {
  if (!store) return false

  if (store.subscriptionPlan !== 'free_trial') return false
  if (store.subscriptionStatus !== 'trialing') return false
  if (!store.trialEndsAt) return false

  const trialEnd = new Date(store.trialEndsAt).getTime()
  const now = Date.now()
  return Number.isFinite(trialEnd) && now >= trialEnd
}
