import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb, adminDbLenient as db, id } from '@/lib/instant-admin'
import {
  addProductToIdentityIndex,
  buildProductIdentityIndex,
  findProductByIdentity,
} from '@/lib/product-dedupe'
import { fetchShopifyProducts, getValidShopifyAccessToken, ShopifyError } from '@/lib/shopify'
import { checkProductLimit } from '@/lib/usage-limits'

type ShopifyInstantEntity = 'stores' | 'products' | 'syncEvents' | 'events'

const SENSITIVE_FIELD_NAMES = new Set(['shopifyAccessToken'])

function safeFieldNames(payload: Record<string, unknown>) {
  return Object.keys(payload).filter((field) => !SENSITIVE_FIELD_NAMES.has(field))
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function logInstantTransactionAttempt(
  entity: ShopifyInstantEntity,
  payload: Record<string, unknown>,
  options?: { instantDbIdIsUuid?: boolean }
) {
  console.log('InstantDB Shopify transaction', {
    entity,
    ...(options ? { instantDbIdIsUuid: options.instantDbIdIsUuid } : {}),
    fields: safeFieldNames(payload),
  })
}

function logInstantTransactionFailure(
  entity: ShopifyInstantEntity,
  payload: Record<string, unknown>,
  error: unknown,
  options?: { instantDbIdIsUuid?: boolean }
) {
  console.error('InstantDB Shopify transaction failed', {
    message: error instanceof Error ? error.message : String(error),
    entity,
    ...(options ? { instantDbIdIsUuid: options.instantDbIdIsUuid } : {}),
    fields: safeFieldNames(payload),
  })
}

function readCredentials(value: unknown): Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value) ? { ...(value as Record<string, any>) } : {}
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const storeId = typeof body.storeId === 'string' ? body.storeId : ''

    if (!storeId) {
      return NextResponse.json({ error: 'storeId is required.' }, { status: 400 })
    }

    if (storeId !== session.user.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await adminDb.query({
      stores: {
        $: { where: { id: storeId } },
      },
      products: {
        $: { where: { storeId } },
      },
    })

    const store = result.stores[0]
    if (!store) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 })
    }

    const credentials = readCredentials(store.credentials)
    const shopifyCredentials = readCredentials(credentials.shopify)
    const shopifyStoreDomain = typeof shopifyCredentials.storeDomain === 'string' ? shopifyCredentials.storeDomain : ''
    const storedShopifyAccessToken = typeof shopifyCredentials.accessToken === 'string' ? shopifyCredentials.accessToken : ''

    if (!shopifyStoreDomain) {
      return NextResponse.json(
        { error: 'Connect Shopify before syncing products.' },
        { status: 400 }
      )
    }

    if (!storedShopifyAccessToken) {
      return NextResponse.json(
        { error: 'Shopify is connected but missing an access token. Reconnect Shopify.' },
        { status: 400 }
      )
    }

    const existingProducts = result.products ?? []
    const trialCheck = checkProductLimit(store, existingProducts.length)
    const productIndex = buildProductIdentityIndex(existingProducts)

    if (trialCheck.trialExpired) {
      return NextResponse.json(
        { error: 'Your free trial has ended. Upgrade to continue using ModlyAI.' },
        { status: 403 }
      )
    }

    const shopifyAccessToken = await getValidShopifyAccessToken({
      shopifyStoreDomain,
      shopifyAccessToken: storedShopifyAccessToken,
    })

    const shopifyProducts = await fetchShopifyProducts({
      shopifyStoreDomain,
      shopifyAccessToken,
    })

    const now = new Date().toISOString()
    let createdCount = 0
    let updatedCount = 0
    let skippedCount = 0

    const productTransactionItems = shopifyProducts.map((product) => {
      const productUrl = product.handle ? `https://${shopifyStoreDomain}/products/${product.handle}` : product.productUrl || ''
      const identityInput = {
        storeId,
        sku: product.sku || '',
        productUrl,
        url: productUrl,
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
        price: Number.isFinite(product.price) ? product.price : 0,
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        productUrl,
        url: productUrl,
        handle: product.handle || '',
        sku: product.sku || '',
        category: product.category || '',
        status: product.status || '',
        createdAt: existingProduct?.createdAt ? String(existingProduct.createdAt) : now,
        ...(isUpdate ? { updatedAt: now } : {}),
      }

      if (isUpdate) {
        updatedCount += 1
      } else {
        createdCount += 1
      }

      addProductToIdentityIndex(productIndex, { id: productId, ...productUpdate } as any)

      return {
        tx: db.tx.products[productId].update(productUpdate),
        entity: 'products' as const,
        payload: productUpdate,
        instantDbIdIsUuid: isUuid(productId),
      }
    })

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
    const catalogTransactionItems = [
      ...productTransactionItems,
    ]
    const productLogPayload = {
      storeId: '',
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      productUrl: '',
      url: '',
      handle: '',
      sku: '',
      category: '',
      status: '',
      createdAt: '',
    }
    for (let i = 0; i < catalogTransactionItems.length; i += BATCH_SIZE) {
      const batch = catalogTransactionItems.slice(i, i + BATCH_SIZE)
      const productIdIsUuid = batch
        .filter((item) => item.entity === 'products' && Object.keys(item.payload).length > 0)
        .every((item) => item.instantDbIdIsUuid)

      try {
        logInstantTransactionAttempt('products', productLogPayload, { instantDbIdIsUuid: productIdIsUuid })
        await db.transact(batch.map((item) => item.tx))
      } catch (error) {
        logInstantTransactionFailure('products', productLogPayload, error, { instantDbIdIsUuid: productIdIsUuid })
        throw error
      }
    }

    const storeUpdate = {
      credentials: {
        ...credentials,
        shopify: {
          ...shopifyCredentials,
          lastSyncedAt: now,
        },
      },
    }

    try {
      logInstantTransactionAttempt('stores', storeUpdate)
      await adminDb.transact([
        adminDb.tx.stores[storeId].update(storeUpdate),
      ])
    } catch (error) {
      logInstantTransactionFailure('stores', storeUpdate, error)
      throw error
    }

    return NextResponse.json({
      success: true,
      synced: shopifyProducts.length,
      created: createdCount,
      updated: updatedCount,
      skipped: skippedCount,
      totalProcessed: shopifyProducts.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to sync Shopify products.'
    const status = error instanceof ShopifyError ? error.status : 500
    return NextResponse.json({ error: message }, { status })
  }
}
