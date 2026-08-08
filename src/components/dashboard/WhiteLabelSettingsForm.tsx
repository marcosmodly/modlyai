'use client'

import { Save, X } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { Component, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FurnitureAIWidget } from '@widget/components/FurnitureAIWidget'
import ImageUploadField from '@/components/ImageUploadField'
import { DEMO_CATALOG, FEATURED_DEMO_PRODUCT, demoProductToFurnitureItem } from '@/lib/demo-catalog'
import { useSettingsTabDirty } from '@/lib/settings-tab-dirty'
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
}

type FormState = {
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
}

function buildInitialState(store: SettingsStore): FormState {
  return {
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

// Portaled to document.body rather than rendered in place: the dashboard
// Header is `sticky` with `backdrop-blur`, which makes it a containing
// block for `position: fixed` descendants of *its own* subtree - not this
// one, since this form renders inside <main>, a sibling of <Header>. Still,
// portaling is what keeps that true regardless of how the page around this
// form changes later, the same reasoning behind portaling the mobile nav
// drawer's fixed layer.
function FullPreviewModal({
  onClose,
  children,
}: {
  onClose: () => void
  children: React.ReactNode
}) {
  const titleId = useId()
  const dialogPanelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousBodyOverflow
      previouslyFocused?.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogPanelRef.current) return

      const focusable = Array.from(
        dialogPanelRef.current.querySelectorAll<HTMLElement>(
          'a, button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-8 w-full max-w-3xl rounded-[28px] border border-stone-200 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <h2 id={titleId} className="text-lg font-bold text-stone-950">
            Full widget preview
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-3 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-sm" style={{ height: 720 }}>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
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
}: {
  store: SettingsStore
}) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(store))
  // Baseline to diff against for the unsaved-changes indicator. Only moves
  // when a save actually succeeds - not on every keystroke - so it reflects
  // what's persisted, not what's on screen.
  const [savedFormState, setSavedFormState] = useState<FormState>(form)
  const isDirty = JSON.stringify(form) !== JSON.stringify(savedFormState)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [selectedTextTarget, setSelectedTextTarget] = useState<'title' | 'message'>('title')
  const [logoWarning, setLogoWarning] = useState('')
  const [logoChecking, setLogoChecking] = useState(false)
  const [colorsExpanded, setColorsExpanded] = useState(false)
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false)
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

  // Shared by both the inline chat-only preview and the full-preview modal -
  // they only differ in hideNav, passed separately at each call site.
  const previewConfig = useMemo(
    () => ({
      // No storeId/apiKey/publicApiKey/storeDomain on purpose: findStoreForUsage
      // (chat + room-planner routes) then resolves no store, so previewing
      // colours never spends the merchant's aiChats/roomPlannerAnalyses allowance.
      catalog: { source: 'manual' as const, products: DEMO_CATALOG },
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
    }),
    [
      form.widgetTitle,
      colorSwatchValue,
      titleColorValue,
      messageTextColorValue,
      form.welcomeMessage,
      form.widgetButtonStyle,
      form.widgetLogoUrl,
      form.widgetFontFamily,
      form.enabledActions.customize,
      form.enabledActions.requestQuote,
    ]
  )

  useEffect(() => {
    if (!isDirty) return
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const reportTabDirty = useSettingsTabDirty('widget')
  useEffect(() => {
    reportTabDirty(isDirty)
  }, [isDirty, reportTabDirty])

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

    setStatus('saving')
    setMessage('')

    try {
      const url = `/api/stores/${store.id}`
      const payload = {
        widgetTitle: form.widgetTitle,
        primaryColor: form.primaryColor,
        titleColor: form.titleColor,
        messageTextColor: form.messageTextColor,
        widgetFontFamily: form.widgetFontFamily,
        widgetButtonStyle: form.widgetButtonStyle,
        widgetButtonPosition: form.widgetButtonPosition,
        widgetLogoUrl: form.widgetLogoUrl,
        welcomeMessage: form.welcomeMessage,
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
      setSavedFormState(form)

      // The logo is fetched separately (see use-profile-summary.ts) since it
      // can be too large to fit in the session cookie - this is what makes
      // a new widgetLogoUrl show up in Header/Sidebar without a reload.
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
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Customize how ModlyAI appears on your storefront and where customer actions are sent.
        </p>
      </section>

      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Widget Branding</h2>
        <p className="mt-2 text-sm text-stone-600">
          Pick a preset to colour both the launcher and the chat, or expand &quot;Customise colours&quot; to set exact
          hex values.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Primary color</p>
            <div className="mt-3 flex items-center gap-2">
              <span
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: colorSwatchValue }}
                aria-hidden="true"
              />
              <span className="font-mono text-sm text-stone-800">{colorSwatchValue}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Button position</p>
            <p className="mt-3 font-medium text-stone-900">{BUTTON_POSITION_LABELS[form.widgetButtonPosition]}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Customer actions on</p>
            <p className="mt-3 font-medium text-stone-900">
              {Object.values(form.enabledActions).filter(Boolean).length} of 3
            </p>
          </div>
        </div>

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

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
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

          <div className="xl:sticky xl:top-24 xl:self-start">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-stone-700">Live preview</p>
              <button
                type="button"
                onClick={() => setFullPreviewOpen(true)}
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Open full preview
              </button>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              This is the real widget, chat only, at roughly the size shoppers see it on your storefront. Open the
              full preview to check Room Planner and Customizer.
            </p>
            <div
              className="mt-3 w-full overflow-hidden rounded-3xl border border-stone-200 shadow-sm"
              style={{ maxHeight: 'min(70vh, 560px)' }}
            >
              <WidgetPreviewBoundary fallback={staticPreviewFallback}>
                <FurnitureAIWidget hideNav initialProduct={previewProduct} config={previewConfig} />
              </WidgetPreviewBoundary>
            </div>
          </div>
        </div>
      </section>

      {fullPreviewOpen && (
        <FullPreviewModal onClose={() => setFullPreviewOpen(false)}>
          <WidgetPreviewBoundary fallback={staticPreviewFallback}>
            <FurnitureAIWidget initialProduct={previewProduct} config={previewConfig} />
          </WidgetPreviewBoundary>
        </FullPreviewModal>
      )}

      <p className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
        Need to install the widget?{' '}
        <Link href="/dashboard/integrations" className="font-semibold text-blue-700 hover:underline">
          Go to Integrations.
        </Link>
      </p>

      <div className="sticky bottom-4 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur">
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
        <div className="flex flex-col items-end gap-1.5">
          <p className="text-xs text-stone-500">Saves Widget Branding.</p>
          {isDirty && status !== 'saving' && (
            <p className="text-xs font-semibold text-amber-700">Unsaved changes</p>
          )}
          <button
            type="submit"
            disabled={status === 'saving'}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {status === 'saving' ? 'Saving...' : 'Save widget settings'}
          </button>
        </div>
      </div>
    </form>
  )
}
