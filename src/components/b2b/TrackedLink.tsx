"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";
import { trackCtaClick } from "@/lib/analytics";

type TrackedLinkProps = PropsWithChildren<{
  href: string;
  ctaId: string;
  ctaText: string;
  location?: string;
  className?: string;
}>;

export default function TrackedLink({
  href,
  ctaId,
  ctaText,
  location = "homepage",
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
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

