import { Package, Sparkles, TrendingUp, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CopyButton from '@/components/dashboard/CopyButton'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const isDeveloper = session.user.email === 'hello@modlyai.tech'

  if (!session.user.storeId) {
    return <NoStoreState title="Dashboard" />
  }

  const storeId = session.user.storeId

  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
      events: {},
    },
    products: {
      $: { where: { storeId } },
    },
  })

  const store = result.stores[0]
  if (!store?.setupComplete && !isDeveloper) {
    redirect('/onboarding')
  }

  const events = [...(store?.events ?? [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  const productsSynced = result.products.length
  const aiSessions = 0
  const recentEvents = events.slice(0, 5)

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
      note: 'Session tracking is not connected yet.',
      icon: Users,
      accent: 'bg-stone-900 text-amber-300',
    },
    {
      name: 'Conversion Rate',
      value: 'Coming soon',
      note: 'Analytics tracking is not connected yet.',
      icon: Sparkles,
      accent: 'bg-emerald-100 text-emerald-700',
    },
    {
      name: 'Revenue Impact',
      value: 'Coming soon',
      note: 'Billing and revenue impact tracking are not connected yet.',
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
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Live Widget Key</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-950">Your API key</h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Active
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-stone-200 bg-stone-50 p-4">
            <code className="block break-all text-sm text-stone-700">{session.user.apiKey || 'No API key found'}</code>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-sm leading-6 text-stone-600">Use this key to connect the widget and any catalog syncs to your store only.</p>
            {session.user.apiKey ? <CopyButton value={session.user.apiKey} /> : null}
          </div>
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

        <div className="mt-6 space-y-3">
          {recentEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-500">
              No events recorded for this store yet.
            </div>
          ) : (
            recentEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{event.type}</p>
                    <p className="mt-1 text-xs text-stone-500">{new Date(event.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
