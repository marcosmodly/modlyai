export type ProductIdentityInput = {
  id?: unknown
  storeId?: unknown
  sku?: unknown
  productUrl?: unknown
  url?: unknown
  handle?: unknown
  name?: unknown
  createdAt?: unknown
}

export type ProductIdentityKind = 'sku' | 'url' | 'handle' | 'name'

export type ProductIdentity = {
  kind: ProductIdentityKind
  value: string
  key: string
}

export function normalizeText(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

export function normalizeUrl(value: unknown) {
  const text = String(value ?? '').trim()
  if (!text) return ''

  try {
    const url = new URL(text)
    url.hash = ''
    url.search = ''
    url.hostname = url.hostname.toLowerCase()
    const pathname = url.pathname.replace(/\/+$/, '')
    return `${url.protocol.toLowerCase()}//${url.hostname}${pathname || '/'}`
  } catch {
    return normalizeText(text).replace(/\/+$/, '')
  }
}

export function normalizeSku(value: unknown) {
  return normalizeText(value)
}

export function normalizeHandle(value: unknown) {
  return normalizeText(value).replace(/^\/+|\/+$/g, '')
}

export function getProductIdentity(product: ProductIdentityInput): ProductIdentity[] {
  const storeId = normalizeText(product.storeId)
  if (!storeId) return []

  const identities: Array<[ProductIdentityKind, string]> = [
    ['sku', normalizeSku(product.sku)],
    ['url', normalizeUrl(product.productUrl)],
    ['url', normalizeUrl(product.url)],
    ['handle', normalizeHandle(product.handle)],
    ['name', normalizeText(product.name)],
  ]

  const seen = new Set<string>()

  return identities
    .filter(([, value]) => Boolean(value))
    .map(([kind, value]) => ({
      kind,
      value,
      key: `${storeId}:${kind}:${value}`,
    }))
    .filter((identity) => {
      if (seen.has(identity.key)) return false
      seen.add(identity.key)
      return true
    })
}

export function buildProductIdentityIndex(products: ProductIdentityInput[]) {
  const index = new Map<string, ProductIdentityInput>()

  for (const product of products) {
    for (const identity of getProductIdentity(product)) {
      if (!index.has(identity.key)) {
        index.set(identity.key, product)
      }
    }
  }

  return index
}

export function findProductByIdentity(
  index: Map<string, ProductIdentityInput>,
  product: ProductIdentityInput,
  priority: ProductIdentityKind[]
) {
  const identities = getProductIdentity(product)

  for (const kind of priority) {
    const match = identities.find((identity) => identity.kind === kind)
    if (!match) continue

    const existing = index.get(match.key)
    if (existing) {
      return { product: existing, identity: match }
    }
  }

  return null
}

export function addProductToIdentityIndex(
  index: Map<string, ProductIdentityInput>,
  product: ProductIdentityInput
) {
  for (const identity of getProductIdentity(product)) {
    if (!index.has(identity.key)) {
      index.set(identity.key, product)
    }
  }
}
