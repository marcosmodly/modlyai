import { adminDb, id } from '@/lib/instant-admin'
import { FurnitureItem } from '@/types'
import {
  getCatalogSnapshot,
  type CatalogSnapshot,
  type NormalizedCatalogProduct,
} from '@/lib/catalog-source'
import { checkProductLimit } from '@/lib/usage-limits'

export type CatalogSource = 'shopify' | 'woocommerce' | 'csv' | 'custom'

const STORE_SETTINGS_UPDATE_FIELDS = [
  'name',
  'storeUrl',
  'supportEmail',
  'widgetTitle',
  'primaryColor',
  'welcomeMessage',
  'enableViewInCatalog',
  'enableCustomize',
  'enableRequestQuote',
  'quoteEmail',
] as const

export interface Store {
  id: string
  name: string
  apiKey: string
  userId: string
  storeUrl?: string
  url?: string
  supportEmail?: string
  widgetTitle?: string
  primaryColor?: string
  welcomeMessage?: string
  enableViewInCatalog?: boolean
  enableCustomize?: boolean
  enableRequestQuote?: boolean
  enabledActions?: {
    viewInCatalog: boolean
    customize: boolean
    requestQuote: boolean
  }
  quoteEmail?: string
  domain?: string
  platform?: string
  subscriptionPlan?: string
  subscriptionStatus?: string
  trialStartedAt?: string
  trialEndsAt?: string
  aiChatsUsed?: number
  roomPlannerAnalysesUsed?: number
  setupComplete?: boolean
  shopifyStoreDomain?: string
  shopifyConnectedAt?: string
  shopifyLastSyncedAt?: string
  hasShopifyAccessToken?: boolean
  createdAt: string
  updatedAt?: string
}

interface SyncInput {
  apiKey: string
  csvText?: string
  customProducts?: Array<Record<string, unknown>>
}

function normalizeDomain(value?: string) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
}

function ensureNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function inchesToMeters(value: number): number {
  return Number((value * 0.0254).toFixed(3))
}

function withProductLinks(
  products: NormalizedCatalogProduct[]
): NormalizedCatalogProduct[] {
  return products.map((product) => {
    const existingUrl = product.productUrl || product.url

    return {
      ...product,
      ...(existingUrl ? { productUrl: existingUrl, url: existingUrl } : {}),
    }
  })
}

function mapStore(store: any): Store {
  return {
    id: String(store.id),
    name: String(store.name),
    apiKey: String(store.apiKey),
    userId: String(store.userId),
    storeUrl: store.storeUrl ? String(store.storeUrl) : undefined,
    url: store.storeUrl ? String(store.storeUrl) : store.url ? String(store.url) : undefined,
    supportEmail: store.supportEmail ? String(store.supportEmail) : undefined,
    widgetTitle: store.widgetTitle ? String(store.widgetTitle) : undefined,
    primaryColor: store.primaryColor ? String(store.primaryColor) : undefined,
    welcomeMessage: store.welcomeMessage ? String(store.welcomeMessage) : undefined,
    enableViewInCatalog: typeof store.enableViewInCatalog === 'boolean' ? store.enableViewInCatalog : undefined,
    enableCustomize: typeof store.enableCustomize === 'boolean' ? store.enableCustomize : undefined,
    enableRequestQuote: typeof store.enableRequestQuote === 'boolean' ? store.enableRequestQuote : undefined,
    enabledActions:
      typeof store.enableViewInCatalog === 'boolean' ||
      typeof store.enableCustomize === 'boolean' ||
      typeof store.enableRequestQuote === 'boolean'
        ? {
            viewInCatalog: store.enableViewInCatalog ?? true,
            customize: store.enableCustomize ?? true,
            requestQuote: store.enableRequestQuote ?? true,
          }
        : store.enabledActions && typeof store.enabledActions === 'object'
        ? {
            viewInCatalog: Boolean(store.enabledActions.viewInCatalog),
            customize: Boolean(store.enabledActions.customize),
            requestQuote: Boolean(store.enabledActions.requestQuote),
          }
        : undefined,
    quoteEmail: store.quoteEmail ? String(store.quoteEmail) : undefined,
    domain: store.domain ? String(store.domain) : undefined,
    platform: store.platform ? String(store.platform) : undefined,
    subscriptionPlan: store.subscriptionPlan ? String(store.subscriptionPlan) : undefined,
    subscriptionStatus: store.subscriptionStatus ? String(store.subscriptionStatus) : undefined,
    trialStartedAt: store.trialStartedAt ? String(store.trialStartedAt) : undefined,
    trialEndsAt: store.trialEndsAt ? String(store.trialEndsAt) : undefined,
    aiChatsUsed: typeof store.aiChatsUsed === 'number' ? store.aiChatsUsed : undefined,
    roomPlannerAnalysesUsed:
      typeof store.roomPlannerAnalysesUsed === 'number' ? store.roomPlannerAnalysesUsed : undefined,
    setupComplete: typeof store.setupComplete === 'boolean' ? store.setupComplete : undefined,
    shopifyStoreDomain: store.shopifyStoreDomain ? String(store.shopifyStoreDomain) : undefined,
    shopifyConnectedAt: store.shopifyConnectedAt ? String(store.shopifyConnectedAt) : undefined,
    shopifyLastSyncedAt: store.shopifyLastSyncedAt ? String(store.shopifyLastSyncedAt) : undefined,
    hasShopifyAccessToken: Boolean(store.shopifyAccessToken),
    createdAt: String(store.createdAt),
    updatedAt: store.updatedAt ? String(store.updatedAt) : undefined,
  }
}

function productToFurnitureItem(product: NormalizedCatalogProduct): FurnitureItem {
  const price = ensureNumber(product.price)
  const materials = product.materials?.filter(Boolean) ?? []
  const colors = product.colors?.filter(Boolean) ?? []
  const lengthIn = ensureNumber(product.length)
  const widthIn = ensureNumber(product.width)
  const heightIn = ensureNumber(product.height)

  return {
    id: product.id,
    name: product.title,
    category: product.category || 'Furniture',
    dimensions: {
      length: inchesToMeters(lengthIn),
      width: inchesToMeters(widthIn),
      height: inchesToMeters(heightIn),
      depth: inchesToMeters(lengthIn),
    },
    materials: {
      primary: materials[0] ?? 'Custom',
      secondary: materials[1],
      upholstery: materials[0],
      legs: materials[2],
    },
    colors: {
      main: colors[0] ?? 'Custom',
      accent: colors[1],
    },
    styleTags: product.tags ?? [],
    images: product.image ? [product.image] : [],
    priceRange: price > 0 ? { min: price, max: price } : undefined,
    price,
    productUrl: product.productUrl,
    url: product.url,
    handle: product.handle,
    source: product.source,
    externalId: product.externalId,
    shopifyProductId: product.shopifyProductId,
    storeId: product.storeId,
    status: product.status,
    stockStatus: product.source === 'shopify' ? 'custom_order' : undefined,
  }
}

export function catalogProductToFurnitureItem(product: NormalizedCatalogProduct): FurnitureItem {
  return productToFurnitureItem(product)
}

function parseCsvProducts(csvText: string): Array<{ name: string; price: number; imageUrl?: string }> {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) return []

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase())

  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map((value) => value.trim())
    const row = Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex] ?? '']))

    return {
      name: String(row.name || `Product ${index + 1}`),
      price: ensureNumber(row.price),
      imageUrl: String(row.imageurl || row.image_url || '').trim() || undefined,
    }
  })
}

function normalizeCustomProducts(products: Array<Record<string, unknown>>) {
  return products.map((product, index) => ({
    name: String(product.name ?? `Product ${index + 1}`),
    price: ensureNumber(product.price),
    imageUrl: String(product.imageUrl ?? '').trim() || undefined,
  }))
}

export async function createStore(input: { name: string; userId: string }): Promise<Store> {
  const existing = await adminDb.query({
    stores: {
      $: { where: { userId: input.userId } },
    },
  })

  if (existing.stores[0]) {
    throw new Error('This user already has a store')
  }

  const storeId = id()
  const nowDate = new Date()
  const now = nowDate.toISOString()
  const trialEndsAt = new Date(nowDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
  const apiKey = `pk_live_${id()}`

  await adminDb.transact([
    adminDb.tx.stores[storeId].update({
      name: input.name.trim(),
      apiKey,
      userId: input.userId,
      subscriptionPlan: 'free_trial',
      subscriptionStatus: 'trialing',
      trialStartedAt: now,
      trialEndsAt,
      aiChatsUsed: 0,
      roomPlannerAnalysesUsed: 0,
      setupComplete: false,
      createdAt: now,
      updatedAt: now,
    }),
    adminDb.tx.users[input.userId].link({ store: storeId }),
  ])

  return {
    id: storeId,
    name: input.name.trim(),
    apiKey,
    userId: input.userId,
    setupComplete: false,
    createdAt: now,
    updatedAt: now,
  }
}

export async function listStores(userId?: string): Promise<Store[]> {
  const result = await adminDb.query({
    stores: {},
  })

  return (result.stores ?? [])
    .filter((store: any) => !userId || store.userId === userId)
    .map(mapStore)
}

export async function findStoreByApiKey(apiKey: string): Promise<Store | null> {
  if (!apiKey) return null

  const result = await adminDb.query({
    stores: {
      $: { where: { apiKey } },
    },
  })

  return result.stores?.[0] ? mapStore(result.stores[0]) : null
}

export async function findStoreByDomain(domain: string): Promise<Store | null> {
  const normalized = normalizeDomain(domain)
  if (!normalized) return null

  const result = await adminDb.query({
    stores: {
      $: { where: { domain: normalized } },
    },
  })

  return result.stores?.[0] ? mapStore(result.stores[0]) : null
}

export async function findStoreById(idValue: string): Promise<Store | null> {
  if (!idValue) return null

  const result = await adminDb.query({
    stores: {
      $: { where: { id: idValue } },
    },
  })

  return result.stores?.[0] ? mapStore(result.stores[0]) : null
}

export async function updateStore(
  storeId: string,
  updates: {
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
    quoteEmail?: string
  }
): Promise<Store> {
  const current = await findStoreById(storeId)
  if (!current) {
    throw new Error('Store not found')
  }

  const trimmedStoreUrl =
    typeof updates.storeUrl === 'string'
      ? updates.storeUrl.trim()
      : typeof updates.url === 'string'
        ? updates.url.trim()
        : undefined

  const updatePayload = {
    ...(updates.name ? { name: updates.name.trim() } : {}),
    ...(trimmedStoreUrl !== undefined ? { storeUrl: trimmedStoreUrl } : {}),
    ...(typeof updates.supportEmail === 'string' ? { supportEmail: updates.supportEmail.trim() } : {}),
    ...(typeof updates.widgetTitle === 'string' ? { widgetTitle: updates.widgetTitle.trim() } : {}),
    ...(typeof updates.primaryColor === 'string' ? { primaryColor: updates.primaryColor.trim() } : {}),
    ...(typeof updates.welcomeMessage === 'string' ? { welcomeMessage: updates.welcomeMessage.trim() } : {}),
    ...(typeof updates.enableViewInCatalog === 'boolean' ? { enableViewInCatalog: updates.enableViewInCatalog } : {}),
    ...(typeof updates.enableCustomize === 'boolean' ? { enableCustomize: updates.enableCustomize } : {}),
    ...(typeof updates.enableRequestQuote === 'boolean' ? { enableRequestQuote: updates.enableRequestQuote } : {}),
    ...(typeof updates.quoteEmail === 'string' ? { quoteEmail: updates.quoteEmail.trim() } : {}),
  }

  const updatePayloadKeys = Object.keys(updatePayload)
  const unknownPayloadKeys = updatePayloadKeys.filter(
    (key) => !STORE_SETTINGS_UPDATE_FIELDS.includes(key as (typeof STORE_SETTINGS_UPDATE_FIELDS)[number])
  )

  if (unknownPayloadKeys.length > 0) {
    console.warn('Store update payload contains non-settings schema keys:', unknownPayloadKeys)
  }

  await adminDb.transact([
    adminDb.tx.stores[storeId].update(updatePayload),
  ])

  return (await findStoreById(storeId)) ?? current
}

export async function replaceStoreProducts(
  storeId: string,
  products: Array<{ name: string; price: number; imageUrl?: string }>
): Promise<void> {
  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
      products: {},
    },
  })

  const store = result.stores[0]
  const now = new Date().toISOString()
  const eventId = id()

  const deletes = (store?.products ?? []).map((product: any) =>
    adminDb.tx.products[product.id].delete()
  )

  const creates = products.flatMap((product) => {
    const productId = id()
    return [
      adminDb.tx.products[productId].update({
        storeId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: now,
        updatedAt: now,
      }),
      adminDb.tx.stores[storeId].link({ products: productId }),
    ]
  })

  await adminDb.transact([
    ...deletes,
    ...creates,
    adminDb.tx.events[eventId].update({
      storeId,
      type: 'catalog_sync',
      metadata: { importedProducts: products.length },
      createdAt: now,
    }),
    adminDb.tx.stores[storeId].link({ events: eventId }),
    adminDb.tx.stores[storeId].update({
      catalogSource: 'csv',
      platform: 'csv',
      productCount: products.length,
      lastSyncedAt: now,
    }),
  ])
}

export async function getStoreProducts(storeId: string): Promise<FurnitureItem[]> {
  const catalog = await getActiveCatalogForStore(storeId)
  return catalog.products.map(productToFurnitureItem)
}

export async function getActiveCatalogForStore(storeId: string): Promise<CatalogSnapshot<NormalizedCatalogProduct>> {
  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
    products: {
      $: { where: { storeId } },
    },
  })

  const store = result.stores[0] ?? null
  return getCatalogSnapshot(result.products ?? [], store)
}

export async function getStoreProductsByApiKey(apiKey: string): Promise<FurnitureItem[]> {
  const store = await findStoreByApiKey(apiKey)
  return store ? getStoreProducts(store.id) : []
}

export async function getStoreProductsByDomain(domain: string): Promise<FurnitureItem[]> {
  const store = await findStoreByDomain(domain)
  return store ? getStoreProducts(store.id) : []
}

export async function loadDemoCatalog(): Promise<FurnitureItem[]> {
  return []
}

export async function getCatalogForRequest(options: {
  storeId?: string | null
  apiKey?: string | null
  domain?: string | null
}): Promise<{
  items: FurnitureItem[]
  products: NormalizedCatalogProduct[]
  catalog: CatalogSnapshot<NormalizedCatalogProduct>
  store: Store | null
  source: 'store' | 'demo'
}> {
  const store =
    (options.storeId ? await findStoreById(options.storeId) : null) ??
    (options.apiKey ? await findStoreByApiKey(options.apiKey) : null) ??
    (options.domain ? await findStoreByDomain(options.domain) : null)

  if (!store) {
    const catalog = getCatalogSnapshot([], null)
    return { items: [], products: [], catalog, store: null, source: 'demo' }
  }

  const catalog = await getActiveCatalogForStore(store.id)
  const products = withProductLinks(catalog.products)

  return {
    items: products.map(productToFurnitureItem),
    products,
    catalog: {
      ...catalog,
      products,
    },
    store,
    source: 'store',
  }
}

export async function syncStoreCatalog(input: SyncInput): Promise<{ store: Store; synced: number }> {
  const store = await findStoreByApiKey(input.apiKey)
  if (!store) {
    throw new Error('Invalid API key')
  }

  const products = input.csvText?.trim()
    ? parseCsvProducts(input.csvText)
    : Array.isArray(input.customProducts)
      ? normalizeCustomProducts(input.customProducts)
      : []

  if (products.length === 0) {
    throw new Error('Provide csvText or customProducts to sync a catalog')
  }

  const productLimitCheck = checkProductLimit(store, products.length)
  if (!productLimitCheck.allowed) {
    throw new Error(
      productLimitCheck.trialExpired
        ? 'Your free trial has ended. Upgrade to continue using ModlyAI.'
        : `This plan supports up to ${productLimitCheck.limit} products. Upgrade to import more.`
    )
  }

  await replaceStoreProducts(store.id, products)

  return {
    store,
    synced: products.length,
  }
}

export async function getStoreAnalytics(storeId: string): Promise<{
  productCount: number
  lastSyncedAt?: string
  categoryCount: number
}> {
  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
      products: {},
      events: {},
    },
  })

  const store = result.stores[0]

  return {
    productCount: store?.products?.length ?? 0,
    lastSyncedAt: store?.lastSyncedAt ? String(store.lastSyncedAt) : undefined,
    categoryCount: store?.products?.length ? 1 : 0,
  }
}
