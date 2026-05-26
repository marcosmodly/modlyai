import { NextRequest, NextResponse } from 'next/server'

const supportedEventTypes = new Set([
  'widget_opened',
  'chat_started',
  'message_sent',
  'product_recommended',
  'view_in_catalog_clicked',
  'customize_clicked',
  'quote_started',
  'quote_requested',
  'room_planner_opened',
  'room_analyzed',
  'pdf_exported',
  'configuration_saved',
])

const sensitiveMetadataKeys = new Set([
  'customer',
  'customerEmail',
  'email',
  'message',
  'name',
  'notes',
  'phone',
])

const responseHeaders = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store',
}

function readText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function sanitizeMetadata(value: unknown, depth = 0): unknown {
  if (depth > 3) return undefined
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value
  if (Array.isArray(value)) {
    return value
      .map((entry) => sanitizeMetadata(entry, depth + 1))
      .filter((entry) => entry !== undefined)
  }
  if (!value || typeof value !== 'object') return undefined

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
    (safeMetadata, [key, entry]) => {
      if (sensitiveMetadataKeys.has(key)) return safeMetadata
      const safeEntry = sanitizeMetadata(entry, depth + 1)
      if (safeEntry !== undefined) {
        safeMetadata[key] = safeEntry
      }
      return safeMetadata
    },
    {}
  )
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: responseHeaders,
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: responseHeaders,
  })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400)
  }

  const storeId = readText(body.storeId)
  const type = readText(body.type)

  if (!storeId) {
    return jsonResponse({ error: 'storeId is required.' }, 400)
  }

  if (!type || !supportedEventTypes.has(type)) {
    return jsonResponse({ error: 'Unsupported analytics event type.' }, 400)
  }

  const createdAt = new Date().toISOString()
  const userAgent = readText(request.headers.get('user-agent'))
  const source = readText((body.metadata as Record<string, unknown> | undefined)?.source) || 'widget'
  const safeMetadata = sanitizeMetadata(body.metadata) as Record<string, unknown> | undefined

  const metadata = {
    ...(safeMetadata ?? {}),
    widgetId: readText(body.widgetId) ?? readText(safeMetadata?.widgetId),
    sessionId: readText(body.sessionId) ?? readText(safeMetadata?.sessionId),
    productId: readText(body.productId) ?? readText(safeMetadata?.productId),
    productName: readText(body.productName) ?? readText(safeMetadata?.productName),
    source,
    userAgent,
    timestamp: createdAt,
  }

  Object.keys(metadata).forEach((key) => {
    if (metadata[key as keyof typeof metadata] === undefined) {
      delete metadata[key as keyof typeof metadata]
    }
  })

  try {
    const { adminDb, id } = await import('@/lib/instant-admin')
    const eventId = id()

    await adminDb.transact([
      adminDb.tx.events[eventId].update({
        storeId,
        type,
        metadata,
        createdAt,
      }),
      adminDb.tx.stores[storeId].link({ events: eventId }),
    ])

    return jsonResponse({ success: true, eventId })
  } catch (error) {
    console.error('Analytics failed:', error)
  }

  return jsonResponse({ success: true })
}
