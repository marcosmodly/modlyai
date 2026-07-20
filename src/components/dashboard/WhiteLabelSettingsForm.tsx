'use client'

import { Save } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'

const DEFAULT_WIDGET_TITLE = 'ModlyAI'
const DEFAULT_PRIMARY_COLOR = '#3B82F6'
const DEFAULT_TITLE_COLOR = '#FFFFFF'
const DEFAULT_MESSAGE_TEXT_COLOR = '#1F2937'
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
  titleColor?: string
  messageTextColor?: string
  widgetButtonStyle?: string
  widgetLogoUrl?: string
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
  titleColor: string
  messageTextColor: string
  widgetButtonStyle: 'text' | 'logo'
  widgetLogoUrl: string
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
    titleColor: isHexColor(store.titleColor) ? store.titleColor : DEFAULT_TITLE_COLOR,
    messageTextColor: isHexColor(store.messageTextColor) ? store.messageTextColor : DEFAULT_MESSAGE_TEXT_COLOR,
    widgetButtonStyle: store.widgetButtonStyle === 'logo' ? 'logo' : 'text',
    widgetLogoUrl: store.widgetLogoUrl || '',
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
  const [selectedTextTarget, setSelectedTextTarget] = useState<'title' | 'message'>('title')
  const [logoWarning, setLogoWarning] = useState('')
  const [logoChecking, setLogoChecking] = useState(false)
  const colorSwatchValue = isHexColor(form.primaryColor) ? form.primaryColor : DEFAULT_PRIMARY_COLOR
  const titleColorValue = isHexColor(form.titleColor) ? form.titleColor : DEFAULT_TITLE_COLOR
  const messageTextColorValue = isHexColor(form.messageTextColor) ? form.messageTextColor : DEFAULT_MESSAGE_TEXT_COLOR

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

  const checkLogoImage = (url: string) => {
    setLogoWarning('')
    if (!url.trim()) return

    setLogoChecking(true)

    // Best-effort dimension check using a plain Image element. We don't set
    // crossOrigin here since we only need natural dimensions (not pixel data),
    // and requiring CORS would wrongly fail images that display fine but lack
    // CORS headers.
    const img = new Image()
    img.onload = () => {
      setLogoChecking(false)
      const { naturalWidth: w, naturalHeight: h } = img
      if (w > 1000 || h > 1000) {
        setLogoWarning(
          `This image is ${w}×${h}px, which is larger than needed. We recommend a square image under 512×512px so it loads quickly for your shoppers.`
        )
      } else {
        const aspectRatio = w / h
        if (aspectRatio > 1.5 || aspectRatio < 0.67) {
          setLogoWarning(
            'This image is not roughly square. It will be padded inside the button so it is not stretched or cropped.'
          )
        }
      }
    }
    img.onerror = () => {
      setLogoChecking(false)
      setLogoWarning('Could not load this image. Double-check the URL is correct and publicly accessible.')
    }
    img.src = url.trim()
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
        titleColor: form.titleColor,
        messageTextColor: form.messageTextColor,
        widgetButtonStyle: form.widgetButtonStyle,
        widgetLogoUrl: form.widgetLogoUrl,
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
        savedStore.titleColor !== payload.titleColor.trim() ||
        savedStore.messageTextColor !== payload.messageTextColor.trim() ||
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
        <p className="mt-2 text-sm text-stone-600">
          Click the title or message text in the preview to choose which one the font color below applies to.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5">
            <Field label="Widget title">
              <input
                type="text"
                value={form.widgetTitle}
                onChange={(event) => updateField('widgetTitle', event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Primary color (background / accent)">
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

            <Field
              label={`Font color \u2014 editing: ${selectedTextTarget === 'title' ? 'Widget Title text' : 'Message text'}`}
            >
              <div className="flex gap-3">
                <input
                  type="color"
                  value={selectedTextTarget === 'title' ? titleColorValue : messageTextColorValue}
                  onChange={(event) =>
                    updateField(
                      selectedTextTarget === 'title' ? 'titleColor' : 'messageTextColor',
                      event.target.value
                    )
                  }
                  className="h-12 w-14 rounded-2xl border border-stone-300 bg-stone-50 p-1"
                  aria-label="Font color swatch"
                />
                <input
                  type="text"
                  value={selectedTextTarget === 'title' ? form.titleColor : form.messageTextColor}
                  onChange={(event) =>
                    updateField(
                      selectedTextTarget === 'title' ? 'titleColor' : 'messageTextColor',
                      event.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="#FFFFFF"
                />
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Highlighted in the preview on the right. Click the other text to switch what you're editing.
              </p>
            </Field>

            <Field label="Welcome message">
              <textarea
                value={form.welcomeMessage}
                onChange={(event) => updateField('welcomeMessage', event.target.value)}
                className={`${inputClass} min-h-32 resize-y leading-6`}
              />
            </Field>

            <Field label="Widget button style">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('widgetButtonStyle', 'text')}
                  className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    form.widgetButtonStyle === 'text'
                      ? 'border-blue-500 bg-blue-50 text-stone-900'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  Text button
                  <span className="mt-1 block text-xs font-normal text-stone-500">Icon + widget title (default)</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateField('widgetButtonStyle', 'logo')}
                  className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    form.widgetButtonStyle === 'logo'
                      ? 'border-blue-500 bg-blue-50 text-stone-900'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  Logo only
                  <span className="mt-1 block text-xs font-normal text-stone-500">Your own logo image</span>
                </button>
              </div>
            </Field>

            {form.widgetButtonStyle === 'logo' && (
              <Field label="Logo image URL">
                <div className="flex items-center gap-3">
                  {form.widgetLogoUrl ? (
                    <img
                      src={form.widgetLogoUrl}
                      alt="Logo preview"
                      className="h-12 w-12 shrink-0 rounded-full border border-stone-200 bg-white object-contain p-0.5"
                      onError={() => setLogoWarning('Could not load this image. Double-check the URL is correct and publicly accessible.')}
                    />
                  ) : null}
                  <input
                    type="url"
                    value={form.widgetLogoUrl}
                    onChange={(event) => updateField('widgetLogoUrl', event.target.value)}
                    onBlur={(event) => checkLogoImage(event.target.value)}
                    className={inputClass}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  Paste a link to a hosted PNG or JPEG. If this is left empty or fails to load, the widget will fall
                  back to the text button automatically.
                </p>
                {logoChecking && <p className="mt-2 text-xs text-stone-400">Checking image...</p>}
                {logoWarning && !logoChecking && (
                  <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    {logoWarning}
                  </p>
                )}
              </Field>
            )}
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
              <button
                type="button"
                onClick={() => setSelectedTextTarget('title')}
                className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition ${
                  selectedTextTarget === 'title' ? 'ring-2 ring-inset ring-blue-500' : ''
                }`}
                style={{ backgroundColor: colorSwatchValue }}
                aria-label="Select widget title text to edit its color"
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: titleColorValue }}
                >
                  {form.widgetTitle || DEFAULT_WIDGET_TITLE}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    color: titleColorValue,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  }}
                >
                  {selectedTextTarget === 'title' ? 'Editing' : 'Click to edit'}
                </span>
              </button>

              <div className="space-y-3 bg-stone-50 p-4">
                <button
                  type="button"
                  onClick={() => setSelectedTextTarget('message')}
                  className={`block w-full rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition ${
                    selectedTextTarget === 'message' ? 'ring-2 ring-blue-500' : 'ring-1 ring-stone-200'
                  }`}
                  aria-label="Select message text to edit its color"
                >
                  <span className="text-sm leading-6" style={{ color: messageTextColorValue }}>
                    {form.welcomeMessage || DEFAULT_WELCOME_MESSAGE}
                  </span>
                </button>
                <div className="flex justify-end">
                  <span
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-white"
                    style={{ backgroundColor: colorSwatchValue }}
                  >
                    Sample shopper reply
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-stone-500">
              Live preview. This reflects how the widget header and welcome message will look on your storefront.
            </p>

            {form.widgetButtonStyle === 'logo' && (
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-900">How to add your logo</p>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-blue-800">
                  <li>
                    <strong>Size:</strong> square works best, ideally 512×512px or smaller. Larger images still work but
                    load slower for your shoppers.
                  </li>
                  <li>
                    <strong>Format:</strong> PNG with a transparent background looks cleanest, since the logo sits on a
                    white circular badge.
                  </li>
                  <li>
                    <strong>Must be a direct image link</strong>, not a webpage. Paste the URL into a new browser tab
                    first, if you see just the image (nothing else), it will work here.
                  </li>
                  <li>
                    <strong>Avoid</strong> Google Drive or Dropbox "share" links, and image gallery pages (like an
                    Imgur album page). These show a webpage, not the image file itself.
                  </li>
                  <li>
                    <strong>Where to get one:</strong> your own website's asset folder, your Shopify CDN if you're on
                    Shopify, or a free host like Imgur (right-click the image itself and choose "Copy image address").
                  </li>
                </ul>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-stone-700">Customer actions</p>
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
          </div>
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

      <p className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
        Need to install the widget?{' '}
        <Link href="/dashboard/integrations" className="font-semibold text-blue-700 hover:underline">
          Go to Integrations.
        </Link>
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            See how it works
          </Link>
          <div aria-live="polite">
            {message ? (
              <p className={`text-sm font-medium ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{message}</p>
            ) : null}
          </div>
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
