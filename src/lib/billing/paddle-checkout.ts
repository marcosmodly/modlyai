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

  console.log('[Paddle /api/billing/prices]', JSON.stringify({ ok: response.ok, status: response.status, ...result }))

  if (!response.ok || !result?.priceId) {
    throw new Error(result?.error || `Unable to load Paddle price for ${plan}.`)
  }

  return String(result.priceId)
}

export async function openPaddleCheckout({
  plan,
  priceId: priceIdInput,
  storeId,
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

  const normalizedStoreId = String(storeId || '').trim()
  if (!normalizedStoreId) {
    throw new Error('Missing storeId for checkout.')
  }

  const checkoutPayload: CheckoutOpenOptions = {
    items: [{ priceId, quantity: 1 }],
    customData: { storeId: normalizedStoreId, plan },
  }
  console.log('[Paddle Checkout Payload]', JSON.stringify(checkoutPayload))

  paddle.Checkout.open(checkoutPayload)
}

export async function openPaddleCustomerPortal(paddleCustomerId: string) {
  const customerId = String(paddleCustomerId || '').trim()
  if (!customerId) {
    throw new Error('No Paddle customer found for this account.')
  }

  const response = await fetch('/api/billing/portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paddleCustomerId: customerId }),
  })
  const result = (await response.json()) as { url?: string; error?: string }

  if (!response.ok || !result.url) {
    throw new Error(result.error || 'Unable to open billing portal')
  }

  window.location.assign(result.url)
}
