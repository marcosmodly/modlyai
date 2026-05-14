'use client'

import { CheckCircle2, Circle, Link as LinkIcon, UploadCloud } from 'lucide-react'
import type React from 'react'
import { useRef, useState } from 'react'
import CopyButton from '@/components/dashboard/CopyButton'
import StoreUrlInput from '@/components/dashboard/StoreUrlInput'

type UploadResult = {
  success?: boolean
  count?: number
  error?: string
  message?: string
}

type StoreSummary = {
  id: string
  apiKey?: string
  url?: string
  shopifyStoreDomain?: string
  shopifyConnectedAt?: string
  shopifyLastSyncedAt?: string
  hasShopifyAccessToken: boolean
}

const inputClass =
  'w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

const platformInstructions = [
  {
    platform: 'Shopify',
    instructions:
      'Online Store -> Themes -> Edit code -> theme.liquid. Paste before the closing </body> tag, then save.',
  },
  {
    platform: 'WooCommerce / WordPress',
    instructions:
      'Use a header/footer script plugin or your theme footer file. Paste before the closing </body> tag.',
  },
  {
    platform: 'Custom website',
    instructions:
      'Paste before the closing </body> tag on product pages or across your whole site.',
  },
]

export default function IntegrationsClient({
  store,
  productCount,
  syncCount,
  installSnippet,
  installSnippetError,
  initialShopifyStatus,
  initialMessage,
}: {
  store: StoreSummary
  productCount: number
  syncCount: number
  installSnippet: string
  installSnippetError?: string
  initialShopifyStatus?: string
  initialMessage?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)
  const [shopDomain, setShopDomain] = useState(store.shopifyStoreDomain || '')
  const [shopifyStatus, setShopifyStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>(
    initialShopifyStatus === 'error' ? 'error' : initialShopifyStatus === 'connected' ? 'success' : 'idle'
  )
  const [shopifyMessage, setShopifyMessage] = useState(
    initialMessage
      ? decodeURIComponent(initialMessage)
      : initialShopifyStatus === 'connected'
        ? 'Shopify connected.'
        : ''
  )
  const [syncedCount, setSyncedCount] = useState<number | null>(null)
  const [shopifyLastSyncedAt, setShopifyLastSyncedAt] = useState(store.shopifyLastSyncedAt || '')
  const fileRef = useRef<HTMLInputElement>(null)
  const shopifyConnected = Boolean(store.shopifyConnectedAt || store.hasShopifyAccessToken)

  const integrations = [
    {
      name: 'Widget key',
      status: 'Active',
      description: 'Used by ModlyAI to identify this store. No action needed.',
      action: 'No action needed.',
      connected: true,
    },
    {
      name: 'Catalog Import',
      status: productCount > 0 ? 'Products imported' : 'No products yet',
      description: 'Product counts are scoped to your own store account.',
      action: `${productCount} products`,
      connected: productCount > 0,
    },
    {
      name: 'Sync History',
      status: syncCount > 0 ? 'Catalog synced' : 'No sync events',
      description: 'Each sync is logged as an event against your storeId for per-account analytics.',
      action: `${syncCount} sync events`,
      connected: syncCount > 0,
    },
  ]

  const uploadFile = async (file: File) => {
    setUploading(true)
    setUploadResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('storeId', store.id)

    try {
      const res = await fetch('/api/catalog/csv', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()
      setUploadResult(result)
    } catch {
      setUploadResult({ error: 'Upload failed' })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) await uploadFile(file)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) await uploadFile(file)
  }

  const connectShopify = () => {
    const shop = shopDomain.trim()
    if (!shop) {
      setShopifyStatus('error')
      setShopifyMessage('Enter your Shopify store domain first.')
      return
    }

    window.location.href = `/api/shopify/auth?shop=${encodeURIComponent(shop)}`
  }

  const syncShopify = async () => {
    setShopifyStatus('syncing')
    setShopifyMessage('')
    setSyncedCount(null)

    try {
      const response = await fetch('/api/shopify/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId: store.id }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to sync Shopify products')
      }

      const count = Number(result?.synced ?? 0)
      setSyncedCount(Number.isFinite(count) ? count : 0)
      setShopifyLastSyncedAt(new Date().toISOString())
      setShopifyStatus('success')
      setShopifyMessage(`Products synced: ${Number(result?.created ?? 0)} created, ${Number(result?.updated ?? 0)} updated`)
    } catch (error) {
      setShopifyStatus('error')
      setShopifyMessage(error instanceof Error ? error.message : 'Unable to sync Shopify products')
    }
  }

  return (
    <>
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">Install ModlyAI widget</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">
              Copy this full snippet into your storefront. It already includes the store and widget identifiers needed to load ModlyAI.
            </p>
          </div>
          {installSnippet ? (
            <CopyButton
              value={installSnippet}
              label="Copy code"
              copiedLabel="Copied"
            />
          ) : null}
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-stone-700">Install snippet</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">
            Copy this full snippet into your storefront. It already includes the store and widget identifiers needed to load ModlyAI.
          </p>
          {installSnippet ? (
            <pre className="mt-2 overflow-x-auto rounded-2xl bg-gray-900 p-4 font-mono text-sm leading-6 text-green-400">{installSnippet}</pre>
          ) : (
            <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {installSnippetError || "We couldn't find a ModlyAI store for this account. Refresh the page or contact support."}
            </div>
          )}
        </div>

        <div className="mt-6">
          <StoreUrlInput initialUrl={store.url || ''} />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight text-stone-950">Where to paste this code</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {platformInstructions.map((item) => (
              <article key={item.platform} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-sm font-semibold text-stone-950">{item.platform}</h4>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.instructions}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm leading-6">
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
            Install once. Branding, welcome message, catalog actions, and quote settings update from this dashboard.
          </p>
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            If the widget does not appear, check that this full snippet is installed and that your website allows external scripts.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">Shopify</h2>
            <p className="mt-1 text-sm text-stone-500">
              Optional: connect Shopify to sync your catalog automatically.
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${shopifyConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'}`}>
            {shopifyConnected ? 'Connected' : 'Not connected'}
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Shopify store domain</span>
            <input
              type="text"
              value={shopDomain}
              onChange={(event) => setShopDomain(event.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="your-store.myshopify.com"
            />
          </label>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
            <div>Shop: {store.shopifyStoreDomain || 'Not connected'}</div>
            <div className="mt-1">Last synced: {shopifyLastSyncedAt ? new Date(shopifyLastSyncedAt).toLocaleString() : 'Never'}</div>
            <div className="mt-1">Products synced: {syncedCount === null ? 'Not synced this session' : syncedCount}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={connectShopify}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            <LinkIcon className="h-4 w-4" />
            Connect Shopify
          </button>
          {shopifyConnected ? (
            <button
              type="button"
              onClick={syncShopify}
              disabled={shopifyStatus === 'syncing'}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {shopifyStatus === 'syncing' ? 'Syncing...' : 'Sync Products'}
            </button>
          ) : null}
        </div>

        {shopifyMessage ? (
          <p className={`mt-3 text-sm font-medium ${shopifyStatus === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>
            {shopifyMessage}
          </p>
        ) : null}
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">CSV Catalog Upload</h2>
            <p className="mt-1 text-sm text-stone-500">
              CSV upload works without Shopify. Upload your products manually and ModlyAI will use them in the widget.
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Recommended
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">CSV columns</p>
          <p className="mt-2 text-sm text-stone-600">
            Required basic columns: name, price, description, image_url, category.
          </p>
          <code className="mt-2 block break-words text-xs text-stone-700">
            Optional customization columns: colors, materials, addons, widthMin, widthMax, widthDefault,
            lengthMin, lengthMax, lengthDefault, heightMin, heightMax, heightDefault, colorPricing,
            materialPricing, dimensionPricePerInch
          </code>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="/sample-customization-catalog.csv"
              download
              className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-800"
            >
              Download customization-ready sample CSV
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]">
                Recommended
              </span>
            </a>
            <a href="/sample-catalog.csv" download className="text-xs font-medium text-blue-700 hover:underline">
              Download basic sample CSV template
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-xs text-stone-500">
            Use this template if you want product-driven customization options, priced add-ons,
            color/material choices, and dimension ranges.
          </p>
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
              <p className="text-sm text-stone-500">Uploading products...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-stone-800">Click to upload CSV</p>
                <p className="mt-1 text-sm text-stone-400">or drag and drop</p>
              </div>
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleCSVUpload} className="hidden" />

        {uploadResult ? (
          <div
            className={`mt-4 rounded-2xl border p-4 ${
              uploadResult.success ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
            }`}
          >
            {uploadResult.success ? (
              <p className="text-sm font-medium text-emerald-700">
                Successfully imported {uploadResult.count} products.
                <a href="/dashboard/products" className="ml-2 underline">
                  View products
                </a>
              </p>
            ) : (
              <p className="text-sm text-red-700">{uploadResult.message || uploadResult.error}</p>
            )}
          </div>
        ) : null}
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((item) => (
          <article key={item.name} className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-stone-950">{item.name}</h2>
                <p className="text-sm text-stone-500">{item.status}</p>
              </div>
              {item.connected ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              ) : (
                <Circle className="h-6 w-6 text-stone-300" />
              )}
            </div>

            <p className="mt-5 text-sm leading-6 text-stone-600">{item.description}</p>

            <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
              {item.action}
            </div>
          </article>
        ))}
      </section>

    </>
  )
}
