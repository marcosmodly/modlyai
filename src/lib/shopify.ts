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
      } | null
    }>
  } | null
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
              variants(first: 1) {
                edges {
                  node {
                    price
                    sku
                  }
                }
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
