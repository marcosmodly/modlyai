import { NextRequest, NextResponse } from 'next/server';
import { getCatalogFromPayload } from '@/lib/store-catalog';
import { DEMO_CATALOG } from '@/lib/demo-catalog';
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors';

// Serves the /demo page's fictional catalog in the same shape as
// /api/catalog/items. Without this, FurnitureCustomizerWidget's "Select
// Product" list falls back to the widget package's own hardcoded sample
// products (widget/src/data/products.ts), whose image paths don't exist in
// this app's public/ directory - real catalog, real images, no storeId
// lookup needed.
async function handleGET() {
  const result = getCatalogFromPayload({ source: 'manual', products: DEMO_CATALOG });

  return NextResponse.json({
    items: result?.items ?? [],
    catalog: {
      products: result?.products ?? [],
      source: result?.source ?? 'manual',
      count: result?.count ?? 0,
    },
    meta: { source: 'demo' },
  });
}

export async function GET(request: NextRequest) {
  return withPublicWidgetCors(await handleGET());
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse();
}
