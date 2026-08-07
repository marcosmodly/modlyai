'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BILLING_CHECKOUT_START_KEY } from '@/lib/billing/checkout-status-storage'

type CheckoutStatus = 'success' | 'cancelled' | 'error' | undefined

type BillingCheckoutStatusProps = {
  status: CheckoutStatus
  subscriptionPlan?: string
  subscriptionStatus?: string
}

function hasConfirmedSubscription(plan?: string, status?: string) {
  const normalizedPlan = String(plan || '').toLowerCase()
  const normalizedStatus = String(status || '').toLowerCase()
  return (
    (normalizedPlan === 'starter' || normalizedPlan === 'growth') &&
    (normalizedStatus === 'active' || normalizedStatus === 'trialing')
  )
}

const toneClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  pending: 'border-amber-200 bg-amber-50 text-amber-900',
  error: 'border-red-200 bg-red-50 text-red-900',
} as const

export default function BillingCheckoutStatus({
  status,
  subscriptionPlan,
  subscriptionStatus,
}: BillingCheckoutStatusProps) {
  const router = useRouter()
  const [timedOut, setTimedOut] = useState(false)
  const confirmedSubscription = hasConfirmedSubscription(subscriptionPlan, subscriptionStatus)
  const isPendingConfirmation = status === 'success' && !confirmedSubscription

  useEffect(() => {
    if (!isPendingConfirmation) return

    const existingStart = Number(window.sessionStorage.getItem(BILLING_CHECKOUT_START_KEY))
    const startTime = Number.isFinite(existingStart) && existingStart > 0 ? existingStart : Date.now()
    window.sessionStorage.setItem(BILLING_CHECKOUT_START_KEY, String(startTime))

    const tick = () => {
      if (Date.now() - startTime >= 30000) {
        setTimedOut(true)
        return
      }

      router.refresh()
    }

    const timeoutId = window.setTimeout(tick, 1500)
    const intervalId = window.setInterval(tick, 2500)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [isPendingConfirmation, router])

  useEffect(() => {
    if (status === 'success' && confirmedSubscription) {
      window.sessionStorage.removeItem(BILLING_CHECKOUT_START_KEY)
    }
  }, [confirmedSubscription, status])

  if (!status) return null

  if (status === 'success' && confirmedSubscription) {
    return (
      <section role="status" aria-live="polite" className={`rounded-2xl border p-5 text-sm font-medium ${toneClasses.success}`}>
        Payment completed. Billing status updated.
      </section>
    )
  }

  if (status === 'success') {
    if (timedOut) {
      return (
        <section role="status" aria-live="polite" className={`rounded-2xl border p-5 text-sm font-medium ${toneClasses.pending}`}>
          <p>
            We&apos;re still confirming your payment. This usually takes under a minute — email{' '}
            <a href="mailto:billing@modlyai.tech" className="underline">
              billing@modlyai.tech
            </a>{' '}
            if it doesn&apos;t update.
          </p>
          <button
            type="button"
            onClick={() => router.refresh()}
            className="mt-3 inline-flex items-center rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
          >
            Check again
          </button>
        </section>
      )
    }

    return (
      <section role="status" aria-live="polite" className={`rounded-2xl border p-5 text-sm font-medium ${toneClasses.pending}`}>
        Payment completed. Updating your billing status...
      </section>
    )
  }

  if (status === 'cancelled') {
    return (
      <section role="status" aria-live="polite" className={`rounded-2xl border p-5 text-sm font-medium ${toneClasses.pending}`}>
        Checkout was cancelled. You have not been charged - pick a plan below whenever you&apos;re ready.
      </section>
    )
  }

  return (
    <section role="status" aria-live="polite" className={`rounded-2xl border p-5 text-sm font-medium ${toneClasses.error}`}>
      Something went wrong starting checkout. Try again, or email{' '}
      <a href="mailto:billing@modlyai.tech" className="underline">
        billing@modlyai.tech
      </a>{' '}
      if it keeps happening.
    </section>
  )
}
