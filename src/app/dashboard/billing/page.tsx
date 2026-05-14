import { getServerSession } from 'next-auth'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import BillingCard from '@/components/dashboard/BillingCard'
import BillingCheckoutStatus from '@/components/dashboard/BillingCheckoutStatus'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { syncCheckoutSessionToCurrentStore } from '@/lib/billing/post-checkout-sync'
import { syncMissingCurrentPeriodEndForBillingStore } from '@/lib/billing/sync-current-period-end'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BillingPage({
  searchParams,
}: {
  searchParams?: { session_id?: string; billing?: string; portal_return?: string }
}) {
  noStore()

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const checkoutCompleted = searchParams?.billing === 'success' || Boolean(searchParams?.session_id)
  const currentStore = await getCurrentStoreForUser(session.user)
  const storeId = currentStore?.id ? String(currentStore.id) : ''

  if (!currentStore || !storeId) {
    return <NoStoreState title="Billing" />
  }

  const portalReturn = searchParams?.portal_return === 'true'
  let checkoutSyncFailed = false
  let store = currentStore

  if (checkoutCompleted && searchParams?.session_id) {
    const checkoutSync = await syncCheckoutSessionToCurrentStore({
      sessionId: searchParams.session_id,
      currentStore,
    })
    checkoutSyncFailed = checkoutSync.failed

    if (checkoutSync.readBack) {
      store = { ...store, ...checkoutSync.readBack }
    }
  }

  const result = await adminDb.query({
    products: {
      $: { where: { storeId } },
    },
  })

  store = await syncMissingCurrentPeriodEndForBillingStore(store, storeId, {
    force: portalReturn,
  })

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[Billing currentPeriodEnd sync result]', {
      storeId: store.id,
      subscriptionPlan: store.subscriptionPlan,
      subscriptionStatus: store.subscriptionStatus,
      stripeSubscriptionId: store.stripeSubscriptionId,
      currentPeriodEnd: store.currentPeriodEnd,
      cancelAtPeriodEnd: store.cancelAtPeriodEnd,
      portalReturn,
    })
  }

  return (
    <div className="space-y-6">
      <BillingCheckoutStatus
        checkoutCompleted={checkoutCompleted}
        checkoutSessionId={searchParams?.session_id}
        subscriptionPlan={store.subscriptionPlan ?? undefined}
        subscriptionStatus={store.subscriptionStatus ?? undefined}
        syncFailed={checkoutSyncFailed}
      />
      <BillingCard
        store={{
          id: store.id,
          stripeCustomerId: store.stripeCustomerId ?? undefined,
          stripeSubscriptionId: store.stripeSubscriptionId ?? undefined,
          subscriptionStatus: store.subscriptionStatus ?? undefined,
          subscriptionPlan: store.subscriptionPlan ?? undefined,
          currentPeriodEnd: store.currentPeriodEnd ?? undefined,
          cancelAtPeriodEnd: store.cancelAtPeriodEnd ?? undefined,
          trialStartedAt: store.trialStartedAt ?? undefined,
          trialEndsAt: store.trialEndsAt ?? undefined,
          createdAt: store.createdAt ?? undefined,
          aiChatsUsed: store.aiChatsUsed ?? undefined,
          roomPlannerAnalysesUsed: store.roomPlannerAnalysesUsed ?? undefined,
          productCount: result.products?.length ?? store.productCount ?? 0,
        }}
      />
    </div>
  )
}
