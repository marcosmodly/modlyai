'use client'

import { Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { openPaddleCheckout, openPaddleCustomerPortal } from '@/lib/billing/paddle-checkout'
import { getBillingAccess } from '@/lib/billing/access'
import {
  formatLimit,
  getPlanLimits,
  isCancelAtPeriodEnd,
  isCheckoutPlan,
  plans as planConfig,
  type CheckoutPlanId,
  type PlanId,
} from '@/lib/plans'

type BillingStore = {
  id?: string
  paddleCustomerId?: string
  paddleSubscriptionId?: string
  subscriptionStatus?: string
  subscriptionPlan?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean | string
  trialStartedAt?: string
  trialEndsAt?: string
  createdAt?: string
  aiChatsUsed?: number
  roomPlannerAnalysesUsed?: number
  productCount?: number
}

const paidPlans: Array<{
  id: CheckoutPlanId | 'scale'
  name: string
  price: string
  features: string[]
}> = [
  {
    id: 'starter',
    name: planConfig.starter.label,
    price: `$${planConfig.starter.priceMonthly}/mo`,
    features: [
      '1,000 AI chats/month',
      '150 room planner analyses/month',
      '1 store',
      '500 products',
      'White-label widget',
      'CSV catalog import',
      'Basic usage analytics',
      planConfig.starter.support,
    ],
  },
  {
    id: 'growth',
    name: planConfig.growth.label,
    price: `$${planConfig.growth.priceMonthly}/mo`,
    features: [
      '5,000 AI chats/month',
      '750 room planner analyses/month',
      '3 stores',
      '5,000 products',
      'White-label widget',
      'Shopify catalog sync',
      'Product and customer intent analytics',
      'Priority setup support',
    ],
  },
  {
    id: 'scale',
    name: planConfig.scale.label,
    price: planConfig.scale.priceLabel,
    features: ['Higher AI usage', 'More stores', 'Custom onboarding', 'Custom integrations', 'Dedicated support'],
  },
]

const freeTrialFeatures = [
  '100 AI chats',
  '20 room planner analyses',
  '1 store',
  '50 products',
  'ModlyAI branding',
  'No credit card required',
]

function normalizePlan(value?: string): PlanId {
  return value && value in planConfig ? (value as PlanId) : 'free_trial'
}

function usageMessage(rows: Array<{ used: number; limit: number | null }>) {
  const hasReachedLimit = rows.some((row) => row.limit !== null && row.used >= row.limit)
  if (hasReachedLimit) return "You've reached your plan limit. Upgrade to continue."

  const isCloseToLimit = rows.some((row) => row.limit !== null && row.used / row.limit >= 0.8)
  if (isCloseToLimit) return "You're close to your monthly limit."

  return ''
}

function formatBillingDate(value?: string) {
  if (!value) return null

  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function normalizeStatus(value?: string) {
  if (!value) return 'No active subscription'
  return value.replace(/_/g, ' ')
}

function hasDatePassed(value?: string) {
  if (!value) return false

  const time = new Date(value).getTime()
  return Number.isFinite(time) && time <= Date.now()
}

export default function BillingCard({
  store,
  userEmail,
}: {
  store: BillingStore
  userEmail?: string | null
}) {
  const [loadingPlan, setLoadingPlan] = useState<CheckoutPlanId | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)
  const [error, setError] = useState('')

  const access = getBillingAccess(store)
  const paidPlan = isCheckoutPlan(store.subscriptionPlan)
  const billingPlan = normalizePlan(store.subscriptionPlan)
  const hasPaidSubscription = access.isPaid && access.hasActiveAccess
  const paddleCustomerId = String(store.paddleCustomerId ?? '').trim()
  const hasPaddleCustomer = paddleCustomerId.length > 0
  const canManageBilling = hasPaddleCustomer
  const cancelingAtPeriodEnd = isCancelAtPeriodEnd(store.cancelAtPeriodEnd)
  const periodEnded = hasDatePassed(store.currentPeriodEnd)
  const subscriptionCanceled = store.subscriptionStatus === 'canceled'
  const isPaymentIssue = store.subscriptionStatus === 'past_due' || store.subscriptionStatus === 'unpaid'
  const periodDate = formatBillingDate(store.currentPeriodEnd)
  const billingDateLabel = 'Renewal date'
  const billingDateText = periodDate
    ? subscriptionCanceled && periodEnded
      ? `Ended on ${periodDate}`
      : cancelingAtPeriodEnd
      ? `Ends on ${periodDate}`
      : `Renews on ${periodDate}`
    : 'Not scheduled'
  const statusLabel = normalizeStatus(store.subscriptionStatus)
  const trialExpired = access.isTrialExpired
  const displayStatusLabel = trialExpired
    ? 'Trial ended'
    : subscriptionCanceled && periodEnded
      ? 'Canceled'
      : cancelingAtPeriodEnd
        ? 'Canceling'
        : statusLabel
  const topBadgeStatusLabel = cancelingAtPeriodEnd
    ? 'canceling'
    : subscriptionCanceled && periodEnded
      ? 'canceled'
      : statusLabel
  const trialDaysRemaining = access.trialDaysLeft
  const currentPlan = normalizePlan(access.hasActiveAccess ? access.plan : undefined)
  const currentPlanLabel = planConfig[currentPlan].label
  const displayPlanLabel = paidPlan ? planConfig[billingPlan].label : currentPlanLabel
  const currentLimits = getPlanLimits(currentPlan)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    console.log('[Billing debug]', {
      storeId: store.id,
      subscriptionPlan: store.subscriptionPlan,
      subscriptionStatus: store.subscriptionStatus,
      paddleCustomerId: store.paddleCustomerId,
      paddleSubscriptionId: store.paddleSubscriptionId,
      currentPeriodEnd: store.currentPeriodEnd,
      cancelAtPeriodEnd: store.cancelAtPeriodEnd,
    })
  }, [
    store.id,
    store.subscriptionPlan,
    store.subscriptionStatus,
    store.paddleCustomerId,
    store.paddleSubscriptionId,
    store.currentPeriodEnd,
    store.cancelAtPeriodEnd,
  ])

  const usageRows = [
    {
      label: 'AI Chats',
      used: Number(store.aiChatsUsed ?? 0),
      limit: currentLimits.aiChatLimit,
    },
    {
      label: 'Room Planner Analyses',
      used: Number(store.roomPlannerAnalysesUsed ?? 0),
      limit: currentLimits.roomPlannerLimit,
    },
    {
      label: 'Products',
      used: Number(store.productCount ?? 0),
      limit: currentLimits.productLimit,
    },
  ]
  const warning = usageMessage(usageRows)

  const startCheckout = async (plan: CheckoutPlanId) => {
    if (!store.id) {
      setError('Missing store for checkout.')
      return
    }

    setLoadingPlan(plan)
    setError('')

    try {
      await openPaddleCheckout({
        plan,
        storeId: store.id,
        email: userEmail,
        paddleCustomerId: store.paddleCustomerId,
      })
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout')
    } finally {
      setLoadingPlan(null)
    }
  }

  const openBillingPortal = async () => {
    if (!paddleCustomerId) {
      setError('No Paddle customer found for this account.')
      return
    }

    setPortalLoading(true)
    setError('')

    try {
      await openPaddleCustomerPortal(paddleCustomerId)
    } catch (portalError) {
      setError(portalError instanceof Error ? portalError.message : 'Unable to open billing portal')
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Billing</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950">Subscription</h2>
        </div>
        <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
          {paidPlan
            ? `${displayPlanLabel} / ${topBadgeStatusLabel}`
            : `${planConfig.free_trial.label} / ${trialExpired ? 'Trial expired' : statusLabel}`}
        </div>
      </div>

      {trialExpired ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-stone-950">Your free trial has ended.</h3>
              <p className="mt-1 text-sm leading-6 text-stone-700">
                Upgrade to continue using ModlyAI on your storefront.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-950">
              {hasPaidSubscription ? `${planConfig[currentPlan].label} limits` : `${planConfig.free_trial.label} - ${planConfig.free_trial.priceLabel}`}
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              {cancelingAtPeriodEnd && periodDate
                ? `Your plan will cancel on ${periodDate}. You can continue using paid features until then.`
                : isPaymentIssue
                  ? 'There is a billing issue on this subscription. Update billing in Paddle to keep paid features available.'
                  : hasPaidSubscription
                ? 'Your current monthly plan allowance.'
                : trialExpired
                  ? 'Your free trial has ended. Upgrade to continue using ModlyAI on your storefront.'
                  : `${trialDaysRemaining} ${trialDaysRemaining === 1 ? 'day' : 'days'} left in your trial.`}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-700">
            <span className="font-semibold text-stone-950">{formatLimit(currentLimits.aiChatLimit)}</span> AI chats
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-700">
            <span className="font-semibold text-stone-950">{formatLimit(currentLimits.roomPlannerLimit)}</span> room analyses
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-700">
            <span className="font-semibold text-stone-950">{formatLimit(currentLimits.storeLimit)}</span> stores
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-stone-700">
            <span className="font-semibold text-stone-950">{formatLimit(currentLimits.productLimit)}</span> products
          </div>
        </div>
        {!hasPaidSubscription ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {freeTrialFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-stone-700">
                <Check className="h-4 w-4 text-emerald-600" />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-stone-950">Manage billing</h3>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              Update payment methods, view invoices, change your plan, or cancel your subscription through Paddle.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Current plan</p>
                <p className="mt-1 text-sm font-semibold text-stone-950">
                  {hasPaidSubscription && paidPlan ? currentPlanLabel : paidPlan ? displayPlanLabel : planConfig.free_trial.label}
                </p>
              </div>
              <div className="rounded-xl bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Status</p>
                <p className="mt-1 text-sm font-semibold capitalize text-stone-950">{displayStatusLabel}</p>
              </div>
              <div className="rounded-xl bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{billingDateLabel}</p>
                <p className="mt-1 text-sm font-semibold text-stone-950">{billingDateText}</p>
              </div>
            </div>
            {cancelingAtPeriodEnd && periodDate ? (
              <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                Your plan will cancel on {periodDate}. You can continue using paid features until then.
              </p>
            ) : isPaymentIssue ? (
              <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                We could not collect payment for this subscription. Please update billing to avoid losing paid access.
              </p>
            ) : null}
          </div>
          {canManageBilling ? (
            <button
              type="button"
              onClick={openBillingPortal}
              disabled={portalLoading || loadingPlan !== null}
              className="inline-flex items-center justify-center rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {portalLoading ? 'Opening billing portal...' : 'Manage billing'}
            </button>
          ) : (
            <p className="max-w-sm text-sm font-medium text-stone-600">
              Billing portal becomes available after you start a paid plan.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-950">Usage</h3>
            <p className="mt-1 text-sm text-stone-600">Current Plan: {currentPlanLabel}</p>
          </div>
          {warning ? (
            <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
              {warning}
            </div>
          ) : null}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {usageRows.map((row) => (
            <div key={row.label} className="rounded-xl bg-white px-4 py-3">
              <div className="text-sm font-medium text-stone-500">{row.label}</div>
              <div className="mt-1 text-lg font-bold text-stone-950">
                {row.used.toLocaleString('en-US')} / {formatLimit(row.limit)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {paidPlans.map((plan) => (
          <div key={plan.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-950">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold tracking-tight text-stone-950">{plan.price}</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.id === 'scale' ? (
              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-100"
              >
                Contact us
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : isCheckoutPlan(plan.id) ? (
              (() => {
                const checkoutPlan = plan.id
                return (
                  <button
                    type="button"
                    onClick={() => startCheckout(checkoutPlan)}
                    disabled={loadingPlan !== null}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingPlan === checkoutPlan ? 'Opening checkout...' : 'Start 14-day free trial'}
                  </button>
                )
              })()
            ) : null}
          </div>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}
    </section>
  )
}
