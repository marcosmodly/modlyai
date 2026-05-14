type WidgetInstallSnippetOptions = {
  storeId?: string | null
  widgetId?: string | null
}

export function createWidgetInstallSnippet({
  storeId,
  widgetId,
}: WidgetInstallSnippetOptions) {
  const normalizedStoreId = String(storeId ?? '').trim()
  const normalizedWidgetId = String(widgetId ?? '').trim()

  if (!normalizedStoreId || !normalizedWidgetId) {
    return null
  }

  return `<script
  src="https://modlyai.tech/widget.js"
  data-modly-widget
  data-store-id="${normalizedStoreId}"
  data-widget-id="${normalizedWidgetId}"
  data-config-url="https://modlyai.tech/api/widget/config"
></script>`
}
