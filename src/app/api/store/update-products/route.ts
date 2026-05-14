import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDbLenient as db } from '@/lib/instant-admin'

const productDefaults: Record<string, { colors: string[]; materials: string[] }> = {
  'Oslo Sofa': {
    colors: ['Beige', 'Gray', 'Navy Blue', 'Forest Green', 'Charcoal'],
    materials: ['Fabric', 'Velvet', 'Leather'],
  },
  'Marble Coffee Table': {
    colors: ['White', 'Black', 'Gold'],
    materials: ['Marble', 'Tempered Glass'],
  },
  'Linen Armchair': {
    colors: ['Beige', 'Sage Green', 'Dusty Rose', 'Cream'],
    materials: ['Linen', 'Velvet', 'Bouclé'],
  },
  'Walnut Dining Table': {
    colors: ['Walnut', 'Oak', 'Black'],
    materials: ['Solid Wood', 'Engineered Wood'],
  },
  'Velvet Sectional': {
    colors: ['Midnight Blue', 'Emerald', 'Burgundy', 'Gray', 'Cream'],
    materials: ['Velvet', 'Performance Fabric'],
  },
  'Rattan Accent Chair': {
    colors: ['Natural', 'White', 'Black'],
    materials: ['Rattan', 'Wicker'],
  },
  'Minimalist Bookshelf': {
    colors: ['White', 'Oak', 'Black', 'Walnut'],
    materials: ['MDF', 'Solid Wood', 'Metal'],
  },
  'Platform Bed Frame': {
    colors: ['Walnut', 'Black', 'White Oak', 'Gray'],
    materials: ['Solid Wood', 'Upholstered', 'Metal'],
  },
  'Leather Lounge Chair': {
    colors: ['Caramel', 'Black', 'White', 'Cognac'],
    materials: ['Full Grain Leather', 'PU Leather'],
  },
  'Glass Side Table': {
    colors: ['Clear', 'Smoked', 'Black Frame'],
    materials: ['Tempered Glass', 'Acrylic'],
  },
  'Fabric Sofa Bed': {
    colors: ['Gray', 'Beige', 'Navy', 'Sage'],
    materials: ['Fabric', 'Microfiber', 'Performance Fabric'],
  },
  'Rustic TV Console': {
    colors: ['Rustic Brown', 'Dark Walnut', 'Gray Wash'],
    materials: ['Reclaimed Wood', 'MDF'],
  },
  'Pendant Lamp': {
    colors: ['Natural', 'Black', 'White'],
    materials: ['Rattan', 'Metal', 'Bamboo'],
  },
  'Upholstered Bench': {
    colors: ['Navy', 'Emerald', 'Gray', 'Blush Pink', 'Cream'],
    materials: ['Velvet', 'Linen', 'Boucle'],
  },
  'Floating Wall Shelf': {
    colors: ['White', 'Black', 'Oak', 'Walnut'],
    materials: ['MDF', 'Solid Wood'],
  },
}

function fixDimension(value: unknown) {
  const numberValue = Number(value || 0)
  if (!Number.isFinite(numberValue)) return 0
  return numberValue > 200 ? numberValue / 10 : numberValue
}

async function readRequestedProductIds(request: Request) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) return []

  const body = await request.json().catch(() => null)
  const rawIds = Array.isArray(body?.productIds)
    ? body.productIds
    : Array.isArray(body?.ids)
      ? body.ids
      : []

  return Array.from(
    new Set(rawIds.map((value: unknown) => String(value ?? '').trim()).filter(Boolean))
  )
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentStore = await getCurrentStoreForUser(session.user)
    const storeId = currentStore?.id ? String(currentStore.id).trim() : ''

    if (!currentStore || !storeId) {
      return NextResponse.json({ error: 'No current store found.' }, { status: 404 })
    }

    const requestedProductIds = await readRequestedProductIds(request)
    const result = await db.query({
      products: {
        $: { where: { storeId } },
      },
    })
    const scopedProducts = result.products || []
    const productsWithoutStoreId = scopedProducts.filter((product: any) => !String(product.storeId ?? '').trim())

    if (process.env.NODE_ENV === 'development' && productsWithoutStoreId.length > 0) {
      console.warn('[update-products skipped products without storeId]', {
        storeId,
        productIds: productsWithoutStoreId.map((product: any) => product.id),
      })
    }

    const productsForStore = scopedProducts.filter((product: any) => String(product.storeId ?? '') === storeId)
    const products = requestedProductIds.length > 0
      ? productsForStore.filter((product: any) => requestedProductIds.includes(String(product.id)))
      : productsForStore

    if (requestedProductIds.length > 0 && products.length !== requestedProductIds.length) {
      return NextResponse.json(
        { error: 'One or more products do not belong to the current store.' },
        { status: 403 }
      )
    }

    const transactions = products.map((product: any) => {
      const defaults = productDefaults[product.name]

      return db.tx.products[product.id].update({
        colors: (defaults?.colors || ['Beige', 'Gray', 'White', 'Black']).join('|'),
        materials: (defaults?.materials || ['Fabric', 'Leather', 'Wood']).join('|'),
        length: fixDimension(product.length),
        width: fixDimension(product.width),
        height: fixDimension(product.height),
      })
    })

    if (transactions.length > 0) {
      await db.transact(transactions)
    }

    return NextResponse.json({
      success: true,
      storeId,
      updated: products.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
