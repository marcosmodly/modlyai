import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import BillingCard from '@/components/dashboard/BillingCard'
import NoStoreState from '@/components/dashboard/NoStoreState'
import WhiteLabelSettingsForm from '@/components/dashboard/WhiteLabelSettingsForm'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (!session.user.storeId) {
    return <NoStoreState title="Settings" />
  }

  const result = await adminDb.query({
    stores: {
      $: { where: { id: session.user.storeId } },
      user: {},
    },
    products: {
      $: { where: { storeId: session.user.storeId } },
    },
  })

  const store = result.stores[0]

  if (!store) {
    return <NoStoreState title="Settings" />
  }

  return (
    <div className="space-y-6">
      <BillingCard
        store={{
          subscriptionStatus: store.subscriptionStatus,
          subscriptionPlan: store.subscriptionPlan,
          trialEndsAt: store.trialEndsAt,
          aiChatsUsed: store.aiChatsUsed,
          roomPlannerAnalysesUsed: store.roomPlannerAnalysesUsed,
          productCount: result.products?.length ?? store.productCount ?? 0,
        }}
      />
      <WhiteLabelSettingsForm
        store={{
          id: store.id,
          name: store.name,
          storeUrl: store.storeUrl,
          url: store.url,
          supportEmail: store.supportEmail,
          widgetTitle: store.widgetTitle,
          primaryColor: store.primaryColor,
          welcomeMessage: store.welcomeMessage,
          enableViewInCatalog: store.enableViewInCatalog,
          enableCustomize: store.enableCustomize,
          enableRequestQuote: store.enableRequestQuote,
          enabledActions: store.enabledActions,
          quoteEmail: store.quoteEmail,
          apiKey: store.apiKey,
        }}
        fallbackApiKey={session.user.apiKey}
        fallbackStoreName={session.user.storeName}
      />
    </div>
  )
}
