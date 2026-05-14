const SESSION_STORAGE_KEY = 'modlyai_session_id';

export type WidgetAnalyticsEventType =
  | 'widget_opened'
  | 'chat_started'
  | 'message_sent'
  | 'product_recommended'
  | 'view_in_catalog_clicked'
  | 'customize_clicked'
  | 'quote_started'
  | 'quote_requested'
  | 'room_planner_opened'
  | 'room_analyzed'
  | 'pdf_exported'
  | 'configuration_saved';

export interface WidgetAnalyticsPayload {
  storeId?: string;
  widgetId?: string;
  sessionId?: string;
  type: WidgetAnalyticsEventType;
  productId?: string;
  productName?: string;
  metadata?: Record<string, unknown>;
  apiBaseUrl?: string;
}

function createFallbackId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getWidgetSessionId() {
  if (typeof window === 'undefined') return createFallbackId();

  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;

    const next =
      typeof window.crypto?.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : createFallbackId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
    return next;
  } catch {
    return createFallbackId();
  }
}

function getAnalyticsEndpoint(apiBaseUrl?: string) {
  const path = '/api/analytics/events';
  if (!apiBaseUrl) return path;

  try {
    return new URL(path, apiBaseUrl).toString();
  } catch {
    return path;
  }
}

function shouldWarnInDevelopment() {
  if (typeof window === 'undefined') return false;
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

export function trackWidgetEvent({
  storeId,
  widgetId,
  sessionId,
  type,
  productId,
  productName,
  metadata,
  apiBaseUrl,
}: WidgetAnalyticsPayload) {
  if (!storeId || typeof window === 'undefined') return;

  const payload = {
    storeId,
    widgetId,
    sessionId: sessionId || getWidgetSessionId(),
    type,
    productId,
    productName,
    metadata,
  };

  window.setTimeout(() => {
    try {
      void fetch(getAnalyticsEndpoint(apiBaseUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((error) => {
        if (shouldWarnInDevelopment()) {
          console.warn('ModlyAI analytics event failed:', error);
        }
      });
    } catch (error) {
      if (shouldWarnInDevelopment()) {
        console.warn('ModlyAI analytics event failed:', error);
      }
    }
  }, 0);
}

