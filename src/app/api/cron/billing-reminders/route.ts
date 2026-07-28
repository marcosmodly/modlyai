import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/instant-admin'
import { notifyStoreUsers } from '@/lib/notifications'
import { isPaidPlan } from '@/lib/plans'

export const dynamic = 'force-dynamic'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const PAYMENT_GRACE_PERIOD_DAYS = 7

type StoreRow = {
  id: string
  name?: string | null
  subscriptionPlan?: string | null
  subscriptionStatus?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
  trialEndsAt?: string | null
}

function daysUntil(targetMs: number, nowMs: number) {
  return Math.ceil((targetMs - nowMs) / MS_PER_DAY)
}

function isCanceling(value: unknown) {
  return value === true || value === 'true'
}

// Runs once daily (see vercel.json). Checks every store's billing state and
// fires a notification for anything that's about to change - renewal,
// scheduled cancellation, a failed payment still in its grace period, or a
// trial about to end. The 7-day reminders only fire on the exact day the
// countdown hits that number, so a once-daily cron naturally never sends the
// same reminder twice. Payment-failed is the deliberate exception - it fires
// every day for the whole grace window, since that one's genuinely urgent.
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET || ''}`

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  let checked = 0
  let notified = 0

  try {
    const result = await adminDb.query({ stores: {} })
    const stores = (result.stores ?? []) as StoreRow[]

    for (const store of stores) {
      checked += 1
      const status = String(store.subscriptionStatus || '').trim().toLowerCase()
      const plan = store.subscriptionPlan
      const periodEndMs = store.currentPeriodEnd ? new Date(store.currentPeriodEnd).getTime() : null
      const trialEndsAtMs = store.trialEndsAt ? new Date(store.trialEndsAt).getTime() : null
      const cancelAtPeriodEnd = isCanceling(store.cancelAtPeriodEnd)

      // 1. Payment failed - fires daily throughout the grace period.
      if ((status === 'past_due' || status === 'unpaid') && periodEndMs !== null) {
        const graceEndsAtMs = periodEndMs + PAYMENT_GRACE_PERIOD_DAYS * MS_PER_DAY
        const daysLeftInGrace = daysUntil(graceEndsAtMs, now)

        if (daysLeftInGrace > 0) {
          notifyStoreUsers({
            storeId: store.id,
            type: 'billing_payment_failed',
            title: 'Payment failed',
            message: `Your last payment didn't go through. Update your payment method within ${daysLeftInGrace} day${daysLeftInGrace === 1 ? '' : 's'} to keep your access.`,
            link: '/dashboard/billing',
          })
          notified += 1
        }
        continue
      }

      // 2. Active paid plan - renewal or scheduled-cancellation reminder,
      // exactly 7 days out.
      if (isPaidPlan(plan) && status === 'active' && periodEndMs !== null) {
        const days = daysUntil(periodEndMs, now)
        const renewalDate = new Date(periodEndMs).toLocaleDateString()

        if (days === 7) {
          if (cancelAtPeriodEnd) {
            notifyStoreUsers({
              storeId: store.id,
              type: 'billing_cancellation_reminder',
              title: 'Your plan is ending soon',
              message: `Your plan is set to end on ${renewalDate} since auto-renew is off.`,
              link: '/dashboard/billing',
            })
          } else {
            notifyStoreUsers({
              storeId: store.id,
              type: 'billing_renewal_reminder',
              title: 'Upcoming renewal',
              message: `Your plan renews on ${renewalDate}.`,
              link: '/dashboard/billing',
            })
          }
          notified += 1
        }
        continue
      }

      // 3. Trial ending soon - 7 days before trialEndsAt, only for stores
      // not already on a paid plan.
      if (!isPaidPlan(plan) && trialEndsAtMs !== null) {
        const days = daysUntil(trialEndsAtMs, now)
        if (days === 7) {
          notifyStoreUsers({
            storeId: store.id,
            type: 'billing_trial_ending',
            title: 'Your trial is ending soon',
            message: `Your free trial ends on ${new Date(trialEndsAtMs).toLocaleDateString()}. Pick a plan to keep your widget live.`,
            link: '/dashboard/billing',
          })
          notified += 1
        }
      }
    }

    return NextResponse.json({ success: true, checked, notified })
  } catch (error) {
    console.error('[Billing reminders cron] Failed:', error)
    return NextResponse.json({ error: 'Failed to run billing reminders.' }, { status: 500 })
  }
}
