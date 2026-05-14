import { NextRequest, NextResponse } from 'next/server';
import { getCatalogForRequest } from '@/lib/store-catalog';
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors';

async function handleGET(request: NextRequest) {
  const storeId = request.nextUrl.searchParams.get('storeId');
  const widgetId = request.nextUrl.searchParams.get('widgetId');
  const apiKey = request.nextUrl.searchParams.get('apiKey');
  const storeDomain =
    request.nextUrl.searchParams.get('domain') ??
    request.headers.get('x-store-domain') ??
    undefined;
  const domain = storeDomain ?? request.headers.get('referer') ?? undefined;

  const { items, products, catalog, store, source } = await getCatalogForRequest({ storeId, widgetId, apiKey, domain });

  return NextResponse.json({
    items,
    catalog: {
      products,
      source: catalog.source,
      count: catalog.count,
    },
    meta: {
      source,
      storeId: store?.id ?? null,
      storeName: store?.name ?? null,
    },
  });
}

export async function GET(request: NextRequest) {
  return withPublicWidgetCors(await handleGET(request));
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse();
}
