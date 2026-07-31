// WooCommerce REST API client. Unlike Shopify, self-hosted WordPress has no
// centralized OAuth authority to redirect through - merchants generate a
// Consumer Key/Secret themselves from WP Admin > WooCommerce > Settings >
// Advanced > REST API, and paste them in. Auth is HTTP Basic (key as
// username, secret as password) per WooCommerce's own REST API docs.
import type { ProductCustomizationOptions } from '@/lib/product-customization'

const WC_API_PATH = '/wp-json/wc/v3'

export class WooCommerceError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'WooCommerceError'
    this.status = status
  }
}

export type WooCommerceCatalogProduct = {
  externalId: string
  name: string
  description: string
  price: number
  imageUrl: string
  productUrl: string
  handle: string
  sku: string
  category: string
  status: string
  source: 'woocommerce'
  customizationOptions?: ProductCustomizationOptions
}

type WooCommerceProductNode = {
  id: number
  name: string
  slug: string
  permalink: string
  description: string
  short_description: string
  price: string
  sku: string
  status: string
  images?: Array<{ src?: string }>
  categories?: Array<{ name?: string }>
  attributes?: Array<{ name?: string; options?: string[] }>
}

export function normalizeWooSiteUrl(value: unknown) {
  const raw = String(value || '').trim()
  if (!raw) {
    throw new WooCommerceError('Your WordPress site URL is required.')
  }

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`

  let url: URL
  try {
    url = new URL(withProtocol)
  } catch {
    throw new WooCommerceError('Enter a valid site URL, e.g. https://yourstore.com.')
  }

  return `${url.protocol}//${url.host}`
}

function authHeader(consumerKey: string, consumerSecret: string) {
  const token = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
  return { Authorization: `Basic ${token}` }
}

function wooRequestError(status: number, body: unknown) {
  if (status === 401 || status === 403) {
    return new WooCommerceError(
      'WooCommerce rejected these API keys. Check the Consumer Key/Secret and that they have Read access.',
      401
    )
  }
  if (status === 404) {
    return new WooCommerceError(
      'Could not find the WooCommerce REST API at this URL. Confirm WooCommerce is installed and permalinks are not set to "Plain".',
      404
    )
  }

  const text = typeof body === 'string' ? body : JSON.stringify(body)
  return new WooCommerceError(`WooCommerce request failed with status ${status}${text ? `: ${text.slice(0, 160)}` : ''}`, 502)
}

async function wooFetch(siteUrl: string, path: string, consumerKey: string, consumerSecret: string) {
  const url = `${siteUrl}${WC_API_PATH}${path}`

  let response: Response
  try {
    response = await fetch(url, { headers: authHeader(consumerKey, consumerSecret) })
  } catch {
    throw new WooCommerceError('Could not reach your WordPress site. Check the site URL and try again.', 502)
  }

  const text = await response.text()
  let payload: any = {}
  try {
    payload = text ? JSON.parse(text) : {}
  } catch {
    payload = text
  }

  if (!response.ok) {
    throw wooRequestError(response.status, payload)
  }

  return { payload, headers: response.headers }
}

function stripHtml(value: unknown) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function toPrice(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function mapWooCustomizationOptions(product: WooCommerceProductNode): ProductCustomizationOptions | undefined {
  const options: ProductCustomizationOptions = {}
  const optionLabels: NonNullable<ProductCustomizationOptions['optionLabels']> = []

  for (const attribute of product.attributes ?? []) {
    const name = String(attribute.name || '').trim()
    const values = (attribute.options ?? []).map(String).filter(Boolean)
    if (!name || values.length === 0) continue

    const normalizedName = name.toLowerCase()
    if (['color', 'colour'].includes(normalizedName)) {
      options.colors = values
      continue
    }
    if (['material', 'fabric', 'finish'].includes(normalizedName)) {
      options.materials = values
      continue
    }
    optionLabels.push({ name, values })
  }

  if (optionLabels.length > 0) {
    options.optionLabels = optionLabels
  }

  return Object.keys(options).length > 0 ? options : undefined
}

function mapWooProduct(product: WooCommerceProductNode): WooCommerceCatalogProduct | null {
  if (product.status !== 'publish') return null

  return {
    externalId: String(product.id),
    name: product.name,
    description: stripHtml(product.short_description || product.description),
    price: toPrice(product.price),
    imageUrl: product.images?.[0]?.src || '',
    productUrl: product.permalink || '',
    handle: product.slug || '',
    sku: product.sku || '',
    category: product.categories?.[0]?.name || '',
    status: 'active',
    source: 'woocommerce',
    ...(mapWooCustomizationOptions(product) ? { customizationOptions: mapWooCustomizationOptions(product) } : {}),
  }
}

export async function testWooCommerceConnection(input: {
  siteUrl: string
  consumerKey: string
  consumerSecret: string
}) {
  const siteUrl = normalizeWooSiteUrl(input.siteUrl)
  const consumerKey = String(input.consumerKey || '').trim()
  const consumerSecret = String(input.consumerSecret || '').trim()

  if (!consumerKey || !consumerSecret) {
    throw new WooCommerceError('Consumer Key and Consumer Secret are both required.')
  }

  await wooFetch(siteUrl, '/products?per_page=1', consumerKey, consumerSecret)

  return { siteUrl }
}

export async function fetchWooCommerceProducts(input: {
  siteUrl: string
  consumerKey: string
  consumerSecret: string
}) {
  const siteUrl = normalizeWooSiteUrl(input.siteUrl)
  const consumerKey = String(input.consumerKey || '').trim()
  const consumerSecret = String(input.consumerSecret || '').trim()

  const products: WooCommerceCatalogProduct[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const { payload, headers } = await wooFetch(
      siteUrl,
      `/products?per_page=${perPage}&page=${page}&status=publish`,
      consumerKey,
      consumerSecret
    )

    const nodes = Array.isArray(payload) ? (payload as WooCommerceProductNode[]) : []
    for (const node of nodes) {
      const mapped = mapWooProduct(node)
      if (mapped) products.push(mapped)
    }

    const totalPages = Number(headers.get('X-WP-TotalPages') || 1)
    if (page >= totalPages || nodes.length === 0) break
    page += 1
  }

  return products
}
