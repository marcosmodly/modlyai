import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { adminDb, adminDbLenient } from '@/lib/instant-admin'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function stringId(value: string | { id: string } | null | undefined) {
  if (!value) return undefined
  return typeof value === 'string' ? value : value.id
}

function periodEndIso(subscription: Stripe.Subscription) {
  const periodEnd = (subscription as any).current_period_end
  return typeof periodEnd === 'number' ? new Date(periodEnd * 1000).toISOString() : undefined
}

function subscriptionPlan(subscription: Stripe.Subscription, fallbackPlan?: string) {
  const metadataPlan = subscription.metadata?.plan
  if (metadataPlan === 'starter' || metadataPlan === 'growth') return metadataPlan

  const priceIds = subscription.items.data
    .map((item) => item.price?.id)
    .filter(Boolean)
  const starterPrice = process.env.STRIPE_PRICE_STARTER
  const growthPrice = process.env.STRIPE_PRICE_GROWTH

  if (starterPrice && priceIds.includes(starterPrice)) return 'starter'
  if (growthPrice && priceIds.includes(growthPrice)) return 'growth'
  if (fallbackPlan === 'starter' || fallbackPlan === 'growth') return fallbackPlan
  return undefined
}

function isNonProduction() {
  return process.env.NODE_ENV !== 'production'
}

async function latestSubscriptionForCustomers(customers: Stripe.Customer[]) {
  const subscriptions: Stripe.Subscription[] = []

  for (const customer of customers) {
    const result = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 10,
      status: 'all',
    })
    subscriptions.push(...result.data)
  }

  return subscriptions.sort((a, b) => b.created - a.created)[0]
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await getCurrentStoreForUser(session.user)

  if (!store?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const storeId = String(store.id)

  const customers: Stripe.Customer[] = []
  const stripeCustomerId = store.stripeCustomerId ? String(store.stripeCustomerId) : ''

  if (stripeCustomerId) {
    const customer = await stripe.customers.retrieve(stripeCustomerId)
    if (!customer.deleted) customers.push(customer)
  }

  if (!customers.length && session.user.email) {
    const customerList = await stripe.customers.list({
      email: session.user.email,
      limit: 10,
    })
    customers.push(...customerList.data)
  }

  const subscription = await latestSubscriptionForCustomers(customers)

  if (!subscription) {
    return NextResponse.json({
      error: 'No Stripe subscription found for current store/customer/email.',
      currentStoreId: storeId,
      currentUserEmail: session.user.email ?? null,
      searchedCustomerIds: customers.map((customer) => customer.id),
    }, { status: 404 })
  }

  const plan = subscriptionPlan(subscription, store.subscriptionPlan ?? undefined)
  const update = Object.fromEntries(
    Object.entries({
      subscriptionPlan: plan,
      subscriptionStatus: subscription.status,
      stripeCustomerId: stringId(subscription.customer),
      stripeSubscriptionId: subscription.id,
      currentPeriodEnd: periodEndIso(subscription),
      cancelAtPeriodEnd: Boolean((subscription as any).cancel_at_period_end),
      updatedAt: new Date().toISOString(),
    }).filter(([, value]) => value !== undefined && value !== null)
  )

  if (isNonProduction()) {
    console.warn('[Billing sync latest test update payload]', {
      storeId,
      subscriptionMetadataStoreId: subscription.metadata?.storeId,
      update,
    })
  }

  await adminDbLenient.transact([
    adminDbLenient.tx.stores[storeId].update(update),
  ])

  const readBack = await adminDb.query({
    stores: {
      $: { where: { id: storeId } },
    },
  })
  const updatedStore = readBack.stores[0]

  return NextResponse.json({
    currentUserEmail: session.user.email ?? null,
    currentStoreId: storeId,
    subscriptionMetadataStoreId: subscription.metadata?.storeId ?? null,
    stripeSubscriptionId: subscription.id,
    update,
    storeAfterUpdate: updatedStore
      ? {
          subscriptionPlan: updatedStore.subscriptionPlan,
          subscriptionStatus: updatedStore.subscriptionStatus,
          stripeCustomerId: updatedStore.stripeCustomerId,
          stripeSubscriptionId: updatedStore.stripeSubscriptionId,
          currentPeriodEnd: updatedStore.currentPeriodEnd,
          cancelAtPeriodEnd: updatedStore.cancelAtPeriodEnd,
        }
      : null,
  })
}
