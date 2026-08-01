import { NextResponse } from 'next/server'
import { WIDGET_JS_CONTENT } from '@/generated/widget-bundle'

// Serves the widget bundle as a real route instead of a static /public file.
// Vercel's static-asset serving for /public ignores both next.config.js's
// and vercel.json's headers config for this file - Cache-Control never
// changed no matter which one we set, even after a Cloudflare purge and a
// fresh origin fetch. A dynamic route sets headers in actual application
// code, which Vercel can't silently override.
export const dynamic = 'force-dynamic'

export async function GET() {
  return new NextResponse(WIDGET_JS_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      // Vercel's own edge network caches responses independently of the
      // plain Cache-Control value using these CDN-specific headers - without
      // them it was still injecting its own Last-Modified/cache behavior on
      // top of what this route returned, observed via a mismatched
      // Last-Modified timestamp this route never sets.
      'Cache-Control': 'no-cache, must-revalidate',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
