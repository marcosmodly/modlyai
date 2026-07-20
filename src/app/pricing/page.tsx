import type { Metadata } from "next";
import PricingPlans from "@/components/billing/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing | ModlyAI",
  description: "Plans that scale with your furniture catalog. Starter, Growth, and custom Scale plans for ModlyAI.",
};

const sectionLabel = "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]";
const sectionTitle = "font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl";

export default function PricingPage() {
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

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171411]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="px-6 py-16 md:py-24">
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
    </main>
  );
}
