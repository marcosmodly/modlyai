type StripeWebhookTargetStore = {
  eventType: string
  storeId?: string
  plan?: string
  customerId?: string
  subscriptionId?: string
  createdAt: string
}

const globalKey = '__modlyStripeWebhookTargetStoreIds'

type GlobalWithStripeWebhookDebug = typeof globalThis & {
  [globalKey]?: StripeWebhookTargetStore[]
}

function targetStoreLog() {
  const globalObject = globalThis as GlobalWithStripeWebhookDebug
  globalObject[globalKey] ??= []
  return globalObject[globalKey]
}

export function rememberStripeWebhookTargetStore(entry: Omit<StripeWebhookTargetStore, 'createdAt'>) {
  if (process.env.NODE_ENV === 'production') return

  const log = targetStoreLog()
  log.unshift({
    ...entry,
    createdAt: new Date().toISOString(),
  })
  log.splice(20)
}

export function recentStripeWebhookTargetStoreIds() {
  return targetStoreLog()
}
