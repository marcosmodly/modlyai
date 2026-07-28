import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { getBillingAccess } from '@/lib/billing/access'

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

// Deletes the signed-in user's account. Stores can be shared between multiple
// users (see the many-to-many usersStore link in instant.schema.ts), so a
// store is only deleted outright if this user is its sole remaining member -
// otherwise this just unlinks the user and leaves the store (and its other
// users) untouched. A solely-owned store is never deleted while it has an
// active/trialing/still-in-period paid subscription - the account owner must
// cancel billing first (via the Paddle customer portal) so they don't end up
// getting billed for something that no longer exists.
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`delete-account:${userId}`, { limit: 3, windowMs: 60 * 60 * 1000 })
    const ipLimit = checkRateLimit(`delete-account-ip:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
    }

    const { password, confirmation } = await req.json()

    if (confirmation !== 'DELETE') {
      return NextResponse.json({ error: 'Please type DELETE to confirm.' }, { status: 400 })
    }

    if (typeof password !== 'string' || !password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const userResult = await adminDb.query({
      users: {
        $: { where: { id: userId } },
        store: {},
      },
    })
    const user = userResult.users?.[0]

    if (!user?.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 400 })
    }

    const linkedStores: Array<{ id: string; [key: string]: unknown }> = Array.isArray(user.store)
      ? user.store
      : user.store
        ? [user.store]
        : []

    // Phase 1: figure out what each linked store's fate is, and bail out
    // before making any changes if anything is blocked.
    const soleOwnedStores: typeof linkedStores = []
    const sharedStoreIds: string[] = []

    for (const store of linkedStores) {
      const storeResult = await adminDb.query({
        stores: { $: { where: { id: store.id } }, users: {} },
      })
      const fullStore = storeResult.stores?.[0]
      const linkedUsers: Array<{ id: string }> = fullStore?.users ?? []
      const otherUsers = linkedUsers.filter((u) => u.id !== userId)

      if (otherUsers.length > 0) {
        sharedStoreIds.push(store.id)
        continue
      }

      const billing = getBillingAccess(fullStore ?? store)
      if (billing.isPaid) {
        return NextResponse.json(
          {
            error: `"${fullStore?.name || store.name || 'Your store'}" has an active subscription. Please cancel billing before deleting your account.`,
            blockedStore: {
              id: store.id,
              name: fullStore?.name ?? store.name ?? null,
              paddleCustomerId: fullStore?.paddleCustomerId ?? null,
            },
          },
          { status: 409 }
        )
      }

      soleOwnedStores.push(fullStore ?? store)
    }

    // Phase 2: nothing blocked - unlink shared stores, delete solely-owned
    // stores and their data, delete this user's sessions, delete the user.
    const txSteps: unknown[] = []

    for (const storeId of sharedStoreIds) {
      txSteps.push(adminDb.tx.users[userId].unlink({ store: storeId }))
    }

    for (const store of soleOwnedStores) {
      const productsResult = await adminDb.query({
        products: { $: { where: { storeId: store.id } } },
      })
      for (const product of productsResult.products ?? []) {
        txSteps.push(adminDb.tx.products[product.id].delete())
      }

      const syncEventsResult = await adminDb.query({
        syncEvents: { $: { where: { storeId: store.id } } },
      })
      for (const syncEvent of syncEventsResult.syncEvents ?? []) {
        txSteps.push(adminDb.tx.syncEvents[syncEvent.id].delete())
      }

      const eventsResult = await adminDb.query({
        events: { $: { where: { storeId: store.id } } },
      })
      for (const evt of eventsResult.events ?? []) {
        txSteps.push(adminDb.tx.events[evt.id].delete())
      }

      txSteps.push(adminDb.tx.stores[store.id].delete())
    }

    const sessionsResult = await adminDb.query({
      sessions: { $: { where: { userId } } },
    })
    for (const s of sessionsResult.sessions ?? []) {
      txSteps.push(adminDb.tx.sessions[s.id].delete())
    }

    txSteps.push(adminDb.tx.users[userId].delete())

    await adminDb.transact(txSteps as any)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Delete account] Failed:', error)
    return NextResponse.json({ error: 'Unable to delete account. Please try again.' }, { status: 500 })
  }
}
