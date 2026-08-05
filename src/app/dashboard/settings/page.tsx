import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NoStoreState from '@/components/dashboard/NoStoreState'
import WhiteLabelSettingsForm from '@/components/dashboard/WhiteLabelSettingsForm'
import AccountSettingsForm from '@/components/dashboard/AccountSettingsForm'
import ActiveSessionsList from '@/components/dashboard/ActiveSessionsList'
import DeleteAccountSection from '@/components/dashboard/DeleteAccountSection'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

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

  const accountSection = (
    <AccountSettingsForm
      initialName={currentUser?.name || ''}
      initialEmail={currentUser?.email || session.user.email || ''}
      initialAvatarUrl={currentUser?.avatarUrl || ''}
      initialControlPanelAvatarUrl={currentUser?.controlPanelAvatarUrl || ''}
    />
  )

  const sessionsSection = <ActiveSessionsList />
  const deleteSection = <DeleteAccountSection />

  if (!session.user.storeId) {
    return (
      <div className="space-y-6">
        {accountSection}
        {sessionsSection}
        <NoStoreState title="Settings" />
        {deleteSection}
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
    return (
      <div className="space-y-6">
        {accountSection}
        {sessionsSection}
        <NoStoreState title="Settings" />
        {deleteSection}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {accountSection}
      {sessionsSection}
      <WhiteLabelSettingsForm
        store={{
          id: store.id,
          name: store.name,
          storeUrl: store.storeUrl,
          url: store.url,
          productUrlTemplate: store.productUrlTemplate,
          supportEmail: store.supportEmail,
          widgetTitle: store.widgetTitle,
          primaryColor: store.primaryColor,
          titleColor: store.titleColor,
          messageTextColor: store.messageTextColor,
          widgetButtonStyle: store.widgetButtonStyle,
          widgetButtonPosition: store.widgetButtonPosition,
          widgetLogoUrl: store.widgetLogoUrl,
          welcomeMessage: store.welcomeMessage,
          enableViewInCatalog: store.enableViewInCatalog,
          enableCustomize: store.enableCustomize,
          enableRequestQuote: store.enableRequestQuote,
          enabledActions: store.enabledActions,
          quoteEmail: store.quoteEmail,
        }}
        fallbackStoreName={session.user.storeName}
      />
      {deleteSection}
    </div>
  )
}
