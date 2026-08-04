"use client";

import Link from "next/link";
import type { CSSProperties, PropsWithChildren } from "react";
import { trackCtaClick } from "@/lib/analytics";

type TrackedLinkProps = PropsWithChildren<{
  href: string;
  ctaId: string;
  ctaText: string;
  location?: string;
  className?: string;
  style?: CSSProperties;
}>;

export default function TrackedLink({
  href,
  ctaId,
  ctaText,
  location = "homepage",
  className,
  style,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={() =>
        trackCtaClick({
          ctaId,
          ctaText,
          location,
          href,
        })
      }
    >
      {children}
    </Link>
  );
}

