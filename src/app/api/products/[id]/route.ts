import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb, adminDbLenient as db } from '@/lib/instant-admin'
import { isRealProductUrl } from '@widget/utils/productUrl'

type Params = { params: { id: string } }

function readNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function readStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((entry) => String(entry ?? '').trim()).filter(Boolean)
}

function readDimension(value: unknown): { min?: number; max?: number; default?: number } | undefined {
  if (!value || typeof value !== 'object') return undefined
  const input = value as Record<string, unknown>
  const min = readNumber(input.min)
  const max = readNumber(input.max)
  const defaultValue = readNumber(input.default)
  if (min === undefined && max === undefined && defaultValue === undefined) return undefined
  return {
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(defaultValue !== undefined ? { default: defaultValue } : {}),
  }
}

async function loadOwnedProduct(storeId: string, productId: string) {
  const result = await adminDb.query({
    products: { $: { where: { id: productId } } },
  })
  const product = result.products?.[0] as Record<string, any> | undefined
  if (!product || String(product.storeId) !== storeId) return null
  return product
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    if (!store?.id) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 })
    }

    const existingProduct = await loadOwnedProduct(store.id, params.id)
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    const body = await request.json()
    const updates: Record<string, unknown> = {}

    if (typeof body.name === 'string') {
      const name = body.name.trim()
      if (!name) {
        return NextResponse.json({ error: 'Product name is required.' }, { status: 400 })
      }
      updates.name = name
      // Some older/imported products carry a separate `title` field that
      // display code prefers over `name` - keep it in sync so an edit here
      // doesn't get shadowed by a stale title.
      if (existingProduct.title) {
        updates.title = name
      }
    }

    if (body.price !== undefined) {
      const price = readNumber(body.price)
      if (price === undefined || price < 0) {
        return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 })
      }
      updates.price = price
    }

    if (typeof body.description === 'string') {
      updates.description = body.description.trim()
    }

    if (typeof body.imageUrl === 'string') {
      const imageUrl = body.imageUrl.trim()
      updates.imageUrl = imageUrl
      if (existingProduct.image) {
        updates.image = imageUrl
      }
    }

    if (typeof body.category === 'string') {
      updates.category = body.category.trim()
    }

    if (typeof body.status === 'string') {
      updates.status = body.status.trim()
    }

    if (typeof body.productUrl === 'string') {
      const productUrl = body.productUrl.trim()
      if (productUrl && !isRealProductUrl(productUrl)) {
        return NextResponse.json({ error: 'Product page URL must be a valid link to your store.' }, { status: 400 })
      }
      updates.productUrl = productUrl
      updates.url = productUrl
    }

    if (typeof body.sku === 'string') {
      updates.sku = body.sku.trim()
    }

    const existingOptions =
      existingProduct.customizationOptions && typeof existingProduct.customizationOptions === 'object'
        ? { ...(existingProduct.customizationOptions as Record<string, unknown>) }
        : {}
    let nextOptions = existingOptions
    let optionsChanged = false

    if (body.colors !== undefined) {
      const colors = readStringList(body.colors)
      updates.colors = colors.join('|')
      nextOptions = { ...nextOptions }
      if (colors.length > 0) nextOptions.colors = colors
      else delete nextOptions.colors
      optionsChanged = true
    }

    if (body.materials !== undefined) {
      const materials = readStringList(body.materials)
      updates.materials = materials.join('|')
      nextOptions = { ...nextOptions }
      if (materials.length > 0) nextOptions.materials = materials
      else delete nextOptions.materials
      optionsChanged = true
    }

    if (body.dimensions && typeof body.dimensions === 'object') {
      const dimensionsInput = body.dimensions as Record<string, unknown>
      const existingDimensions = (existingOptions.dimensions as Record<string, unknown>) ?? {}
      // readDimension returns undefined for an empty/all-blank {min,max,default} -
      // treat that as "left untouched" rather than merging in a meaningless {}
      // (the edit form always submits a dimensions object for all three axes,
      // even when the merchant didn't touch them).
      const widthUpdate = readDimension(dimensionsInput.width)
      const width = widthUpdate ? { ...(existingDimensions.width as object), ...widthUpdate } : existingDimensions.width
      const lengthUpdate = readDimension(dimensionsInput.length)
      const length = lengthUpdate ? { ...(existingDimensions.length as object), ...lengthUpdate } : existingDimensions.length
      const heightUpdate = readDimension(dimensionsInput.height)
      const height = heightUpdate ? { ...(existingDimensions.height as object), ...heightUpdate } : existingDimensions.height

      if (width || length || height) {
        nextOptions = {
          ...nextOptions,
          dimensions: {
            ...(width ? { width } : {}),
            ...(length ? { length } : {}),
            ...(height ? { height } : {}),
          },
        }
        optionsChanged = true
      }

      if (widthUpdate?.default !== undefined) updates.width = widthUpdate.default
      if (lengthUpdate?.default !== undefined) updates.length = lengthUpdate.default
      if (heightUpdate?.default !== undefined) updates.height = heightUpdate.default
    }

    if (optionsChanged) {
      updates.customizationOptions = Object.keys(nextOptions).length > 0 ? nextOptions : null
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No changes provided.' }, { status: 400 })
    }

    updates.updatedAt = new Date().toISOString()

    await db.transact([db.tx.products[params.id].update(updates)])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Products] Failed to update product:', error)
    return NextResponse.json({ error: 'Unable to update product.' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    if (!store?.id) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 })
    }

    const existingProduct = await loadOwnedProduct(store.id, params.id)
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    await adminDb.transact([adminDb.tx.products[params.id].delete()])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Products] Failed to delete product:', error)
    return NextResponse.json({ error: 'Unable to delete product.' }, { status: 500 })
  }
}
