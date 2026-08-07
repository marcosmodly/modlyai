import type { Metadata } from "next";
import DemoPDP from "@/components/b2b/DemoPDP";

export const metadata: Metadata = {
  title: "Try the ModlyAI Demo — No Signup Required",
  description:
    "See ModlyAI answer a fit question, place a piece in a room, customize it, and send a quote request with the full spec attached. No signup, no calendar.",
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
