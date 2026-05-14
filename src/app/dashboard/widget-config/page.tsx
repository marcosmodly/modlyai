'use client'

import { Check, Copy } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import NoStoreState from '@/components/dashboard/NoStoreState'
import { formatCatalogCountLabel } from '@/lib/catalog-source'
import { useCatalogProducts } from '@/lib/use-catalog-products'
import { createWidgetInstallSnippet } from '@/lib/widget-install-snippet'

type WidgetConfig = {
  theme: {
    primaryColor: string
    buttonText?: string
    buttonPosition?: string
  }
  features: {
    roomPlanner: boolean
    customizer: boolean
  }
  apiBaseUrl: string
  storeId?: string
  widgetId?: string
  storeDomain?: string | null
  store: {
    id: string
    name?: string
    apiKey?: string
    productCount?: number
  }
}

export default function WidgetConfigPage() {
  const { data: session, status } = useSession()
  const [config, setConfig] = useState<WidgetConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [storeDomain, setStoreDomain] = useState('yourstore.com')

  const storeId = session?.user?.storeId
  const catalog = useCatalogProducts(storeId)

  useEffect(() => {
    if (!storeId) return

    fetch(`/api/widget/config?storeId=${encodeURIComponent(storeId)}`)
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error || 'Unable to load widget configuration')
        }

        return data
      })
      .then((data: WidgetConfig) => {
        setConfig(data)
        setStoreDomain(data.storeDomain || 'yourstore.com')
      })
      .catch((err: Error) => setError(err.message))
  }, [storeId])

  const installSnippet = useMemo(() => {
    if (!config) return null

    return createWidgetInstallSnippet({
      storeId: config.storeId || config.store.id || storeId,
      widgetId: config.widgetId,
    })
  }, [config, storeId])

  const missingStoreIdWarning = !storeId
    ? "We couldn't find a ModlyAI store for this account. Refresh the page or contact support."
    : null

  const handleCopySnippet = async () => {
    if (!installSnippet) return

    await navigator.clipboard.writeText(installSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status === 'loading') {
    return (
      <div className="flex p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  if (missingStoreIdWarning) {
    return <NoStoreState title="Widget Configuration" />
  }

  if (error) {
    return (
      <div className="rounded-[32px] border border-red-200 bg-red-50 p-6 text-red-700">
        <h1 className="text-2xl font-bold">Widget Configuration</h1>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="flex p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  const enabledFeatures = [
    config.features.roomPlanner ? 'Room Planner' : null,
    config.features.customizer ? 'Customizer' : null,
  ].filter(Boolean)

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Widget Configuration</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">Install ModlyAI</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Add the widget to your furniture store website and keep the install code tied to your current store.
        </p>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Current Settings</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Primary Color</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded border border-stone-300" style={{ backgroundColor: config.theme.primaryColor }} />
              <span className="font-mono text-sm text-stone-800">{config.theme.primaryColor}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Features Enabled</p>
            <p className="mt-3 font-medium text-stone-900">{enabledFeatures.join(', ') || 'None'}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Products Synced</p>
            <p className="mt-3 font-medium text-stone-900">{formatCatalogCountLabel(catalog)}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">API Base URL</p>
            <p className="mt-3 break-all font-mono text-xs text-stone-700">{config.apiBaseUrl || 'Current site origin'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Installation Instructions</h2>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Your Store Website URL</label>
            <input
              type="text"
              value={storeDomain}
              onChange={(event) => setStoreDomain(event.target.value)}
              placeholder="https://yourstore.com"
              className="w-full rounded-lg border border-stone-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-sm font-medium text-stone-700">Installation Code</label>
              <button
                onClick={handleCopySnippet}
                className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-1 text-sm font-medium transition hover:bg-stone-200"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="mb-2 text-sm leading-6 text-stone-500">
              Copy this full snippet into your storefront. You do not need to paste the widget key separately.
            </p>

            {installSnippet ? (
              <pre className="overflow-x-auto rounded-xl bg-gray-900 p-6 font-mono text-sm text-green-400">{installSnippet}</pre>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                We couldn't find a ModlyAI store for this account. Refresh the page or contact support.
              </div>
            )}
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Where to add this code:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>
                <strong>Shopify:</strong> Online Store &gt; Themes &gt; Edit Code &gt; theme.liquid, before &lt;/body&gt;
              </li>
              <li>
                <strong>WooCommerce:</strong> Appearance &gt; Theme Editor &gt; footer.php, before &lt;/body&gt;
              </li>
              <li>
                <strong>Custom site:</strong> Add to your main layout file before the closing body tag
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Widget Customization</h2>
        <p className="mt-3 text-sm text-stone-600">
          Customize colors, features, and behavior in the{' '}
          <Link href="/dashboard/settings" className="font-medium text-blue-700 hover:underline">
            Settings page
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
