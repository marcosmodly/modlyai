import { NextRequest, NextResponse } from 'next/server';
import { getCatalogForRequest } from '@/lib/store-catalog';

export async function GET(request: NextRequest) {
  const apiKey = request.nextUrl.searchParams.get('apiKey');
  const domain = request.nextUrl.searchParams.get('domain');

  if (!apiKey && !domain) {
    return NextResponse.json({ error: 'API key or domain is required' }, { status: 401 });
  }

  const { items, store } = await getCatalogForRequest({ apiKey, domain });

  if (!store) {
    return NextResponse.json({ error: 'Invalid API key or domain' }, { status: 401 });
  }

  return NextResponse.json(items);
}
