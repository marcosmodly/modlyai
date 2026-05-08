const PLACEHOLDER_HOSTS = new Set([
  'yourstore.com',
  'www.yourstore.com',
  'example.com',
  'www.example.com',
  'example.org',
  'www.example.org',
  'example.net',
  'www.example.net',
  'test.com',
  'www.test.com',
  'demo.com',
  'www.demo.com',
  'placeholder.com',
  'www.placeholder.com',
])

const LOCAL_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
])

function parseProductUrl(url: string): URL | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    return new URL(trimmed)
  } catch {
    try {
      return new URL(`https://${trimmed}`)
    } catch {
      return null
    }
  }
}

export function isRealProductUrl(url?: string | null): boolean {
  if (!url) return false

  const parsed = parseProductUrl(url)
  if (!parsed) return false

  if (!['http:', 'https:'].includes(parsed.protocol)) return false

  const hostname = parsed.hostname.toLowerCase()
  if (!hostname || LOCAL_HOSTS.has(hostname) || PLACEHOLDER_HOSTS.has(hostname)) return false
  if (hostname.endsWith('.yourstore.com')) return false
  if (hostname.endsWith('.example.com') || hostname.endsWith('.example.org') || hostname.endsWith('.example.net')) {
    return false
  }
  if (hostname.endsWith('.localhost')) return false
  if (hostname.endsWith('.test') || hostname.endsWith('.example') || hostname.endsWith('.invalid')) return false

  const fullUrl = parsed.href.toLowerCase()
  return ![
    'yourstore',
    'example',
    'placeholder',
    'demo-only',
    'fake-store',
    'test-store',
  ].some((marker) => fullUrl.includes(marker))
}

export function getRealProductUrl(product: { productUrl?: string; url?: string }): string | undefined {
  const productUrl = product.productUrl?.trim()
  if (isRealProductUrl(productUrl)) return productUrl

  const url = product.url?.trim()
  if (isRealProductUrl(url)) return url

  return undefined
}
