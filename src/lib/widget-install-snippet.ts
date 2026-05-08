type WidgetInstallSnippetOptions = {
  storeId?: string | null
  widgetId?: string | null
}

export function createWidgetInstallSnippet({
  storeId,
  widgetId,
}: WidgetInstallSnippetOptions) {
  if (!storeId) {
    return null
  }

  return `<script
  type="module"
  src="https://modlyai.tech/widget.js"
  data-modly-widget
  data-store-id="${storeId}"
  data-widget-id="${widgetId || storeId}"
  data-config-url="https://modlyai.tech/api/widget/config"
></script>`
}
