import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { findStoreById, getStoreAnalytics } from '@/lib/store-catalog'

type Params = { params: { storeId: string } }

export async function GET(_: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.storeId || session.user.storeId !== params.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await findStoreById(params.storeId)
  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 })
  }

  return NextResponse.json({
    store,
    analytics: await getStoreAnalytics(store.id),
  })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.storeId || session.user.storeId !== params.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const enabledActions = body.enabledActions && typeof body.enabledActions === 'object'
      ? {
          viewInCatalog: Boolean(body.enabledActions.viewInCatalog),
          customize: Boolean(body.enabledActions.customize),
          requestQuote: Boolean(body.enabledActions.requestQuote),
        }
      : undefined

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    }

    if (typeof body.storeName === 'string' || typeof body.name === 'string') {
      updatePayload.name = typeof body.storeName === 'string' ? body.storeName.trim() : body.name.trim()
    }

    if (typeof body.storeUrl === 'string') updatePayload.storeUrl = body.storeUrl.trim()
    if (typeof body.supportEmail === 'string') updatePayload.supportEmail = body.supportEmail.trim()
    if (typeof body.widgetTitle === 'string') updatePayload.widgetTitle = body.widgetTitle.trim()
    if (typeof body.primaryColor === 'string') updatePayload.primaryColor = body.primaryColor.trim()
    if (typeof body.welcomeMessage === 'string') updatePayload.welcomeMessage = body.welcomeMessage.trim()
    if (typeof body.quoteEmail === 'string') updatePayload.quoteEmail = body.quoteEmail.trim()
    if (typeof body.enableViewInCatalog === 'boolean') {
      updatePayload.enableViewInCatalog = body.enableViewInCatalog
    } else if (enabledActions) {
      updatePayload.enableViewInCatalog = enabledActions.viewInCatalog
    }
    if (typeof body.enableCustomize === 'boolean') {
      updatePayload.enableCustomize = body.enableCustomize
    } else if (enabledActions) {
      updatePayload.enableCustomize = enabledActions.customize
    }
    if (typeof body.enableRequestQuote === 'boolean') {
      updatePayload.enableRequestQuote = body.enableRequestQuote
    } else if (enabledActions) {
      updatePayload.enableRequestQuote = enabledActions.requestQuote
    }

    await adminDb.transact([
      adminDb.tx.stores[params.storeId].update(updatePayload),
    ])

    const updatedStore = await findStoreById(params.storeId)

    if (!updatedStore) {
      return NextResponse.json({ error: 'Store not found after update' }, { status: 404 })
    }

    return NextResponse.json({ store: updatedStore })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update store'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
