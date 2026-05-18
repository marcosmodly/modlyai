import { getServerSession } from 'next-auth'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import BillingCard from '@/components/dashboard/BillingCard'
import BillingCheckoutStatus from '@/components/dashboard/BillingCheckoutStatus'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { syncMissingCurrentPeriodEndForBillingStore } from '@/lib/billing/sync-current-period-end'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BillingPage({
  searchParams,
}: {
  searchParams?: { billing?: string }
}) {
  noStore()

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const checkoutCompleted = searchParams?.billing === 'success'
  const currentStore = await getCurrentStoreForUser(session.user)
  const storeId = currentStore?.id ? String(currentStore.id) : ''

  if (!currentStore || !storeId) {
    return <NoStoreState title="Billing" />
  }

  let store = currentStore

  const result = await adminDb.query({
    products: {
      $: { where: { storeId } },
    },
  })

  store = await syncMissingCurrentPeriodEndForBillingStore(store, storeId, {
    force: checkoutCompleted,
  })

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[Billing currentPeriodEnd sync result]', {
      storeId: store.id,
      subscriptionPlan: store.subscriptionPlan,
      subscriptionStatus: store.subscriptionStatus,
      paddleSubscriptionId: store.paddleSubscriptionId,
      currentPeriodEnd: store.currentPeriodEnd,
      cancelAtPeriodEnd: store.cancelAtPeriodEnd,
      checkoutCompleted,
    })
  }

  return (
    <div className="space-y-6">
      <BillingCheckoutStatus
        checkoutCompleted={checkoutCompleted}
        subscriptionPlan={store.subscriptionPlan ?? undefined}
        subscriptionStatus={store.subscriptionStatus ?? undefined}
      />
      <BillingCard
        userEmail={session.user.email}
        store={{
          id: store.id,
          paddleCustomerId: store.paddleCustomerId ?? undefined,
          paddleSubscriptionId: store.paddleSubscriptionId ?? undefined,
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
