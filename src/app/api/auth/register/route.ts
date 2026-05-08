import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { adminDb, id } from '@/lib/instant-admin'

export async function POST(req: Request) {
  try {
    const { name, email, password, storeName } = await req.json()

    if (!name || !email || !password || !storeName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const existing = await adminDb.query({
      users: {
        $: { where: { email } },
      },
    })

    if (existing.users[0]) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = id()
    const storeId = id()
    const apiKey = 'pk_live_' + crypto.randomUUID().replace(/-/g, '')
    const nowDate = new Date()
    const now = nowDate.toISOString()
    const trialEndsAt = new Date(nowDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()

    await adminDb.transact([
      adminDb.tx.users[userId].update({
        name,
        email,
        password: hashedPassword,
        createdAt: now,
      }),
      adminDb.tx.stores[storeId].update({
        name: storeName,
        apiKey,
        userId,
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
      adminDb.tx.users[userId].link({ store: storeId }),
    ])

    return NextResponse.json({
      success: true,
      redirect: '/onboarding',
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
