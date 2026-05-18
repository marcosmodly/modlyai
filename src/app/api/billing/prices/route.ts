import { NextResponse } from 'next/server'
import { getPaddlePriceId, isCheckoutPlan } from '@/lib/plans'

export async function GET(request: Request) {
  const plan = new URL(request.url).searchParams.get('plan')

  if (!isCheckoutPlan(plan)) {
    return NextResponse.json({ error: 'Invalid billing plan' }, { status: 400 })
  }

  const priceId = getPaddlePriceId(plan)
  if (!priceId) {
    return NextResponse.json({ error: `PADDLE_PRICE_${plan.toUpperCase()} is not configured` }, { status: 500 })
  }

  return NextResponse.json({ plan, priceId })
}
