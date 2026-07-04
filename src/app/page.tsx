import type { Metadata } from "next";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import PinnedRetailerGrid from "@/components/ui/PinnedRetailerGrid";
import DemoPreviewButton from "@/components/b2b/DemoPreviewButton";
import HeroB2B from "@/components/b2b/HeroB2B";
import RoiCalculator from "@/components/b2b/RoiCalculator";
import TrackedLink from "@/components/b2b/TrackedLink";
import ValuePropStrip from "@/components/b2b/ValuePropStrip";
import PricingPlans from "@/components/billing/PricingPlans";
import { plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "ModlyAI - AI Room Matching for Furniture Retailers",
  description:
    "ModlyAI helps furniture retailers add catalog-grounded room matching, product recommendations, and customization requests to their storefront.",
};

const sectionLabel = "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]";
const sectionTitle = "mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl";
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

const faqs = [
  {
    q: "How long does implementation take?",
    a: "Most stores can start with a widget snippet and catalog connection. Setup time depends on your storefront and catalog format.",
  },
  {
    q: "Do I need to upload my furniture catalog?",
    a: "You can connect products through Shopify, CSV catalogs, or a custom storefront source. ModlyAI is designed to recommend from your existing catalog.",
  },
  {
    q: "What if my customers do not upload room photos?",
    a: "They can also ask questions or provide room dimensions manually. The experience adapts to the information the shopper is willing to share.",
  },
  {
    q: "How do you calculate ROI?",
    a: "The savings calculator is an estimate based on your inputs and adjustable assumptions. It is meant to help model potential fit-related return savings.",
  },
  {
    q: "Is there a contract?",
    a: "Plans are month-to-month unless you choose a custom Scale agreement.",
  },
  {
    q: "Will the widget recommend products I do not actually sell?",
    a: "No. Every recommendation is grounded in your connected catalog. ModlyAI does not invent products, prices, or availability that are not in your store data.",
  },
  {
    q: "Can I match the widget to my store's branding?",
    a: "Yes. You can set the widget title, accent color, and text colors from your dashboard so it fits your storefront's look.",
  },
  {
    q: "What happens if a product goes out of stock?",
    a: "Recommendations reflect the catalog data you sync. Once a product is marked unavailable or removed in your source catalog, the widget stops recommending it on the next sync.",
  },
  {
    q: "Can I use ModlyAI on more than one store?",
    a: "Yes, depending on your plan. Starter includes 1 store, Growth includes up to 3, and Scale supports multi-store setups with custom onboarding.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your catalog and shopper interaction data stays scoped to your store. If you cancel, the widget stops serving on your storefront and is not shared with other retailers.",
  },
  {
    q: "Does this replace my existing search or filtering?",
    a: "No. ModlyAI sits alongside your existing product pages and search. It adds a guided, conversational layer for shoppers who want fit and style guidance before buying.",
  },
];

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
        <p className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-[#171411] md:text-5xl md:leading-[1.15]">
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
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#fffaf2] md:text-4xl">
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
      "@type": "Offer",
      price: "299",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171411]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <ValuePropStrip />
      <HeroB2B />
      <BigStatement />

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

      <section id="pricing" className="border-y border-[#e7ddd1] bg-[#f8f1e7] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className={sectionLabel}>Pricing</div>
            <h2 className={sectionTitle}>Plans that scale with your furniture catalog.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#665c52]">
              Start with a no-card trial, then choose the plan that matches your storefront volume.
            </p>
          </div>

          <PricingPlans />
        </div>
      </section>

      <section id="faq" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className={sectionLabel}>FAQ</div>
            <h2 className={sectionTitle}>Questions furniture teams usually ask first.</h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[#e1d7ca] bg-white px-6 py-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="font-semibold text-[#211d19]">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d7cab9] text-[#755f43] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-[#665c52]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#ded1c2] bg-[#171411] px-6 py-14 text-center shadow-[0_28px_80px_rgba(75,61,47,0.16)] md:px-10 md:py-16">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.01em] text-[#fffaf2] md:text-4xl">
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
