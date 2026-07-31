import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const storeId = session.user.storeId

    // Remove only products that came FROM WooCommerce (source: 'woocommerce')
    // - CSV-uploaded or manually-added products stay untouched.
    const productsResult = await adminDb.query({
      products: { $: { where: { storeId, source: 'woocommerce' } } },
    })
    const productDeletes = (productsResult.products ?? []).map((product: { id: string }) =>
      adminDb.tx.products[product.id].delete()
    )

    await adminDb.transact([
      adminDb.tx.stores[storeId].update({
        wooSiteUrl: null,
        wooKey: null,
        wooSecret: null,
        wooConnectedAt: null,
        wooLastSyncedAt: null,
      }),
      ...productDeletes,
    ])

    return NextResponse.json({ success: true, removedProducts: productDeletes.length })
  } catch (error) {
    console.error('[WooCommerce disconnect] Failed:', error)
    return NextResponse.json({ error: 'Unable to disconnect WooCommerce.' }, { status: 500 })
  }
}
