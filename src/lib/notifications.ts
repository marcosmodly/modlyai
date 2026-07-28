import { adminDb, id } from '@/lib/instant-admin'

export type NotificationType =
  | 'quote_request'
  | 'security_new_signin'
  | 'security_password_changed'
  | 'security_email_changed'
  | 'security_signed_out_other_devices'
  | 'billing_custom_plan_activated'
  | 'billing_renewal_reminder'
  | 'billing_cancellation_reminder'
  | 'billing_payment_failed'
  | 'billing_trial_ending'

// Fire-and-forget by design: a failure here should never block the action
// that triggered it (a login, a password change, a quote request) - it's
// logged but swallowed rather than thrown.
export async function notifyUser(params: {
  userId: string
  storeId?: string | null
  type: NotificationType
  title: string
  message: string
  link?: string
}) {
  try {
    await adminDb.transact([
      adminDb.tx.notifications[id()].update({
        userId: params.userId,
        storeId: params.storeId || undefined,
        type: params.type,
        title: params.title,
        message: params.message,
        link: params.link,
        read: false,
        createdAt: Date.now(),
      }),
    ])
  } catch (error) {
    console.error('[Notifications] Failed to create notification:', error)
  }
}

// Looks up every user linked to a store and sends the same notification to
// each of them - used for store-level events (like a new quote request) on
// stores that may have more than one user (see the usersStore link in
// instant.schema.ts).
export async function notifyStoreUsers(params: {
  storeId: string
  type: NotificationType
  title: string
  message: string
  link?: string
}) {
  try {
    const result = await adminDb.query({
      stores: { $: { where: { id: params.storeId } }, users: {} },
    })
    const users: Array<{ id: string }> = result.stores?.[0]?.users ?? []

    if (users.length === 0) return

    await adminDb.transact(
      users.map((user) =>
        adminDb.tx.notifications[id()].update({
          userId: user.id,
          storeId: params.storeId,
          type: params.type,
          title: params.title,
          message: params.message,
          link: params.link,
          read: false,
          createdAt: Date.now(),
        })
      )
    )
  } catch (error) {
    console.error('[Notifications] Failed to create store notifications:', error)
  }
}
