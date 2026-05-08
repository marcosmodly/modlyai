export type CatalogSource = 'instantdb' | 'csv' | 'shopify' | 'manual' | 'woocommerce' | 'bigcommerce' | 'none'

export type CatalogProduct = Record<string, any>

export type NormalizedCatalogProduct = {
  id: string
  title: string
  name: string
  category?: string
  description?: string
  price?: number | string
  sku?: string
  dimensions?: string
  image?: string
  imageUrl?: string
  tags?: string[]
  source?: string
  length?: number
  width?: number
  height?: number
  colors?: string[]
  materials?: string[]
  productUrl?: string
  url?: string
  handle?: string
  externalId?: string
  shopifyProductId?: string
  storeId?: string
  status?: string
}

export type CatalogStoreMetadata = Record<string, unknown> & {
  catalogSource?: unknown
  platform?: unknown
}

export type CatalogSnapshot<TProduct = CatalogProduct> = {
  products: TProduct[]
  source: CatalogSource
  count: number
}

function normalizeSource(value: unknown): CatalogSource | null {
  const source = String(value || '').trim().toLowerCase()

  if (source === 'instantdb') return 'instantdb'
  if (source === 'csv') return 'csv'
  if (source === 'shopify') return 'shopify'
  if (source === 'woocommerce') return 'woocommerce'
  if (source === 'bigcommerce') return 'bigcommerce'
  if (source === 'manual' || source === 'custom' || source === 'other') {
    return 'manual'
  }

  return null
}

function readString(value: unknown): string | undefined {
  const text = String(value ?? '').trim()
  return text || undefined
}

function readNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function buildDimensions(product: CatalogProduct) {
  const existing = readString(product.dimensions)
  if (existing) return existing

  const length = readNumber(product.length)
  const width = readNumber(product.width)
  const height = readNumber(product.height)

  const parts = [
    length !== undefined ? `${length} in L` : null,
    width !== undefined ? `${width} in W` : null,
    height !== undefined ? `${height} in H` : null,
  ].filter(Boolean)

  return parts.length ? parts.join(' x ') : undefined
}

function normalizeTags(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const tags = value.map((tag) => readString(tag)).filter(Boolean) as string[]
    return tags.length ? tags : undefined
  }

  const text = readString(value)
  if (!text) return undefined

  const tags = text.split(',').map((tag) => tag.trim()).filter(Boolean)
  return tags.length ? tags : undefined
}

function normalizeStringList(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const entries = value.map((entry) => readString(entry)).filter(Boolean) as string[]
    return entries.length ? entries : undefined
  }

  const text = readString(value)
  if (!text) return undefined

  const entries = text
    .split(/[|,]/)
    .map((entry) => entry.trim())
    .filter(Boolean)

  return entries.length ? entries : undefined
}

export function normalizeCatalogProduct(
  product: CatalogProduct,
  source: CatalogSource = 'none',
  index = 0
): NormalizedCatalogProduct | null {
  const title = readString(product.title) ?? readString(product.name)
  if (!title) return null

  const image = readString(product.image) ?? readString(product.imageUrl) ?? readString(product.image_url)
  const length = readNumber(product.length)
  const width = readNumber(product.width)
  const height = readNumber(product.height)
  const productUrl = readString(product.productUrl) ?? readString(product.url)
  const url = readString(product.url) ?? readString(product.productUrl)

  return {
    id: readString(product.id) ?? `${source}-product-${index + 1}`,
    title,
    name: title,
    category: readString(product.category),
    description: readString(product.description),
    price: product.price ?? undefined,
    sku: readString(product.sku),
    dimensions: buildDimensions(product),
    image,
    imageUrl: image,
    tags: normalizeTags(product.tags),
    source,
    length,
    width,
    height,
    colors: normalizeStringList(product.colors),
    materials: normalizeStringList(product.materials),
    productUrl,
    url,
    handle: readString(product.handle),
    externalId: readString(product.externalId),
    shopifyProductId: readString(product.shopifyProductId),
    storeId: readString(product.storeId),
    status: readString(product.status),
  }
}

export function getCatalogSnapshot<TProduct = CatalogProduct>(
  products: TProduct[] | undefined,
  store?: CatalogStoreMetadata | null
): CatalogSnapshot<NormalizedCatalogProduct> {
  const safeProducts = Array.isArray(products) ? products : []
  const configuredSource = normalizeSource(store?.catalogSource) ?? normalizeSource(store?.platform)
  const inferredSource = safeProducts
    .map((product) => normalizeSource((product as CatalogProduct).source))
    .find((source): source is CatalogSource => Boolean(source))
  const source = safeProducts.length > 0
    ? configuredSource ?? inferredSource ?? 'csv'
    : 'none'
  const normalizedProducts = safeProducts
    .map((product, index) => normalizeCatalogProduct(product as CatalogProduct, source, index))
    .filter(Boolean) as NormalizedCatalogProduct[]

  return {
    products: normalizedProducts,
    source: normalizedProducts.length > 0 ? source : 'none',
    count: normalizedProducts.length,
  }
}

export function formatCatalogCountLabel(snapshot: Pick<CatalogSnapshot, 'count' | 'source'>) {
  const noun = snapshot.count === 1 ? 'product' : 'products'

  if (snapshot.count === 0) {
    return '0 products'
  }

  if (snapshot.source === 'csv') {
    return `${snapshot.count} ${noun} from CSV`
  }

  if (snapshot.source === 'instantdb') {
    return `${snapshot.count} ${noun}`
  }

  if (snapshot.source === 'shopify') {
    return `${snapshot.count} ${noun} from Shopify`
  }

  if (snapshot.source === 'woocommerce') {
    return `${snapshot.count} ${noun} from WooCommerce`
  }

  if (snapshot.source === 'bigcommerce') {
    return `${snapshot.count} ${noun} from BigCommerce`
  }

  if (snapshot.source === 'manual') {
    return `${snapshot.count} ${noun}`
  }

  return '0 products'
}
