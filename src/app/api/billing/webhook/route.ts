import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import {
  updateStoreBillingFromSubscription,
  subscriptionPlanFromStripe,
  type StoreBillingReadBack,
} from '@/lib/billing/update-store-billing'
import { rememberStripeWebhookTargetStore } from '@/lib/billing/webhook-debug'
import { adminDb } from '@/lib/instant-admin'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

function stringId(value: string | { id: string } | null | undefined) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value.id
}

function getStripeCurrentPeriodEnd(subscription: Stripe.Subscription): number | null {
  const direct = (subscription as any).current_period_end
  if (typeof direct === 'number') return direct

  const itemPeriodEnd = (subscription.items?.data?.[0] as any)?.current_period_end
  if (typeof itemPeriodEnd === 'number') return itemPeriodEnd

  return null
}

function periodEndIso(periodEnd: number | null) {
  return typeof periodEnd === 'number' && periodEnd > 0 ? new Date(periodEnd * 1000).toISOString() : undefined
}

function currentPeriodEndIso(subscription: Stripe.Subscription) {
  const periodEnd = getStripeCurrentPeriodEnd(subscription)
  const currentPeriodEnd = periodEndIso(periodEnd)

  if (isDevelopment()) {
    console.warn('[Stripe webhook currentPeriodEnd selected]', {
      subscriptionId: subscription.id,
      periodEnd,
      currentPeriodEnd,
      directCurrentPeriodEnd: (subscription as any).current_period_end,
      firstItemCurrentPeriodEnd: (subscription.items?.data?.[0] as any)?.current_period_end,
    })
  }

  if (!currentPeriodEnd) {
    console.error('[Stripe currentPeriodEnd missing]', {
      subscriptionId: subscription.id,
      status: subscription.status,
      keys: Object.keys(subscription),
      firstItemKeys: subscription.items?.data?.[0]
        ? Object.keys(subscription.items.data[0])
        : [],
    })
  }

  return currentPeriodEnd
}

type StoreBillingRecord = {
  id: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus?: string
  subscriptionPlan?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
}

function subscriptionPlan(subscription?: Stripe.Subscription, fallbackPlan?: string) {
  return subscriptionPlanFromStripe(subscription, fallbackPlan)
}

function cancelAtPeriodEnd(subscription: Stripe.Subscription) {
  return Boolean((subscription as any).cancel_at_period_end || (subscription as any).cancel_at)
}

function logSubscriptionPeriodDebug(subscription: Stripe.Subscription, eventType: string) {
  if (!isDevelopment()) return

  const directPeriodEnd = (subscription as Stripe.Subscription & { current_period_end?: number | null }).current_period_end
  const itemPeriodEnd = (subscription.items?.data?.[0] as any)?.current_period_end
  const periodEnd = getStripeCurrentPeriodEnd(subscription)
  const cancelingAtPeriodEnd = (subscription as Stripe.Subscription & { cancel_at_period_end?: boolean | null }).cancel_at_period_end

  console.warn('[Stripe webhook subscription period debug]', {
    eventType,
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd: directPeriodEnd,
    firstItemCurrentPeriodEnd: itemPeriodEnd,
    selectedPeriodEnd: periodEnd,
    cancelAtPeriodEnd: cancelingAtPeriodEnd,
  })

  if (!periodEnd) {
    console.warn('[Stripe webhook currentPeriodEnd missing]', {
      eventType,
      subscriptionId: subscription.id,
      status: subscription.status,
      reason: 'subscription current_period_end missing from Stripe subscription object and first item',
    })
  }
}

function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}

function stripeSecretMode() {
  const secretKey = process.env.STRIPE_SECRET_KEY ?? ''
  if (secretKey.startsWith('sk_test_')) return 'test'
  if (secretKey.startsWith('sk_live_')) return 'live'
  return 'unknown'
}

function stripeEventMode(event: Stripe.Event) {
  return event.livemode ? 'live' : 'test'
}

function logWebhookReceived(event: Stripe.Event) {
  if (!isDevelopment()) return

  console.warn('[Stripe webhook received]', {
    type: event.type,
    id: event.id,
  })
}

function warnWebhookModeMismatch(event: Stripe.Event) {
  const secretMode = stripeSecretMode()
  const eventMode = stripeEventMode(event)
  if (secretMode === 'unknown' || secretMode === eventMode) return

  console.warn('[Stripe webhook mode mismatch]', {
    eventType: event.type,
    eventMode,
    secretMode,
    message: 'Check that STRIPE_WEBHOOK_SECRET belongs to the same Stripe CLI/dashboard mode as STRIPE_SECRET_KEY.',
  })
}

type StoreSubscriptionUpdateInput = {
  eventType: string
  storeId?: string
  storeIdFromMetadata?: string
  plan?: string
  customerId?: string
  subscriptionId?: string
  status?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
}

function logSubscriptionUpdate(details: StoreSubscriptionUpdateInput) {
  if (!isDevelopment()) return
  console.warn('[Stripe webhook subscription update]', details)
}

function logBillingTarget({
  eventType,
  storeIdFromMetadata,
  plan,
  customerId,
  subscriptionId,
}: {
  eventType: string
  storeIdFromMetadata?: string
  plan?: string
  customerId?: string
  subscriptionId?: string
}) {
  if (!isDevelopment()) return

  console.warn('[Stripe webhook billing target]', {
    eventType,
    storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId,
  })
}

function logStoreUpdated(details: {
  eventType: string
  storeId: string
  subscriptionPlan?: string
  subscriptionStatus?: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
}) {
  if (!isDevelopment()) return

  console.warn('[Stripe webhook store updated]', details)
}

function assertActivePaidReadBack(eventType: string, storeId: string, store?: StoreBillingReadBack | null) {
  if (
    (store?.subscriptionPlan === 'starter' || store?.subscriptionPlan === 'growth') &&
    store.subscriptionStatus === 'active'
  ) {
    return
  }

  console.error('[Stripe webhook store read-back not active paid]', {
    eventType,
    storeId,
    subscriptionPlan: store?.subscriptionPlan,
    subscriptionStatus: store?.subscriptionStatus,
    stripeCustomerId: store?.stripeCustomerId,
    stripeSubscriptionId: store?.stripeSubscriptionId,
  })
  throw new Error(`Stripe billing update did not make store ${storeId} active paid.`)
}

function requiresActivePaidReadBack(eventType: string) {
  return (
    eventType === 'checkout.session.completed' ||
    eventType === 'customer.subscription.created' ||
    eventType === 'customer.subscription.updated'
  )
}

function logStrictReadBack(eventType: string, storeId: string, store?: StoreBillingReadBack | null) {
  if (!isDevelopment()) return

  console.warn('[Stripe webhook strict read-back]', {
    eventType,
    storeId,
    subscriptionPlan: store?.subscriptionPlan,
    subscriptionStatus: store?.subscriptionStatus,
    stripeCustomerId: store?.stripeCustomerId,
    stripeSubscriptionId: store?.stripeSubscriptionId,
    currentPeriodEnd: store?.currentPeriodEnd,
    cancelAtPeriodEnd: store?.cancelAtPeriodEnd,
  })
}

function missingStoreIdDetails(eventType: string, object: Stripe.Checkout.Session | Stripe.Subscription) {
  const data = object as any
  return {
    eventType,
    metadata: data.metadata,
    customer: data.customer,
    subscription: data.subscription ?? data.id,
  }
}

function logMissingStoreId(eventType: string, object: Stripe.Checkout.Session | Stripe.Subscription) {
  if (!isDevelopment()) return
  console.error('[Stripe webhook missing storeId]', missingStoreIdDetails(eventType, object))
}

async function handleSubscriptionEventSafely(event: Stripe.Event, handler: () => Promise<void>) {
  try {
    await handler()
  } catch (error) {
    console.error('[Stripe webhook subscription handler failed]', {
      eventType: event.type,
      eventId: event.id,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })
    throw error
  }
}

async function findStoreForSubscription(subscription: Stripe.Subscription): Promise<StoreBillingRecord | undefined> {
  const metadataStoreId = subscription.metadata?.storeId
  if (metadataStoreId) {
    const result = await adminDb.query({
      stores: {
        $: { where: { id: metadataStoreId } },
      },
    })

    if (result.stores[0]) return result.stores[0] as StoreBillingRecord
  }

  const subscriptionId = subscription.id
  const result = await adminDb.query({
    stores: {
      $: { where: { stripeSubscriptionId: subscriptionId } },
    },
  })

  if (result.stores[0]) return result.stores[0] as StoreBillingRecord

  const customerId = stringId(subscription.customer)
  if (customerId) {
    const customerResult = await adminDb.query({
      stores: {
        $: { where: { stripeCustomerId: customerId } },
      },
    })

    if (customerResult.stores[0]) return customerResult.stores[0] as StoreBillingRecord
  }

  return undefined
}

async function findStoreForCustomer(customerId: string): Promise<StoreBillingRecord | undefined> {
  const result = await adminDb.query({
    stores: {
      $: { where: { stripeCustomerId: customerId } },
    },
  })

  return result.stores[0] as StoreBillingRecord | undefined
}

async function findStoreById(storeId: string): Promise<StoreBillingRecord | undefined> {
  if (!storeId) return undefined

  const result = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
  })

  return result.stores[0] as StoreBillingRecord | undefined
}

async function updateStoreSubscription({
  storeId,
  storeIdFromMetadata,
  plan,
  customerId,
  subscriptionId,
  status,
  currentPeriodEnd,
  cancelAtPeriodEnd,
  eventType,
}: StoreSubscriptionUpdateInput) {
  logBillingTarget({
    eventType,
    storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId,
  })

  if (!storeId) {
    const error = new Error(`Missing storeId for Stripe subscription update: ${eventType}`)
    console.error('[Stripe billing missing storeId]', { eventType, storeIdFromMetadata, customerId, subscriptionId, plan })
    throw error
  }

  if (!plan) {
    const error = new Error(`Missing plan for Stripe subscription update: ${eventType}`)
    console.error('[Stripe billing missing plan]', { eventType, storeId, storeIdFromMetadata, customerId, subscriptionId, status })
    throw error
  }

  const existingStore = await findStoreById(storeId)
  if (!existingStore) {
    const error = new Error(`Stripe metadata storeId does not match an existing store: ${storeId}`)
    console.error('[Stripe billing missing store]', { eventType, storeId, storeIdFromMetadata, customerId, subscriptionId, plan })
    throw error
  }

  const update = Object.fromEntries(
    Object.entries({
      subscriptionPlan: plan,
      subscriptionStatus: status,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      currentPeriodEnd,
      cancelAtPeriodEnd,
      updatedAt: new Date().toISOString(),
    }).filter(([, value]) => value !== undefined && value !== null)
  )

  if (isDevelopment()) {
    console.warn('[InstantDB subscription update payload]', {
      eventType,
      storeId,
      update,
    })
    console.warn('[Stripe webhook target store debug]', {
      eventType,
      targetStoreId: storeId,
      storeIdFromMetadata,
      plan,
      customerId,
      subscriptionId,
    })
  }
  rememberStripeWebhookTargetStore({
    eventType,
    storeId,
    plan,
    customerId,
    subscriptionId,
  })

  try {
    await adminDb.transact([
      adminDb.tx.stores[storeId].update(update),
    ])

    logStoreUpdated({
      eventType,
      storeId,
      subscriptionPlan: plan,
      subscriptionStatus: status,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    })

    const readBack = await adminDb.query({
      stores: {
        $: { where: { id: storeId } },
      },
    })
    const updatedStore = readBack.stores[0]

    if (isDevelopment()) {
      console.warn('[Stripe webhook store readback]', {
        storeId,
        subscriptionPlan: updatedStore?.subscriptionPlan,
        subscriptionStatus: updatedStore?.subscriptionStatus,
        stripeCustomerId: updatedStore?.stripeCustomerId,
        stripeSubscriptionId: updatedStore?.stripeSubscriptionId,
        currentPeriodEnd: updatedStore?.currentPeriodEnd,
        cancelAtPeriodEnd: updatedStore?.cancelAtPeriodEnd,
      })
    }

    const failures: string[] = []
    if (!updatedStore) {
      failures.push('store read-back returned no store')
    } else {
      if (plan && updatedStore.subscriptionPlan !== plan) {
        failures.push(`subscriptionPlan ${String(updatedStore.subscriptionPlan)} did not match ${plan}`)
      }
      if (status && updatedStore.subscriptionStatus !== status) {
        failures.push(`subscriptionStatus ${String(updatedStore.subscriptionStatus)} did not match ${status}`)
      }
      if (customerId && updatedStore.stripeCustomerId !== customerId) {
        failures.push(`stripeCustomerId ${String(updatedStore.stripeCustomerId)} did not match ${customerId}`)
      }
      if (subscriptionId && updatedStore.stripeSubscriptionId !== subscriptionId) {
        failures.push(`stripeSubscriptionId ${String(updatedStore.stripeSubscriptionId)} did not match ${subscriptionId}`)
      }
    }

    if (failures.length > 0) {
      throw new Error(`Stripe webhook store update did not persist for ${storeId}: ${failures.join('; ')}`)
    }

    return true
  } catch (error) {
    console.error('[Stripe webhook InstantDB update failed]', {
      eventType,
      storeId,
      storeIdFromMetadata,
      plan,
      customerId,
      subscriptionId,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      rawError: error,
    })
    throw error
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, eventType: string) {
  if (isDevelopment()) {
    console.warn('[Checkout session completed debug]', {
      sessionId: session.id,
      metadata: session.metadata,
      customer: session.customer,
      subscription: session.subscription,
    })
  }

  const customerId = stringId(session.customer)
  const subscriptionId = stringId(session.subscription)
  let subscription: Stripe.Subscription | undefined

  if (subscriptionId) {
    subscription = await stripe.subscriptions.retrieve(subscriptionId)
  }

  const storeIdFromMetadata = session.metadata?.storeId ?? subscription?.metadata?.storeId
  const plan = session.metadata?.plan ?? subscriptionPlan(subscription)

  if (!storeIdFromMetadata) {
    logMissingStoreId(eventType, session)
    throw new Error(`Missing metadata.storeId for ${eventType}.`)
  }

  if (!subscription) {
    throw new Error(`Missing subscription for ${eventType} checkout session ${session.id}.`)
  }

  const status = subscription.status
  const currentPeriodEnd = currentPeriodEndIso(subscription)
  const cancelingAtPeriodEnd = cancelAtPeriodEnd(subscription)

  logSubscriptionUpdate({
    eventType,
    storeId: storeIdFromMetadata,
    storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId,
    status,
    currentPeriodEnd,
    cancelAtPeriodEnd: cancelingAtPeriodEnd,
  })

  if (isDevelopment()) {
    console.warn('[Stripe webhook target storeId]', {
      eventType,
      targetStoreId: storeIdFromMetadata,
      stripeSessionMetadataStoreId: session.metadata?.storeId,
      subscriptionMetadataStoreId: subscription.metadata?.storeId,
      plan,
      customerId,
      subscriptionId,
    })
  }

  rememberStripeWebhookTargetStore({
    eventType,
    storeId: storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId,
  })

  const updatedStore = await updateStoreBillingFromSubscription({
    storeId: storeIdFromMetadata,
    plan,
    subscription,
    customerId,
  })

  logStrictReadBack(eventType, storeIdFromMetadata, updatedStore)
  if (requiresActivePaidReadBack(eventType)) {
    assertActivePaidReadBack(eventType, storeIdFromMetadata, updatedStore)
  }
}

async function handleSubscriptionChanged(subscription: Stripe.Subscription, eventType: string) {
  logSubscriptionPeriodDebug(subscription, eventType)

  if (isDevelopment()) {
    console.warn('[Subscription debug]', {
      subscriptionId: subscription.id,
      metadata: subscription.metadata,
      customer: subscription.customer,
      status: subscription.status,
      currentPeriodEnd: (subscription as any).current_period_end,
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
    })
  }

  const storeIdFromMetadata = subscription.metadata?.storeId
  if (!storeIdFromMetadata) {
    logMissingStoreId(eventType, subscription)
    throw new Error(`Missing metadata.storeId for ${eventType} subscription ${subscription.id}.`)
  }

  const plan = subscriptionPlan(subscription)
  const customerId = stringId(subscription.customer)
  const currentPeriodEnd = currentPeriodEndIso(subscription)
  const cancelingAtPeriodEnd = cancelAtPeriodEnd(subscription)

  if (eventType === 'customer.subscription.deleted') {
    await updateStoreSubscription({
      eventType,
      storeId: storeIdFromMetadata,
      storeIdFromMetadata,
      plan,
      customerId,
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd,
      cancelAtPeriodEnd: cancelingAtPeriodEnd,
    })
    return
  }

  if (isDevelopment() && eventType === 'customer.subscription.updated') {
    console.warn('[Stripe cancellation sync]', {
      eventType,
      subscriptionId: subscription.id,
      storeId: storeIdFromMetadata,
      status: subscription.status,
      cancelAtPeriodEnd: cancelingAtPeriodEnd,
      stripeCancelAtPeriodEnd: (subscription as Stripe.Subscription & { cancel_at_period_end?: boolean | null }).cancel_at_period_end,
      cancelAt: (subscription as Stripe.Subscription & { cancel_at?: number | null }).cancel_at,
      currentPeriodEnd,
    })
  }

  logSubscriptionUpdate({
    eventType,
    storeId: storeIdFromMetadata,
    storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd,
    cancelAtPeriodEnd: cancelingAtPeriodEnd,
  })

  if (isDevelopment()) {
    console.warn('[Stripe webhook target storeId]', {
      eventType,
      targetStoreId: storeIdFromMetadata,
      subscriptionMetadataStoreId: subscription.metadata?.storeId,
      plan,
      customerId,
      subscriptionId: subscription.id,
    })
  }

  rememberStripeWebhookTargetStore({
    eventType,
    storeId: storeIdFromMetadata,
    plan,
    customerId,
    subscriptionId: subscription.id,
  })

  const updatedStore = await updateStoreBillingFromSubscription({
    storeId: storeIdFromMetadata,
    plan,
    subscription,
    customerId,
  })

  logStrictReadBack(eventType, storeIdFromMetadata, updatedStore)
  if (requiresActivePaidReadBack(eventType)) {
    assertActivePaidReadBack(eventType, storeIdFromMetadata, updatedStore)
  }
}

function invoiceSubscriptionId(invoice: Stripe.Invoice) {
  return (
    stringId((invoice as any).subscription) ??
    stringId((invoice as any).parent?.subscription_details?.subscription)
  )
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoiceSubscriptionId(invoice)

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    await handleSubscriptionChanged(subscription, 'invoice.payment_failed')
    return
  }

  const customerId = stringId((invoice as any).customer)
  if (!customerId) {
    console.error('Stripe invoice.payment_failed missing customer:', { invoiceId: invoice.id })
    return
  }

  const store = await findStoreForCustomer(customerId)
  if (!store) {
    console.error('Stripe invoice.payment_failed missing resolvable store:', { invoiceId: invoice.id, customerId })
    return
  }

  await updateStoreSubscription({
    eventType: 'invoice.payment_failed',
    storeId: store.id,
    plan: store.subscriptionPlan,
    customerId,
    subscriptionId: store.stripeSubscriptionId,
    status: 'past_due',
  })
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoiceSubscriptionId(invoice)

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    await handleSubscriptionChanged(subscription, 'invoice.payment_succeeded')
    return
  }

  const customerId = stringId((invoice as any).customer)
  if (!customerId) {
    console.error('Stripe invoice.payment_succeeded missing customer:', { invoiceId: invoice.id })
    return
  }

  const store = await findStoreForCustomer(customerId)
  if (!store?.stripeSubscriptionId) {
    return
  }

  const subscription = await stripe.subscriptions.retrieve(store.stripeSubscriptionId)
  await handleSubscriptionChanged(subscription, 'invoice.payment_succeeded')
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
    console.error('Stripe webhook signature verification failed:', {
      message,
      mode: stripeSecretMode(),
      hint: 'Check that STRIPE_WEBHOOK_SECRET matches the current Stripe CLI/dashboard webhook endpoint mode.',
    })
    return NextResponse.json({ error: message }, { status: 400 })
  }

  try {
    logWebhookReceived(event)
    warnWebhookModeMismatch(event)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleSubscriptionEventSafely(event, async () => {
          await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, event.type)
        })
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionEventSafely(event, async () => {
          await handleSubscriptionChanged(event.data.object as Stripe.Subscription, event.type)
        })
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionChanged(event.data.object as Stripe.Subscription, event.type)
        break
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_succeeded':
        await handleSubscriptionEventSafely(event, async () => {
          await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        })
        break
      default:
        if (isDevelopment()) {
          console.warn('[Stripe webhook ignored]', { eventType: event.type, eventId: event.id })
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process Stripe webhook'
    console.error('[Stripe webhook handler failed]', {
      eventType: event.type,
      eventId: event.id,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    if (isDevelopment()) {
      console.error('[Stripe webhook handler error object]', error)
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
