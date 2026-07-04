"use client";

import TrackedLink from "@/components/b2b/TrackedLink";

const proofBadges = ["Shopify-ready", "Catalog-grounded", "No fake products"] as const;
const platforms = ["Shopify", "WooCommerce", "Custom storefronts", "CSV catalogs", "REST API"] as const;

export default function HeroB2B() {
  return (
    <section className="relative overflow-hidden bg-[#171411]">
      {/* Dark-to-cream gradient, matching the page's own charcoal + cream tokens */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#171411_0%,#171411_38%,#2a2521_58%,#5c5044_78%,#fffaf2_100%)]" />

      {/* Dotted grid texture, denser near the top, fading out as it nears the cream zone */}
      <div className="modly-hero-grid absolute inset-0 opacity-60" />

      {/* Soft radial glow behind the headline for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_18%,rgba(213,184,140,0.16),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-0 pt-20 text-center md:pt-28">
        <div className="modly-hero-bar inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-[#e7ddd0] backdrop-blur-sm">
          AI room matching for furniture retailers
        </div>

        <h1 className="modly-hero-headline-fade mt-7 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.01em] text-[#fffaf2] md:text-6xl">
          Help shoppers know what fits before they buy.
        </h1>

        <p
          className="modly-hero-headline-fade mt-6 max-w-2xl text-lg leading-8 text-[#d8cfc4] md:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          ModlyAI adds an AI room-matching widget to furniture stores, helping shoppers compare products, check fit,
          and request customizations from your existing catalog.
        </p>

        <div
          className="modly-hero-bar mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "220ms" }}
        >
          <TrackedLink
            href="/auth/signup"
            ctaId="hero-get-started-free"
            ctaText="Get Started Free"
            className="inline-flex items-center justify-center rounded-full bg-[#fffaf2] px-7 py-3.5 text-sm font-semibold text-[#171411] shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition hover:bg-white"
          >
            Get Started Free
          </TrackedLink>
          <TrackedLink
            href="/contact"
            ctaId="hero-book-demo"
            ctaText="Book a Demo"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Book a Demo
          </TrackedLink>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {proofBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-[#e7ddd0]"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Trust strip lives inside the same fading gradient, not a separate section */}
        <div className="mt-24 w-full max-w-5xl pb-14 md:mt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a714f]">
            Works with the platforms furniture retailers already use
          </p>
          <div className="modly-marquee-mask relative mt-5 overflow-hidden">
            <div className="modly-marquee-track flex w-max items-center gap-x-16">
              {[...platforms, ...platforms].map((platform, idx) => (
                <span
                  key={`${platform}-${idx}`}
                  className="shrink-0 text-base font-semibold text-[#6b5a44]"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
