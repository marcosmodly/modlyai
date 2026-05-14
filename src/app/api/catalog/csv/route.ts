import { NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { adminDbLenient as db, id } from '@/lib/instant-admin'
import {
  addProductToIdentityIndex,
  buildProductIdentityIndex,
  findProductByIdentity,
} from '@/lib/product-dedupe'
import { buildCustomizationOptionsFromFlatFields } from '@/lib/product-customization'
import { checkProductLimit, findStoreForUsage } from '@/lib/usage-limits'

type CsvRow = Record<string, string | undefined>

function readCsvString(row: CsvRow, ...columns: string[]) {
  for (const column of columns) {
    const value = row[column]?.trim()
    if (value) return value
  }
  return ''
}

function readCsvNumber(row: CsvRow, column: string) {
  const value = row[column]?.trim()
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function isCustomizationDisabled(row: CsvRow) {
  const value = row.customizationEnabled?.trim().toLowerCase()
  return value === 'false' || value === '0' || value === 'no'
}

function isActiveProduct(product: any) {
  const status = String(product?.status || '').trim().toLowerCase()
  return status !== 'archived' && status !== 'inactive' && status !== 'draft'
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
    const existingActiveCount = existingProducts.filter(isActiveProduct).length
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
      const rawColors = row.colors?.trim() || ''
      const rawMaterials = row.materials?.trim() || ''
      const customizationOptions = isCustomizationDisabled(row)
        ? undefined
        : buildCustomizationOptionsFromFlatFields({
            colors: rawColors,
            colorPricing: row.colorPricing,
            materials: rawMaterials,
            materialPricing: row.materialPricing,
            width: readCsvNumber(row, 'width'),
            length: readCsvNumber(row, 'length'),
            height: readCsvNumber(row, 'height'),
            widthMin: readCsvNumber(row, 'widthMin'),
            widthMax: readCsvNumber(row, 'widthMax'),
            widthDefault: readCsvNumber(row, 'widthDefault'),
            lengthMin: readCsvNumber(row, 'lengthMin'),
            lengthMax: readCsvNumber(row, 'lengthMax'),
            lengthDefault: readCsvNumber(row, 'lengthDefault'),
            heightMin: readCsvNumber(row, 'heightMin'),
            heightMax: readCsvNumber(row, 'heightMax'),
            heightDefault: readCsvNumber(row, 'heightDefault'),
            dimensionPricePerInch: readCsvNumber(row, 'dimensionPricePerInch'),
            widthPricePerInch: readCsvNumber(row, 'widthPricePerInch'),
            lengthPricePerInch: readCsvNumber(row, 'lengthPricePerInch'),
            heightPricePerInch: readCsvNumber(row, 'heightPricePerInch'),
            addons: row.addons,
          })
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
        colors: rawColors,
        materials: rawMaterials,
        customizationOptions: customizationOptions ?? null,
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

    const productLimitCheck = checkProductLimit(usageStore, existingActiveCount + createdCount)

    if (!productLimitCheck.allowed) {
      return NextResponse.json(
        productLimitCheck.trialExpired
          ? {
              error: 'trial_expired',
              message: "This store's ModlyAI trial has ended. Please upgrade to continue using the AI widget.",
            }
          : {
              error: 'usage_limit_reached',
              message: productLimitCheck.limit
                ? `Your plan allows ${productLimitCheck.limit} products. Upgrade to import more.`
                : 'You have reached your plan limit. Upgrade to continue.',
            },
        { status: productLimitCheck.trialExpired ? 402 : 403 }
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
        productCount: existingActiveCount + createdCount,
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
