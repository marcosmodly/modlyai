'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AlertTriangle } from 'lucide-react'
import { getBillingAccess } from '@/lib/billing/access'
import { db } from '@/lib/instantdb'

export default function TrialExpiredBanner() {
  const { data: session } = useSession()
  const storeId = session?.user?.storeId
  const { data } = db.useQuery(
    storeId
      ? {
          stores: {
            $: { where: { id: storeId } },
          },
        }
      : null
  )
  const store = data?.stores?.[0]
  const access = getBillingAccess(store)

  if (!store || access.hasActiveAccess) return null

  const message =
    access.reason === 'trial_expired'
      ? 'Your free trial has ended. Upgrade to reactivate your widget.'
      : access.reason === 'subscription_inactive' || access.reason === 'subscription_missing_status'
        ? 'Your subscription has ended. Choose a plan to reactivate your widget.'
        : 'Your ModlyAI access has ended. Choose a plan to reactivate your widget.'

  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-700" />
          <p className="text-sm font-semibold">{message}</p>
        </div>
        <Link
          href="/dashboard/billing"
          className="inline-flex items-center justify-center rounded-lg bg-stone-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          View plans
        </Link>
      </div>
    </div>
  )
}
