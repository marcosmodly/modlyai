'use client'

import { Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  formatLimit,
  getPlanLimits,
  getTrialDaysRemaining,
  isCheckoutPlan,
  isTrialExpired,
  plans as planConfig,
  type CheckoutPlanId,
  type PlanId,
} from '@/lib/plans'

type BillingStore = {
  subscriptionStatus?: string
  subscriptionPlan?: string
  trialEndsAt?: string
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

export default function BillingCard({ store }: { store: BillingStore }) {
  const [loadingPlan, setLoadingPlan] = useState<CheckoutPlanId | null>(null)
  const [error, setError] = useState('')

  const hasActiveSubscription = store.subscriptionStatus === 'active'
  const trialExpired = isTrialExpired(store)
  const trialDaysRemaining = getTrialDaysRemaining(store.trialEndsAt)
  const currentPlan = normalizePlan(hasActiveSubscription ? store.subscriptionPlan : undefined)
  const currentLimits = getPlanLimits(currentPlan)
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
    setLoadingPlan(plan)
    setError('')

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const result = await response.json()

      if (!response.ok || !result?.url) {
        throw new Error(result?.error || 'Unable to start checkout')
      }

      window.location.href = result.url
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout')
      setLoadingPlan(null)
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
          {hasActiveSubscription
            ? `${planConfig[currentPlan].label} / ${store.subscriptionStatus}`
            : `${planConfig.free_trial.label} / ${trialExpired ? 'Trial expired' : store.subscriptionStatus || 'No active subscription'}`}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-950">
              {hasActiveSubscription ? `${planConfig[currentPlan].label} limits` : `${planConfig.free_trial.label} - ${planConfig.free_trial.priceLabel}`}
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              {hasActiveSubscription
                ? 'Your current monthly plan allowance.'
                : trialExpired
                  ? 'Trial expired. Subscribe to continue using ModlyAI.'
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
        {!hasActiveSubscription ? (
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
          <div>
            <h3 className="text-lg font-bold text-stone-950">Usage</h3>
            <p className="mt-1 text-sm text-stone-600">Current Plan: {planConfig[currentPlan].label}</p>
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
                    {loadingPlan === checkoutPlan ? 'Redirecting...' : 'Subscribe'}
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
