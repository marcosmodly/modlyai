import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { adminDb, id } from '@/lib/instant-admin'
import { generatePublicApiKey, resolveWidgetId } from '@/lib/store-public-identity'

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

function getInstantValidationDetails(error: unknown) {
  if (!error || typeof error !== 'object') return null

  const details = error as {
    body?: unknown
    hint?: unknown
    traceId?: unknown
    status?: unknown
  }

  if (!details.body && !details.hint) return null

  return {
    status: details.status,
    traceId: details.traceId,
    body: details.body,
    hint: details.hint,
  }
}

function createDefaultStorePayload({
  storeName,
  storeId,
  userId,
  now,
  trialEndsAt,
}: {
  storeName: string
  storeId: string
  userId: string
  now: string
  trialEndsAt: string
}) {
  return {
    name: storeName,
    userId,
    widgetId: resolveWidgetId(storeId),
    apiKey: generatePublicApiKey(),
    storeUrl: '',
    subscriptionPlan: 'free',
    subscriptionStatus: 'trialing',
    trialEndsAt,
    cancelAtPeriodEnd: false,
    createdAt: now,
    updatedAt: now,
  }
}

export async function POST(req: Request) {
  let userPayload: Record<string, unknown> | undefined
  let storePayload: Record<string, unknown> | undefined
  let linkPayload: Record<string, unknown> | undefined

  try {
    const { name, email, password, storeName } = await req.json()
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const trimmedName = String(name || '').trim()
    const trimmedStoreName = String(storeName || '').trim()

    if (!trimmedName || !normalizedEmail || !password || !trimmedStoreName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const existing = await adminDb.query({
      users: {
        $: { where: { email: normalizedEmail } },
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
    const nowDate = new Date()
    const now = nowDate.toISOString()
    const trialEndsAt = new Date(nowDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()

    userPayload = {
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: now,
    }
    storePayload = createDefaultStorePayload({
      storeName: trimmedStoreName,
      storeId,
      userId,
      now,
      trialEndsAt,
    })
    linkPayload = { store: storeId }

    if (process.env.NODE_ENV === 'development') {
      console.warn('[Register payload debug]', {
        userPayload,
        storePayload,
        linkPayload,
      })
    }

    await adminDb.transact([
      adminDb.tx.users[userId].update(userPayload),
      adminDb.tx.stores[storeId].update(storePayload),
      adminDb.tx.users[userId].link(linkPayload),
    ])

    return NextResponse.json({
      success: true,
      redirect: '/dashboard',
    })
  } catch (error) {
    console.error('[Register failed]', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    const validationDetails = getInstantValidationDetails(error)
    if (validationDetails) {
      console.error('[Register InstantDB payload]', {
        userPayload,
        storePayload,
        linkPayload,
      })
      console.error('[Signup InstantDB validation]', JSON.stringify(validationDetails, null, 2))
    }

    return NextResponse.json(
      {
        error: 'signup_failed',
        message: 'Could not create account.',
        details: process.env.NODE_ENV !== 'production' ? getErrorMessage(error) : undefined,
      },
      { status: 500 }
    )
  }
}
