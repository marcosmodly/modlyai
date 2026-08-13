import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Pilot | ModlyAI",
  description:
    "Run a free three-month ModlyAI pilot on your storefront. We handle catalog connection, widget install, and configuration.",
  alternates: { canonical: "/request-pilot" },
};

export default function RequestPilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
