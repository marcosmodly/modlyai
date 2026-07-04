import { CheckCircle2, Circle, Package, Sparkles, TrendingUp, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { normalizeStorePublicIdentity } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

type AnalyticsEvent = {
  id: string
  type?: string
  metadata?: Record<string, unknown>
  createdAt?: string
}

const sessionEventTypes = new Set([
  'widget_opened',
  'chat_started',
  'message_sent',
  'room_analyzed',
  'quote_requested',
])

const assistedActionTypes = new Set(['view_in_catalog_clicked', 'quote_requested'])

const eventLabels: Record<string, string> = {
  widget_opened: 'Widget opened',
  chat_started: 'Chat started',
  message_sent: 'Message sent',
  product_recommended: 'Product recommended',
  view_in_catalog_clicked: 'Product viewed in catalog',
  customize_clicked: 'Customizer opened',
  quote_started: 'Quote started',
  quote_requested: 'Quote requested',
  room_planner_opened: 'Room planner opened',
  room_analyzed: 'Room analyzed',
  pdf_exported: 'PDF exported',
  configuration_saved: 'Configuration saved',
}

function getSessionId(event: AnalyticsEvent) {
  const value = event.metadata?.sessionId
  return typeof value === 'string' && value.trim() ? value : null
}

function getEventLabel(type?: string) {
  return type ? eventLabels[type] ?? type.replace(/_/g, ' ') : 'Store activity'
}

function getProductName(event: AnalyticsEvent) {
  const value = event.metadata?.productName
  return typeof value === 'string' && value.trim() ? value : null
}

function readObject(value: unknown): Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, any>) : {}
}

function externalUrl(value: unknown) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return ''
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (session.user.emailVerified !== true) {
    const email = session.user.email ?? ''
    redirect(`/auth/verify-email?email=${encodeURIComponent(email)}`)
  }

  const isDeveloper = false

  if (!session.user.storeId) {
    return <NoStoreState title="Dashboard" />
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

  let store = result.stores[0] as any
  if (store) {
    store = await normalizeStorePublicIdentity(store)
  }
  const events = [...((result.events ?? []) as AnalyticsEvent[])].sort((a, b) => {
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  })
  const productsSynced = result.products.length
  const storeUrl = externalUrl(store?.storeUrl) || externalUrl(store?.url)
  const credentials = readObject(store?.credentials)
  const shopifyCredentials = readObject(credentials.shopify)
  const shopifyConnected = Boolean(
    store?.shopifyConnectedAt ||
      store?.shopifyAccessToken ||
      shopifyCredentials.connectedAt ||
      shopifyCredentials.accessToken
  )
  const aiSessions = new Set(
    events
      .filter((event) => event.type && sessionEventTypes.has(event.type))
      .map(getSessionId)
      .filter(Boolean)
  ).size
  const assistedActions = events.filter((event) => event.type && assistedActionTypes.has(event.type)).length
  const conversionRate = aiSessions > 0 ? `${((assistedActions / aiSessions) * 100).toFixed(1)}%` : 'Coming soon'
  const recentEvents = events.slice(0, 8)
  const onboardingItems = [
    {
      title: 'Add your store details',
      href: '/dashboard/settings',
      complete: Boolean(storeUrl),
      action: 'Open settings',
    },
    {
      title: 'Upload products with CSV or connect Shopify',
      href: productsSynced > 0 ? '/dashboard/products' : '/dashboard/integrations',
      complete: productsSynced > 0 || shopifyConnected,
      action: productsSynced > 0 ? 'View products' : 'Import products',
    },
    {
      title: 'Install the widget snippet',
      href: '/dashboard/integrations',
      complete: true,
      action: 'Get snippet',
    },
    {
      title: 'Test your live widget',
      href: storeUrl || '/dashboard/integrations',
      complete: false,
      action: storeUrl ? 'Open website' : 'Set store URL',
      external: Boolean(storeUrl),
    },
  ]

  const stats = [
    {
      name: 'Products Synced',
      value: String(productsSynced),
      note: 'Real products currently linked to your InstantDB store account.',
      icon: Package,
      accent: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'AI Sessions',
      value: String(aiSessions),
      note: aiSessions > 0 ? 'Unique widget sessions with shopper activity.' : 'Waiting for widget traffic.',
      icon: Users,
      accent: 'bg-stone-900 text-amber-300',
    },
    {
      name: 'Conversion Rate',
      value: conversionRate,
      note: aiSessions > 0 ? 'Assisted action rate from catalog views and quote requests.' : 'Waiting for widget traffic.',
      icon: Sparkles,
      accent: 'bg-emerald-100 text-emerald-700',
    },
    {
      name: 'Revenue Impact',
      value: 'Coming soon',
      note: 'Revenue attribution requires checkout/order tracking.',
      icon: TrendingUp,
      accent: 'bg-amber-100 text-amber-700',
    },
  ]

  return (
    <div className="space-y-8">
      {isDeveloper && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 font-mono text-xs text-green-400">
          🛠️ Developer mode — hello@modlyai.tech
          <span className="text-gray-500">
            | Real users will see onboarding flow
          </span>
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-[linear-gradient(135deg,#fefaf3_0%,#ffffff_36%,#eef4ff_100%)] p-8 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(180,143,93,0.16),transparent_40%)]" />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
              <Sparkles className="h-3.5 w-3.5 text-blue-700" />
              Account overview
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
              Welcome back, {session.user.storeName || session.user.email}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              This dashboard is now scoped to your store account, so every stat and activity item below is filtered to your own `storeId`.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Widget setup</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950">Install your widget</h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Ready
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-stone-600">
            Copy your install snippet from Integrations to add ModlyAI to your storefront.
          </p>

          <div className="mt-6">
            <Link
              href="/dashboard/integrations"
              className="inline-flex items-center justify-center rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Get snippet
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">Get started with ModlyAI</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Complete these steps to launch your AI shopping assistant.
            </p>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
            You can update these anytime from your dashboard.
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {onboardingItems.map((item) => {
            const Icon = item.complete ? CheckCircle2 : Circle
            return (
              <div key={item.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-5 w-5 ${item.complete ? 'text-emerald-600' : 'text-stone-300'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-stone-950">{item.title}</p>
                    <p className="mt-1 text-xs font-medium text-stone-500">
                      {item.complete ? 'Complete' : 'Recommended next step'}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    {item.action}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-stone-500">{stat.name}</p>
                <p className="mt-4 text-4xl font-bold tracking-tight text-stone-950">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.accent}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-stone-600">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Recent Store Activity</h2>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            {recentEvents.length} recent events
          </span>
        </div>

        <div className="mt-6 max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {recentEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
              No events recorded for this store yet.
            </div>
          ) : (
            recentEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{getEventLabel(event.type)}</p>
                    {getProductName(event) && (
                      <p className="mt-1 text-xs text-stone-600">{getProductName(event)}</p>
                    )}
                    <p className="mt-1 text-xs text-stone-500">
                      {event.createdAt ? new Date(event.createdAt).toLocaleString() : 'No timestamp'}
                    </p>
                  </div>
                  {event.type && (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-500">
                      {event.type}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
