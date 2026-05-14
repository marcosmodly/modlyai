import type { ProductCustomizationOptions } from '@/lib/product-customization'

const SHOPIFY_API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2026-01'

type ShopifyGraphQLError = {
  message?: string
  extensions?: {
    code?: string
  }
}

type ShopifyProductNode = {
  id: string
  title: string
  handle: string
  descriptionHtml?: string | null
  productType?: string | null
  status?: string | null
  featuredImage?: {
    url?: string | null
  } | null
  variants?: {
    edges?: Array<{
      node?: {
        price?: string | null
        sku?: string | null
        selectedOptions?: Array<{
          name?: string | null
          value?: string | null
        }> | null
      } | null
    }>
  } | null
  options?: Array<{
    name?: string | null
    values?: string[] | null
  }> | null
}

type ShopifyProductsResponse = {
  products: {
    edges: Array<{ cursor: string; node: ShopifyProductNode }>
    pageInfo: { hasNextPage: boolean }
  }
}

export type ShopifyCatalogProduct = {
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
  source: 'shopify'
  customizationOptions?: ProductCustomizationOptions
}

type ShopifyCredentialInput = {
  shopifyStoreDomain: string
  shopifyAccessToken: string
}

export class ShopifyError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'ShopifyError'
    this.status = status
  }
}

export function normalizeShopifyDomain(value: unknown) {
  const domain = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')

  if (!domain) {
    throw new ShopifyError('Shopify store domain is required.')
  }

  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) {
    throw new ShopifyError('Enter a valid Shopify domain like your-store.myshopify.com.')
  }

  return domain
}

export function stripHtml(value: unknown) {
  return String(value || '')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
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

function uniq(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))
}

type ShopifyVariantOption = {
  price: number
  selectedOptions: Record<string, string>
}

function selectedOptionsMap(
  selectedOptions?: Array<{ name?: string | null; value?: string | null }> | null
) {
  return Object.fromEntries(
    (selectedOptions ?? [])
      .map((option: { name?: string | null; value?: string | null }) => [
        String(option?.name || '').trim(),
        String(option?.value || '').trim(),
      ])
      .filter(([name, value]) => name && value)
  )
}

function getVariantOptions(product: ShopifyProductNode): ShopifyVariantOption[] {
  return (product.variants?.edges ?? [])
    .map((edge) => edge.node)
    .filter(Boolean)
    .map((variant) => ({
      price: toPrice(variant?.price),
      selectedOptions: selectedOptionsMap(variant?.selectedOptions),
    }))
}

function getSafeOptionPriceMap(
  product: ShopifyProductNode,
  optionName: string,
  values: string[],
  basePrice: number
): Map<string, number> {
  const variants = getVariantOptions(product)
  const baseVariant = variants[0]
  const prices = new Map<string, number>()

  if (!baseVariant) return prices

  for (const value of values) {
    const matchingVariants = variants.filter((variant) => {
      if (variant.selectedOptions[optionName] !== value) return false

      return Object.entries(baseVariant.selectedOptions).every(([name, baseValue]) => {
        return name === optionName || variant.selectedOptions[name] === baseValue
      })
    })

    const matchingPrices = uniq(matchingVariants.map((variant) => String(variant.price)))
    if (matchingPrices.length !== 1) continue

    const price = Number(matchingPrices[0])
    if (!Number.isFinite(price)) continue

    prices.set(value.toLowerCase(), Number((price - basePrice).toFixed(2)))
  }

  return prices
}

function applySafeOptionPrices(
  product: ShopifyProductNode,
  optionName: string,
  values: string[],
  basePrice: number
) {
  const priceMap = getSafeOptionPriceMap(product, optionName, values, basePrice)

  return values.map((value) => {
    const price = priceMap.get(value.toLowerCase())
    return price === undefined ? value : { name: value, price }
  })
}

function parseShopifyDimensionValues(values: string[]): ProductCustomizationOptions['dimensions'] | undefined {
  const numbers = values.flatMap((value) => {
    const matches = value.match(/\d+(?:\.\d+)?/g)
    return matches ? matches.map(Number).filter(Number.isFinite) : []
  })

  if (numbers.length === 0) return undefined

  const first = numbers[0]
  return {
    width: { default: first, unit: 'in' },
  }
}

function mapShopifyCustomizationOptions(product: ShopifyProductNode): ProductCustomizationOptions | undefined {
  const options: ProductCustomizationOptions = {}
  const optionLabels: NonNullable<ProductCustomizationOptions['optionLabels']> = []
  const shopifyOptions: NonNullable<ProductCustomizationOptions['shopifyOptions']> = []
  const basePrice = toPrice(product.variants?.edges?.[0]?.node?.price)

  for (const option of product.options ?? []) {
    const name = String(option.name || '').trim()
    const values = uniq((option.values ?? []).map(String))
    if (!name || values.length === 0) continue

    const normalizedName = name.toLowerCase()
    const pricedValues = applySafeOptionPrices(product, name, values, basePrice)
    if (['color', 'colour', 'fabric color'].includes(normalizedName)) {
      options.colors = pricedValues
      continue
    }

    if (['material', 'fabric', 'finish'].includes(normalizedName)) {
      options.materials = pricedValues
      continue
    }

    if (['size', 'dimensions'].includes(normalizedName)) {
      const dimensions = parseShopifyDimensionValues(values)
      if (dimensions) {
        options.dimensions = { ...options.dimensions, ...dimensions }
      }
      optionLabels.push({ name, values: pricedValues })
      shopifyOptions.push({ name, values: pricedValues })
      continue
    }

    optionLabels.push({ name, values: pricedValues })
    shopifyOptions.push({ name, values: pricedValues })
  }

  if (optionLabels.length > 0) {
    options.optionLabels = optionLabels
  }
  if (shopifyOptions.length > 0) {
    options.shopifyOptions = shopifyOptions
  }

  return Object.keys(options).length > 0 ? options : undefined
}

function shopifyRequestError(status: number, body: unknown) {
  if (status === 401 || status === 403) {
    return new ShopifyError('Shopify rejected the Admin API access token. Check that the Dev Dashboard app is installed and has read_products access.', 401)
  }

  const text = typeof body === 'string' ? body : JSON.stringify(body)
  return new ShopifyError(`Shopify request failed with status ${status}${text ? `: ${text.slice(0, 160)}` : ''}`, 502)
}

function graphQlError(errors: ShopifyGraphQLError[]) {
  const missingScope = errors.some((error) => {
    const text = `${error.message || ''} ${error.extensions?.code || ''}`.toLowerCase()
    return text.includes('access denied') || text.includes('permission') || text.includes('scope')
  })

  if (missingScope) {
    return new ShopifyError('Shopify token is missing read_products access.', 403)
  }

  return new ShopifyError(errors.map((error) => error.message).filter(Boolean).join('; ') || 'Shopify returned an API error.', 502)
}

async function shopifyGraphQl<TData>(
  shopifyStoreDomain: string,
  shopifyAccessToken: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<TData> {
  const domain = normalizeShopifyDomain(shopifyStoreDomain)
  const token = String(shopifyAccessToken || '').trim()

  if (!token) {
    throw new ShopifyError('Connect Shopify before making Admin API requests.')
  }

  let response: Response
  try {
    response = await fetch(`https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    })
  } catch {
    throw new ShopifyError('Could not reach Shopify. Check the store domain and try again.', 502)
  }

  const text = await response.text()
  let payload: any = {}
  try {
    payload = text ? JSON.parse(text) : {}
  } catch {
    payload = text
  }

  if (!response.ok) {
    throw shopifyRequestError(response.status, payload)
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw graphQlError(payload.errors)
  }

  return payload.data as TData
}

export async function getValidShopifyAccessToken(input: ShopifyCredentialInput) {
  normalizeShopifyDomain(input.shopifyStoreDomain)
  const accessToken = String(input.shopifyAccessToken || '').trim()

  if (!accessToken) {
    throw new ShopifyError('Connect Shopify before syncing products.')
  }

  return accessToken
}

function mapShopifyProduct(domain: string, product: ShopifyProductNode): ShopifyCatalogProduct | null {
  if (String(product.status || '').toUpperCase() !== 'ACTIVE') return null

  const firstVariant = product.variants?.edges?.[0]?.node
  const customizationOptions = mapShopifyCustomizationOptions(product)

  return {
    externalId: product.id,
    name: product.title,
    description: stripHtml(product.descriptionHtml),
    price: toPrice(firstVariant?.price),
    imageUrl: product.featuredImage?.url || '',
    productUrl: product.handle ? `https://${domain}/products/${product.handle}` : '',
    handle: product.handle || '',
    sku: firstVariant?.sku || '',
    category: product.productType || '',
    status: 'active',
    source: 'shopify',
    ...(customizationOptions ? { customizationOptions } : {}),
  }
}

export async function testShopifyConnection(input: {
  shopifyStoreDomain: string
  shopifyAccessToken: string
}) {
  const domain = normalizeShopifyDomain(input.shopifyStoreDomain)
  const accessToken = await getValidShopifyAccessToken(input)

  await shopifyGraphQl(
    domain,
    accessToken,
    `query TestShopifyProducts {
      products(first: 1, query: "status:active") {
        edges {
          node {
            id
          }
        }
      }
    }`
  )

  return { domain }
}

export async function fetchShopifyProducts(input: {
  shopifyStoreDomain: string
  shopifyAccessToken: string
}) {
  const domain = normalizeShopifyDomain(input.shopifyStoreDomain)
  const products: ShopifyCatalogProduct[] = []
  let cursor: string | null = null
  let hasNextPage = true

  while (hasNextPage) {
    const data: ShopifyProductsResponse = await shopifyGraphQl<ShopifyProductsResponse>(
      domain,
      input.shopifyAccessToken,
      `query SyncShopifyProducts($cursor: String) {
        products(first: 100, after: $cursor, query: "status:active") {
          edges {
            cursor
            node {
              id
              title
              handle
              descriptionHtml
              productType
              status
              featuredImage {
                url
              }
              variants(first: 100) {
                edges {
                  node {
                    price
                    sku
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                name
                values
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }`,
      { cursor }
    )

    for (const edge of data.products.edges) {
      const mapped = mapShopifyProduct(domain, edge.node)
      if (mapped) products.push(mapped)
    }

    hasNextPage = data.products.pageInfo.hasNextPage
    cursor = data.products.edges.at(-1)?.cursor ?? null
  }

  return products
}
