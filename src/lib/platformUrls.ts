export type Platform = 'shopify' | 'woocommerce' | 'custom' | 'unknown'

export function buildProductUrl(domain: string, handle: string, platform?: string): string | undefined {
  switch (platform) {
    case 'shopify':
      return `https://${domain}/products/${handle}`
    case 'woocommerce':
      return `https://${domain}/product/${handle}`
    default:
      return undefined
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

// No store-creation flow writes a real 'shopify' | 'woocommerce' value to
// store.platform today - the only writer is the CSV import path, which sets
// it to 'csv' as a catalog-source marker (duplicating catalogSource), not a
// website-platform marker. So this infers the platform from connection
// state that actually gets written (Shopify OAuth credentials, WooCommerce
// site URL) and only trusts an explicit store.platform when it names a real
// platform - never 'csv'.
export function resolveStorePlatform(store: unknown): Platform {
  if (!isRecord(store)) return 'unknown'

  const credentials = store.credentials
  const shopifyCredentials = isRecord(credentials) ? credentials.shopify : undefined
  if (
    isRecord(shopifyCredentials) &&
    typeof shopifyCredentials.storeDomain === 'string' &&
    shopifyCredentials.storeDomain.trim()
  ) {
    return 'shopify'
  }

  if (typeof store.wooSiteUrl === 'string' && store.wooSiteUrl.trim()) {
    return 'woocommerce'
  }

  const explicit = typeof store.platform === 'string' ? store.platform.trim().toLowerCase() : ''
  if (explicit === 'shopify' || explicit === 'woocommerce' || explicit === 'custom') {
    return explicit
  }

  return 'unknown'
}
