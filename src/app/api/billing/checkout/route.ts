import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { adminDb } from '@/lib/instant-admin'
import { isCheckoutPlan, plans } from '@/lib/plans'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || !session.user.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

    const storeResult = await adminDb.query({
      stores: {
        $: { where: { id: session.user.storeId } },
      },
    })

    const store = storeResult.stores[0]

    if (!store || store.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const metadata = {
      userId: session.user.id,
      storeId: session.user.storeId,
      plan,
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      ...(store.stripeCustomerId ? { customer: String(store.stripeCustomerId) } : { customer_email: session.user.email ?? undefined }),
      metadata,
      subscription_data: {
        metadata,
      },
      success_url: `${appUrl}/dashboard/settings?billing=success`,
      cancel_url: `${appUrl}/dashboard/settings?billing=cancelled`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create Checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
