import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | ModlyAI",
  description: "Answers to common questions furniture retailers ask about ModlyAI's AI room-matching widget.",
};

const sectionLabel = "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]";
const sectionTitle = "font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl";

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
    a: "Yes. You can set the widget title, accent color, text colors, and even swap in your own logo from your dashboard so it fits your storefront's look.",
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

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#171411]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="px-6 py-16 md:py-24">
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
    </main>
  );
}
