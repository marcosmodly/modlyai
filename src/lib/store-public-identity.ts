export function generatePublicApiKey() {
  const mode = process.env.NODE_ENV === 'production' ? 'live' : 'test'
  return `pk_${mode}_${crypto.randomUUID().replace(/-/g, '')}`
}

export function generateWidgetId() {
  return `wid_${crypto.randomUUID().replace(/-/g, '')}`
}

export function resolveWidgetId(storeId: string, widgetId?: string | null) {
  const existingWidgetId = String(widgetId ?? '').trim()
  return existingWidgetId && existingWidgetId !== storeId ? existingWidgetId : generateWidgetId()
}
