import type { Metadata } from "next";
import DemoPDP from "@/components/b2b/DemoPDP";

const demoTitle = "Try the ModlyAI Demo — No Signup Required";
const demoDescription =
  "See ModlyAI answer a fit question, place a piece in a room, customize it, and send a quote request with the full spec attached. No signup, no calendar.";

export const metadata: Metadata = {
  title: demoTitle,
  description: demoDescription,
  alternates: { canonical: "/demo" },
  openGraph: {
    siteName: "ModlyAI",
    title: demoTitle,
    description: demoDescription,
    url: "https://modlyai.tech/demo",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "A sofa shown in a customer's living room photo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: demoTitle,
    description: demoDescription,
    images: ["/og-default.png"],
  },
};

export default function DemoPage({
  searchParams,
}: {
  searchParams?: { frame?: string; theme?: string };
}) {
  // The mobile-preview iframe (see DemoPDP) always renders framed — no
  // marketing hero/CTA chrome, just the PDP + widget at the iframe's real
  // width. The regular page renders everything themed, DemoPDP included.
  return <DemoPDP framed={searchParams?.frame === "mobile"} initialTheme={searchParams?.theme} />;
}
