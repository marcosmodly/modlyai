import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb } from '@/lib/instant-admin'

// Returns the logged-in user's own store (safe fields only - no apiKey, wooSecret,
// shopifyAccessToken, or credentials) plus their product catalog. Replaces the old
// pattern of querying InstantDB directly from the browser (see src/lib/use-catalog-products.ts),
// which relied on the client SDK and would have been wide open once instant.perms.ts
// was locked down to deny client access to `stores`.
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await getCurrentStoreForUser(session.user)

  if (!store?.id) {
    return NextResponse.json({ store: null, products: [] })
  }

  const result = await adminDb.query({
    products: {
      $: { where: { storeId: store.id } },
    },
  })

  const products = result.products ?? []

  const safeStore = {
    id: store.id,
    name: store.name ?? null,
    catalogSource: (store as Record<string, unknown>).catalogSource ?? null,
    platform: (store as Record<string, unknown>).platform ?? null,
    subscriptionPlan: store.subscriptionPlan ?? null,
    subscriptionStatus: store.subscriptionStatus ?? null,
    currentPeriodEnd: store.currentPeriodEnd ?? null,
    cancelAtPeriodEnd: store.cancelAtPeriodEnd ?? null,
    trialStartedAt: store.trialStartedAt ?? null,
    trialEndsAt: store.trialEndsAt ?? null,
    createdAt: store.createdAt ?? null,
    productCount: (store as Record<string, unknown>).productCount ?? products.length,
  }

  return NextResponse.json({ store: safeStore, products })
}
