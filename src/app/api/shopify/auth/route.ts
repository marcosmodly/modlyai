import crypto from 'crypto'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { normalizeShopifyDomain } from '@/lib/shopify'

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not configured.`)
  return value
}

function base64Url(value: string) {
  return Buffer.from(value).toString('base64url')
}

function signState(payload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.storeId || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKey = getRequiredEnv('SHOPIFY_API_KEY')
    const apiSecret = getRequiredEnv('SHOPIFY_API_SECRET')
    const appUrl = getRequiredEnv('NEXT_PUBLIC_APP_URL').replace(/\/$/, '')
    const scopes = process.env.SHOPIFY_SCOPES || 'read_products'
    const shop = normalizeShopifyDomain(request.nextUrl.searchParams.get('shop'))
    const issuedAt = Date.now()
    const nonce = crypto.randomBytes(16).toString('hex')
    const payload = base64Url(JSON.stringify({
      storeId: session.user.storeId,
      userId: session.user.id,
      shop,
      nonce,
      issuedAt,
    }))
    const state = `${payload}.${signState(payload, apiSecret)}`
    const redirectUri = `${appUrl}/api/shopify/callback`
    const installUrl = new URL(`https://${shop}/admin/oauth/authorize`)

    installUrl.searchParams.set('client_id', apiKey)
    installUrl.searchParams.set('scope', scopes)
    installUrl.searchParams.set('redirect_uri', redirectUri)
    installUrl.searchParams.set('state', state)

    return NextResponse.redirect(installUrl)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to start Shopify OAuth.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
