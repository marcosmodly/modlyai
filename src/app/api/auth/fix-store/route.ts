import { NextResponse } from 'next/server'
import { adminDb, id } from '@/lib/instant-admin'

function getLinkedStore(user: any) {
  const store = Array.isArray(user?.store) ? user.store[0] : user?.store
  return store?.id ? store : null
}

async function findExistingStore(userId: string) {
  const result = await adminDb.query({
    stores: {
      $: { where: { userId } },
    },
  })

  return result.stores?.[0] ?? null
}

export async function POST(req: Request) {
  try {
    const { email, storeName } = await req.json()

    if (!email || !storeName) {
      return NextResponse.json(
        { error: 'email and storeName are required' },
        { status: 400 }
      )
    }

    const result = await adminDb.query({
      users: {
        $: { where: { email } },
        store: {},
      },
    })

    const users = result.users ?? []
    if (!users[0]) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const nowDate = new Date()
    const now = nowDate.toISOString()
    const trialEndsAt = new Date(nowDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
    const transactions: any[] = []
    const fixes: Array<{
      userId: string
      storeId: string
      apiKey: string
      created: boolean
      relinked: boolean
    }> = []

    for (const user of users) {
      let store = getLinkedStore(user) ?? await findExistingStore(user.id)

      if (!store) {
        const storeId = id()
        const apiKey = 'pk_live_' + crypto.randomUUID().replace(/-/g, '')

        transactions.push(
          adminDb.tx.stores[storeId].update({
            name: storeName,
            apiKey,
            userId: user.id,
            subscriptionPlan: 'free_trial',
            subscriptionStatus: 'trialing',
            trialStartedAt: now,
            trialEndsAt,
            aiChatsUsed: 0,
            roomPlannerAnalysesUsed: 0,
            setupComplete: false,
            createdAt: now,
            updatedAt: now,
          }),
          adminDb.tx.users[user.id].link({ store: storeId })
        )

        fixes.push({
          userId: user.id,
          storeId,
          apiKey,
          created: true,
          relinked: true,
        })
        continue
      }

      transactions.push(adminDb.tx.users[user.id].link({ store: store.id }))
      fixes.push({
        userId: user.id,
        storeId: String(store.id),
        apiKey: String(store.apiKey),
        created: false,
        relinked: true,
      })
    }

    if (transactions.length > 0) {
      await adminDb.transact(transactions)
    }

    return NextResponse.json({
      success: true,
      repaired: fixes.length,
      storeId: fixes[0]?.storeId ?? null,
      apiKey: fixes[0]?.apiKey ?? null,
      fixes,
    })
  } catch (error) {
    console.error('Fix store error:', error)
    return NextResponse.json(
      { error: 'Failed to repair store link' },
      { status: 500 }
    )
  }
}
