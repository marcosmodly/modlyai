"use client";

import TrackedLink from "@/components/b2b/TrackedLink";

const proofBadges = ["Shopify-ready", "Catalog-grounded", "No fake products"] as const;
const platforms = ["Shopify", "WooCommerce", "Custom storefronts", "CSV catalogs", "REST API"] as const;

const galleryImages = [
  { src: "/images/sofas.png", alt: "Sofa styled in a living room" },
  { src: "/images/beds.png", alt: "Bed styled in a bedroom" },
  { src: "/images/dining-sets.png", alt: "Dining set styled in a dining room" },
  { src: "/images/storage.png", alt: "Storage cabinet styled in an interior space" },
  { src: "/images/office-furniture.png", alt: "Home office desk and chair" },
  { src: "/images/custom-pieces.png", alt: "Custom furniture piece detail" },
] as const;

// Alternate card heights and a slight tilt on every other card, so the strip
// reads as an organic gallery rather than a flat, uniform row.
const cardTreatments = [
  "h-40 -rotate-2",
  "h-52",
  "h-44 rotate-2",
  "h-56",
  "h-40 rotate-1",
  "h-48 -rotate-1",
] as const;

export default function HeroB2B() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf2] pt-14 md:pt-20">
      {/* Scrolling gallery strip */}
      <div className="modly-marquee-mask relative overflow-hidden px-6 pb-10">
        <div className="modly-marquee-track flex w-max items-end gap-5">
          {[...galleryImages, ...galleryImages].map((image, idx) => (
            <div
              key={`${image.src}-${idx}`}
              className={`w-40 shrink-0 overflow-hidden rounded-2xl border border-[#e1d7ca] bg-white shadow-[0_18px_40px_rgba(75,61,47,0.10)] md:w-48 ${
                cardTreatments[idx % cardTreatments.length]
              }`}
            >
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-4 text-center md:pb-28">
        <div className="modly-hero-bar inline-flex items-center rounded-full border border-[#e1d7ca] bg-white px-4 py-2 text-sm font-medium text-[#6b5a44] shadow-sm">
          AI room matching for furniture retailers
        </div>

        <h1 className="modly-hero-headline-fade font-heading mt-7 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.01em] text-[#171411] md:text-6xl">
          See it in the room before they buy it.
        </h1>

        <p
          className="modly-hero-headline-fade mt-6 max-w-2xl text-lg leading-8 text-[#665c52] md:text-xl"
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
            className="inline-flex items-center justify-center rounded-full bg-[#171411] px-7 py-3.5 text-sm font-semibold text-[#fffaf2] shadow-[0_12px_28px_rgba(0,0,0,0.20)] transition hover:bg-black"
          >
            Get Started Free
          </TrackedLink>
          <TrackedLink
            href="/contact"
            ctaId="hero-book-demo"
            ctaText="Book a Demo"
            className="inline-flex items-center justify-center rounded-full border border-[#d7cab9] bg-white px-7 py-3.5 text-sm font-semibold text-[#171411] transition hover:bg-[#faf3e8]"
          >
            Book a Demo
          </TrackedLink>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {proofBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#e1d7ca] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#6b5a44]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroTrustStrip() {
  return (
    <div className="border-y border-[#e7ddd1] bg-[#f8f1e7] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#8a714f]">
          Works with the platforms furniture retailers already use
        </p>
        <div className="modly-marquee-mask relative mt-5 overflow-hidden">
          <div className="modly-marquee-track flex w-max items-center gap-x-16">
            {[...platforms, ...platforms].map((platform, idx) => (
              <span key={`${platform}-${idx}`} className="shrink-0 text-base font-semibold text-[#6b5a44]">
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
