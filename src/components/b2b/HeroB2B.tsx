"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import TrackedLink from "@/components/b2b/TrackedLink";

const proofBadges = ["Shopify-ready", "Catalog-grounded", "No fake products"] as const;

function ProductDemo() {
  const handleCatalogPreviewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRequestPilotClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    window.location.href = "/contact";
  };

  const recommendations = [
    { name: "Linen Track Arm Sofa", detail: "84 in, warm ivory", status: "Best fit" },
    { name: "Oak Nesting Table", detail: "36 in, natural oak", status: "Pairs well" },
    { name: "Custom Ottoman", detail: "Quote requested", status: "Customize" },
  ];

  return (
    <div className="relative w-full justify-self-center lg:max-w-[760px] lg:justify-self-end xl:max-w-[820px]">
      <div className="absolute -inset-x-5 -inset-y-7 rounded-[2rem] bg-[radial-gradient(circle_at_42%_42%,rgba(201,178,132,0.24),transparent_46%),radial-gradient(circle_at_74%_24%,rgba(161,184,205,0.2),transparent_38%),radial-gradient(circle_at_22%_78%,rgba(190,137,83,0.14),transparent_42%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-[#ded4c6] bg-white shadow-[0_28px_80px_rgba(75,61,47,0.16)]">
        <div className="border-b border-[#e6ded3] bg-[#fbf7f0] px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d7b88f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9d3df]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#9aa681]" />
            </div>
            <div className="text-xs font-medium text-[#7c7164]">Product page preview</div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex h-full flex-col bg-[#f5efe5] p-4 md:p-5">
            <div className="min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-[#e0d5c8] bg-[#efe4d4] md:min-h-[420px] lg:min-h-0">
              <Image
                src="/images/living-room-hero.png"
                alt="Modern living room with modular sofa"
                width={720}
                height={520}
                className="h-full min-h-[320px] w-full object-cover md:min-h-[420px] lg:min-h-0"
                priority
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {["Performance linen", "84 in width", "Ships in 3 colors"].map((item) => (
                <div key={item} className="rounded-xl border border-[#e1d7ca] bg-white/80 px-3 py-2 text-xs font-medium text-[#5c5248]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6f4d]">Modern Living</div>
            <h3 className="mt-2 text-2xl font-semibold text-[#171411]">Linden Modular Sofa</h3>
            <p className="mt-2 text-sm leading-6 text-[#665d54]">
              A low-profile sofa with soft edges, modular seating, and a calm neutral finish.
            </p>

            <div className="mt-5 rounded-2xl border border-[#d9cec0] bg-[#fbf8f2] p-4 shadow-[0_18px_40px_rgba(75,61,47,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-[#171411]">ModlyAI room match</div>
                  <div className="mt-1 text-xs leading-5 text-[#756a5f]">Catalog-grounded recommendations for this room.</div>
                </div>
                <span className="rounded-full bg-[#e8eef8] px-3 py-1 text-[11px] font-semibold text-[#315f9b]">
                  Live widget
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-dashed border-[#cfc2b3] bg-white p-3">
                <div className="text-xs font-medium text-[#7b7167]">Shopper question</div>
                <p className="mt-1 text-sm font-semibold text-[#2a241f]">What sofa fits my 11 ft living room?</p>
              </div>

              <div className="mt-4 space-y-2">
                {recommendations.map((item) => (
                  <div key={item.name} className="rounded-xl border border-[#e2d8ca] bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-[#211d19]">{item.name}</div>
                        <div className="mt-0.5 text-xs text-[#7a7065]">{item.detail}</div>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#f1eadf] px-2.5 py-1 text-[11px] font-semibold text-[#765f42]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  className="rounded-lg bg-[#244f85] px-3 py-2.5 text-sm font-semibold text-white shadow-sm"
                  type="button"
                  aria-label="Demo preview: view in catalog"
                  onClick={handleCatalogPreviewClick}
                >
                  View in catalog
                </button>
                <button
                  className="rounded-lg border border-[#cfc3b4] bg-white px-3 py-2.5 text-sm font-semibold text-[#2d2721]"
                  type="button"
                  aria-label="Request a ModlyAI pilot"
                  onClick={handleRequestPilotClick}
                >
                  Request quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#807569]">
        Example storefront view using an existing room image asset and catalog-style recommendations.
      </p>
    </div>
  );
}

export default function HeroB2B() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(202,157,103,0.16),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(156,181,204,0.14),transparent_28%),linear-gradient(180deg,#fffbf4_0%,#f7efe4_100%)]" />
      <div className="absolute inset-0 opacity-[0.34] [background-image:linear-gradient(rgba(126,100,72,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(126,100,72,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative z-10 mx-auto max-w-[86rem]">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(540px,1.08fr)] xl:gap-10">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center rounded-full border border-[#dfd3c4] bg-white/70 px-4 py-2 text-sm font-medium text-[#695d51] shadow-sm">
              AI room matching for furniture retailers
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-normal text-[#171411] md:text-6xl">
              Help shoppers know what fits before they buy.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f554b] md:text-xl">
              ModlyAI adds an AI room-matching widget to furniture stores, helping shoppers compare products, check fit,
              and request customizations from your existing catalog.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/auth/signup"
                ctaId="hero-get-started-free"
                ctaText="Get Started Free"
                className="inline-flex items-center justify-center rounded-lg bg-[#244f85] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(36,79,133,0.24)] transition hover:bg-[#1b416f]"
              >
                Get Started Free
              </TrackedLink>
              <TrackedLink
                href="/contact"
                ctaId="hero-book-demo"
                ctaText="Book a Demo"
                className="inline-flex items-center justify-center rounded-lg border border-[#cfc3b4] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#2b2621] shadow-sm transition hover:bg-white"
              >
                Book a Demo
              </TrackedLink>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {proofBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#e0d4c5] bg-[#fffdf9]/85 px-3.5 py-1.5 text-xs font-semibold text-[#675c51] shadow-[0_8px_20px_rgba(75,61,47,0.05)]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-6 text-sm font-medium text-[#70665b]">
              Works with Shopify, CSV catalogs, and custom storefronts.
            </div>
          </div>

          <ProductDemo />
        </div>
      </div>
    </section>
  );
}
