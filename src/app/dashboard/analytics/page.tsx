import { ArrowUpRight, Clock3, MousePointerClick, Target } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import AnalyticsRangeSelector from './AnalyticsRangeSelector'
import EventTimestamp from '@/components/dashboard/EventTimestamp'
import NoStoreState from '@/components/dashboard/NoStoreState'
import SessionExpiredState from '@/components/dashboard/SessionExpiredState'
import { authOptions } from '@/lib/auth-options'
import { getRangeLabel, getRangeStartMs, isAnalyticsRange, type AnalyticsRange } from '@/lib/analytics-range'
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

function eventTimeMs(event: AnalyticsEvent): number | null {
  if (!event.createdAt) return null
  const ms = new Date(event.createdAt).getTime()
  return Number.isNaN(ms) ? null : ms
}

// 0% conversion reads as healthy in an unconditional green pill, and a
// store with no traffic yet isn't "0%" - it's "no data". Both need their
// own treatment instead of always looking like good news.
function getConversionTone(guidedSessions: number, conversionRateNum: number): { label: string; className: string } {
  if (guidedSessions === 0) {
    return { label: 'No data yet', className: 'bg-stone-100 text-stone-500' }
  }
  if (conversionRateNum === 0) {
    return { label: '0% conversion rate', className: 'bg-amber-50 text-amber-700' }
  }
  return { label: `${conversionRateNum.toFixed(1)}% conversion rate`, className: 'bg-emerald-50 text-emerald-700' }
}

// A delta that just repeats the card's own value isn't a delta. This period
// vs the one immediately before it (same length) is - null previous means
// there's no prior period to compare against (All time is selected).
function getPeriodDelta(current: number, previous: number | null): { label: string; className: string } {
  if (previous === null) {
    return { label: 'All-time total', className: 'bg-stone-100 text-stone-600' }
  }
  if (previous === 0 && current === 0) {
    return { label: 'No change', className: 'bg-stone-100 text-stone-600' }
  }
  if (previous === 0) {
    return { label: 'New this period', className: 'bg-emerald-50 text-emerald-700' }
  }
  const change = Math.round(((current - previous) / previous) * 100)
  if (change === 0) {
    return { label: 'No change', className: 'bg-stone-100 text-stone-600' }
  }
  return {
    label: `${change > 0 ? '+' : ''}${change}% vs prior period`,
    className: change > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700',
  }
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: { range?: string }
}) {
  // Auth is enforced by src/middleware.ts before this ever renders, but that
  // only checks the JWT is present and well-formed - getServerSession also
  // re-validates against the DB (tokenVersion, per-device revocation) and
  // can still come back null for a token middleware let through. Render a
  // fallback instead of asserting non-null so that rarer case is a normal
  // page, not a crash.
  const session = await getServerSession(authOptions)
  if (!session) {
    return <SessionExpiredState title="Analytics" />
  }

  if (!session.user.storeId) {
    console.error('[no-store] user has no store', { userId: session.user.id, page: 'Analytics' })
    return <NoStoreState title="Analytics" />
  }

  const storeId = session.user.storeId
  const requestedRange = searchParams?.range
  const activeRange: AnalyticsRange = isAnalyticsRange(requestedRange) ? requestedRange : '30'

  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
    events: {
      $: { where: { storeId } },
    },
  })

  const store = result.stores[0]
  // events.createdAt isn't an indexed attribute (see src/lib/analytics-range.ts),
  // so the range is applied here in JS after the fetch rather than as a
  // $gte where clause.
  const allEvents = [...((result.events ?? []) as AnalyticsEvent[])].sort((a, b) => {
    return (eventTimeMs(b) ?? 0) - (eventTimeMs(a) ?? 0)
  })

  const now = Date.now()
  const rangeStartMs = getRangeStartMs(activeRange, now)
  const periodEvents =
    rangeStartMs === null
      ? allEvents
      : allEvents.filter((event) => {
          const t = eventTimeMs(event)
          return t !== null && t >= rangeStartMs
        })

  // Equal-length window immediately before the current one, for the
  // period-over-period delta below. No previous period exists for "all time".
  const previousPeriodEvents =
    rangeStartMs === null
      ? null
      : allEvents.filter((event) => {
          const t = eventTimeMs(event)
          return t !== null && t >= rangeStartMs - (now - rangeStartMs) && t < rangeStartMs
        })

  const guidedSessions = new Set(
    periodEvents
      .filter((event) => event.type && sessionEventTypes.has(event.type))
      .map(getSessionId)
      .filter(Boolean)
  ).size
  const quoteRequests = periodEvents.filter((event) => event.type === 'quote_requested').length
  const viewInCatalogClicks = periodEvents.filter((event) => event.type === 'view_in_catalog_clicked').length
  const customizeClicks = periodEvents.filter((event) => event.type === 'customize_clicked').length
  const roomAnalyses = periodEvents.filter((event) => event.type === 'room_analyzed').length
  const conversions = quoteRequests + viewInCatalogClicks
  const latestEvent = periodEvents[0]
  const recentConversion = periodEvents.find(
    (event) => event.type === 'quote_requested' || event.type === 'view_in_catalog_clicked'
  )

  const conversionRateNum = guidedSessions > 0 ? (conversions / guidedSessions) * 100 : 0
  const conversionTone = getConversionTone(guidedSessions, conversionRateNum)

  const previousConversions = previousPeriodEvents
    ? previousPeriodEvents.filter((event) => event.type && assistedActionTypes.has(event.type)).length
    : null
  const conversionsDelta = getPeriodDelta(conversions, previousConversions)

  const quoteEvents = periodEvents.filter((event) => event.type === 'quote_requested')
  const quotesByProduct = new Map<string, number>()
  quoteEvents.forEach((event) => {
    const name = getProductName(event) || 'Unspecified product'
    quotesByProduct.set(name, (quotesByProduct.get(name) ?? 0) + 1)
  })
  const topQuotedProducts = [...quotesByProduct.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)

  const metricCards = [
    {
      label: 'Guided sessions',
      value: guidedSessions.toLocaleString(),
      delta: conversionTone.label,
      deltaClassName: conversionTone.className,
      icon: MousePointerClick,
    },
    {
      label: 'Assisted conversions',
      value: conversions.toLocaleString(),
      delta: conversionsDelta.label,
      deltaClassName: conversionsDelta.className,
      icon: Target,
    },
    {
      label: 'Latest session',
      value: latestEvent ? <EventTimestamp createdAt={latestEvent.createdAt} /> : 'No data',
      delta: latestEvent ? getEventLabel(latestEvent.type) : 'Waiting for traffic',
      deltaClassName: 'bg-stone-100 text-stone-600',
      icon: Clock3,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Analytics</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">Store Performance</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              Showing activity from {getRangeLabel(activeRange).toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <AnalyticsRangeSelector activeRange={activeRange} />
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${conversionTone.className}`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {conversionTone.label}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metricCards.map((card) => (
            <div key={card.label} className="rounded-[28px] border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between">
                <card.icon className="h-5 w-5 text-blue-700" />
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${card.deltaClassName}`}>
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
          <h3 className="text-2xl font-bold tracking-tight text-stone-950">Recent Event Timeline</h3>
          <div className="mt-6 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {periodEvents.length === 0 ? (
              allEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 text-sm text-stone-600">
                  <p className="font-semibold text-stone-900">
                    Analytics will appear after your widget starts receiving traffic.
                  </p>
                  <ol className="mt-4 list-inside list-decimal space-y-2 text-stone-600">
                    <li>
                      <Link href="/dashboard/integrations" className="font-semibold text-blue-700 hover:underline">
                        Install widget snippet
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/products" className="font-semibold text-blue-700 hover:underline">
                        Connect catalog
                      </Link>
                    </li>
                    <li>Start receiving shopper interactions</li>
                  </ol>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-5 py-6 text-sm text-stone-600">
                  <p className="font-semibold text-stone-900">
                    No activity in {getRangeLabel(activeRange).toLowerCase()}.
                  </p>
                  <p className="mt-2 text-stone-600">Try a wider date range to see historical activity.</p>
                </div>
              )
            ) : (
              periodEvents.slice(0, 12).map((event) => (
                <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <div className="text-sm font-semibold text-stone-900">{getEventLabel(event.type)}</div>
                  {getProductName(event) && (
                    <p className="mt-1 text-sm text-stone-600">{getProductName(event)}</p>
                  )}
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <EventTimestamp createdAt={event.createdAt} />
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-stone-950">Conversion Snapshot</h3>
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
                {recentConversion ? (
                  <>
                    {getEventLabel(recentConversion.type)}
                    {getProductName(recentConversion) ? ` - ${getProductName(recentConversion)}` : ''}
                    {' - '}
                    <EventTimestamp createdAt={recentConversion.createdAt} />
                  </>
                ) : (
                  'No assisted action yet'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-stone-950">Quote Requests by Product</h3>
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Top quoted products</h4>
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Recent quote requests</h4>
            <div className="mt-3 max-h-[360px] space-y-2 overflow-y-auto pr-1">
              {quoteEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
                  No quote requests yet.
                </div>
              ) : (
                quoteEvents.slice(0, 20).map((event) => (
                  <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <p className="text-sm font-semibold text-stone-900">{getProductName(event) || 'Unspecified product'}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      <EventTimestamp createdAt={event.createdAt} />
                    </p>
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
