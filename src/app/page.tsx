import type { Metadata } from "next";
import Image from "next/image";
import RoiCalculator from "@/components/b2b/RoiCalculator";
import HeroB2B from "@/components/b2b/HeroB2B";
import ValuePropStrip from "@/components/b2b/ValuePropStrip";
import TrackedLink from "@/components/b2b/TrackedLink";
import WidgetDemoModalCta from "@/components/b2b/WidgetDemoModalCta";
import { plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "ModlyAI - AI Room Matching for Furniture Retailers | Reduce Returns by 40%",
  description:
    "Reduce furniture returns with AI room matching. Help customers confirm fit before they buy, so you lower shipping and restocking costs and increase conversions.",
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ModlyAI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI room matching for furniture retailers. Helps customers confirm fit before purchase to reduce returns and improve conversion rates.",
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-[#071A33] text-[#F3F4F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <ValuePropStrip />
      <HeroB2B />

      {/* HIDDEN COST */}
      <section id="hidden-cost" className="px-6 py-16 md:py-20 bg-[#0A1630] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
            The Hidden Cost of &apos;Will It Fit?&apos;
          </h2>
          <p className="mt-3 text-center text-[rgba(226,232,240,0.82)]">
            ModlyAI solves this before the purchase happens.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.18)] transition-shadow">
              <div className="text-4xl font-extrabold text-text-primary">30%</div>
              <div className="mt-2 text-lg font-semibold text-[rgba(226,232,240,0.90)]">
                returned because it doesn&apos;t fit
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.18)] transition-shadow">
              <div className="text-4xl font-extrabold text-text-primary">$200+</div>
              <div className="mt-2 text-lg font-semibold text-[rgba(226,232,240,0.90)]">
                average return cost (shipping + restocking)
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.18)] transition-shadow">
              <div className="text-4xl font-extrabold text-text-primary">68%</div>
              <div className="mt-2 text-lg font-semibold text-[rgba(226,232,240,0.90)]">
                abandon carts due to size uncertainty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (B2B) */}
      <section id="how-it-works" className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
            How It Works (B2B Version)
          </h2>

          <div className="mt-10 grid lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#2D6BFF]/20 border border-[#2D6BFF]/30 flex items-center justify-center font-bold text-[#2D6BFF]">
                  1
                </div>
                <div>
                  <div className="text-xl font-semibold text-text-primary">5-Minute Installation</div>
                  <div className="text-sm text-[rgba(226,232,240,0.78)]">One line. No data migration.</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-[rgba(226,232,240,0.86)]">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#2BE7C6]" />
                  Add one line of code to your furniture website. Works with Shopify, WooCommerce, or custom sites.
                </li>
              </ul>
              <div className="mt-5">
                <div className="text-sm font-semibold text-[rgba(226,232,240,0.88)] mb-2">Example (copy/paste):</div>
                <pre className="bg-[#0A1630] border border-white/10 rounded-xl p-4 overflow-x-auto">
                  <code className="text-xs text-[rgba(226,232,240,0.86)]">
                    {`<script async src="YOUR_WIDGET_LOADER_URL" data-modly-widget data-config-url="YOUR_CONFIG_URL"></script>`}
                  </code>
                </pre>
                <div className="mt-2 text-xs text-[rgba(226,232,240,0.70)]">
                  Replace placeholders with onboarding URLs we provide.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#2D6BFF]/20 border border-[#2D6BFF]/30 flex items-center justify-center font-bold text-[#2D6BFF]">
                  2
                </div>
                <div>
                  <div className="text-xl font-semibold text-text-primary">Your Customers Get AI Help</div>
                  <div className="text-sm text-[rgba(226,232,240,0.78)]">Before they buy.</div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-[rgba(226,232,240,0.86)]">
                <div className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#2BE7C6]" />
                  Shoppers upload room photos, get instant AI recommendations for furniture that fits their actual space.
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 overflow-hidden">
                <img
                  src="/images/3rd-day-photo.jpeg"
                  alt="ModlyAI product screenshot"
                  className="w-full rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#2D6BFF]/20 border border-[#2D6BFF]/30 flex items-center justify-center font-bold text-[#2D6BFF]">
                  3
                </div>
                <div>
                  <div className="text-xl font-semibold text-text-primary">You Get Actionable Insights</div>
                  <div className="text-sm text-[rgba(226,232,240,0.78)]">Measure ROI, not guesses.</div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-[rgba(226,232,240,0.86)]">
                <div className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#2BE7C6]" />
                  Dashboard shows what customers are looking for, conversion analytics, and ROI tracking.
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl">
                <img
                  src="/images/dashboard-screenshot.png"
                  alt="ModlyAI dashboard screenshot"
                  className="w-full rounded-xl shadow-lg border border-gray-200 object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#2D6BFF]/20 border border-[#2D6BFF]/30 flex items-center justify-center font-bold text-[#2D6BFF]">
                  4
                </div>
                <div>
                  <div className="text-xl font-semibold text-text-primary">Watch Returns Drop, Sales Increase</div>
                  <div className="text-sm text-[rgba(226,232,240,0.78)]">Proven fit reduction.</div>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-[rgba(226,232,240,0.86)]">
                <div className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#2BE7C6]" />
                  Average clients see <span className="text-text-primary font-semibold">40% fewer returns</span> and{" "}
                  <span className="text-text-primary font-semibold">25% higher add-to-cart rates</span>.
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-[#0A1630]/50 p-5">
                <div className="text-sm font-semibold text-[rgba(226,232,240,0.88)]">Want to benchmark your impact?</div>
                <div className="text-xs text-[rgba(226,232,240,0.70)] mt-1">
                  Book a demo and we&apos;ll map expected ROI to your store&apos;s return economics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="social-proof" className="px-6 py-16 md:py-20 bg-[#0A1630] border-t border-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">Built for Furniture Retailers</h2>

          <div className="mt-10 grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/4 p-7">
              <div className="inline-flex items-center rounded-full bg-[#2D6BFF]/15 border border-[#2D6BFF]/25 px-4 py-2 text-sm">
                Pilot program
              </div>
              <p className="mt-5 text-xl font-semibold text-[rgba(226,232,240,0.92)]">
                Currently in pilot with select furniture retailers. Early results show 40% reduction in returns and 25%
                increase in conversion rates.
              </p>
              <p className="mt-4 text-[rgba(226,232,240,0.80)]">
                Processing <span className="text-text-primary font-semibold">$250,000</span> in furniture sales monthly (demo data).
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-7">
              <div className="text-sm font-semibold text-text-primary">What retailers measure</div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[rgba(226,232,240,0.84)] text-sm">Return-rate drop</div>
                  <div className="text-text-primary font-semibold">-40%</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[rgba(226,232,240,0.84)] text-sm">Conversion lift</div>
                  <div className="text-text-primary font-semibold">+25%</div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[rgba(226,232,240,0.84)] text-sm">Insight to action</div>
                  <div className="text-text-primary font-semibold">Week-to-week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section id="roi-calculator" className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <RoiCalculator />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-16 md:py-20 bg-[#0A1630]/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">Everything Your Furniture Store Needs</h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              "AI Room Analysis",
              "Smart Recommendations",
              "Merchant Dashboard",
              "Easy Integration",
              "Mobile Optimized",
              "White-Label Ready",
            ].map((title, idx) => {
              const details = [
                "Automatically detects room dimensions, style, and layout.",
                "Suggests furniture that fits the space and matches existing decor.",
                "Track conversions, popular requests, and customer insights.",
                "Works with your existing catalog, no data migration needed.",
                "70% of furniture browsing happens on mobile.",
                "Customize colors and branding to match your store.",
              ][idx];

              return (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#2D6BFF]/20 border border-[#2D6BFF]/30 flex items-center justify-center font-bold text-[#2D6BFF]">
                      {idx + 1}
                    </div>
                    <div className="text-lg font-semibold text-text-primary">{title}</div>
                  </div>
                  <div className="mt-3 text-sm text-[rgba(226,232,240,0.82)] leading-relaxed">{details}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">Simple, Transparent Pricing</h2>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-7">
              <div className="text-sm font-semibold text-[rgba(226,232,240,0.80)]">{plans.free_trial.label}</div>
              <div className="mt-2 text-4xl font-extrabold text-text-primary">{plans.free_trial.priceLabel}</div>
              <div className="text-sm text-[rgba(226,232,240,0.80)] mt-1">no credit card required</div>
              <div className="mt-5 space-y-2 text-[rgba(226,232,240,0.86)]">
                <div>100 AI chats</div>
                <div>20 room planner analyses</div>
                <div>1 store</div>
                <div>50 products</div>
                <div>ModlyAI branding</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2D6BFF]/40 bg-[#0A1630]/70 p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D6BFF]/15 to-[#2BE7C6]/10" />
              <div className="relative">
                <div className="text-sm font-semibold text-[rgba(226,232,240,0.88)]">{plans.starter.label}</div>
                <div className="mt-2 text-4xl font-extrabold text-text-primary">${plans.starter.priceMonthly}</div>
                <div className="text-sm text-[rgba(226,232,240,0.80)] mt-1">per month</div>
                <div className="mt-5 space-y-2 text-[rgba(226,232,240,0.86)]">
                  <div>1,000 AI chats/month</div>
                  <div>150 room planner analyses/month</div>
                  <div>1 store</div>
                  <div>500 products</div>
                  <div>White-label widget</div>
                  <div>CSV catalog import</div>
                  <div>Basic usage analytics</div>
                  <div>{plans.starter.support}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-7">
              <div className="text-sm font-semibold text-[rgba(226,232,240,0.80)]">{plans.growth.label}</div>
              <div className="mt-2 text-4xl font-extrabold text-text-primary">${plans.growth.priceMonthly}</div>
              <div className="text-sm text-[rgba(226,232,240,0.80)] mt-1">per month</div>
              <div className="mt-5 space-y-2 text-[rgba(226,232,240,0.86)]">
                <div>5,000 AI chats/month</div>
                <div>750 room planner analyses/month</div>
                <div>3 stores</div>
                <div>5,000 products</div>
                <div>White-label widget</div>
                <div>Shopify catalog sync</div>
                <div>Product and customer intent analytics</div>
                <div>Priority setup support</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-7">
              <div className="text-sm font-semibold text-[rgba(226,232,240,0.80)]">{plans.scale.label}</div>
              <div className="mt-2 text-4xl font-extrabold text-text-primary">{plans.scale.priceLabel}</div>
              <div className="text-sm text-[rgba(226,232,240,0.80)] mt-1">tailored to your store</div>
              <div className="mt-5 space-y-2 text-[rgba(226,232,240,0.86)]">
                <div>Higher AI usage</div>
                <div>More stores</div>
                <div>Custom onboarding</div>
                <div>Custom integrations</div>
                <div>Dedicated support</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <TrackedLink
              href="/contact"
              ctaId="pricing-book-demo"
              ctaText="Book a Demo to Discuss Pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-[15px] bg-gradient-to-r from-[#0B3B6F] via-[#2D6BFF] to-[#2BE7C6] text-white transition-all glow-b2b-hover"
            >
              Book a Demo to Discuss Pricing
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="px-6 py-16 md:py-20 bg-[#0A1630] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">Works With Your Existing Tech Stack</h2>
          <p className="mt-3 text-center text-[rgba(226,232,240,0.82)]">Installs in 5 minutes. No complex integration required.</p>

          <div className="mt-10 grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Shopify", badge: "#5CE2E7" },
              { name: "WooCommerce", badge: "#A78BFA" },
              { name: "BigCommerce", badge: "#2BE7C6" },
              { name: "Custom websites", badge: "#2D6BFF" },
            ].map((item, idx) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-white/4 p-6 hover:shadow-[0_0_32px_rgba(45,107,255,0.16)] transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl border border-white/10 bg-[#0A1630]/60 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full" style={{ background: item.badge }} />
                  </div>
                  <div className="text-lg font-semibold text-text-primary">{item.name}</div>
                </div>
                <div className="mt-3 text-sm text-[rgba(226,232,240,0.80)] leading-relaxed">
                  {idx === 3
                    ? "Works anywhere via a JavaScript snippet."
                    : "Theme-ready and commerce-platform compatible."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">FAQ</h2>

          <div className="mt-10 max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "How long does implementation take?",
                a: "Most stores are up and running in under 10 minutes. We provide code snippet and full documentation.",
              },
              {
                q: "Do I need to upload my furniture catalog?",
                a: "No. ModlyAI works with your existing product pages. We extract dimensions and details automatically.",
              },
              {
                q: "What if my customers don't upload room photos?",
                a: "They can also manually input room dimensions. The AI adapts to whatever information is available.",
              },
              {
                q: "How do you calculate ROI?",
                a: "We track session analytics, conversion rates, and can integrate with your analytics to measure impact on returns.",
              },
              {
                q: "Is there a contract?",
                a: "Month-to-month. Cancel anytime.",
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/4 px-6 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-5">
                  <div className="text-[rgba(226,232,240,0.92)] font-semibold">{item.q}</div>
                  <div className="h-8 w-8 rounded-xl border border-white/10 bg-[#0A1630]/60 flex items-center justify-center text-text-primary group-open:rotate-45 transition-transform">
                    +
                  </div>
                </summary>
                <div className="mt-3 text-sm text-[rgba(226,232,240,0.82)] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 py-16 md:py-20 bg-[#0A1630] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Ready to Reduce Returns and Increase Sales?</h2>
          <p className="mt-3 text-[rgba(226,232,240,0.82)] max-w-2xl mx-auto">
            See the widget on a furniture storefront and get a demo tailored to your return-rate economics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <TrackedLink
              href="/contact"
              ctaId="footer-book-demo"
              ctaText="Book a Demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-[15px] bg-gradient-to-r from-[#0B3B6F] via-[#2D6BFF] to-[#2BE7C6] text-white transition-all glow-b2b-hover"
            >
              Book a Demo
            </TrackedLink>
            <WidgetDemoModalCta
              ctaId="footer-try-demo-widget"
              ctaText="Try Demo Widget"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/15 bg-white/5 hover:bg-white/8 transition-colors"
            />
          </div>

          <div className="mt-10 text-xs text-[rgba(226,232,240,0.66)]">
            By requesting a demo, you agree to our privacy-first approach to customer data handling.
          </div>
        </div>
      </section>
    </main>
  );
}
