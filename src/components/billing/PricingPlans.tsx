'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { openPaddleCheckout } from '@/lib/billing/paddle-checkout'
import { plans, type CheckoutPlanId } from '@/lib/plans'

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm leading-6 text-[#665c52]">
      <span className="mt-0.5 text-[#8a6238]">✓</span>
      <span>{children}</span>
    </div>
  )
}

function PricingCard({
  name,
  price,
  note,
  features,
  popular,
  action,
}: {
  name: string
  price: string
  note: string
  features: string[]
  popular?: boolean
  action: React.ReactNode
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 shadow-[0_18px_45px_rgba(75,61,47,0.08)] ${popular ? 'border-[#244f85] bg-white' : 'border-[#e1d7ca] bg-[#fffdf9]'}`}>
      {popular ? (
        <div className="absolute right-5 top-5 rounded-full bg-[#244f85] px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </div>
      ) : null}
      <div className="text-sm font-semibold text-[#7b6d5f]">{name}</div>
      <div className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-[#171411]">{price}</div>
      <div className="mt-1 text-sm text-[#73685d]">{note}</div>
      <div className="mt-6 flex-1 space-y-2.5">
        {features.map((feature) => (
          <CheckItem key={feature}>{feature}</CheckItem>
        ))}
      </div>
      <div className="mt-6">{action}</div>
    </div>
  )
}

export default function PricingPlans() {
  const { data: session, status } = useSession()
  const [loadingPlan, setLoadingPlan] = useState<CheckoutPlanId | null>(null)
  const [error, setError] = useState('')

  const startCheckout = async (plan: CheckoutPlanId) => {
    if (status !== 'authenticated') {
      window.location.href = `/auth/signup?plan=${plan}`
      return
    }

    setLoadingPlan(plan)
    setError('')

    try {
      const contextResponse = await fetch('/api/billing/context', { cache: 'no-store' })
      const context = await contextResponse.json()

      if (!contextResponse.ok || !context?.storeId) {
        throw new Error(context?.error || 'Unable to start checkout for your store.')
      }

      await openPaddleCheckout({
        plan,
        storeId: context.storeId,
        email: context.email ?? session?.user?.email,
        paddleCustomerId: context.paddleCustomerId,
      })
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout')
    } finally {
      setLoadingPlan(null)
    }
  }

  const checkoutButtonClass =
    'inline-flex w-full items-center justify-center rounded-lg bg-[#171411] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2d2924] disabled:cursor-not-allowed disabled:opacity-60'

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <PricingCard
          name={plans.free_trial.label}
          price={plans.free_trial.priceLabel}
          note="No card required"
          features={[
            '100 AI chats',
            '20 room planner analyses',
            '1 store',
            '50 products',
            'ModlyAI branding',
          ]}
          action={
            <Link href="/auth/signup" className={checkoutButtonClass}>
              Start free trial
            </Link>
          }
        />
        <PricingCard
          name={plans.starter.label}
          price={`${plans.starter.priceMonthly}/mo`}
          note="Billed monthly, cancel anytime"
          features={[
            '1,000 AI chats/month',
            '150 room planner analyses/month',
            '1 store',
            '500 products',
            'White-label widget',
            'CSV catalog import',
            'Basic usage analytics',
            plans.starter.support,
          ]}
          action={
            <button
              type="button"
              className={checkoutButtonClass}
              disabled={loadingPlan !== null}
              onClick={() => startCheckout('starter')}
            >
              {loadingPlan === 'starter' ? 'Opening checkout...' : 'Subscribe'}
            </button>
          }
        />
        <PricingCard
          name={plans.growth.label}
          price={`${plans.growth.priceMonthly}/mo`}
          note="Billed monthly, cancel anytime"
          popular
          features={[
            '5,000 AI chats/month',
            '750 room planner analyses/month',
            '3 stores',
            '5,000 products',
            'White-label widget',
            'Shopify catalog sync',
            'Product and customer intent analytics',
            'Priority setup support',
          ]}
          action={
            <button
              type="button"
              className={checkoutButtonClass}
              disabled={loadingPlan !== null}
              onClick={() => startCheckout('growth')}
            >
              {loadingPlan === 'growth' ? 'Opening checkout...' : 'Subscribe'}
            </button>
          }
        />
        <PricingCard
          name={plans.scale.label}
          price={plans.scale.priceLabel}
          note="For multi-store and custom needs"
          features={['Higher AI usage', 'More stores', 'Custom onboarding', 'Custom integrations', 'Dedicated support']}
          action={
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[#d7cab9] bg-white px-4 py-3 text-sm font-semibold text-[#171411] transition hover:bg-[#fbf7f0]"
            >
              Contact us
            </Link>
          }
        />
      </div>
      {error ? <p className="mt-4 text-center text-sm font-medium text-red-700">{error}</p> : null}
    </>
  )
}
