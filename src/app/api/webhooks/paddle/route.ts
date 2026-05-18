import { EventName, type Subscription, type Transaction } from '@paddle/paddle-node-sdk'
import { NextResponse } from 'next/server'
import {
  cancelAtPeriodEnd,
  currentPeriodEndIso,
  readCustomDataValue,
  stringId,
  subscriptionPlanFromPaddle,
  trialDatesFromSubscription,
  updateStoreBillingFields,
  updateStoreBillingFromSubscription,
} from '@/lib/billing/update-store-billing'
import { rememberPaddleWebhookTargetStore } from '@/lib/billing/webhook-debug'
import { adminDb } from '@/lib/instant-admin'
import { paddle } from '@/lib/paddle'

export const runtime = 'nodejs'

type StoreBillingRecord = {
  id: string
  paddleCustomerId?: string
  paddleSubscriptionId?: string
  subscriptionStatus?: string
  subscriptionPlan?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd?: boolean
}

function readCustomData(customData: unknown) {
  return {
    storeId: readCustomDataValue(customData, 'storeId'),
    plan: readCustomDataValue(customData, 'plan'),
  }
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

async function findStoreForSubscription(subscription: Subscription): Promise<StoreBillingRecord | undefined> {
  const { storeId } = readCustomData(subscription.customData)
  if (storeId) {
    const store = await findStoreById(storeId)
    if (store) return store
  }

  const bySubscription = await adminDb.query({
    stores: {
      $: { where: { paddleSubscriptionId: subscription.id } },
    },
  })
  if (bySubscription.stores[0]) return bySubscription.stores[0] as StoreBillingRecord

  const customerId = stringId(subscription.customerId)
  if (customerId) {
    const byCustomer = await adminDb.query({
      stores: {
        $: { where: { paddleCustomerId: customerId } },
      },
    })
    if (byCustomer.stores[0]) return byCustomer.stores[0] as StoreBillingRecord
  }

  return undefined
}

async function findStoreForTransaction(transaction: Transaction): Promise<StoreBillingRecord | undefined> {
  const { storeId } = readCustomData(transaction.customData)
  if (storeId) {
    const store = await findStoreById(storeId)
    if (store) return store
  }

  const customerId = stringId(transaction.customerId)
  if (!customerId) return undefined

  const byCustomer = await adminDb.query({
    stores: {
      $: { where: { paddleCustomerId: customerId } },
    },
  })

  return byCustomer.stores[0] as StoreBillingRecord | undefined
}

async function resolveStoreForSubscription(subscription: Subscription) {
  const { storeId, plan } = readCustomData(subscription.customData)
  const store = await findStoreForSubscription(subscription)

  if (!store?.id && !storeId) {
    throw new Error(`Missing storeId for Paddle subscription ${subscription.id}.`)
  }

  return {
    storeId: store?.id || storeId || '',
    plan: plan || store?.subscriptionPlan,
  }
}

async function loadSubscription(subscriptionId: string) {
  return paddle.subscriptions.get(subscriptionId)
}

/** subscription.created — set paddle IDs, plan, status, trial dates, period end */
async function handleSubscriptionCreated(subscriptionId: string) {
  const subscription = await loadSubscription(subscriptionId)
  const { storeId, plan } = await resolveStoreForSubscription(subscription)

  rememberPaddleWebhookTargetStore({
    eventType: EventName.SubscriptionCreated,
    storeId,
    plan,
    customerId: subscription.customerId,
    subscriptionId: subscription.id,
  })

  await updateStoreBillingFromSubscription({
    storeId,
    plan,
    subscription,
    customerId: subscription.customerId,
  })
}

/** subscription.updated — sync status, plan, cancelAtPeriodEnd, currentPeriodEnd */
async function handleSubscriptionUpdated(subscriptionId: string) {
  const subscription = await loadSubscription(subscriptionId)
  const { storeId, plan } = await resolveStoreForSubscription(subscription)

  rememberPaddleWebhookTargetStore({
    eventType: EventName.SubscriptionUpdated,
    storeId,
    plan,
    customerId: subscription.customerId,
    subscriptionId: subscription.id,
  })

  await updateStoreBillingFromSubscription({
    storeId,
    plan,
    subscription,
    customerId: subscription.customerId,
  })
}

/** subscription.canceled — mark canceled, clear cancel-at-period-end flag */
async function handleSubscriptionCanceled(subscriptionId: string) {
  const subscription = await loadSubscription(subscriptionId)
  const { storeId, plan } = await resolveStoreForSubscription(subscription)

  rememberPaddleWebhookTargetStore({
    eventType: EventName.SubscriptionCanceled,
    storeId,
    plan,
    customerId: subscription.customerId,
    subscriptionId: subscription.id,
  })

  await updateStoreBillingFields({
    storeId,
    update: {
      subscriptionPlan: subscriptionPlanFromPaddle(subscription, plan),
      subscriptionStatus: 'canceled',
      paddleCustomerId: subscription.customerId,
      paddleSubscriptionId: subscription.id,
      currentPeriodEnd: currentPeriodEndIso(subscription),
      cancelAtPeriodEnd: false,
    },
  })
}

/** transaction.completed — confirm payment; ensure subscription is active */
async function handleTransactionCompleted(transaction: Transaction) {
  const store = await findStoreForTransaction(transaction)
  if (!store?.id) {
    console.error('[Paddle webhook transaction.completed] missing store', {
      transactionId: transaction.id,
      customerId: transaction.customerId,
    })
    return
  }

  const subscriptionId = transaction.subscriptionId ? String(transaction.subscriptionId) : ''
  if (subscriptionId) {
    const subscription = await loadSubscription(subscriptionId)
    await updateStoreBillingFromSubscription({
      storeId: store.id,
      plan: store.subscriptionPlan,
      subscription,
      customerId: subscription.customerId,
    })
    await updateStoreBillingFields({
      storeId: store.id,
      update: { subscriptionStatus: 'active' },
    })
    return
  }

  await updateStoreBillingFields({
    storeId: store.id,
    update: {
      subscriptionStatus: 'active',
      paddleCustomerId: transaction.customerId ? String(transaction.customerId) : undefined,
    },
  })
}

/** transaction.payment_failed — set past_due */
async function handleTransactionPaymentFailed(transaction: Transaction) {
  const store = await findStoreForTransaction(transaction)
  if (!store?.id) {
    console.error('[Paddle webhook transaction.payment_failed] missing store', {
      transactionId: transaction.id,
      customerId: transaction.customerId,
    })
    return
  }

  const subscriptionId = transaction.subscriptionId ? String(transaction.subscriptionId) : ''
  if (subscriptionId) {
    const subscription = await loadSubscription(subscriptionId)
    const { trialStartedAt, trialEndsAt } = trialDatesFromSubscription(subscription)

    await updateStoreBillingFields({
      storeId: store.id,
      update: {
        subscriptionPlan: subscriptionPlanFromPaddle(subscription, store.subscriptionPlan),
        subscriptionStatus: 'past_due',
        paddleCustomerId: subscription.customerId,
        paddleSubscriptionId: subscription.id,
        currentPeriodEnd: currentPeriodEndIso(subscription),
        cancelAtPeriodEnd: cancelAtPeriodEnd(subscription),
        trialStartedAt,
        trialEndsAt,
      },
    })
    return
  }

  await updateStoreBillingFields({
    storeId: store.id,
    update: {
      subscriptionStatus: 'past_due',
      paddleCustomerId: transaction.customerId ? String(transaction.customerId) : undefined,
    },
  })
}

export async function POST(request: Request) {
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('PADDLE_WEBHOOK_SECRET is not configured.')
    return NextResponse.json({ error: 'PADDLE_WEBHOOK_SECRET is not configured' }, { status: 500 })
  }

  const signature = request.headers.get('paddle-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing Paddle signature' }, { status: 400 })
  }

  const rawBody = await request.text()

  try {
    const event = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature)

    switch (event.eventType) {
      case EventName.SubscriptionCreated:
        await handleSubscriptionCreated(event.data.id)
        break
      case EventName.SubscriptionUpdated:
        await handleSubscriptionUpdated(event.data.id)
        break
      case EventName.SubscriptionCanceled:
        await handleSubscriptionCanceled(event.data.id)
        break
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data as Transaction)
        break
      case EventName.TransactionPaymentFailed:
        await handleTransactionPaymentFailed(event.data as Transaction)
        break
      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process Paddle webhook'
    console.error('[Paddle webhook handler failed]', {
      message,
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
