import { NextResponse } from 'next/server'
import { getCatalogSnapshot } from '@/lib/catalog-source'
import { normalizeStorePublicIdentity } from '@/lib/current-store'
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

function getEnabledActions(store: any) {
  if (!store || typeof store !== 'object') return DEFAULT_ENABLED_ACTIONS

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
  if (!value || typeof value !== 'object') return DEFAULT_ENABLED_ACTIONS

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

    let store: any = null
    let products: any[] = []

    if (widgetId) {
      const storeResult = await adminDb.query({
        stores: {
          $: {
            where: {
              widgetId,
            },
          },
        },
      })

      store = storeResult.stores[0]

      if (store?.id) {
        const productResult = await adminDb.query({
          products: {
            $: { where: { storeId: store.id } },
          },
        })

        products = productResult.products ?? []
      }
    }

    if (!store && storeId) {
      const result = await adminDb.query({
        stores: {
          $: {
            where: {
              id: storeId,
            },
          },
        },
        products: {
          $: { where: { storeId } },
        },
      })

      store = result.stores[0]
      products = result.products ?? []
    }

    if (!store && widgetId) {
      const result = await adminDb.query({
        stores: {
          $: {
            where: {
              id: widgetId,
            },
          },
        },
        products: {
          $: { where: { storeId: widgetId } },
        },
      })

      store = result.stores[0]
      products = result.products ?? []
    }

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    store = await normalizeStorePublicIdentity(store)

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
      publicApiKey: store.apiKey,
      apiKey: store.apiKey,
      storeDomain: storeUrl || null,
      store: {
        id: store.id,
        name: storeName,
        apiKey: store.apiKey,
        productCount: catalog.count,
        catalogSource: catalog.source,
      },
    })
  } catch (error: any) {
    console.error('Widget config error:', error)
    return NextResponse.json(
      { error: error.message },
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
