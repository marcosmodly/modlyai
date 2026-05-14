'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type BillingCheckoutStatusProps = {
  checkoutCompleted: boolean
  checkoutSessionId?: string
  subscriptionPlan?: string
  subscriptionStatus?: string
  syncFailed?: boolean
}

function hasActivePaidSubscription(plan?: string, status?: string) {
  const normalizedPlan = String(plan || '').toLowerCase()
  const normalizedStatus = String(status || '').toLowerCase()
  return (normalizedPlan === 'starter' || normalizedPlan === 'growth') && normalizedStatus === 'active'
}

export default function BillingCheckoutStatus({
  checkoutCompleted,
  checkoutSessionId,
  subscriptionPlan,
  subscriptionStatus,
  syncFailed,
}: BillingCheckoutStatusProps) {
  const router = useRouter()
  const [timedOut, setTimedOut] = useState(false)
  const activePaidSubscription = hasActivePaidSubscription(subscriptionPlan, subscriptionStatus)
  const storageKey = useMemo(
    () => `modly-billing-checkout-start:${checkoutSessionId || 'latest'}`,
    [checkoutSessionId]
  )

  useEffect(() => {
    if (!checkoutCompleted || activePaidSubscription || syncFailed) return

    const existingStart = Number(window.sessionStorage.getItem(storageKey))
    const startTime = Number.isFinite(existingStart) && existingStart > 0 ? existingStart : Date.now()
    window.sessionStorage.setItem(storageKey, String(startTime))

    const tick = () => {
      if (Date.now() - startTime >= 10000) {
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
  }, [activePaidSubscription, checkoutCompleted, router, storageKey, syncFailed])

  useEffect(() => {
    if (!checkoutCompleted || !activePaidSubscription) return
    window.sessionStorage.removeItem(storageKey)
  }, [activePaidSubscription, checkoutCompleted, storageKey])

  if (!checkoutCompleted) return null

  if (activePaidSubscription) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-medium text-emerald-900">
        Payment completed. Billing status updated.
      </section>
    )
  }

  if (syncFailed) {
    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
        Payment completed, but billing status has not updated yet. Check webhook logs.
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-medium text-emerald-900">
      {timedOut
        ? 'Payment completed, but billing status has not updated yet. Check webhook logs.'
        : 'Payment completed. Updating your billing status...'}
    </section>
  )
}
