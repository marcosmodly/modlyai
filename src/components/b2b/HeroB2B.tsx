"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import TrackedLink from "@/components/b2b/TrackedLink";

const HEADLINES = [
  "Your Customers Want to Know: Will It Fit?",
  "Stop Losing $X,XXX Monthly to Furniture Returns",
  "34% of Furniture Gets Returned. We Fix That.",
  "AI That Stops Returns Before They Happen",
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function DemoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-label="2-minute demo"
    >
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close demo modal"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#071A33] shadow-[0_30px_120px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-sm font-semibold text-text-primary">2‑Minute Demo</div>
          <button
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[rgba(226,232,240,0.86)] hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="p-5 md:p-6">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
            <div className="text-sm font-semibold text-text-primary">What your shopper experiences</div>
            <div className="mt-3 grid md:grid-cols-2 gap-4 items-start">
              <div className="rounded-xl border border-white/10 bg-[#0A1630]/60 p-4">
                <div className="text-xs text-[rgba(226,232,240,0.72)]">Room photo</div>
                <div className="mt-3 h-[140px] rounded-lg bg-gradient-to-br from-white/10 to-white/0 relative overflow-hidden">
                  <div className="absolute inset-0 modly-hero-scan" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2BE7C6]" />
                    <span className="text-xs text-[rgba(226,232,240,0.86)]">AI analyzing layout & space…</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0A1630]/60 p-4">
                <div className="text-xs text-[rgba(226,232,240,0.72)]">Fits‑confirmed picks</div>
                <div className="mt-3 space-y-2">
                  {[
                    { name: "Sofa • 84in", fit: "Fits", tone: "bg-[#2BE7C6]/15 border-[#2BE7C6]/30 text-[#BFF9F0]" },
                    { name: "Coffee table • 48in", fit: "Fits", tone: "bg-[#2BE7C6]/15 border-[#2BE7C6]/30 text-[#BFF9F0]" },
                    { name: "Sectional • 110in", fit: "Too large", tone: "bg-[#FF6B6B]/10 border-[#FF6B6B]/25 text-[#FFD1D1]" },
                  ].map((p) => (
                    <div key={p.name} className={`rounded-lg border px-3 py-2 ${p.tone}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs font-semibold">{p.name}</div>
                        <div className="text-[11px]">{p.fit}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#2D6BFF]" />
                    <span className="text-xs text-[rgba(226,232,240,0.90)]">Add to cart with confidence</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-[rgba(226,232,240,0.70)]">
              This is a lightweight preview. On your store, recommendations are generated from your catalog + product dimensions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualProof() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-[#2D6BFF]/15 via-transparent to-[#2BE7C6]/10 blur-2xl" />
      <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-soft">
        <div className="relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-[0.20] blur-[0.4px] modly-hero-grid" />
          </div>

          <div className="p-5 border-b border-white/10 bg-[#0A1630]/40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-text-primary">Visual proof</div>
                <div className="text-xs text-[rgba(226,232,240,0.72)] mt-1">
                  Shoppers confirm fit before purchase. You ship fewer returns.
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[rgba(226,232,240,0.70)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2BE7C6] modly-hero-pulse" />
                  Live preview
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 grid gap-4">
            <div className="rounded-xl border border-white/10 bg-[#0A1630]/55 p-4">
              <div className="text-xs font-semibold text-[rgba(226,232,240,0.88)]">Animated flow</div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { title: "Upload photo", sub: "Room image", color: "from-[#2D6BFF]/25 to-transparent" },
                  { title: "AI analyzes", sub: "Space + style", color: "from-[#2BE7C6]/20 to-transparent" },
                  { title: "Shows what fits", sub: "Matches catalog", color: "from-[#2D6BFF]/20 to-transparent" },
                  { title: "Confident cart", sub: "Fewer returns", color: "from-[#2BE7C6]/20 to-transparent" },
                ].map((s, idx) => (
                  <div key={s.title} className="relative rounded-lg border border-white/10 bg-white/5 p-3 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-b opacity-70"
                      style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.color} modly-hero-step-${idx + 1}`} />
                    <div className="relative">
                      <div className="text-[11px] font-semibold text-text-primary leading-snug">{s.title}</div>
                      <div className="text-[10px] text-[rgba(226,232,240,0.70)] mt-1">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-[#2D6BFF] via-[#2BE7C6] to-[#2D6BFF] modly-hero-progress" />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1630]/55 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-[rgba(226,232,240,0.88)]">Before vs After</div>
                  <div className="text-[11px] text-[rgba(226,232,240,0.70)] mt-1">
                    Returns trend (illustrative)
                  </div>
                </div>
                <div className="text-[11px] text-[rgba(226,232,240,0.70)]">Monthly</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/4 p-3">
                  <div className="text-[11px] font-semibold text-[rgba(226,232,240,0.86)]">Before ModlyAI</div>
                  <div className="mt-3 flex items-end gap-1.5 h-16">
                    {[65, 72, 68, 75, 70].map((h, i) => (
                      <div key={i} className="w-1/5 rounded-sm bg-[#FF6B6B]/40 border border-[#FF6B6B]/25 modly-hero-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-[#FFD1D1]">High return rates</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/4 p-3">
                  <div className="text-[11px] font-semibold text-[rgba(226,232,240,0.86)]">After ModlyAI</div>
                  <div className="mt-3 flex items-end gap-1.5 h-16">
                    {[40, 38, 35, 33, 30].map((h, i) => (
                      <div key={i} className="w-1/5 rounded-sm bg-[#2BE7C6]/35 border border-[#2BE7C6]/25 modly-hero-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-[#BFF9F0]">Fewer returns</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/4 overflow-hidden">
              <img
                src="/images/dashboard-screenshot.png"
                alt="Merchant dashboard showing top-level performance stats"
                className="w-full h-full object-cover object-top rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-[rgba(226,232,240,0.70)]">
        Customer-side room matching + merchant analytics dashboard.
      </div>
    </div>
  );
}

export default function HeroB2B() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);

  const initialHeadlineIdx = useMemo(() => {
    // Slightly "A/B test-like" behavior without infra: randomize initial headline per page load.
    return Math.floor(Math.random() * HEADLINES.length);
  }, []);

  useEffect(() => {
    setHeadlineIdx(initialHeadlineIdx);
  }, [initialHeadlineIdx]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setHeadlineIdx((i) => (i + 1) % HEADLINES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section className="relative px-6 pt-10 md:pt-14 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#071A33] via-[#071A33] to-[#0A1630]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2D6BFF]/25 blur-3xl" />
      <div className="absolute -bottom-56 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#2BE7C6]/15 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.10] modly-hero-noise" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2BE7C6] modly-hero-pulse" />
              Built for furniture retailers
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-text-primary">
              <span className={prefersReducedMotion ? "" : "modly-hero-headline-fade"} key={headlineIdx}>
                {HEADLINES[headlineIdx]}
              </span>
              <span className="block mt-3 text-gradient-b2b">
                Reduce returns with AI room matching
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-xl text-[rgba(226,232,240,0.86)] max-w-xl leading-relaxed">
              Your shoppers upload a room photo, ModlyAI confirms fit against your product dimensions, and they buy with confidence.
              You save shipping/restocking costs while increasing conversion.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[rgba(226,232,240,0.82)]">
              {[
                "Stops ‘doesn’t fit’ returns",
                "Lifts add-to-cart rate",
                "Works with your existing catalog",
              ].map((t) => (
                <div key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2BE7C6]" />
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <TrackedLink
                href="/contact"
                ctaId="hero-book-15-min-demo"
                ctaText="Book a 15-Min Demo"
                className="inline-flex items-center justify-center px-7 py-4 rounded-lg font-semibold text-[15px] bg-gradient-to-r from-[#0B3B6F] via-[#2D6BFF] to-[#2BE7C6] text-white glow-b2b-hover transition-all modly-hero-cta-primary"
              >
                Book a 15‑Min Demo
              </TrackedLink>

              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center px-7 py-4 rounded-lg font-semibold text-[15px] border border-white/15 bg-white/5 hover:bg-white/8 transition-colors modly-hero-cta-secondary"
              >
                Watch 2‑Min Demo Video
              </button>
            </div>

            <div className="mt-3 text-xs text-[rgba(226,232,240,0.72)]">
              Join <span className="text-text-primary font-semibold">12 furniture stores</span> using AI to reduce returns.{" "}
              <span className="text-text-primary font-semibold">14‑day free trial</span>. No credit card required.
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/4 px-4 py-3">
                <div className="text-sm font-semibold text-text-primary">Fast setup</div>
                <div className="text-xs text-[rgba(226,232,240,0.78)] mt-1">5 minutes to launch</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/4 px-4 py-3">
                <div className="text-sm font-semibold text-text-primary">No heavy lift</div>
                <div className="text-xs text-[rgba(226,232,240,0.78)] mt-1">Works with existing PDPs</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/4 px-4 py-3">
                <div className="text-sm font-semibold text-text-primary">Measurable ROI</div>
                <div className="text-xs text-[rgba(226,232,240,0.78)] mt-1">Return-rate + funnel analytics</div>
              </div>
            </div>
          </div>

          <VisualProof />
        </div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
