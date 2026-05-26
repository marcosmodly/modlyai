import { NextResponse } from 'next/server'
import { adminDbLenient as db, id } from '@/lib/instant-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function isResetEndpointBlocked() {
  return process.env.NODE_ENV === 'production' && process.env.ENABLE_TEST_BILLING_RESET !== 'true'
}

export async function POST() {
  if (isResetEndpointBlocked()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const storeId = id()
  const eventId = id()

  try {
    await db.transact([
      db.tx.events[eventId].update({
        storeId,
        type: 'schema_bootstrap',
        metadata: {
          source: 'create-events-schema',
        },
        createdAt: new Date().toISOString(),
      }),
      db.tx.stores[storeId].link({ events: eventId }),
    ])

    await db.transact([
      db.tx.events[eventId].delete(),
      db.tx.stores[storeId].delete(),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Create events schema failed]', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })

    return NextResponse.json({ error: 'Failed to create events schema' }, { status: 500 })
  }
}
