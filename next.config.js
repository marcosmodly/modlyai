/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.paddle.com https://sandbox-cdn.paddle.com https://public.profitwell.com https://ajax.googleapis.com",
      "frame-src 'self' https://sandbox-buy.paddle.com https://buy.paddle.com",
      "connect-src 'self' https://sandbox-checkout-service.paddle.com https://checkout-service.paddle.com https://sandbox-buy.paddle.com https://buy.paddle.com https://cdn.paddle.com wss://api.instantdb.com https://api.instantdb.com https://ajax.googleapis.com",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://sandbox-cdn.paddle.com",
    ].join('; '),
  },
]

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@instantdb/admin',
      '@instantdb/core',
      '@instantdb/react',
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.modlyai.tech' }],
        destination: 'https://modlyai.tech/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Overrides Vercel/CDN's default long static-asset cache (was 4h,
        // causing stale widget code to keep serving for hours after every
        // deploy - the exact issue that made "did you clear your cache"
        // debugging necessary all afternoon). no-cache forces every layer
        // (browser, Cloudflare, Vercel's edge) to revalidate with the origin
        // on every request via ETag/Last-Modified - cheap 304s when nothing
        // changed, instant freshness the moment something does. A max-age
        // value turned out to keep getting partially overridden by Vercel's
        // own static-asset defaults, so this avoids that ambiguity entirely.
        source: '/widget.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, must-revalidate',
          },
        ],
      },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
}

module.exports = nextConfig
