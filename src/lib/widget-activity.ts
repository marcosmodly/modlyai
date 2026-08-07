export const widgetActivityTypes = new Set([
  'widget_opened',
  'chat_started',
  'message_sent',
  'room_analyzed',
  'quote_requested',
])

type ActivityEvent = Record<string, unknown>

function isWithinDays(createdAt: unknown, days: number) {
  const timestamp = new Date(String(createdAt ?? 0)).getTime()
  if (!Number.isFinite(timestamp)) return false
  return Date.now() - timestamp <= days * 24 * 60 * 60 * 1000
}

export function isRecentWidgetActivity(event: ActivityEvent, days = 7) {
  return typeof event.type === 'string' && widgetActivityTypes.has(event.type) && isWithinDays(event.createdAt, days)
}

export function hasWidgetOpenedEver(events: ActivityEvent[]) {
  return events.some((event) => event.type === 'widget_opened')
}

export function hasWidgetOpenedRecently(events: ActivityEvent[], days = 7) {
  return events.some((event) => event.type === 'widget_opened' && isWithinDays(event.createdAt, days))
}
