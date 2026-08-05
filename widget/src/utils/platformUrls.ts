export type Platform = 'shopify' | 'woocommerce' | 'custom' | 'unknown';

export function buildProductUrl(domain: string, handle: string, platform?: string): string | undefined {
  switch (platform) {
    case 'shopify':
      return `https://${domain}/products/${handle}`;
    case 'woocommerce':
      return `https://${domain}/product/${handle}`;
    default:
      return undefined;
  }
}

export function buildSearchUrl(domain: string, term: string, platform?: string): string | undefined {
  const q = encodeURIComponent(term);
  switch (platform) {
    case 'shopify':
      return `https://${domain}/search?q=${q}`;
    case 'woocommerce':
      return `https://${domain}/?s=${q}&post_type=product`;
    default:
      return undefined;
  }
}
