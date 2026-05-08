"use client";

import WidgetOpenCta from "@/components/WidgetOpenCta";

type WidgetDemoModalCtaProps = {
  className?: string;
  ctaId?: string;
  ctaText?: string;
  location?: string;
};

export default function WidgetDemoModalCta({
  className,
  ctaId = "footer-try-demo-widget",
  ctaText = "Try Demo Widget",
  location = "homepage",
}: WidgetDemoModalCtaProps) {
  return <WidgetOpenCta className={className} ctaId={ctaId} ctaText={ctaText} location={location} />;
}

