import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/instant-admin'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

function stringId(value: string | { id: string } | null | undefined) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value.id
}

function periodEndIso(subscription: Stripe.Subscription) {
  const periodEnd = (subscription as any).current_period_end
  return typeof periodEnd === 'number' ? new Date(periodEnd * 1000).toISOString() : undefined
}

async function findStoreIdForSubscription(subscription: Stripe.Subscription) {
  const metadataStoreId = subscription.metadata?.storeId
  if (metadataStoreId) return metadataStoreId

  const subscriptionId = subscription.id
  const result = await adminDb.query({
    stores: {
      $: { where: { stripeSubscriptionId: subscriptionId } },
    },
  })

  return result.stores[0]?.id ? String(result.stores[0].id) : undefined
}

async function updateStoreBilling(
  storeId: string,
  updates: {
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    subscriptionStatus?: string
    subscriptionPlan?: string
    currentPeriodEnd?: string
  }
) {
  try {
    await adminDb.transact([
      adminDb.tx.stores[storeId].update({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    ])
  } catch (error) {
    console.error('Failed to update store billing from Stripe webhook:', { storeId, error })
    throw error
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const storeId = session.metadata?.storeId
  const plan = session.metadata?.plan

  if (!storeId) {
    console.error('Stripe checkout.session.completed missing metadata.storeId:', { sessionId: session.id })
    return
  }

  const subscriptionId = stringId(session.subscription)
  let subscription: Stripe.Subscription | undefined

  if (subscriptionId) {
    subscription = await stripe.subscriptions.retrieve(subscriptionId)
  }

  await updateStoreBilling(storeId, {
    stripeCustomerId: stringId(session.customer),
    stripeSubscriptionId: subscriptionId,
    subscriptionStatus: subscription?.status,
    subscriptionPlan: plan,
    currentPeriodEnd: subscription ? periodEndIso(subscription) : undefined,
  })
}

async function handleSubscriptionChanged(subscription: Stripe.Subscription) {
  const storeId = await findStoreIdForSubscription(subscription)
  if (!storeId) {
    console.error('Stripe subscription event missing resolvable storeId:', { subscriptionId: subscription.id })
    return
  }

  await updateStoreBilling(storeId, {
    stripeCustomerId: stringId(subscription.customer),
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    subscriptionPlan: subscription.metadata?.plan,
    currentPeriodEnd: periodEndIso(subscription),
  })
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured for Stripe webhook verification.')
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET is not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  const rawBody = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid Stripe webhook signature'
    console.error('Stripe webhook signature verification failed:', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChanged(event.data.object as Stripe.Subscription)
        break
      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process Stripe webhook'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
