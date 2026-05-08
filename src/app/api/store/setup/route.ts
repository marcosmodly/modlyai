import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { syncStoreCatalog } from '@/lib/store-catalog'

const supportedPlatforms = ['shopify', 'woocommerce', 'csv', 'other'] as const

function normalizeDomain(value?: string) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      storeId,
      storeUrl,
      platform,
      wooKey,
      wooSecret,
      csvText,
    } = await req.json()

    if (storeId !== session.user.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (typeof storeUrl !== 'string' || !storeUrl.trim()) {
      return NextResponse.json({ error: 'Store URL is required' }, { status: 400 })
    }

    if (
      typeof platform !== 'string' ||
      !supportedPlatforms.includes(platform as (typeof supportedPlatforms)[number])
    ) {
      return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 })
    }

    const storeResult = await adminDb.query({
      stores: {
        $: { where: { id: storeId } },
      },
    })

    const store = storeResult.stores[0]

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const now = new Date().toISOString()
    const nextCatalogSource = platform === 'other' ? 'custom' : platform

    await adminDb.transact([
      adminDb.tx.stores[storeId].update({
        url: storeUrl.trim(),
        domain: normalizeDomain(storeUrl),
        platform,
        catalogSource: nextCatalogSource,
        credentials:
          platform === 'shopify'
            ? { type: 'shopify_pending' }
            : platform === 'woocommerce'
              ? {
                  wooKey: typeof wooKey === 'string' ? wooKey : '',
                  wooSecret: typeof wooSecret === 'string' ? wooSecret : '',
                }
              : platform === 'csv'
                ? { hasCsvUpload: Boolean(typeof csvText === 'string' && csvText.trim()) }
                : { type: 'custom' },
        wooKey: platform === 'woocommerce' && typeof wooKey === 'string' ? wooKey : undefined,
        wooSecret: platform === 'woocommerce' && typeof wooSecret === 'string' ? wooSecret : undefined,
        setupComplete: true,
        updatedAt: now,
      }),
    ])

    if (platform === 'csv' && typeof csvText === 'string' && csvText.trim() && store.apiKey) {
      await syncStoreCatalog({
        apiKey: String(store.apiKey),
        csvText,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to complete setup'
    console.error('Store setup error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
