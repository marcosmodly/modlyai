import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth-options';
import { getCurrentStoreForUser } from '@/lib/current-store';
import { adminDb, adminDbLenient as db, id } from '@/lib/instant-admin';
import { getCatalogForRequest } from '@/lib/store-catalog';
import { checkProductLimit } from '@/lib/usage-limits';
import { isRealProductUrl } from '@widget/utils/productUrl';

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

function readNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function readStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => String(entry ?? '').trim()).filter(Boolean);
}

function readDimension(value: unknown): { min?: number; max?: number; default?: number } | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const input = value as Record<string, unknown>;
  const min = readNumber(input.min);
  const max = readNumber(input.max);
  const defaultValue = readNumber(input.default);
  if (min === undefined && max === undefined && defaultValue === undefined) return undefined;
  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(defaultValue !== undefined ? { default: defaultValue } : {}),
  };
}

// Manual, single-product creation from the dashboard - separate from the
// bulk CSV/Shopify/WooCommerce import paths, and session-authenticated
// (unlike the GET handler above, which serves the public widget via
// apiKey/domain).
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const store = await getCurrentStoreForUser(session.user);
    if (!store?.id) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json({ error: 'Product name is required.' }, { status: 400 });
    }

    const existingResult = await adminDb.query({
      products: { $: { where: { storeId: store.id } } },
    });
    const existingCount = existingResult.products?.length ?? 0;

    const productLimitCheck = checkProductLimit(store as any, existingCount + 1);
    if (!productLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: productLimitCheck.trialExpired
            ? 'Your free trial has ended. Upgrade to continue using ModlyAI.'
            : `This plan supports up to ${productLimitCheck.limit} products. Upgrade to add more.`,
        },
        { status: 403 }
      );
    }

    const price = readNumber(body.price);
    if (body.price !== undefined && (price === undefined || price < 0)) {
      return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 });
    }

    const colors = readStringList(body.colors);
    const materials = readStringList(body.materials);
    const dimensionsInput = body.dimensions && typeof body.dimensions === 'object' ? body.dimensions : {};
    const width = readDimension(dimensionsInput.width);
    const length = readDimension(dimensionsInput.length);
    const height = readDimension(dimensionsInput.height);

    const customizationOptions: Record<string, unknown> = {
      ...(colors.length > 0 ? { colors } : {}),
      ...(materials.length > 0 ? { materials } : {}),
      ...(width || length || height
        ? {
            dimensions: {
              ...(width ? { width } : {}),
              ...(length ? { length } : {}),
              ...(height ? { height } : {}),
            },
          }
        : {}),
    };

    const now = new Date().toISOString();
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : '';
    const productId = id();

    const productUrl = typeof body.productUrl === 'string' ? body.productUrl.trim() : '';
    if (productUrl && !isRealProductUrl(productUrl)) {
      return NextResponse.json({ error: 'Product page URL must be a valid link to your store.' }, { status: 400 });
    }
    const sku = typeof body.sku === 'string' ? body.sku.trim() : '';

    const productWrite = {
      storeId: store.id,
      name,
      price: price ?? 0,
      description: typeof body.description === 'string' ? body.description.trim() : '',
      imageUrl,
      image: imageUrl,
      category: typeof body.category === 'string' ? body.category.trim() : '',
      status: typeof body.status === 'string' ? body.status.trim() : 'active',
      source: 'manual',
      colors: colors.join('|'),
      materials: materials.join('|'),
      customizationOptions: Object.keys(customizationOptions).length > 0 ? customizationOptions : null,
      width: width?.default,
      length: length?.default,
      height: height?.default,
      productUrl,
      url: productUrl,
      sku,
      createdAt: now,
      updatedAt: now,
    };

    await db.transact([db.tx.products[productId].update(productWrite)]);

    return NextResponse.json({ success: true, id: productId });
  } catch (error) {
    console.error('[Products] Failed to create product:', error);
    return NextResponse.json({ error: 'Unable to create product.' }, { status: 500 });
  }
}
