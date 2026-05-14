import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { getCurrentStoreForUser } from '@/lib/current-store'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (!appUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_APP_URL is not configured' }, { status: 500 })
    }

    const store = await getCurrentStoreForUser(session.user)

    if (!store) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stripeCustomerId = store.stripeCustomerId ? String(store.stripeCustomerId).trim() : ''

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: 'No Stripe customer found for this account.' },
        { status: 400 }
      )
    }

    // Customer Portal must be enabled/configured in the Stripe Dashboard.
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/dashboard/billing?portal_return=true`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create billing portal session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
