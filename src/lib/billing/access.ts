import { checkoutPlanIds, getPlanLimits, type CheckoutPlanId, type PlanId } from '@/lib/plans'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const TRIAL_DAYS = 14

export type BillingAccessStore = {
  id?: string | null
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  currentPeriodEnd?: string | Date | null
  cancelAtPeriodEnd?: boolean | string | null
  trialStartedAt?: string | Date | null
  trialEndsAt?: string | Date | null
  createdAt?: string | Date | null
}

export type BillingAccess = {
  plan: PlanId
  status: string
  isTrial: boolean
  isPaid: boolean
  isTrialExpired: boolean
  hasActiveAccess: boolean
  reason: string
  trialDaysLeft: number
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

function parseDate(value?: string | Date | null) {
  if (!value) return null

  const date = value instanceof Date ? value : new Date(value)
  return Number.isFinite(date.getTime()) ? date : null
}

function toIsoDate(value?: string | Date | null) {
  return parseDate(value)?.toISOString() ?? null
}

function normalizeStatus(value?: string | null) {
  return String(value || '').trim().toLowerCase()
}

function normalizePlan(value?: string | null): PlanId {
  if (checkoutPlanIds.includes(value as CheckoutPlanId)) return value as CheckoutPlanId
  return 'free_trial'
}

function isPaidPlan(value?: string | null): value is CheckoutPlanId {
  return checkoutPlanIds.includes(value as CheckoutPlanId)
}

function isFreeTrialPlan(value?: string | null) {
  const plan = String(value || '').trim().toLowerCase()
  return plan === '' || plan === 'free' || plan === 'free_trial'
}

function isCanceling(value: unknown) {
  return value === true || value === 'true'
}

function getTrialEndDate(store?: BillingAccessStore | null) {
  const explicitTrialEnd = parseDate(store?.trialEndsAt)
  if (explicitTrialEnd) return explicitTrialEnd

  const trialStart = parseDate(store?.trialStartedAt) ?? parseDate(store?.createdAt)
  if (!trialStart) return null

  return new Date(trialStart.getTime() + TRIAL_DAYS * MS_PER_DAY)
}

function getTrialDaysLeft(trialEndsAt: Date | null, now: Date) {
  if (!trialEndsAt) return 0

  return Math.max(0, Math.ceil((trialEndsAt.getTime() - now.getTime()) / MS_PER_DAY))
}

export function getBillingAccess(store?: BillingAccessStore | null, nowInput: Date | number = new Date()): BillingAccess {
  const now = nowInput instanceof Date ? nowInput : new Date(nowInput)
  const nowTime = now.getTime()
  const rawPlan = store?.subscriptionPlan
  const plan = normalizePlan(rawPlan)
  const status = normalizeStatus(store?.subscriptionStatus)
  const periodEnd = parseDate(store?.currentPeriodEnd)
  const currentPeriodEnd = periodEnd?.toISOString() ?? null
  const currentPeriodIsFuture = Boolean(periodEnd && nowTime < periodEnd.getTime())
  const cancelAtPeriodEnd = isCanceling(store?.cancelAtPeriodEnd)

  if (!store) {
    return {
      plan: 'free_trial',
      status: '',
      isTrial: false,
      isPaid: false,
      isTrialExpired: false,
      hasActiveAccess: false,
      reason: 'store_not_found',
      trialDaysLeft: 0,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    }
  }

  if (isPaidPlan(rawPlan)) {
    if (status === 'active') {
      return {
        plan,
        status,
        isTrial: false,
        isPaid: true,
        isTrialExpired: false,
        hasActiveAccess: true,
        reason: 'active_subscription',
        trialDaysLeft: 0,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      }
    }

    if (status === 'trialing') {
      return {
        plan,
        status,
        isTrial: true,
        isPaid: true,
        isTrialExpired: false,
        hasActiveAccess: true,
        reason: 'stripe_trialing',
        trialDaysLeft: 0,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      }
    }

    if (status === 'canceled' && currentPeriodIsFuture) {
      return {
        plan,
        status,
        isTrial: false,
        isPaid: true,
        isTrialExpired: false,
        hasActiveAccess: true,
        reason: 'canceled_period_active',
        trialDaysLeft: 0,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      }
    }

    return {
      plan,
      status,
      isTrial: false,
      isPaid: false,
      isTrialExpired: false,
      hasActiveAccess: false,
      reason: status ? 'subscription_inactive' : 'subscription_missing_status',
      trialDaysLeft: 0,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    }
  }

  const trialEndsAt = getTrialEndDate(store)
  const trialExpired = Boolean(trialEndsAt && nowTime >= trialEndsAt.getTime())
  const trialDaysLeft = getTrialDaysLeft(trialEndsAt, now)
  const isTrial = isFreeTrialPlan(rawPlan) && (status === 'trialing' || status === '')

  return {
    plan: 'free_trial',
    status,
    isTrial,
    isPaid: false,
    isTrialExpired: trialExpired,
    hasActiveAccess: isTrial && !trialExpired,
    reason: trialExpired ? 'trial_expired' : isTrial ? 'free_trial_active' : 'subscription_inactive',
    trialDaysLeft,
    currentPeriodEnd,
    cancelAtPeriodEnd,
  }
}

export function getAccessPlan(store?: BillingAccessStore | null) {
  const access = getBillingAccess(store)
  return access.hasActiveAccess ? access.plan : 'free_trial'
}

export function getAccessPlanLimits(store?: BillingAccessStore | null) {
  return getPlanLimits(getAccessPlan(store))
}

export function getTrialEndIso(store?: BillingAccessStore | null) {
  return toIsoDate(getTrialEndDate(store))
}
