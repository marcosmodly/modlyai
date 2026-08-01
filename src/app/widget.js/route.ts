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
      'Cache-Control': 'no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
