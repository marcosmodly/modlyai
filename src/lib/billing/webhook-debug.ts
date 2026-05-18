type PaddleWebhookTargetStore = {
  eventType: string
  storeId?: string
  plan?: string
  customerId?: string
  subscriptionId?: string
  createdAt: string
}

const globalKey = '__modlyPaddleWebhookTargetStoreIds'

type GlobalWithPaddleWebhookDebug = typeof globalThis & {
  [globalKey]?: PaddleWebhookTargetStore[]
}

function targetStoreLog() {
  const globalObject = globalThis as GlobalWithPaddleWebhookDebug
  globalObject[globalKey] ??= []
  return globalObject[globalKey]
}

export function rememberPaddleWebhookTargetStore(entry: Omit<PaddleWebhookTargetStore, 'createdAt'>) {
  if (process.env.NODE_ENV === 'production') return

  const log = targetStoreLog()
  log.unshift({
    ...entry,
    createdAt: new Date().toISOString(),
  })
  log.splice(20)
}

export function recentPaddleWebhookTargetStoreIds() {
  return targetStoreLog()
}
