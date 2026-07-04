import { ArrowUpRight, Clock3, MousePointerClick, Sofa, Target } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
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

function formatEventTime(value?: string) {
  return value ? new Date(value).toLocaleString() : 'No timestamp'
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (!session.user.storeId) {
    return <NoStoreState title="Analytics" />
  }

  const storeId = session.user.storeId

  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
    events: {
      $: { where: { storeId } },
    },
  })

  const store = result.stores[0]
  const recentEvents = [...((result.events ?? []) as AnalyticsEvent[])].sort((a, b) => {
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
  })
  const guidedSessions = new Set(
    recentEvents
      .filter((event) => event.type && sessionEventTypes.has(event.type))
      .map(getSessionId)
      .filter(Boolean)
  ).size
  const quoteRequests = recentEvents.filter((event) => event.type === 'quote_requested').length
  const viewInCatalogClicks = recentEvents.filter((event) => event.type === 'view_in_catalog_clicked').length
  const customizeClicks = recentEvents.filter((event) => event.type === 'customize_clicked').length
  const roomAnalyses = recentEvents.filter((event) => event.type === 'room_analyzed').length
  const conversions = quoteRequests + viewInCatalogClicks
  const latestEvent = recentEvents[0]
  const recentConversion = recentEvents.find(
    (event) => event.type === 'quote_requested' || event.type === 'view_in_catalog_clicked'
  )

  const conversionRate = guidedSessions > 0 ? ((conversions / guidedSessions) * 100).toFixed(1) : '0.0'

  const quoteEvents = recentEvents.filter((event) => event.type === 'quote_requested')
  const quotesByProduct = new Map<string, number>()
  quoteEvents.forEach((event) => {
    const name = getProductName(event) || 'Unspecified product'
    quotesByProduct.set(name, (quotesByProduct.get(name) ?? 0) + 1)
  })
  const topQuotedProducts = [...quotesByProduct.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)

  const metricCards = [
    { label: 'Guided sessions', value: String(guidedSessions), delta: `${conversionRate}% conv.`, icon: MousePointerClick },
    { label: 'Assisted conversions', value: String(conversions), delta: `${conversions} total`, icon: Target },
    {
      label: 'Latest session',
      value: latestEvent ? new Date(latestEvent.createdAt ?? 0).toLocaleDateString() : 'No data',
      delta: latestEvent ? new Date(latestEvent.createdAt ?? 0).toLocaleTimeString() : 'Waiting for traffic',
      icon: Clock3,
    },
    { label: 'Store', value: store?.name || session.user.storeName || 'Unassigned', delta: 'Current account scope', icon: Sofa },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Analytics</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">Store Performance</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              Every metric on this page is filtered to `{session.user.storeName || session.user.email}` using your authenticated `storeId`.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {conversionRate}% conversion rate
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => (
            <div key={card.label} className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between">
                <card.icon className="h-5 w-5 text-blue-700" />
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {card.delta}
                </span>
              </div>
              <div className="mt-5 text-sm text-stone-500">{card.label}</div>
              <div className="mt-2 text-3xl font-bold tracking-tight text-stone-950">{card.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Recent Event Timeline</h2>
          <div className="mt-6 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {recentEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 text-sm text-stone-600">
                <p className="font-semibold text-stone-900">
                  Analytics will appear after your widget starts receiving traffic.
                </p>
                <div className="mt-4 grid gap-2 text-stone-600">
                  <div>Install widget snippet</div>
                  <div>Connect catalog</div>
                  <div>Start receiving shopper interactions</div>
                </div>
              </div>
            ) : (
              recentEvents.slice(0, 12).map((event) => (
                <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-stone-900">{getEventLabel(event.type)}</div>
                      {getProductName(event) && (
                        <p className="mt-1 text-sm text-stone-600">{getProductName(event)}</p>
                      )}
                      <p className="mt-2 text-sm leading-6 text-stone-700">{formatEventTime(event.createdAt)}</p>
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
        </div>

        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Conversion Snapshot</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Sessions</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{guidedSessions}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Quote requests</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{quoteRequests}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">View in catalog clicks</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{viewInCatalogClicks}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Customize clicks</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{customizeClicks}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Room analyses</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{roomAnalyses}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Most recent assisted action</div>
              <p className="mt-2 text-sm text-stone-700">
                {recentConversion
                  ? `${getEventLabel(recentConversion.type)}${getProductName(recentConversion) ? ` - ${getProductName(recentConversion)}` : ''} - ${formatEventTime(recentConversion.createdAt)}`
                  : 'No assisted action yet'}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-stone-950">Quote Requests by Product</h2>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            {quoteEvents.length} total {quoteEvents.length === 1 ? 'quote' : 'quotes'}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Which products are driving buying intent. This is a proxy for revenue impact until order data is connected
          for full dollar-value attribution.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Top quoted products</h3>
            <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
              {topQuotedProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
                  No quote requests yet.
                </div>
              ) : (
                topQuotedProducts.map(([name, count]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-stone-900">{name}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-600">
                      {count} {count === 1 ? 'quote' : 'quotes'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Recent quote requests</h3>
            <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
              {quoteEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
                  No quote requests yet.
                </div>
              ) : (
                quoteEvents.slice(0, 20).map((event) => (
                  <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <p className="text-sm font-semibold text-stone-900">{getProductName(event) || 'Unspecified product'}</p>
                    <p className="mt-1 text-xs text-stone-500">{formatEventTime(event.createdAt)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
