import { adminDb } from '@/lib/instant-admin'
import { generatePublicApiKey, generateWidgetId } from '@/lib/store-public-identity'

export type CurrentStoreUser = {
  id?: string | null
  email?: string | null
  storeId?: string | null
}

export type CurrentStore = {
  id: string
  name?: string | null
  apiKey?: string | null
  widgetId?: string | null
  userId?: string | null
  ownerEmail?: string | null
  paddleCustomerId?: string | null
  paddleSubscriptionId?: string | null
  subscriptionStatus?: string | null
  subscriptionPlan?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean | string | null
  trialStartedAt?: string | null
  trialEndsAt?: string | null
  aiChatsUsed?: number | null
  roomPlannerAnalysesUsed?: number | null
  productCount?: number | null
  createdAt?: string | null
  updatedAt?: string | null
}

function normalizeId(value?: string | null) {
  return String(value ?? '').trim()
}

function normalizeEmail(value?: string | null) {
  return String(value ?? '').trim().toLowerCase()
}

function readField(entity: unknown, key: string): string | undefined {
  if (!entity || typeof entity !== 'object') return undefined
  const value = (entity as Record<string, unknown>)[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

function newestFirst<T extends { createdAt?: unknown; updatedAt?: unknown }>(stores: T[]) {
  return [...stores].sort((a, b) => {
    const aDate = new Date(String(a.updatedAt ?? a.createdAt ?? 0)).getTime()
    const bDate = new Date(String(b.updatedAt ?? b.createdAt ?? 0)).getTime()
    return bDate - aDate
  })
}

function firstLinkedStore(user: any): CurrentStore | null {
  const store = Array.isArray(user?.store) ? user.store[0] : user?.store
  return store?.id ? (store as CurrentStore) : null
}

async function findStoreById(storeId: string) {
  if (!storeId) return null

  const result = await adminDb.query({
    stores: {},
  })

  const store = result.stores?.find((candidate) => {
    return readField(candidate, 'id') === storeId
  })

  return (store as CurrentStore | undefined) ?? null
}

async function repairStoreWidgetId(store: CurrentStore): Promise<CurrentStore> {
  const storeId = normalizeId(store.id)
  if (!storeId) return store

  const existingWidgetId = normalizeId(store.widgetId)
  if (existingWidgetId && existingWidgetId !== storeId) {
    return store
  }

  const update: Pick<CurrentStore, 'widgetId' | 'updatedAt'> = {
    widgetId: generateWidgetId(),
    updatedAt: new Date().toISOString(),
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn('[Widget ID repair payload]', {
      storeId,
      update,
    })
  }

  try {
    await adminDb.transact([
      adminDb.tx.stores[storeId].update(update),
    ])

    const repairedStore = await findStoreById(storeId)
    return repairedStore ?? {
      ...store,
      ...update,
    }
  } catch (error) {
    console.error('[Widget ID repair failed]', {
      storeId,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    return store
  }
}

async function findStoreByUserId(userId: string) {
  if (!userId) return null

  const result = await adminDb.query({
    stores: {},
  })

  const stores = result.stores?.filter((candidate) => {
    return readField(candidate, 'userId') === userId
  })

  return newestFirst((stores ?? []) as CurrentStore[])[0] ?? null
}

async function findLinkedStoreByUserId(userId: string) {
  if (!userId) return null

  const result = await adminDb.query({
    users: {
      $: { where: { id: userId } },
      store: {},
    },
  })

  return firstLinkedStore(result.users?.[0])
}

async function findStoreByOwnerEmail(email: string) {
  if (!email) return null

  const result = await adminDb.query({
    stores: {},
  })

  const stores = result.stores?.filter((candidate) => {
    return readField(candidate, 'ownerEmail') === email
  })

  return newestFirst((stores ?? []) as CurrentStore[])[0] ?? null
}

async function findLinkedStoreByUserEmail(email: string, expectedUserId: string) {
  if (!email) return null

  const result = await adminDb.query({
    users: {
      $: { where: { email } },
      store: {},
    },
  })

  const users = newestFirst(result.users ?? [])
  const user = expectedUserId
    ? users.find((candidate: any) => String(candidate.id) === expectedUserId)
    : users[0]

  return firstLinkedStore(user)
}

function storeBelongsToUser(store: CurrentStore, userId: string, email: string) {
  if (userId && String(store.userId ?? '') === userId) return true
  if (email && normalizeEmail(store.ownerEmail) === email) return true
  return false
}

export async function normalizeStorePublicIdentity(store: CurrentStore): Promise<CurrentStore> {
  let repairedStore = await repairStoreWidgetId(store)

  const update: Pick<CurrentStore, 'apiKey' | 'updatedAt'> = {}

  if (!String(repairedStore.apiKey ?? '').trim()) {
    update.apiKey = generatePublicApiKey()
  }

  if (Object.keys(update).length === 0) {
    return repairedStore
  }

  update.updatedAt = new Date().toISOString()

  if (process.env.NODE_ENV === 'development') {
    console.warn('[normalizeStorePublicIdentity update payload]', {
      storeId: repairedStore.id,
      update,
    })
  }

  try {
    await adminDb.transact([
      adminDb.tx.stores[repairedStore.id].update(update),
    ])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[normalizeStorePublicIdentity repair failed]', {
        storeId: repairedStore.id,
        update,
        error,
      })
    }

    if (update.apiKey) {
      const apiKeyOnlyUpdate = {
        apiKey: update.apiKey,
        updatedAt: update.updatedAt,
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn('[normalizeStorePublicIdentity update payload]', {
          storeId: repairedStore.id,
          update: apiKeyOnlyUpdate,
        })
      }

      try {
        await adminDb.transact([
          adminDb.tx.stores[repairedStore.id].update(apiKeyOnlyUpdate),
        ])

        repairedStore = {
          ...repairedStore,
          ...apiKeyOnlyUpdate,
        }
      } catch (fallbackError) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[normalizeStorePublicIdentity apiKey repair failed]', {
            storeId: repairedStore.id,
            update: apiKeyOnlyUpdate,
            error: fallbackError,
          })
        }
      }
    }

    return repairedStore
  }

  return {
    ...repairedStore,
    ...update,
  }
}

export async function getCurrentStoreForUser(user?: CurrentStoreUser | null): Promise<CurrentStore | null> {
  const userId = normalizeId(user?.id)
  const email = normalizeEmail(user?.email)
  const sessionStoreId = normalizeId(user?.storeId)

  if (!userId && !email) {
    throw new Error('Authenticated user is required to resolve the current store.')
  }

  const sessionStore = await findStoreById(sessionStoreId)
  if (sessionStore && storeBelongsToUser(sessionStore, userId, email)) {
    return normalizeStorePublicIdentity(sessionStore)
  }

  const linkedStoreByUserId = await findLinkedStoreByUserId(userId)
  if (linkedStoreByUserId) return normalizeStorePublicIdentity(linkedStoreByUserId)

  const storeByUserId = await findStoreByUserId(userId)
  if (storeByUserId) return normalizeStorePublicIdentity(storeByUserId)

  const storeByOwnerEmail = await findStoreByOwnerEmail(email)
  if (storeByOwnerEmail) return normalizeStorePublicIdentity(storeByOwnerEmail)

  const linkedStoreByEmail = await findLinkedStoreByUserEmail(email, userId)
  if (linkedStoreByEmail) return normalizeStorePublicIdentity(linkedStoreByEmail)

  return null
}
