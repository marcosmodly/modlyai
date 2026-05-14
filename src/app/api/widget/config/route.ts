import { NextResponse } from 'next/server'
import { getCatalogSnapshot } from '@/lib/catalog-source'
import { normalizeStorePublicIdentity, type CurrentStore } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors'

export const dynamic = 'force-dynamic'

const DEFAULT_WIDGET_TITLE = 'ModlyAI'
const DEFAULT_PRIMARY_COLOR = '#3B82F6'
const DEFAULT_WELCOME_MESSAGE =
  "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog."
const DEFAULT_ENABLED_ACTIONS = {
  viewInCatalog: true,
  customize: true,
  requestQuote: true,
}

type WidgetStore = CurrentStore & {
  storeUrl?: unknown
  url?: unknown
  supportEmail?: unknown
  widgetTitle?: unknown
  primaryColor?: unknown
  welcomeMessage?: unknown
  enabledActions?: unknown
  enableViewInCatalog?: unknown
  enableCustomize?: unknown
  enableRequestQuote?: unknown
  quoteEmail?: unknown
  domain?: unknown
  catalogSource?: unknown
  platform?: unknown
}

type WidgetProduct = Record<string, unknown>

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function getEnabledActions(store: WidgetStore | null) {
  if (!store) return DEFAULT_ENABLED_ACTIONS

  if (
    typeof store.enableViewInCatalog === 'boolean' ||
    typeof store.enableCustomize === 'boolean' ||
    typeof store.enableRequestQuote === 'boolean'
  ) {
    return {
      viewInCatalog: store.enableViewInCatalog ?? DEFAULT_ENABLED_ACTIONS.viewInCatalog,
      customize: store.enableCustomize ?? DEFAULT_ENABLED_ACTIONS.customize,
      requestQuote: store.enableRequestQuote ?? DEFAULT_ENABLED_ACTIONS.requestQuote,
    }
  }

  const value = store.enabledActions
  if (!isRecord(value)) return DEFAULT_ENABLED_ACTIONS

  return {
    viewInCatalog: typeof value.viewInCatalog === 'boolean' ? value.viewInCatalog : DEFAULT_ENABLED_ACTIONS.viewInCatalog,
    customize: typeof value.customize === 'boolean' ? value.customize : DEFAULT_ENABLED_ACTIONS.customize,
    requestQuote: typeof value.requestQuote === 'boolean' ? value.requestQuote : DEFAULT_ENABLED_ACTIONS.requestQuote,
  }
}

function getPrimaryColor(value: unknown) {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_PRIMARY_COLOR
}

function readText(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function readField(entity: unknown, key: string) {
  if (!isRecord(entity)) return undefined

  const value = entity[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

async function handleGET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const apiOrigin = new URL(req.url).origin
    const widgetId = readText(searchParams.get('widgetId'))
    const storeId = readText(searchParams.get('storeId'))

    if (!widgetId && !storeId) {
      return NextResponse.json(
        { error: 'Missing widgetId' },
        { status: 400 }
      )
    }

    let store: WidgetStore | null = null
    let products: WidgetProduct[] = []

    if (storeId || widgetId) {
      const storesResult = await adminDb.query({
        stores: {},
      })

      const stores = storesResult.stores ?? []
      const storeById = storeId
        ? stores.find((candidate) => readField(candidate, 'id') === storeId)
        : undefined
      const storeByWidgetId = widgetId
        ? stores.find((candidate) =>
            readField(candidate, 'widgetId') === widgetId ||
            readField(candidate, 'id') === widgetId
          )
        : undefined

      store = storeById ?? storeByWidgetId ?? null

      const resolvedStoreId = readText(store?.id)
      if (resolvedStoreId) {
        const productResult = await adminDb.query({
          products: {
            $: { where: { storeId: resolvedStoreId } },
          },
        })

        products = productResult.products ?? []
      }
    }

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    store = {
      ...store,
      ...(await normalizeStorePublicIdentity(store)),
    }

    const catalog = getCatalogSnapshot(products, store)
    const storeName = readText(store.name)
    const storeUrl = readText(store.storeUrl) || readText(store.url) || readText(store.domain)
    const supportEmail = readText(store.supportEmail)
    const widgetTitle = readText(store.widgetTitle, DEFAULT_WIDGET_TITLE)
    const primaryColor = getPrimaryColor(store.primaryColor)
    const welcomeMessage = readText(store.welcomeMessage, DEFAULT_WELCOME_MESSAGE)
    const enabledActions = getEnabledActions(store)
    const quoteEmail = store.quoteEmail || supportEmail

    return NextResponse.json({
      theme: {
        primaryColor,
        buttonText: widgetTitle,
        buttonPosition: 'bottom-right',
      },
      features: {
        roomPlanner: true,
        customizer: true,
      },
      storeName,
      storeUrl,
      supportEmail,
      widgetTitle,
      primaryColor,
      welcomeMessage,
      enabledActions,
      quoteEmail,
      apiBaseUrl: apiOrigin,
      storeId: store.id,
      widgetId: readText(store.widgetId),
      publicApiKey: readText(store.apiKey),
      apiKey: readText(store.apiKey),
      storeDomain: storeUrl || null,
      store: {
        id: store.id,
        name: storeName,
        apiKey: readText(store.apiKey),
        productCount: catalog.count,
        catalogSource: catalog.source,
      },
    })
  } catch (error: unknown) {
    console.error('Widget config error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Widget config error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  return withPublicWidgetCors(await handleGET(req))
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse()
}
