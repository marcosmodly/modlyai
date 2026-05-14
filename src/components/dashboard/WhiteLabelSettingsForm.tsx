'use client'

import { Save } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'

const DEFAULT_WIDGET_TITLE = 'ModlyAI'
const DEFAULT_PRIMARY_COLOR = '#3B82F6'
const DEFAULT_WELCOME_MESSAGE =
  "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog."

type EnabledActions = {
  viewInCatalog: boolean
  customize: boolean
  requestQuote: boolean
}

type SettingsStore = {
  id: string
  name?: string
  storeUrl?: string
  url?: string
  supportEmail?: string
  widgetTitle?: string
  primaryColor?: string
  welcomeMessage?: string
  enableViewInCatalog?: boolean
  enableCustomize?: boolean
  enableRequestQuote?: boolean
  enabledActions?: Partial<EnabledActions>
  quoteEmail?: string
}

type FormState = {
  storeName: string
  storeUrl: string
  supportEmail: string
  widgetTitle: string
  primaryColor: string
  welcomeMessage: string
  enabledActions: EnabledActions
  quoteEmail: string
}

function buildInitialState(store: SettingsStore, fallbackStoreName?: string): FormState {
  return {
    storeName: store.name || fallbackStoreName || '',
    storeUrl: store.storeUrl || store.url || '',
    supportEmail: store.supportEmail || '',
    widgetTitle: store.widgetTitle || DEFAULT_WIDGET_TITLE,
    primaryColor: isHexColor(store.primaryColor) ? store.primaryColor : DEFAULT_PRIMARY_COLOR,
    welcomeMessage: store.welcomeMessage || DEFAULT_WELCOME_MESSAGE,
    enabledActions: {
      viewInCatalog: store.enableViewInCatalog ?? store.enabledActions?.viewInCatalog ?? true,
      customize: store.enableCustomize ?? store.enabledActions?.customize ?? true,
      requestQuote: store.enableRequestQuote ?? store.enabledActions?.requestQuote ?? true,
    },
    quoteEmail: store.quoteEmail || store.supportEmail || '',
  }
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)
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

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
      <span className="text-sm font-medium text-stone-800">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
      />
    </label>
  )
}

const inputClass =
  'w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

export default function WhiteLabelSettingsForm({
  store,
  fallbackStoreName,
}: {
  store: SettingsStore
  fallbackStoreName?: string
}) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(store, fallbackStoreName))
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const colorSwatchValue = isHexColor(form.primaryColor) ? form.primaryColor : DEFAULT_PRIMARY_COLOR

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (status === 'success') {
      setStatus('idle')
      setMessage('')
    }
  }

  const updateAction = (key: keyof EnabledActions, value: boolean) => {
    updateField('enabledActions', {
      ...form.enabledActions,
      [key]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('saving')
    setMessage('')

    try {
      const url = `/api/stores/${store.id}`
      const payload = {
        storeName: form.storeName,
        storeUrl: form.storeUrl,
        supportEmail: form.supportEmail,
        widgetTitle: form.widgetTitle,
        primaryColor: form.primaryColor,
        welcomeMessage: form.welcomeMessage,
        quoteEmail: form.quoteEmail,
        enableViewInCatalog: form.enabledActions.viewInCatalog,
        enableCustomize: form.enabledActions.customize,
        enableRequestQuote: form.enabledActions.requestQuote,
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to save settings')
      }

      const savedStore = result?.store
      if (
        !savedStore ||
        savedStore.widgetTitle !== payload.widgetTitle.trim() ||
        savedStore.primaryColor !== payload.primaryColor.trim() ||
        savedStore.welcomeMessage !== payload.welcomeMessage.trim()
      ) {
        throw new Error('Settings save did not persist the widget branding fields')
      }

      setStatus('success')
      setMessage('Settings saved.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to save settings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Settings</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">White-label Widget Settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Customize how ModlyAI appears on your storefront and where customer actions are sent.
        </p>
      </section>

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
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Widget Branding</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Widget title">
            <input
              type="text"
              value={form.widgetTitle}
              onChange={(event) => updateField('widgetTitle', event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Primary color">
            <div className="flex gap-3">
              <input
                type="color"
                value={colorSwatchValue}
                onChange={(event) => updateField('primaryColor', event.target.value)}
                className="h-12 w-14 rounded-2xl border border-stone-300 bg-stone-50 p-1"
                aria-label="Primary color swatch"
              />
              <input
                type="text"
                value={form.primaryColor}
                onChange={(event) => updateField('primaryColor', event.target.value)}
                className={inputClass}
                placeholder="#3B82F6"
              />
            </div>
          </Field>
          <div className="md:col-span-2">
            <Field label="Welcome message">
              <textarea
                value={form.welcomeMessage}
                onChange={(event) => updateField('welcomeMessage', event.target.value)}
                className={`${inputClass} min-h-32 resize-y leading-6`}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Customer Actions</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <Toggle
              label="Enable View in Catalog"
              checked={form.enabledActions.viewInCatalog}
              onChange={(checked) => updateAction('viewInCatalog', checked)}
            />
            <Toggle
              label="Enable Customize this"
              checked={form.enabledActions.customize}
              onChange={(checked) => updateAction('customize', checked)}
            />
            <Toggle
              label="Enable Request Quote"
              checked={form.enabledActions.requestQuote}
              onChange={(checked) => updateAction('requestQuote', checked)}
            />
          </div>
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

      <p className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
        Need to install the widget?{' '}
        <Link href="/dashboard/integrations" className="font-semibold text-blue-700 hover:underline">
          Go to Integrations.
        </Link>
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div aria-live="polite">
          {message ? (
            <p className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={status === 'saving'}
          className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {status === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
