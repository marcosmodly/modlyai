export const PUBLIC_WIDGET_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
} as const

export function withPublicWidgetCors<T extends Response>(response: T): T {
  for (const [key, value] of Object.entries(PUBLIC_WIDGET_CORS_HEADERS)) {
    response.headers.set(key, value)
  }

  return response
}

export function publicWidgetOptionsResponse() {
  return new Response(null, {
    status: 204,
    headers: PUBLIC_WIDGET_CORS_HEADERS,
  })
}
