import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/instant-admin'
import { normalizeShopifyDomain } from '@/lib/shopify'

type ShopifyState = {
  storeId: string
  userId: string
  shop: string
  nonce: string
  issuedAt: number
}

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not configured.`)
  return value
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function sign(value: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

function verifyState(value: string, secret: string): ShopifyState {
  const [payload, signature] = value.split('.')
  if (!payload || !signature || !safeEqual(sign(payload, secret), signature)) {
    throw new Error('Invalid Shopify OAuth state.')
  }

  const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as ShopifyState
  if (!parsed.storeId || !parsed.userId || !parsed.shop || !parsed.nonce || !parsed.issuedAt) {
    throw new Error('Invalid Shopify OAuth state payload.')
  }

  if (Date.now() - parsed.issuedAt > 10 * 60 * 1000) {
    throw new Error('Shopify OAuth state expired. Try connecting again.')
  }

  return parsed
}

function verifyHmac(searchParams: URLSearchParams, secret: string) {
  const hmac = searchParams.get('hmac') || ''
  if (!hmac) return false

  const message = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'hmac' && key !== 'signature')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  const digest = crypto.createHmac('sha256', secret).update(message).digest('hex')

  return safeEqual(digest, hmac)
}

function logInstantTransactionAttempt(entity: 'stores' | 'products', payload: Record<string, unknown>) {
  console.log('InstantDB Shopify transaction', { entity, fields: Object.keys(payload) })
}

function logInstantTransactionFailure(entity: 'stores' | 'products', payload: Record<string, unknown>, error: unknown) {
  console.error('InstantDB Shopify transaction failed', {
    message: error instanceof Error ? error.message : String(error),
    entity,
    fields: Object.keys(payload),
  })
}

function readCredentials(value: unknown): Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value) ? { ...(value as Record<string, any>) } : {}
}

export async function GET(request: NextRequest) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')

  try {
    const apiKey = getRequiredEnv('SHOPIFY_API_KEY')
    const apiSecret = getRequiredEnv('SHOPIFY_API_SECRET')
    const shop = normalizeShopifyDomain(request.nextUrl.searchParams.get('shop'))
    const code = request.nextUrl.searchParams.get('code') || ''
    const stateValue = request.nextUrl.searchParams.get('state') || ''

    if (!code) throw new Error('Missing Shopify authorization code.')
    if (!verifyHmac(request.nextUrl.searchParams, apiSecret)) {
      throw new Error('Invalid Shopify OAuth signature.')
    }

    const state = verifyState(stateValue, apiSecret)
    if (state.shop !== shop) {
      throw new Error('Shopify OAuth shop did not match the install request.')
    }

    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      }),
    })
    const payload = await tokenResponse.json()

    if (!tokenResponse.ok || typeof payload.access_token !== 'string') {
      throw new Error('Shopify did not return an access token.')
    }

    const storeResult = await adminDb.query({
      stores: {
        $: { where: { id: state.storeId } },
      },
    })
    const existingCredentials = readCredentials(storeResult.stores[0]?.credentials)
    const existingShopifyCredentials = readCredentials(existingCredentials.shopify)
    const storeUpdate = {
      credentials: {
        ...existingCredentials,
        shopify: {
          ...existingShopifyCredentials,
          storeDomain: shop,
          accessToken: payload.access_token,
          connectedAt: new Date().toISOString(),
          lastSyncedAt: existingShopifyCredentials.lastSyncedAt ?? null,
        },
      },
    }

    try {
      logInstantTransactionAttempt('stores', storeUpdate)
      await adminDb.transact([
        adminDb.tx.stores[state.storeId].update(storeUpdate),
      ])
    } catch (error) {
      logInstantTransactionFailure('stores', storeUpdate, error)
      throw error
    }

    return NextResponse.redirect(`${appUrl}/dashboard/integrations?shopify=connected`)
  } catch (error) {
    const message = encodeURIComponent(error instanceof Error ? error.message : 'Unable to connect Shopify.')
    return NextResponse.redirect(`${appUrl}/dashboard/integrations?shopify=error&message=${message}`)
  }
}
