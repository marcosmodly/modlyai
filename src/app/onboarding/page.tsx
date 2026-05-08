'use client'

import { type ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type FormState = {
  storeUrl: string
  platform: '' | 'shopify' | 'woocommerce' | 'csv' | 'other'
  wooKey: string
  wooSecret: string
  csvText: string
  csvFileName: string
}

const platformOptions = [
  {
    id: 'shopify',
    label: 'Shopify',
    desc: 'Prepare Shopify catalog sync',
    icon: 'S',
  },
  {
    id: 'woocommerce',
    label: 'WooCommerce',
    desc: 'Connect via WooCommerce REST API',
    icon: 'W',
  },
  {
    id: 'csv',
    label: 'CSV Upload',
    desc: 'Upload your product catalog manually',
    icon: 'C',
  },
  {
    id: 'other',
    label: 'Other / Custom',
    desc: 'Use our API to connect any platform',
    icon: 'O',
  },
] as const

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const isDeveloper = session?.user?.email === 'hello@modlyai.tech'
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkingStore, setCheckingStore] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormState>({
    storeUrl: '',
    platform: '',
    wooKey: '',
    wooSecret: '',
    csvText: '',
    csvFileName: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [router, status])

  useEffect(() => {
    async function loadStore() {
      if (status !== 'authenticated' || !session?.user?.storeId) {
        if (status !== 'loading') {
          setCheckingStore(false)
        }
        return
      }

      try {
        const response = await fetch(`/api/stores/${session.user.storeId}`)
        if (!response.ok) {
          setCheckingStore(false)
          return
        }

        const data = await response.json()
        const store = data.store

        if (store?.setupComplete) {
          router.replace('/dashboard')
          return
        }

        const nextPlatform = platformOptions.some(
          (platform) => platform.id === store?.platform
        )
          ? store.platform
          : undefined

        setForm((current) => ({
          ...current,
          storeUrl: typeof store?.url === 'string' ? store.url : current.storeUrl,
          platform: nextPlatform ?? current.platform,
        }))
      } catch (loadError) {
        console.error('Failed to load store:', loadError)
      } finally {
        setCheckingStore(false)
      }
    }

    void loadStore()
  }, [router, session?.user?.storeId, status])

  async function handleCsvUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const csvText = await file.text()
    setForm((current) => ({
      ...current,
      csvText,
      csvFileName: file.name,
    }))
  }

  async function handleFinish() {
    if (!session?.user?.storeId) {
      setError('Your session is missing a store. Sign in again and retry.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/store/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: session.user.storeId,
          storeUrl: form.storeUrl,
          platform: form.platform,
          wooKey: form.wooKey,
          wooSecret: form.wooSecret,
          csvText: form.csvText,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete setup')
      }

      router.push('/dashboard')
      router.refresh()
    } catch (submitError) {
      console.error('Setup error:', submitError)
      setError(
        submitError instanceof Error ? submitError.message : 'Failed to complete setup'
      )
    } finally {
      setLoading(false)
    }
  }

  const canFinish =
    form.platform === 'shopify'
      ? true
      : form.platform === 'woocommerce'
        ? Boolean(form.wooKey.trim() && form.wooSecret.trim())
        : Boolean(form.platform)

  const platformLabel =
    platformOptions.find((platform) => platform.id === form.platform)?.label || 'selected'

  const DevBypass = () =>
    isDeveloper ? (
      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="mt-4 w-full rounded-lg border border-dashed border-gray-200 py-2 text-center text-xs text-gray-300 hover:text-gray-500"
      >
        🛠️ Dev bypass → Skip to Dashboard
      </button>
    ) : null

  const StepOne = () => (
    <div>
      <div className="mb-6">
        <span className="text-sm font-medium text-blue-600">Step 1 of 3</span>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">What is your store URL?</h2>
        <p className="mt-1 text-sm text-gray-500">
          This is where your customers shop for furniture.
        </p>
      </div>

      <input
        type="url"
        placeholder="https://yourstore.com"
        value={form.storeUrl}
        onChange={(event) =>
          setForm((current) => ({ ...current, storeUrl: event.target.value }))
        }
        className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={() => form.storeUrl.trim() && setStep(2)}
        disabled={!form.storeUrl.trim()}
        className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>

      <DevBypass />
    </div>
  )

  const StepTwo = () => (
    <div>
      <div className="mb-6">
        <span className="text-sm font-medium text-blue-600">Step 2 of 3</span>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          What platform is your store on?
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          We&apos;ll use this to sync your product catalog.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3">
        {platformOptions.map((platform) => (
          <button
            key={platform.id}
            type="button"
            onClick={() => {
              setForm((current) => ({ ...current, platform: platform.id }))
              setStep(3)
            }}
            className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-blue-500 ${
              form.platform === platform.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
              {platform.icon}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{platform.label}</p>
              <p className="text-sm text-gray-500">{platform.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="text-sm text-gray-500 transition hover:text-gray-700"
      >
        Back
      </button>

      <DevBypass />
    </div>
  )

  const StepThree = () => (
    <div>
      <div className="mb-6">
        <span className="text-sm font-medium text-blue-600">Step 3 of 3</span>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Connect your {platformLabel} store
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          We&apos;ll use {form.storeUrl} as your storefront URL.
        </p>
      </div>

      {form.platform === 'shopify' && (
        <div className="mb-4 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            Shopify catalog sync will be connected through the secure integration flow.
          </p>
        </div>
      )}

      {form.platform === 'woocommerce' && (
        <div className="mb-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Consumer Key
            </label>
            <input
              type="text"
              placeholder="ck_xxxxxxxxxxxxxxxx"
              value={form.wooKey}
              onChange={(event) =>
                setForm((current) => ({ ...current, wooKey: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Consumer Secret
            </label>
            <input
              type="password"
              placeholder="cs_xxxxxxxxxxxxxxxx"
              value={form.wooSecret}
              onChange={(event) =>
                setForm((current) => ({ ...current, wooSecret: event.target.value }))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {form.platform === 'csv' && (
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Upload Product CSV
          </label>
          <label className="block cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-400">
            <p className="mb-2 text-2xl text-gray-700">CSV</p>
            <p className="text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Columns: name, price, description, image_url, dimensions
            </p>
            {form.csvFileName ? (
              <p className="mt-4 text-sm font-medium text-blue-700">
                Selected: {form.csvFileName}
              </p>
            ) : null}
            <input type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
          </label>
        </div>
      )}

      {form.platform === 'other' && (
        <div className="mb-4 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            We&apos;ll set up a custom integration for you. Your team can continue into the
            dashboard now and configure the API connection there.
          </p>
        </div>
      )}

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 rounded-xl border border-gray-300 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleFinish}
          disabled={loading || !canFinish}
          className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Finish setup'}
        </button>
      </div>

      <DevBypass />
    </div>
  )

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (checkingStore) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">Loading store setup...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Modly<span className="text-blue-600">AI</span>
          </h1>
          <p className="mt-1 text-xs text-gray-400">Store Setup</p>
        </div>

        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((value) => (
            <div
              key={value}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                value <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {step === 1 ? <StepOne /> : null}
        {step === 2 ? <StepTwo /> : null}
        {step === 3 ? <StepThree /> : null}
      </div>
    </div>
  )
}
