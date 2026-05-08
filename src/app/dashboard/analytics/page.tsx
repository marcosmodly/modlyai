import { ArrowUpRight, Clock3, MousePointerClick, Sofa, Target } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

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
      events: {},
    },
  })

  const store = result.stores[0]
  const recentEvents = [...(store?.events ?? [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  const guidedSessions = recentEvents.filter((event) => event.type === 'session_start').length
  const conversions = recentEvents.filter((event) => event.type === 'conversion').length
  const recentSession = recentEvents.find((event) => event.type === 'session_start')
  const recentConversion = recentEvents.find((event) => event.type === 'conversion')

  const conversionRate = guidedSessions > 0 ? ((conversions / guidedSessions) * 100).toFixed(1) : '0.0'

  const metricCards = [
    { label: 'Guided sessions', value: String(guidedSessions), delta: `${conversionRate}% conv.`, icon: MousePointerClick },
    { label: 'Assisted conversions', value: String(conversions), delta: `${conversions} total`, icon: Target },
    {
      label: 'Latest session',
      value: recentSession ? new Date(recentSession.createdAt).toLocaleDateString() : 'No data',
      delta: recentSession ? new Date(recentSession.createdAt).toLocaleTimeString() : 'Waiting for traffic',
      icon: Clock3,
    },
    { label: 'Store', value: session.user.storeName || 'Unassigned', delta: 'Current account scope', icon: Sofa },
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
          <div className="mt-6 space-y-3">
            {recentEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
                No analytics events have been captured for this store yet.
              </div>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{event.type}</div>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{new Date(event.createdAt).toLocaleString()}</p>
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
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Conversions</div>
              <p className="mt-2 text-3xl font-bold text-stone-950">{conversions}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Most recent conversion</div>
              <p className="mt-2 text-sm text-stone-700">
                {recentConversion ? new Date(recentConversion.createdAt).toLocaleString() : 'No conversion event yet'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
