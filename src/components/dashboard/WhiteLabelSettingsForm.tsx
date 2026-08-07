'use client'

import { Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import type React from 'react'
import { Component, useMemo, useState } from 'react'
import { FurnitureAIWidget } from '@widget/components/FurnitureAIWidget'
import ImageUploadField from '@/components/ImageUploadField'
import { DEMO_CATALOG, FEATURED_DEMO_PRODUCT, demoProductToFurnitureItem } from '@/lib/demo-catalog'
import { notifyProfileUpdated } from '@/lib/use-profile-summary'
import { WIDGET_THEMES, type WidgetTheme } from '@/lib/widget-themes'

const DEFAULT_WIDGET_TITLE = 'ModlyAI'
const DEFAULT_PRIMARY_COLOR = '#3B82F6'
const DEFAULT_TITLE_COLOR = '#FFFFFF'
const DEFAULT_MESSAGE_TEXT_COLOR = '#1F2937'
const DEFAULT_WELCOME_MESSAGE =
  "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog."

const BUTTON_POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const
type ButtonPosition = (typeof BUTTON_POSITIONS)[number]
const BUTTON_POSITION_LABELS: Record<ButtonPosition, string> = {
  'bottom-right': 'Bottom right',
  'bottom-left': 'Bottom left',
  'top-right': 'Top right',
  'top-left': 'Top left',
}

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
  productUrlTemplate?: string
  supportEmail?: string
  widgetTitle?: string
  primaryColor?: string
  titleColor?: string
  messageTextColor?: string
  widgetFontFamily?: string
  widgetButtonStyle?: string
  widgetButtonPosition?: string
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
  productUrlTemplate: string
  supportEmail: string
  widgetTitle: string
  primaryColor: string
  titleColor: string
  messageTextColor: string
  widgetFontFamily: string
  widgetButtonStyle: 'text' | 'logo'
  widgetButtonPosition: ButtonPosition
  widgetLogoUrl: string
  welcomeMessage: string
  enabledActions: EnabledActions
  quoteEmail: string
}

function buildInitialState(store: SettingsStore, fallbackStoreName?: string): FormState {
  return {
    storeName: store.name || fallbackStoreName || '',
    storeUrl: store.storeUrl || store.url || '',
    productUrlTemplate: store.productUrlTemplate || '',
    supportEmail: store.supportEmail || '',
    widgetTitle: store.widgetTitle || DEFAULT_WIDGET_TITLE,
    primaryColor: isHexColor(store.primaryColor) ? store.primaryColor : DEFAULT_PRIMARY_COLOR,
    titleColor: isHexColor(store.titleColor) ? store.titleColor : DEFAULT_TITLE_COLOR,
    messageTextColor: isHexColor(store.messageTextColor) ? store.messageTextColor : DEFAULT_MESSAGE_TEXT_COLOR,
    // '' (not a WIDGET_THEMES value) on purpose: an untouched store hasn't
    // opted into a theme's font, so it shouldn't silently gain one here.
    widgetFontFamily: WIDGET_THEMES.some((theme) => theme.fontFamily === store.widgetFontFamily)
      ? (store.widgetFontFamily as string)
      : '',
    widgetButtonStyle: store.widgetButtonStyle === 'logo' ? 'logo' : 'text',
    widgetButtonPosition: (BUTTON_POSITIONS as readonly string[]).includes(store.widgetButtonPosition || '')
      ? (store.widgetButtonPosition as ButtonPosition)
      : 'bottom-right',
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

// The live preview mounts the real widget, which can throw (network issues,
// a bad logo URL, etc.). Falling back to the static mock beats leaving the
// merchant staring at a blank box.
class WidgetPreviewBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Widget preview failed to render:', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
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
  const { update } = useSession()
  const [form, setForm] = useState<FormState>(() => buildInitialState(store, fallbackStoreName))
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [selectedTextTarget, setSelectedTextTarget] = useState<'title' | 'message'>('title')
  const [logoWarning, setLogoWarning] = useState('')
  const [logoChecking, setLogoChecking] = useState(false)
  const [colorsExpanded, setColorsExpanded] = useState(false)
  const colorSwatchValue = isHexColor(form.primaryColor) ? form.primaryColor : DEFAULT_PRIMARY_COLOR
  const titleColorValue = isHexColor(form.titleColor) ? form.titleColor : DEFAULT_TITLE_COLOR
  const messageTextColorValue = isHexColor(form.messageTextColor) ? form.messageTextColor : DEFAULT_MESSAGE_TEXT_COLOR
  const activeThemeId = WIDGET_THEMES.find(
    (theme) =>
      theme.primaryColor.toLowerCase() === colorSwatchValue.toLowerCase() &&
      theme.titleColor.toLowerCase() === titleColorValue.toLowerCase() &&
      theme.messageTextColor.toLowerCase() === messageTextColorValue.toLowerCase() &&
      theme.fontFamily === form.widgetFontFamily
  )?.id

  // Preview-only fixture: this form has no merchant catalog available
  // client-side, and the real catalog isn't the point of a colour preview.
  const previewProduct = useMemo(() => demoProductToFurnitureItem(FEATURED_DEMO_PRODUCT), [])

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

  const applyTheme = (theme: WidgetTheme) => {
    setForm((current) => ({
      ...current,
      primaryColor: theme.primaryColor,
      titleColor: theme.titleColor,
      messageTextColor: theme.messageTextColor,
      widgetFontFamily: theme.fontFamily,
    }))
    if (status === 'success') {
      setStatus('idle')
      setMessage('')
    }
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

    if (form.productUrlTemplate.trim() && !form.productUrlTemplate.includes('{handle}')) {
      setStatus('error')
      setMessage('Product page URL pattern must include {handle}.')
      return
    }

    setStatus('saving')
    setMessage('')

    try {
      const url = `/api/stores/${store.id}`
      const payload = {
        storeName: form.storeName,
        storeUrl: form.storeUrl,
        productUrlTemplate: form.productUrlTemplate,
        supportEmail: form.supportEmail,
        widgetTitle: form.widgetTitle,
        primaryColor: form.primaryColor,
        titleColor: form.titleColor,
        messageTextColor: form.messageTextColor,
        widgetFontFamily: form.widgetFontFamily,
        widgetButtonStyle: form.widgetButtonStyle,
        widgetButtonPosition: form.widgetButtonPosition,
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
        savedStore.widgetFontFamily !== payload.widgetFontFamily.trim() ||
        savedStore.welcomeMessage !== payload.welcomeMessage.trim()
      ) {
        throw new Error('Settings save did not persist the widget branding fields')
      }

      setStatus('success')
      setMessage('Settings saved.')

      // Sidebar/Header pull storeName from the session, so refresh it now -
      // otherwise it would only pick up the change after a full re-login (the
      // same staleness bug we fixed for the account name field). The logo
      // itself is fetched separately (see use-profile-summary.ts) since it
      // can be too large to fit in the session cookie.
      await update()
      notifyProfileUpdated()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to save settings')
    }
  }

  // Fallback if the live widget preview below throws - a static approximation
  // beats an empty box.
  const staticPreviewFallback = (
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
        <span className="text-sm font-semibold" style={{ color: titleColorValue }}>
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
  )

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
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Widget Branding</h2>
        <p className="mt-2 text-sm text-stone-600">
          Pick a preset to colour both the launcher and the chat, or expand &quot;Customise colours&quot; to set exact
          hex values.
        </p>

        <div className="mt-6">
          <p className="text-sm font-medium text-stone-700">Appearance</p>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WIDGET_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => applyTheme(theme)}
                className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2.5 text-left text-sm font-medium transition ${
                  activeThemeId === theme.id
                    ? 'border-blue-500 bg-blue-50 text-stone-900'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                }`}
              >
                <span
                  className="h-6 w-6 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: theme.primaryColor }}
                  aria-hidden="true"
                />
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-8">
          <div className="space-y-5">
            <Field label="Widget title">
              <input
                type="text"
                value={form.widgetTitle}
                onChange={(event) => updateField('widgetTitle', event.target.value)}
                className={inputClass}
              />
            </Field>

            <div>
              <button
                type="button"
                onClick={() => setColorsExpanded((current) => !current)}
                className="text-sm font-medium text-stone-700 hover:text-stone-950"
              >
                {colorsExpanded ? '\u25be' : '\u25b8'} Customise colours
              </button>

              {colorsExpanded && (
                <div className="mt-4 space-y-5">
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
                    <div className="mb-2 flex gap-2 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setSelectedTextTarget('title')}
                        className={`rounded-full border px-3 py-1 transition ${
                          selectedTextTarget === 'title'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-stone-200 text-stone-500 hover:border-stone-300'
                        }`}
                      >
                        Title text
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTextTarget('message')}
                        className={`rounded-full border px-3 py-1 transition ${
                          selectedTextTarget === 'message'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-stone-200 text-stone-500 hover:border-stone-300'
                        }`}
                      >
                        Message text
                      </button>
                    </div>
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
                  </Field>
                </div>
              )}
            </div>

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

            <Field label="Button position">
              <div className="grid grid-cols-2 gap-3">
                {BUTTON_POSITIONS.map((position) => (
                  <button
                    key={position}
                    type="button"
                    onClick={() => updateField('widgetButtonPosition', position)}
                    className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                      form.widgetButtonPosition === position
                        ? 'border-blue-500 bg-blue-50 text-stone-900'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {BUTTON_POSITION_LABELS[position]}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Move the launcher if another widget already sits in this corner of your site.
              </p>
            </Field>

            {form.widgetButtonStyle === 'logo' && (
              <Field label="Logo image">
                <ImageUploadField
                  value={form.widgetLogoUrl}
                  onChange={(url) => {
                    updateField('widgetLogoUrl', url)
                    setLogoWarning('')
                    if (url) checkLogoImage(url)
                  }}
                  shape="square"
                  size={64}
                  label="Drag and drop your logo, or click to browse"
                />
                <p className="mt-3 text-xs font-medium text-stone-500">Or paste a link instead</p>
                <div className="mt-1 flex items-center gap-3">
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
                  Uploaded images are stored directly - up to 2MB. If this is left empty or fails to load, the
                  widget will fall back to the text button automatically.
                </p>
                {logoChecking && <p className="mt-2 text-xs text-stone-400">Checking image...</p>}
                {logoWarning && !logoChecking && (
                  <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    {logoWarning}
                  </p>
                )}
              </Field>
            )}

            {form.widgetButtonStyle === 'logo' && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
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
                    <strong>Avoid</strong> Google Drive or Dropbox &quot;share&quot; links, and image gallery pages
                    (like an Imgur album page). These show a webpage, not the image file itself.
                  </li>
                  <li>
                    <strong>Where to get one:</strong> your own website&apos;s asset folder, your Shopify CDN if
                    you&apos;re on Shopify, or a free host like Imgur (right-click the image itself and choose
                    &quot;Copy image address&quot;).
                  </li>
                </ul>
              </div>
            )}

            <div className="space-y-3">
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

          <div>
            <p className="text-sm font-medium text-stone-700">Live preview</p>
            <p className="mt-1 text-xs text-stone-500">
              This is the real widget, full-width so its own layout renders the same way it will on your storefront -
              a narrow preview column would squeeze the Room Planner and Customizer tabs into broken, cramped grids.
            </p>
            <div className="mt-3 overflow-hidden rounded-3xl border border-stone-200 shadow-sm" style={{ height: 720 }}>
              <WidgetPreviewBoundary fallback={staticPreviewFallback}>
                <FurnitureAIWidget
                  initialProduct={previewProduct}
                  config={{
                    // No storeId/apiKey/publicApiKey/storeDomain on purpose:
                    // findStoreForUsage (chat + room-planner routes) then
                    // resolves no store, so previewing colours never spends
                    // the merchant's aiChats/roomPlannerAnalyses allowance.
                    catalog: { source: 'manual', products: DEMO_CATALOG },
                    widgetTitle: form.widgetTitle || DEFAULT_WIDGET_TITLE,
                    primaryColor: colorSwatchValue,
                    titleColor: titleColorValue,
                    messageTextColor: messageTextColorValue,
                    welcomeMessage: form.welcomeMessage || DEFAULT_WELCOME_MESSAGE,
                    theme: {
                      buttonStyle: form.widgetButtonStyle,
                      logoUrl: form.widgetLogoUrl || undefined,
                      fontFamily: form.widgetFontFamily || undefined,
                    },
                    enabledActions: {
                      viewInCatalog: false,
                      customize: form.enabledActions.customize,
                      requestQuote: form.enabledActions.requestQuote,
                    },
                    apiEndpoints: {
                      quoteRequest: '/api/demo/quote-request',
                      catalog: '/api/demo/catalog-items',
                    },
                  }}
                />
              </WidgetPreviewBoundary>
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
