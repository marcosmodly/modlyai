import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PinnedRetailerGrid from "@/components/ui/PinnedRetailerGrid";
import DemoPreviewButton from "@/components/b2b/DemoPreviewButton";
import HeroB2B, { HeroTrustStrip } from "@/components/b2b/HeroB2B";
import RoiCalculator from "@/components/b2b/RoiCalculator";
import TrackedLink from "@/components/b2b/TrackedLink";
import ValuePropStrip from "@/components/b2b/ValuePropStrip";

export const metadata: Metadata = {
  title: "ModlyAI - AI Room Matching for Furniture Retailers",
  description:
    "ModlyAI helps furniture retailers add catalog-grounded room matching, product recommendations, and customization requests to their storefront.",
};

const sectionLabel = "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]";
const sectionTitle = "font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl";
const sectionCopy = "mt-4 max-w-2xl text-base leading-7 text-[#665c52]";
const cardClass = "rounded-2xl border border-[#e1d7ca] bg-white p-6 shadow-[0_18px_45px_rgba(75,61,47,0.07)]";

const howItWorks = [
  {
    title: "Connect your catalog",
    body: "Use Shopify, CSV import, or a custom storefront feed so recommendations stay grounded in your real products.",
  },
  {
    title: "Add the widget",
    body: "Install a lightweight storefront widget that fits into your existing product discovery flow.",
  },
  {
    title: "Shoppers ask or upload a room photo",
    body: "Customers can compare products, check fit, and ask room-specific buying questions.",
  },
  {
    title: "See product and customer intent insights",
    body: "Review what shoppers ask for, which items they compare, and where quote intent appears.",
  },
];

const retailerCategories = [
  {
    title: "Sofas",
    image: "/images/sofas.png",
    alt: "Elegant sofa in a styled living room",
    body: "Help shoppers compare scale, fabric, color, and room fit before checkout.",
  },
  {
    title: "Beds",
    image: "/images/beds.png",
    alt: "Modern bed in a calm bedroom setting",
    body: "Guide customers on frame size, placement, and bedroom proportions.",
  },
  {
    title: "Dining sets",
    image: "/images/dining-sets.png",
    alt: "Dining table and chairs in a warm dining room",
    body: "Recommend tables, benches, and chairs based on room clearance.",
  },
  {
    title: "Storage",
    image: "/images/storage.png",
    alt: "Storage cabinet and shelving styled in an interior space",
    body: "Suggest cabinets, shelving, and sideboards that fit the wall and space.",
  },
  {
    title: "Office furniture",
    image: "/images/office-furniture.png",
    alt: "Home office with desk, chair, and storage",
    body: "Match desks, chairs, and storage to work-from-home layouts.",
  },
  {
    title: "Custom pieces",
    image: "/images/custom-pieces.png",
    alt: "Custom furniture detail with premium materials and finish",
    body: "Capture customization requests for size, finish, material, and quotes.",
  },
] as const;
const productDemoRecommendations = [
  { name: "Walnut Dining Table", detail: "Fits with 36 in clearance", action: "View in catalog" },
  { name: "Oak Bench", detail: "Completes the set", action: "Customize this" },
  { name: "Narrow Sideboard", detail: "Better wall clearance", action: "Request quote" },
] as const;


function CheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-sm leading-6 text-[#5f554b]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08a55]" />
      <span>{children}</span>
    </div>
  );
}

function ProductDemoSection() {
  return (
    <section id="product-demo" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className={sectionLabel}>Visual product demo</div>
            <h2 className={sectionTitle}>A storefront experience shoppers can trust.</h2>
            <p className={sectionCopy}>
              Instead of pushing shoppers into a generic chatbot, ModlyAI appears where furniture decisions happen: on the
              product page, beside dimensions, materials, catalog alternatives, and quote actions.
            </p>
            <div className="mt-7 grid gap-3">
              <CheckItem>Recommend only products from your catalog.</CheckItem>
              <CheckItem>Help shoppers compare sizes, finishes, room style, and customization options.</CheckItem>
              <CheckItem>Send high-intent shoppers to view in catalog, customize this, or request quote.</CheckItem>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#ddd1c3] bg-[#fbf7f0] p-4 shadow-[0_24px_70px_rgba(75,61,47,0.12)]">
            <div className="grid gap-4 md:grid-cols-[0.82fr_1fr]">
              <div className="rounded-2xl border border-[#e0d5c8] bg-white p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#efe4d4]">
                  <img
                    src="/images/walnut-dining-room-demo.png"
                    alt="Walnut dining table in a modern dining room"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a714f]">Retail product page</div>
                <div className="mt-2 text-xl font-semibold text-[#1d1915]">Walnut Dining Table</div>
                <div className="mt-2 text-sm text-[#746a60]">72 in table, seats 6, walnut veneer, optional bench pairing.</div>
              </div>

              <div className="rounded-2xl border border-[#d9cec0] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#1d1915]">ModlyAI recommendations</div>
                    <div className="mt-1 text-xs text-[#746a60]">Grounded in current catalog data</div>
                  </div>
                  <span className="rounded-full bg-[#e8eef8] px-3 py-1 text-[11px] font-semibold text-[#315f9b]">No fake products</span>
                </div>

                <div className="mt-4 rounded-xl bg-[#f8f2ea] p-3 text-sm font-medium text-[#322b25]">
                  &quot;Can this work in a 10 ft by 12 ft dining room with a sideboard?&quot;
                </div>

                <div className="mt-4 space-y-3">
                  {productDemoRecommendations.map(({ name, detail, action }) => (
                    <div key={name} className="rounded-xl border border-[#e4dbcf] bg-[#fffdf9] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#211d19]">{name}</div>
                          <div className="mt-0.5 text-xs text-[#766d63]">{detail}</div>
                        </div>
                        <DemoPreviewButton action={action} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStatement() {
  return (
    <section className="px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="font-heading text-3xl font-semibold leading-tight tracking-[-0.01em] text-[#171411] md:text-5xl md:leading-[1.15]">
          Furniture shoppers do not abandon carts because they dislike a product.
          <span className="text-[#8a6238]"> They abandon because they cannot tell if it fits.</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#665c52]">
          ModlyAI closes that gap directly on the product page, using your real catalog, so shoppers can answer their own
          fit questions before they leave.
        </p>
      </Reveal>
    </section>
  );
}

const originStats = [
  {
    value: "#1",
    label: "reason for returns",
    body: "Wrong size is the single most common reason shoppers return furniture bought online.",
    source: "DHL 2025 Ecommerce Trends Report",
  },
  {
    value: "~58%",
    label: "of furniture returns",
    body: "Tied directly to size and space mismatch: the piece did not fit the room or the doorway.",
    source: "Industry furniture-return analysis, 2025",
  },
  {
    value: "~44%",
    label: "cite color or material",
    body: "A screen rarely renders fabric, wood tone, or finish accurately, so what arrives looks different than expected.",
    source: "YouGov consumer retail survey, 2025",
  },
] as const;

function OriginSection() {
  return (
    <section className="relative overflow-hidden border-y border-[#e7ddd1] px-6 py-16 md:py-24">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/origin-room.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#f8f1e7]/88" />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className={sectionLabel}>Why we built this</div>
          <h2 className={sectionTitle}>The problem is well documented. We saw it firsthand.</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {originStats.map((stat, idx) => (
            <Reveal key={stat.label} delayMs={idx * 90} className="rounded-2xl border border-[#e1d7ca] bg-white p-6">
              <div className="text-3xl font-semibold tracking-[-0.02em] text-[#8a6238]">{stat.value}</div>
              <div className="mt-1 text-sm font-semibold text-[#1e1a16]">{stat.label}</div>
              <p className="mt-3 text-sm leading-6 text-[#665c52]">{stat.body}</p>
              <p className="mt-3 text-xs text-[#a0937f]">{stat.source}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-[#ded1c2] bg-white p-7">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a714f]">The shopper problem</div>
            <p className="mt-4 text-base leading-7 text-[#3c342b]">
              This pattern first became clear while studying architecture. Clients could rarely tell, from a listing photo
              alone, whether a piece of furniture would actually fit their space, or suit the style already established in
              their home. Even when a color looked right on screen, it often felt wrong once the piece was in the room.
              That gap between what a photo shows and what a space actually needs is the problem ModlyAI is built to close,
              directly on the product page, before a shopper ever has to guess.
            </p>
          </Reveal>

          <Reveal delayMs={90} className="rounded-2xl border border-[#ded1c2] bg-white p-7">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a714f]">The retailer problem</div>
            <p className="mt-4 text-base leading-7 text-[#3c342b]">
              The same gap costs retailers more than it costs shoppers, especially on custom and made-to-order pieces, where
              a return is far more expensive to absorb than a standard restock. ModlyAI&apos;s Request Quote flow only
              surfaces after a shopper has already confirmed size and style fit with the AI, so quote requests arrive
              pre-qualified, not just captured, protecting margin on exactly the returns that hurt most.
            </p>
          </Reveal>
        </div>

        <p className="mt-8 text-right text-[11px] text-[#a0937f]">
          Room photo via{" "}
          <a
            href="https://www.vecteezy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#8a714f]"
          >
            Vecteezy
          </a>
        </p>
      </div>
    </section>
  );
}

const resultStats = [
  { value: "-40%", label: "Return rate", tone: "text-[#3c6b3f]" },
  { value: "+25%", label: "Conversion", tone: "text-[#244f85]" },
  { value: "$12K", label: "Saved / month", tone: "text-[#7a4fb0]" },
  { value: "5 min", label: "Setup time", tone: "text-[#b3611f]" },
] as const;

function ResultStats() {
  return (
    <section className="border-y border-[#e7ddd1] bg-[#171411] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c9a984]">Modeled results</div>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#fffaf2] md:text-4xl">
            What a catalog-grounded widget can move.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#c9bfb2]">
            Estimates based on the ROI calculator below and typical fit-related return patterns. Your results depend on
            catalog size, traffic, and category mix.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resultStats.map((stat, idx) => (
            <Reveal key={stat.label} delayMs={idx * 90} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className={`text-4xl font-semibold tracking-[-0.02em] ${stat.tone}`}>{stat.value}</div>
              <div className="mt-2 text-sm font-medium text-[#c9bfb2]">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustChecklist = [
  ["Catalog-grounded only", "Every recommendation traces back to a real SKU in your catalog. No invented products, ever."],
  ["Your data stays yours", "Catalog and shopper interaction data is scoped to your store and not shared across retailers."],
  ["Transparent pricing", "Usage limits and plan tiers are visible up front, with no hidden overage surprises."],
  ["Cancel anytime", "Month-to-month plans with no long-term lock-in unless you choose a custom Scale agreement."],
] as const;

function TrustChecklist() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className={sectionLabel}>Built to be trusted</div>
          <h2 className={sectionTitle}>Guardrails that protect your merchandising, not just your uptime.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {trustChecklist.map(([title, body], idx) => (
            <Reveal key={title} delayMs={idx * 80} className="flex gap-4 rounded-2xl border border-[#e1d7ca] bg-[#fffdf9] p-6">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8eef8] text-xs font-bold text-[#244f85]">
                ✓
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#1e1a16]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#665c52]">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ModlyAI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "AI room matching for furniture retailers, using existing catalog products and storefront workflows.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "299",
      highPrice: "599",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "299",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Growth",
          price: "599",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Scale",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "0",
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
          },
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ModlyAI",
    url: "https://modlyai.tech",
    logo: "https://modlyai.tech/favicon.ico",
    description:
      "ModlyAI helps furniture retailers add catalog-grounded room matching, product recommendations, and customization requests to their storefront.",
    sameAs: [],
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171411]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <ValuePropStrip />
      <HeroB2B />
      <HeroTrustStrip />
      <BigStatement />

      <OriginSection />

      <ProductDemoSection />

      <section id="how-it-works" className="border-y border-[#e7ddd1] bg-[#f8f1e7] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className={sectionLabel}>How it works</div>
            <h2 className={sectionTitle}>A practical path from catalog to confident purchase.</h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, idx) => (
              <Reveal key={step.title} delayMs={idx * 90} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e6d6] text-sm font-semibold text-[#8a6238]">
                  {idx + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1e1a16]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#665c52]">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PinnedRetailerGrid id="retailers" items={retailerCategories} />

      <ResultStats />

      <TrustChecklist />

      <section id="roi-calculator" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <RoiCalculator />
        </div>
      </section>

      <section id="pricing" className="border-y border-[#e7ddd1] bg-[#f8f1e7] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className={sectionLabel}>Pricing</div>
          <h2 className={sectionTitle}>Plans that scale with your furniture catalog.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#665c52]">
            Starter, Growth, and custom Scale plans, month-to-month, with a no-card trial to start.
          </p>
          <Link
            href="/pricing"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8a6238] transition hover:gap-3"
          >
            See full pricing
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#ded1c2] bg-[#171411] px-6 py-14 text-center shadow-[0_28px_80px_rgba(75,61,47,0.16)] md:px-10 md:py-16">
          <h2 className="font-heading mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.01em] text-[#fffaf2] md:text-4xl">
            Ready to help shoppers buy with confidence?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#d8cfc4]">
            Add room matching, catalog recommendations, and quote-ready customization flows to your furniture storefront.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href="/auth/signup"
              ctaId="footer-get-started-free"
              ctaText="Get Started Free"
              className="inline-flex items-center justify-center rounded-lg bg-[#fffaf2] px-6 py-3.5 text-sm font-semibold text-[#171411] transition hover:bg-white"
            >
              Get Started Free
            </TrackedLink>
            <TrackedLink
              href="/contact"
              ctaId="footer-book-demo"
              ctaText="Book a Demo"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book a Demo
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
