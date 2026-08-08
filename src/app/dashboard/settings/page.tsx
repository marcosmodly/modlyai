import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NoStoreState from '@/components/dashboard/NoStoreState'
import WhiteLabelSettingsForm from '@/components/dashboard/WhiteLabelSettingsForm'
import StoreSettingsForm from '@/components/dashboard/StoreSettingsForm'
import AccountSettingsForm from '@/components/dashboard/AccountSettingsForm'
import ActiveSessionsList from '@/components/dashboard/ActiveSessionsList'
import DeleteAccountSection from '@/components/dashboard/DeleteAccountSection'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import SettingsTabs, { type SettingsTabId } from './SettingsTabs'

// Widget/Store both need a real store to save against - shown only in the
// two !store branches below, where NoStoreState (rendered flat below the
// tabs) is already the actionable surface for fixing that.
const needsStore = (
  <p className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
    Set up your ModlyAI store to configure this section.
  </p>
)

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const userResult = await adminDb.query({
    users: {
      $: { where: { id: session.user.id } },
    },
  })
  const currentUser = userResult.users?.[0]

  const accountPanel = (
    <AccountSettingsForm
      initialName={currentUser?.name || ''}
      initialEmail={currentUser?.email || session.user.email || ''}
      initialAvatarUrl={currentUser?.avatarUrl || ''}
      initialControlPanelAvatarUrl={currentUser?.controlPanelAvatarUrl || ''}
    />
  )

  const securityPanel = (
    <div className="space-y-6">
      <ActiveSessionsList />
      <DeleteAccountSection />
    </div>
  )

  if (!session.user.storeId) {
    console.error('[no-store] user has no store', { userId: session.user.id, page: 'Settings' })
    const tabPanels: Record<SettingsTabId, React.ReactNode> = {
      account: accountPanel,
      widget: needsStore,
      store: needsStore,
      security: securityPanel,
    }
    return (
      <div className="space-y-6">
        <SettingsTabs panels={tabPanels} />
        <NoStoreState title="Settings" />
      </div>
    )
  }

  const result = await adminDb.query({
    stores: {
      $: { where: { id: session.user.storeId } },
      users: {},
    },
  })

  const store = result.stores[0]

  if (!store) {
    console.error('[no-store] user has no store', { userId: session.user.id, page: 'Settings' })
    const tabPanels: Record<SettingsTabId, React.ReactNode> = {
      account: accountPanel,
      widget: needsStore,
      store: needsStore,
      security: securityPanel,
    }
    return (
      <div className="space-y-6">
        <SettingsTabs panels={tabPanels} />
        <NoStoreState title="Settings" />
      </div>
    )
  }

  const tabPanels: Record<SettingsTabId, React.ReactNode> = {
    account: accountPanel,
    store: (
      <StoreSettingsForm
        store={{
          id: store.id,
          name: store.name,
          storeUrl: store.storeUrl,
          url: store.url,
          productUrlTemplate: store.productUrlTemplate,
          supportEmail: store.supportEmail,
          quoteEmail: store.quoteEmail,
        }}
        fallbackStoreName={session.user.storeName}
      />
    ),
    widget: (
      <WhiteLabelSettingsForm
        store={{
          id: store.id,
          widgetTitle: store.widgetTitle,
          primaryColor: store.primaryColor,
          titleColor: store.titleColor,
          messageTextColor: store.messageTextColor,
          widgetFontFamily: store.widgetFontFamily,
          widgetButtonStyle: store.widgetButtonStyle,
          widgetButtonPosition: store.widgetButtonPosition,
          widgetLogoUrl: store.widgetLogoUrl,
          welcomeMessage: store.welcomeMessage,
          enableViewInCatalog: store.enableViewInCatalog,
          enableCustomize: store.enableCustomize,
          enableRequestQuote: store.enableRequestQuote,
          enabledActions: store.enabledActions,
        }}
      />
    ),
    security: securityPanel,
  }

  return <SettingsTabs panels={tabPanels} />
}
