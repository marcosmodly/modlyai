import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { removeShopifyWidgetScriptTag } from '@/lib/shopify'

function readCredentials(value: unknown): Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value) ? { ...(value as Record<string, any>) } : {}
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeId = session.user.storeId
    const result = await adminDb.query({ stores: { $: { where: { id: storeId } } } })
    const store = result.stores?.[0]

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const credentials = readCredentials(store.credentials)
    const shopifyCredentials = readCredentials(credentials.shopify)
    const storeDomain = typeof shopifyCredentials.storeDomain === 'string' ? shopifyCredentials.storeDomain : ''
    const accessToken = typeof shopifyCredentials.accessToken === 'string' ? shopifyCredentials.accessToken : ''

    // Best-effort: remove the auto-installed script tag from the storefront
    // before clearing the token, so the widget doesn't keep appearing after
    // disconnect. Uses the token we're about to remove, so this has to run
    // first - and it must not block the disconnect itself if it fails (e.g.
    // token already revoked on Shopify's side).
    if (storeDomain && accessToken) {
      try {
        await removeShopifyWidgetScriptTag({ shopifyStoreDomain: storeDomain, shopifyAccessToken: accessToken })
      } catch (scriptTagError) {
        console.error('[Shopify disconnect] Failed to remove script tag:', {
          message: scriptTagError instanceof Error ? scriptTagError.message : String(scriptTagError),
          storeId,
        })
      }
    }

    const { shopify: _removed, ...remainingCredentials } = credentials

    // Remove only products that came FROM Shopify (source: 'shopify') - not
    // the merchant's whole catalog. CSV-uploaded or manually-added products
    // stay untouched, since disconnecting one integration shouldn't wipe data
    // that didn't come from it.
    const productsResult = await adminDb.query({
      products: { $: { where: { storeId, source: 'shopify' } } },
    })
    const productDeletes = (productsResult.products ?? []).map((product: { id: string }) =>
      adminDb.tx.products[product.id].delete()
    )

    await adminDb.transact([
      adminDb.tx.stores[storeId].update({ credentials: remainingCredentials }),
      ...productDeletes,
    ])

    return NextResponse.json({ success: true, removedProducts: productDeletes.length })
  } catch (error) {
    console.error('[Shopify disconnect] Failed:', error)
    return NextResponse.json({ error: 'Unable to disconnect Shopify.' }, { status: 500 })
  }
}
