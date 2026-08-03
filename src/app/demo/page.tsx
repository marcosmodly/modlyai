import type { Metadata } from "next";
import DemoExperience from "@/components/b2b/DemoExperience";
import DemoDisclaimer from "@/components/DemoDisclaimer";
import TrackedLink from "@/components/b2b/TrackedLink";

export const metadata: Metadata = {
  title: "Try the ModlyAI Demo — No Signup Required",
  description:
    "See ModlyAI answer a fit question, place a piece in a room, customize it, and send a quote request with the full spec attached. No signup, no calendar.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] px-6 py-12 text-[#171411] md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Live demo</div>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl">
            See it work. No signup, no calendar.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#665c52]">
            This is the real ModlyAI assistant, answering only from the fictional catalog on this page. Ask whether
            something fits, then customize one of the made-to-order pieces and see the exact spec it would send a
            retailer as a quote request.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#8a714f]">
          <span className="rounded-full border border-[#e1d7ca] bg-white px-3 py-1.5">1. Ask about fit</span>
          <span className="rounded-full border border-[#e1d7ca] bg-white px-3 py-1.5">2. Attach a room</span>
          <span className="rounded-full border border-[#e1d7ca] bg-white px-3 py-1.5">3. Customize it</span>
          <span className="rounded-full border border-[#e1d7ca] bg-white px-3 py-1.5">4. Send the quote</span>
        </div>

        <div className="mt-6">
          <DemoExperience />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[#e1d7ca] bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-[#171411]">Ready to try it on your own catalog?</p>
            <p className="mt-1 text-sm text-[#665c52]">Free trial, no card required. Or talk to us first.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/auth/signup"
              ctaId="demo-page-get-started-free"
              ctaText="Get Started Free"
              location="demo"
              className="inline-flex items-center justify-center rounded-full bg-[#171411] px-6 py-3 text-sm font-semibold text-[#fffaf2] transition hover:bg-black"
            >
              Get Started Free
            </TrackedLink>
            <TrackedLink
              href="/request-pilot"
              ctaId="demo-page-request-pilot"
              ctaText="Request the design-partner pilot"
              location="demo"
              className="inline-flex items-center justify-center rounded-full border border-[#d7cab9] bg-white px-6 py-3 text-sm font-semibold text-[#171411] transition hover:bg-[#faf3e8]"
            >
              Request the pilot
            </TrackedLink>
          </div>
        </div>

        <DemoDisclaimer className="mt-6 text-xs leading-5 text-[#a0937f]" />
      </div>
    </main>
  );
}
