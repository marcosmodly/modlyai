import { NextResponse } from 'next/server'
import { adminDb, id } from '@/lib/instant-admin'
import { generatePublicApiKey, resolveWidgetId } from '@/lib/store-public-identity'

function getLinkedStore(user: any) {
  const store = Array.isArray(user?.store) ? user.store[0] : user?.store
  return store?.id ? store : null
}

function isTemporaryRepairEndpointBlocked() {
  return process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_BILLING_RESET !== 'true'
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
  if (isTemporaryRepairEndpointBlocked()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { email, storeName } = await req.json()
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const trimmedStoreName = String(storeName || '').trim()

    if (!normalizedEmail || !trimmedStoreName) {
      return NextResponse.json(
        { error: 'email and storeName are required' },
        { status: 400 }
      )
    }

    const result = await adminDb.query({
      users: {
        $: { where: { email: normalizedEmail } },
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
        const apiKey = generatePublicApiKey()
        const widgetId = resolveWidgetId(storeId)

        transactions.push(
          adminDb.tx.stores[storeId].update({
            name: trimmedStoreName,
            apiKey,
            widgetId,
            userId: user.id,
            ownerEmail: normalizedEmail,
            storeUrl: '',
            supportEmail: normalizedEmail,
            widgetTitle: 'ModlyAI Assistant',
            primaryColor: '#2563eb',
            welcomeMessage: 'Hi! I can help you find the right furniture.',
            enableViewInCatalog: true,
            enableCustomize: true,
            enableRequestQuote: true,
            quoteEmail: normalizedEmail,
            subscriptionPlan: 'free',
            subscriptionStatus: 'trialing',
            trialStartedAt: now,
            trialEndsAt,
            aiChatsUsed: 0,
            roomPlannerAnalysesUsed: 0,
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
