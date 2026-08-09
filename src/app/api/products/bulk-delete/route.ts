import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

const MAX_BULK_DELETE = 500

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    if (!store?.id) {
      return NextResponse.json({ error: 'Store not found.' }, { status: 404 })
    }

    const body: unknown = await request.json().catch(() => null)
    const rawIds =
      body && typeof body === 'object' ? (body as Record<string, unknown>).ids : undefined
    const requestedIds: string[] = Array.isArray(rawIds)
      ? [...new Set(rawIds.map((id) => String(id ?? '').trim()).filter((id) => id.length > 0))]
      : []

    if (requestedIds.length === 0) {
      return NextResponse.json({ error: 'No product ids provided.' }, { status: 400 })
    }

    if (requestedIds.length > MAX_BULK_DELETE) {
      return NextResponse.json(
        { error: `Cannot delete more than ${MAX_BULK_DELETE} products at once.` },
        { status: 400 }
      )
    }

    // Verify ownership in one round trip before attempting any deletes - an
    // id that isn't this store's product (wrong store, already deleted,
    // never existed) is reported as failed, not silently skipped.
    const result = await adminDb.query({
      products: { $: { where: { id: { $in: requestedIds }, storeId: store.id } } },
    })
    const ownedIds = new Set((result.products ?? []).map((product: any) => String(product.id)))

    const deletedIds: string[] = []
    const failed: { id: string; error: string }[] = []

    // Sequenced per-product deletes rather than one giant transact, so a
    // failure on one product doesn't roll back or block the rest, and the
    // caller gets an accurate count of what actually happened instead of an
    // opaque all-or-nothing result.
    await Promise.all(
      requestedIds.map(async (id) => {
        if (!ownedIds.has(id)) {
          failed.push({ id, error: 'Product not found.' })
          return
        }
        try {
          await adminDb.transact([adminDb.tx.products[id].delete()])
          deletedIds.push(id)
        } catch (error) {
          failed.push({ id, error: error instanceof Error ? error.message : 'Unable to delete product.' })
        }
      })
    )

    return NextResponse.json({ success: failed.length === 0, deletedIds, failed })
  } catch (error) {
    console.error('[Products] Failed to bulk delete products:', error)
    return NextResponse.json({ error: 'Unable to delete products.' }, { status: 500 })
  }
}
