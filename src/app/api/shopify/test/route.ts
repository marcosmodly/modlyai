import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { ShopifyError, testShopifyConnection } from '@/lib/shopify'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      stores: {
        $: { where: { id: session.user.storeId } },
      },
    })
    const store = result.stores[0]

    if (!store?.shopifyStoreDomain || !store?.shopifyAccessToken) {
      return NextResponse.json({ error: 'Connect Shopify before testing.' }, { status: 400 })
    }

    await testShopifyConnection({
      shopifyStoreDomain: String(store.shopifyStoreDomain),
      shopifyAccessToken: String(store.shopifyAccessToken),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to test Shopify connection.'
    const status = error instanceof ShopifyError ? error.status : 500
    return NextResponse.json({ error: message }, { status })
  }
}
