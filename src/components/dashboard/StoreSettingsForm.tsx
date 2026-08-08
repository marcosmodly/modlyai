'use client'

import { Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useSettingsTabDirty } from '@/lib/settings-tab-dirty'

type SettingsStore = {
  id: string
  name?: string
  storeUrl?: string
  url?: string
  productUrlTemplate?: string
  supportEmail?: string
  quoteEmail?: string
}

type FormState = {
  storeName: string
  storeUrl: string
  productUrlTemplate: string
  supportEmail: string
  quoteEmail: string
}

function buildInitialState(store: SettingsStore, fallbackStoreName?: string): FormState {
  return {
    storeName: store.name || fallbackStoreName || '',
    storeUrl: store.storeUrl || store.url || '',
    productUrlTemplate: store.productUrlTemplate || '',
    supportEmail: store.supportEmail || '',
    quoteEmail: store.quoteEmail || store.supportEmail || '',
  }
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

export default function StoreSettingsForm({
  store,
  fallbackStoreName,
}: {
  store: SettingsStore
  fallbackStoreName?: string
}) {
  const { update } = useSession()
  const [form, setForm] = useState<FormState>(() => buildInitialState(store, fallbackStoreName))
  // Baseline to diff against for the unsaved-changes indicator. Only moves
  // when a save actually succeeds - not on every keystroke - so it reflects
  // what's persisted, not what's on screen. Same pattern as
  // WhiteLabelSettingsForm's savedFormState.
  const [savedFormState, setSavedFormState] = useState<FormState>(form)
  const isDirty = JSON.stringify(form) !== JSON.stringify(savedFormState)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const reportTabDirty = useSettingsTabDirty('store')
  useEffect(() => {
    reportTabDirty(isDirty)
  }, [isDirty, reportTabDirty])

  useEffect(() => {
    if (!isDirty) return
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (status === 'success') {
      setStatus('idle')
      setMessage('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.productUrlTemplate.trim() && !form.productUrlTemplate.includes('{handle}')) {
      setStatus('error')
      setMessage('Product page URL pattern must include {handle}.')
      return
    }

    setStatus('saving')
    setMessage('')

    try {
      const payload = {
        storeName: form.storeName,
        storeUrl: form.storeUrl,
        productUrlTemplate: form.productUrlTemplate,
        supportEmail: form.supportEmail,
        quoteEmail: form.quoteEmail,
      }

      const response = await fetch(`/api/stores/${store.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to save settings')
      }

      // A 200 only means the request was accepted - confirm the fields this
      // form owns actually landed, the same check WhiteLabelSettingsForm
      // uses. This is what previously surfaced an InstantDB schema-push
      // failure that would otherwise have shown "Settings saved." while
      // silently discarding the value. mapStore() returns undefined for
      // empty optional fields (and "name", not "storeName"), so normalize
      // both sides before comparing.
      const savedStore = result?.store
      const normalize = (value: unknown) => (typeof value === 'string' ? value : '') || ''
      if (
        !savedStore ||
        normalize(savedStore.name) !== payload.storeName.trim() ||
        normalize(savedStore.storeUrl) !== payload.storeUrl.trim() ||
        normalize(savedStore.productUrlTemplate) !== payload.productUrlTemplate.trim() ||
        normalize(savedStore.supportEmail) !== payload.supportEmail.trim() ||
        normalize(savedStore.quoteEmail) !== payload.quoteEmail.trim()
      ) {
        throw new Error('Settings save did not persist the store profile fields')
      }

      setStatus('success')
      setMessage('Settings saved.')
      setSavedFormState(form)

      // Sidebar/Header pull storeName from the session, so refresh it now -
      // otherwise it would only pick up the change after a full re-login.
      await update()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to save settings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Store Profile</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Store name">
            <input
              type="text"
              value={form.storeName}
              onChange={(event) => updateField('storeName', event.target.value)}
              className={inputClass}
              placeholder="Acme Furniture"
            />
          </Field>
          <Field label="Store website URL">
            <input
              type="url"
              value={form.storeUrl}
              onChange={(event) => updateField('storeUrl', event.target.value)}
              className={inputClass}
              placeholder="https://example.com"
            />
          </Field>
          <Field label="Product page URL pattern (optional)">
            <input
              type="text"
              value={form.productUrlTemplate}
              onChange={(event) => updateField('productUrlTemplate', event.target.value)}
              className={inputClass}
              placeholder="https://mystore.com/shop/{handle}"
            />
            <p className="mt-2 text-xs text-stone-500">
              How your product URLs are built. Use {'{handle}'} where the product handle or slug goes - for
              example https://mystore.com/shop/{'{handle}'}. Leave blank on Shopify or WooCommerce, we detect
              those automatically.
            </p>
          </Field>
          <Field label="Support email">
            <input
              type="email"
              value={form.supportEmail}
              onChange={(event) => updateField('supportEmail', event.target.value)}
              className={inputClass}
              placeholder="support@example.com"
            />
          </Field>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Quote Requests</h2>
        <div className="mt-6 max-w-md">
          <Field label="Quote request email">
            <input
              type="email"
              value={form.quoteEmail}
              onChange={(event) => updateField('quoteEmail', event.target.value)}
              className={inputClass}
              placeholder="quotes@example.com"
            />
          </Field>
        </div>
      </section>

      <div className="sticky bottom-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <div aria-live="polite">
          {message ? (
            <p className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <p className="text-xs text-stone-500">Saves Store Profile and Quote Requests.</p>
          {isDirty && status !== 'saving' && (
            <p className="text-xs font-semibold text-amber-700">Unsaved changes</p>
          )}
          <button
            type="submit"
            disabled={status === 'saving'}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {status === 'saving' ? 'Saving...' : 'Save store settings'}
          </button>
        </div>
      </div>
    </form>
  )
}
