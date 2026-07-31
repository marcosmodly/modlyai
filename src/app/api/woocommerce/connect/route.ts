import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { testWooCommerceConnection, WooCommerceError } from '@/lib/woocommerce'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { siteUrl, consumerKey, consumerSecret } = await req.json()

    const { siteUrl: normalizedSiteUrl } = await testWooCommerceConnection({
      siteUrl,
      consumerKey,
      consumerSecret,
    })

    await adminDb.transact([
      adminDb.tx.stores[session.user.storeId].update({
        wooSiteUrl: normalizedSiteUrl,
        wooKey: String(consumerKey || '').trim(),
        wooSecret: String(consumerSecret || '').trim(),
        wooConnectedAt: new Date().toISOString(),
      }),
    ])

    return NextResponse.json({ success: true, siteUrl: normalizedSiteUrl })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to connect WooCommerce.'
    const status = error instanceof WooCommerceError ? error.status : 500
    return NextResponse.json({ error: message }, { status })
  }
}
