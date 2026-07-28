import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { notifyStoreUsers } from '@/lib/notifications'

// Restricted to a small allowlist of admin emails - set ADMIN_EMAILS in your
// env as a comma-separated list (e.g. "hello@modlyai.tech"). Fails closed:
// if the env var isn't set, nobody can use this, rather than defaulting open.
function isAdminEmail(email?: string | null) {
  const allowlist = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)

  if (allowlist.length === 0) return false
  return allowlist.includes(String(email || '').trim().toLowerCase())
}

// Manually grants a store paid access on the 'scale' (custom) plan for a
// negotiated deal that isn't going through Paddle checkout. Sets a real
// currentPeriodEnd so the store is automatically picked up by the same daily
// billing-reminder cron used for Paddle-billed stores (see
// /api/cron/billing-reminders) - custom clients get the same renewal/
// payment-due visibility without any extra code path.
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdminEmail(session?.user?.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { storeId, periodEndIso, note } = await req.json()

    if (typeof storeId !== 'string' || !storeId.trim()) {
      return NextResponse.json({ error: 'storeId is required' }, { status: 400 })
    }

    const periodEnd = new Date(periodEndIso)
    if (!periodEndIso || Number.isNaN(periodEnd.getTime())) {
      return NextResponse.json({ error: 'periodEndIso must be a valid date' }, { status: 400 })
    }

    if (periodEnd.getTime() <= Date.now()) {
      return NextResponse.json({ error: 'periodEndIso must be in the future' }, { status: 400 })
    }

    const result = await adminDb.query({
      stores: { $: { where: { id: storeId } } },
    })
    const store = result.stores?.[0]

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    await adminDb.transact([
      adminDb.tx.stores[storeId].update({
        subscriptionPlan: 'scale',
        subscriptionStatus: 'active',
        currentPeriodEnd: periodEnd.toISOString(),
        cancelAtPeriodEnd: false,
        customPlanNote: typeof note === 'string' ? note.trim() : store.customPlanNote ?? null,
        updatedAt: new Date().toISOString(),
      }),
    ])

    notifyStoreUsers({
      storeId,
      type: 'billing_custom_plan_activated',
      title: 'Custom plan activated',
      message: `Your custom plan is now active, renewing on ${periodEnd.toLocaleDateString()}.`,
      link: '/dashboard/billing',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Grant custom access] Failed:', error)
    return NextResponse.json({ error: 'Unable to grant custom access.' }, { status: 500 })
  }
}
