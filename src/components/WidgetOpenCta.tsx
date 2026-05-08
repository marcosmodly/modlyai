"use client";

import type { PropsWithChildren } from "react";
import { trackCtaClick } from "@/lib/analytics";

type WidgetOpenCtaProps = PropsWithChildren<{
  className?: string;
  ctaId: string;
  ctaText: string;
  location?: string;
}>;

function openModlyWidget() {
  if (typeof window === "undefined") return;

  const btn = document.querySelector<HTMLButtonElement>(".modly-widget-button");
  if (btn) {
    btn.click();
    return;
  }

  window.dispatchEvent(new CustomEvent("modly:open-widget"));
}

export default function WidgetOpenCta({
  className,
  ctaId,
  ctaText,
  location = "site",
  children,
}: WidgetOpenCtaProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        trackCtaClick({ ctaId, ctaText, location });
        openModlyWidget();
      }}
    >
      {children ?? ctaText}
    </button>
  );
}

