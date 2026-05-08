export type CtaClickPayload = {
  ctaId: string;
  ctaText: string;
  location: string;
  href?: string;
};

/**
 * Lightweight CTA click tracking.
 * - Prefers `window.dataLayer` if present (GTM-style).
 * - Falls back to dispatching a custom event + localStorage for dev visibility.
 */
export function trackCtaClick(payload: CtaClickPayload) {
  if (typeof window === "undefined") return;

  const fullPayload = {
    event: "modly_cta_click",
    ...payload,
    ts: Date.now(),
  };

  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(fullPayload);
      return;
    }
  } catch {
    // ignore
  }

  try {
    window.dispatchEvent(new CustomEvent("modly:cta-click", { detail: fullPayload }));
  } catch {
    // ignore
  }

  // Dev fallback so the event isn't a complete no-op.
  try {
    const key = "modly_cta_clicks";
    const existing = localStorage.getItem(key);
    const arr = existing ? (JSON.parse(existing) as unknown[]) : [];
    arr.push(fullPayload);
    localStorage.setItem(key, JSON.stringify(arr.slice(-50)));
  } catch {
    // ignore
  }
}

