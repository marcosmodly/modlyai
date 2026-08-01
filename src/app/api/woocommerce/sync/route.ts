import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb, adminDbLenient as db, id } from '@/lib/instant-admin'
import {
  addProductToIdentityIndex,
  buildProductIdentityIndex,
  findProductByIdentity,
} from '@/lib/product-dedupe'
import { fetchWooCommerceProducts, WooCommerceError } from '@/lib/woocommerce'
import { checkProductLimit } from '@/lib/usage-limits'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const storeId = typeof body.storeId === 'string' ? body.storeId : ''

    if (!storeId || storeId !== session.user.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      stores: { $: { where: { id: storeId } } },
      products: { $: { where: { storeId } } },
    })

    const store = result.stores[0]
    if (!store) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 })
    }

    const siteUrl = String(store.wooSiteUrl || '').trim()
    const consumerKey = String(store.wooKey || '').trim()
    const consumerSecret = String(store.wooSecret || '').trim()

    if (!siteUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Connect WooCommerce before syncing products.' }, { status: 400 })
    }

    const existingProducts = result.products ?? []
    const trialCheck = checkProductLimit(store, existingProducts.length)
    if (trialCheck.trialExpired) {
      return NextResponse.json(
        { error: 'Your free trial has ended. Upgrade to continue using ModlyAI.' },
        { status: 403 }
      )
    }

    const productIndex = buildProductIdentityIndex(existingProducts)
    const wooProducts = await fetchWooCommerceProducts({ siteUrl, consumerKey, consumerSecret })

    const now = new Date().toISOString()
    let createdCount = 0
    let updatedCount = 0
    const matchedProductIds = new Set<string>()

    const productTransactionItems = wooProducts.map((product) => {
      const identityInput = {
        storeId,
        sku: product.sku || '',
        productUrl: product.productUrl,
        url: product.productUrl,
        handle: product.handle || '',
        name: product.name || '',
      }
      const existingMatch = findProductByIdentity(productIndex, identityInput, ['url', 'handle', 'sku', 'name'])
      const existingProduct = existingMatch?.product as any
      const productId = existingProduct?.id ? String(existingProduct.id) : id()
      const isUpdate = Boolean(existingProduct?.id)

      const productUpdate = {
        storeId,
        name: product.name || '',
        price: product.price,
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        productUrl: product.productUrl,
        url: product.productUrl,
        handle: product.handle || '',
        sku: product.sku || '',
        category: product.category || '',
        status: product.status || '',
        source: 'woocommerce',
        customizationOptions: product.customizationOptions ?? null,
        createdAt: existingProduct?.createdAt ? String(existingProduct.createdAt) : now,
        ...(isUpdate ? { updatedAt: now } : {}),
      }

      if (isUpdate) {
        updatedCount += 1
        matchedProductIds.add(productId)
      } else {
        createdCount += 1
      }

      addProductToIdentityIndex(productIndex, { id: productId, ...productUpdate } as any)

      return db.tx.products[productId].update(productUpdate)
    })

    // Reconcile: remove previously-synced WooCommerce products that are no
    // longer returned by this fetch (deleted on WooCommerce's side). Scoped
    // to source: 'woocommerce' only, so CSV/manual products are untouched.
    // Guarded on a non-empty fetch so a transient empty response can't wipe
    // out the whole synced catalog.
    const staleWooProducts =
      wooProducts.length > 0
        ? existingProducts.filter(
            (product: any) => product.source === 'woocommerce' && !matchedProductIds.has(String(product.id))
          )
        : []
    const removedCount = staleWooProducts.length
    const productDeleteItems = staleWooProducts.map((product: any) =>
      db.tx.products[String(product.id)].delete()
    )

    const nextProductCount = existingProducts.length + createdCount
    const productLimitCheck = checkProductLimit(store, nextProductCount)
    if (!productLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: productLimitCheck.trialExpired
            ? 'Your free trial has ended. Upgrade to continue using ModlyAI.'
            : `This plan supports up to ${productLimitCheck.limit} products. Upgrade to sync more.`,
        },
        { status: 403 }
      )
    }

    const BATCH_SIZE = 25
    const catalogTransactionItems = [...productTransactionItems, ...productDeleteItems]
    for (let i = 0; i < catalogTransactionItems.length; i += BATCH_SIZE) {
      const batch = catalogTransactionItems.slice(i, i + BATCH_SIZE)
      await db.transact(batch)
    }

    await adminDb.transact([
      adminDb.tx.stores[storeId].update({ wooLastSyncedAt: now }),
    ])

    return NextResponse.json({
      success: true,
      synced: wooProducts.length,
      created: createdCount,
      updated: updatedCount,
      removed: removedCount,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to sync WooCommerce products.'
    const status = error instanceof WooCommerceError ? error.status : 500
    return NextResponse.json({ error: message }, { status })
  }
}
