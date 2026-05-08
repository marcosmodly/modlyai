import { NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { adminDbLenient as db, id } from '@/lib/instant-admin'
import {
  addProductToIdentityIndex,
  buildProductIdentityIndex,
  findProductByIdentity,
} from '@/lib/product-dedupe'
import { checkProductLimit, findStoreForUsage } from '@/lib/usage-limits'

type CsvRow = Record<string, string | undefined>

function readCsvString(row: CsvRow, ...columns: string[]) {
  for (const column of columns) {
    const value = row[column]?.trim()
    if (value) return value
  }
  return ''
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const storeId = formData.get('storeId') as string

    if (!file || !storeId) {
      return NextResponse.json({ error: 'CSV file and storeId are required' }, { status: 400 })
    }

    const text = await file.text()

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CsvRow[]

    if (records.length === 0) {
      return NextResponse.json({ error: 'CSV contained no products' }, { status: 400 })
    }

    const usageStore = await findStoreForUsage({ storeId })
    const existingResult = await db.query({
      products: {
        $: { where: { storeId } },
      },
    })
    const existingProducts = existingResult.products ?? []
    const productIndex = buildProductIdentityIndex(existingProducts)
    let createdCount = 0
    let updatedCount = 0
    let skippedCount = 0

    const now = new Date().toISOString()
    const productWrites = records.map((row: CsvRow) => {
      const productUrl = readCsvString(row, 'productUrl', 'url')
      const handle = readCsvString(row, 'handle')
      const identityInput = {
        storeId,
        sku: row.sku || '',
        productUrl,
        url: productUrl,
        handle,
        name: row.name || '',
      }
      const existingMatch = findProductByIdentity(productIndex, identityInput, ['sku', 'url', 'handle', 'name'])
      const existingProduct = existingMatch?.product as any
      const productId = existingProduct?.id ? String(existingProduct.id) : id()
      const isUpdate = Boolean(existingProduct?.id)
      const productUpdate = {
        storeId,
        name: row.name || '',
        price: parseFloat(row.price || '0'),
        description: row.description || '',
        imageUrl: row.image_url || row.image || '',
        category: row.category || '',
        sku: row.sku || '',
        length: parseFloat(row.length || '0'),
        width: parseFloat(row.width || '0'),
        height: parseFloat(row.height || '0'),
        productUrl,
        url: productUrl,
        handle,
        colors: row.colors
          ? row.colors.split('|').map((color: string) => color.trim()).filter(Boolean).join('|')
          : 'Beige|Gray|White|Black|Brown',
        materials: row.materials
          ? row.materials.split('|').map((material: string) => material.trim()).filter(Boolean).join('|')
          : 'Fabric|Leather|Velvet',
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
        productId,
        productUpdate,
      }
    })

    const productLimitCheck = checkProductLimit(usageStore, existingProducts.length + createdCount)

    if (!productLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: productLimitCheck.trialExpired
            ? 'Your free trial has ended. Upgrade to continue using ModlyAI.'
            : `This plan supports up to ${productLimitCheck.limit} products. Upgrade to import more.`,
        },
        { status: 403 }
      )
    }

    const BATCH_SIZE = 25
    for (let i = 0; i < productWrites.length; i += BATCH_SIZE) {
      const batch = productWrites.slice(i, i + BATCH_SIZE)
      const transactions = batch.map(({ productId, productUpdate }) =>
        db.tx.products[productId].update(productUpdate)
      )

      await db.transact(transactions)
    }

    await db.transact([
      db.tx.stores[storeId].update({
        catalogSource: 'csv',
        platform: 'csv',
        productCount: existingProducts.length + createdCount,
        lastSyncedAt: now,
        updatedAt: now,
      }),
    ])

    return NextResponse.json({
      success: true,
      count: records.length,
      created: createdCount,
      updated: updatedCount,
      skipped: skippedCount,
      totalProcessed: records.length,
    })
  } catch (error: any) {
    console.error('=== CSV UPLOAD ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error name:', error?.name)
    console.error('Error message:', error?.message)
    console.error('Error body:', JSON.stringify(error?.body, null, 2))
    console.error('Full error:', JSON.stringify(error, null, 2))

    return NextResponse.json(
      {
        error: error?.body?.message || error?.message || 'Upload failed',
        details: error?.body || error?.message,
      },
      { status: 500 }
    )
  }
}
