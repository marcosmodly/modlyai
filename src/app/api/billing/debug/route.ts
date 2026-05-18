import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { recentPaddleWebhookTargetStoreIds } from '@/lib/billing/webhook-debug'
import { getCurrentStoreForUser } from '@/lib/current-store'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const store = await getCurrentStoreForUser(session.user)

  const currentStoreBillingFields = store
    ? {
        id: store.id,
        ownerEmail: store.ownerEmail,
        userId: store.userId,
        subscriptionPlan: store.subscriptionPlan,
        subscriptionStatus: store.subscriptionStatus,
        paddleCustomerId: store.paddleCustomerId,
        paddleSubscriptionId: store.paddleSubscriptionId,
        currentPeriodEnd: store.currentPeriodEnd,
        cancelAtPeriodEnd: store.cancelAtPeriodEnd,
        trialEndsAt: store.trialEndsAt,
        updatedAt: store.updatedAt,
      }
    : null

  return NextResponse.json({
    currentUserEmail: session.user.email ?? null,
    currentUserId: session.user.id ?? null,
    currentStoreId: store?.id ?? null,
    currentStoreBillingFields,
    recentPaddleWebhookTargetStoreIds: recentPaddleWebhookTargetStoreIds(),
  })
}
