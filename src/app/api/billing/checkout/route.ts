import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { isCheckoutPlan, plans } from '@/lib/plans'
import { stripe } from '@/lib/stripe'

function stripeSecretMode() {
  const secretKey = process.env.STRIPE_SECRET_KEY ?? ''
  if (secretKey.startsWith('sk_test_')) return 'test'
  if (secretKey.startsWith('sk_live_')) return 'live'
  return null
}

async function verifyStripePriceMode(priceId: string) {
  const secretMode = stripeSecretMode()
  if (!secretMode) return

  const price = await stripe.prices.retrieve(priceId)
  const priceMode = price.livemode ? 'live' : 'test'

  if (priceMode !== secretMode) {
    console.warn('[Stripe checkout mode mismatch]', {
      priceId,
      priceMode,
      secretMode,
    })
    throw new Error(`Stripe price ${priceId} is ${priceMode} mode but STRIPE_SECRET_KEY is ${secretMode} mode.`)
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await getCurrentStoreForUser(session.user)
    const storeId = store?.id ? String(store.id).trim() : ''
    const userEmail = session.user.email ?? ''

    if (!store || !storeId) {
      return NextResponse.json({ error: 'Missing storeId for checkout.' }, { status: 400 })
    }

    const body = await request.json()
    const plan = body?.plan

    if (!isCheckoutPlan(plan)) {
      return NextResponse.json({ error: 'Invalid billing plan' }, { status: 400 })
    }

    const priceEnvName = plans[plan].stripePriceEnv
    const price = process.env[priceEnvName]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!price) {
      return NextResponse.json({ error: `${priceEnvName} is not configured` }, { status: 500 })
    }

    if (!appUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_APP_URL is not configured' }, { status: 500 })
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn('[Checkout current store]', {
        userEmail,
        userId: session.user.id,
        resolvedStoreId: storeId,
        plan,
        priceId: price,
      })
    }

    await verifyStripePriceMode(price)

    const metadata: Stripe.MetadataParam = {
      storeId,
      plan,
      userEmail,
    }
    const subscriptionDataMetadata: Stripe.MetadataParam = {
      storeId,
      plan,
      userEmail,
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      ...(store.stripeCustomerId ? { customer: String(store.stripeCustomerId) } : { customer_email: session.user.email ?? undefined }),
      metadata,
      subscription_data: {
        metadata: subscriptionDataMetadata,
      },
      success_url: `${appUrl}/dashboard/billing?billing=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/billing?billing=cancelled`,
    })

    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Stripe checkout created]', {
        storeId,
        plan,
        customerEmail: session.user.email,
        priceId: price,
        mode: stripeSecretMode() ?? 'unknown',
      })
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create Checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
