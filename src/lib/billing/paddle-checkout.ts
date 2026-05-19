'use client'

import type { CheckoutOpenOptions } from '@paddle/paddle-js'
import { getPaddleClient } from '@/lib/paddle-client'
import type { CheckoutPlanId } from '@/lib/plans'

type OpenPaddleCheckoutInput = {
  plan: CheckoutPlanId
  priceId?: string
  storeId: string
  email?: string | null
  paddleCustomerId?: string | null
}

async function fetchCheckoutPriceId(plan: CheckoutPlanId) {
  const response = await fetch(`/api/billing/prices?plan=${plan}`, { cache: 'no-store' })
  const result = await response.json()

  if (!response.ok || !result?.priceId) {
    throw new Error(result?.error || `Unable to load Paddle price for ${plan}.`)
  }

  return String(result.priceId)
}

export async function openPaddleCheckout({
  plan,
  priceId: priceIdInput,
  storeId,
  email,
  paddleCustomerId,
}: OpenPaddleCheckoutInput) {
  const paddle = await getPaddleClient()
  if (!paddle?.Checkout?.open) {
    throw new Error(
      'Paddle checkout is not available. Verify NEXT_PUBLIC_PADDLE_CLIENT_TOKEN and NEXT_PUBLIC_PADDLE_ENV=production are set for this deployment.',
    )
  }

  const priceId = String(priceIdInput || '').trim() || (await fetchCheckoutPriceId(plan))
  if (!priceId) {
    throw new Error(`Paddle price is not configured for the ${plan} plan. Set PADDLE_PRICE_${plan.toUpperCase()} in production.`)
  }

  console.log('[Paddle] Opening checkout', { plan, priceId, storeId })

  const normalizedStoreId = String(storeId || '').trim()
  if (!normalizedStoreId) {
    throw new Error('Missing storeId for checkout.')
  }

  const customerId = String(paddleCustomerId || '').trim()
  const customerEmail = String(email || '').trim()

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customData: {
      storeId: normalizedStoreId,
      plan,
    },
    customer: customerId
      ? { id: customerId }
      : customerEmail
        ? { email: customerEmail }
        : undefined,
    settings: {
      displayMode: 'overlay',
    },
  })
}

export async function openPaddleCustomerPortal(paddleCustomerId: string) {
  const paddle = await getPaddleClient()
  if (!paddle) {
    throw new Error('Paddle billing portal is not available.')
  }

  const customerId = String(paddleCustomerId || '').trim()
  if (!customerId) {
    throw new Error('No Paddle customer found for this account.')
  }

  paddle.Checkout.open({
    customer: { id: customerId },
    settings: {
      displayMode: 'overlay',
    },
  } as CheckoutOpenOptions)
}
