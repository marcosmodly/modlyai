import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import IntegrationsClient from '@/components/dashboard/IntegrationsClient'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { createWidgetInstallSnippet } from '@/lib/widget-install-snippet'

function readCredentials(value: unknown): Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, any>) : {}
}

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams?: { shopify?: string; message?: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (!session.user.storeId) {
    return <NoStoreState title="Integrations" />
  }

  const storeId = session.user.storeId
  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
    products: {
      $: { where: { storeId } },
    },
    events: {
      $: { where: { storeId } },
    },
  })
  const store = result.stores[0]

  if (!store) {
    return <NoStoreState title="Integrations" />
  }

  const productCount = result.products?.length ?? 0
  const credentials = readCredentials(store.credentials)
  const shopifyCredentials = readCredentials(credentials.shopify)
  const shopifyStoreDomain =
    typeof shopifyCredentials.storeDomain === 'string' ? shopifyCredentials.storeDomain : ''
  const shopifyConnectedAt =
    typeof shopifyCredentials.connectedAt === 'string' ? shopifyCredentials.connectedAt : ''
  const shopifyLastSyncedAt =
    typeof shopifyCredentials.lastSyncedAt === 'string' ? shopifyCredentials.lastSyncedAt : ''
  const hasShopifyAccessToken = Boolean(shopifyCredentials.accessToken)
  const syncCount =
    result.events?.filter((event: any) => event.type === 'catalog_sync' || event.type === 'csv_upload').length ?? 0
  const installSnippet = createWidgetInstallSnippet({
    storeId,
    widgetId: storeId,
  })

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Integrations</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">Connect Your Store</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              Integration details here are tied to `{session.user.storeName || session.user.email}` only.
            </p>
          </div>
          <Link
            href="/dashboard/widget-config"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Widget config route
          </Link>
        </div>
      </section>

      <IntegrationsClient
        store={{
          id: storeId,
          apiKey: session.user.apiKey,
          url: store.url ? String(store.url) : '',
          shopifyStoreDomain,
          shopifyConnectedAt,
          shopifyLastSyncedAt,
          hasShopifyAccessToken,
        }}
        productCount={productCount}
        syncCount={syncCount}
        installSnippet={installSnippet || ''}
        initialShopifyStatus={searchParams?.shopify}
        initialMessage={searchParams?.message ?? undefined}
      />
    </div>
  )
}
