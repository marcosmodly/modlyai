import Link from "next/link";
import TryWidgetHint from "@/components/TryWidgetHint";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  MessageCircle,
  PackageCheck,
  Ruler,
  ShoppingBag,
  Sliders,
  Sparkles,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect your catalog",
    copy: "Sync products from Shopify or upload a CSV catalog. ModlyAI uses your real products, prices, images, and product links.",
    bullets: ["Shopify OAuth sync", "CSV catalog upload", "No fake product recommendations"],
  },
  {
    number: "02",
    title: "Add the widget to product pages",
    copy: "Place ModlyAI on product pages so shoppers can ask fit, style, and customization questions while they are deciding.",
    bullets: ["One script install", "Works on product pages", "Mobile-friendly shopper experience"],
  },
  {
    number: "03",
    title: "Turn shopper intent into action",
    copy: "See what customers ask for, which products they consider, and where quote or customization intent appears.",
    bullets: ["Product interest insights", "Quote and customization requests", "Usage and catalog activity"],
  },
] as const;

const platforms = [
  ["Shopify", "OAuth catalog sync for active products."],
  ["WooCommerce", "Connect product catalogs through supported store data."],
  ["BigCommerce", "Built for expanding catalog integrations."],
  ["Custom", "Works through CSV or JavaScript install."],
] as const;

const widgetCapabilities: Array<{ title: string; body: string; Icon: LucideIcon }> = [
  {
    title: "Catalog-grounded chat",
    body: "Shoppers ask fit, style, and material questions and get answers pulled only from your real product catalog, never invented items.",
    Icon: MessageCircle,
  },
  {
    title: "Room and fit guidance",
    body: "Shoppers describe a space or share dimensions and the widget checks which catalog products realistically fit.",
    Icon: Ruler,
  },
  {
    title: "Product recommendations",
    body: "Suggests exact catalog products with real names, prices, dimensions, and SKUs based on what the shopper is looking for.",
    Icon: Tag,
  },
  {
    title: "Customization requests",
    body: "Guides shoppers through factory-approved materials, finishes, and sizes only, never invented configurations.",
    Icon: Sliders,
  },
  {
    title: "View in catalog",
    body: "Sends high-intent shoppers straight to the real product page to complete their purchase.",
    Icon: ShoppingBag,
  },
  {
    title: "Request a quote",
    body: "Captures complex or custom purchase requests as structured leads instead of losing the shopper.",
    Icon: PackageCheck,
  },
];

const catalogSources: Array<{ label: string; status: string; Icon: LucideIcon }> = [
  { label: "Shopify Sync", status: "Connected", Icon: ShoppingBag },
  { label: "CSV Upload", status: "Ready", Icon: FileSpreadsheet },
  { label: "Products imported", status: "428 active SKUs", Icon: PackageCheck },
];

function StepText({ step }: { step: (typeof steps)[number] }) {
  return (
    <div>
      <div className="inline-flex items-center rounded-full border border-[#ded2c1] bg-[#fffaf2] px-3 py-1 text-xs font-semibold text-[#856a47] shadow-sm">
        Step {step.number}
      </div>
      <h2 className="font-heading mt-5 text-3xl font-semibold leading-tight text-[#171411] md:text-4xl">
        {step.title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-[#665c52] md:text-lg">
        {step.copy}
      </p>
      <div className="mt-7 space-y-3">
        {step.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 text-sm font-medium text-[#51483f]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9a7445]" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#ded1c2] bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(75,61,47,0.12)]">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#d9c29b]/30 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-[#eadfce] pb-4">
          <div>
            <div className="text-xs font-semibold uppercase text-[#8a714f]">Catalog sources</div>
            <div className="mt-1 text-lg font-semibold text-[#211d19]">Import real products</div>
          </div>
          <PackageCheck className="h-7 w-7 text-[#244f85]" />
        </div>

        <div className="mt-5 grid gap-3">
          {catalogSources.map(({ label, status, Icon }) => (
            <div key={label} className="rounded-2xl border border-[#e4d8ca] bg-white/85 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1e7d9] text-[#8a6238]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[#211d19]">{label}</div>
                    <div className="mt-1 text-xs text-[#756a5f]">Catalog-grounded recommendations</div>
                  </div>
                </div>
                <span className="rounded-full bg-[#eaf0f7] px-3 py-1 text-xs font-semibold text-[#315f9b]">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WidgetVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#ded1c2] bg-white p-4 shadow-[0_24px_70px_rgba(75,61,47,0.12)]">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#d9e5f2]/70 blur-3xl" />
      <div className="relative grid gap-4 md:grid-cols-[0.82fr_1fr]">
        <div className="rounded-2xl border border-[#e3d8c9] bg-[#fbf6ee] p-4">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#efe3d2]">
            <img
              src="/images/living-room-hero.png"
              alt="Styled furniture product preview"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 text-xs font-semibold uppercase text-[#8a714f]">Product page</div>
          <div className="mt-1 text-lg font-semibold text-[#1f1b17]">Linden Modular Sofa</div>
          <div className="mt-1 text-sm text-[#71675d]">84 in, performance linen, warm ivory</div>
        </div>

        <div className="rounded-2xl border border-[#e0d5c8] bg-[#fffdf9] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[#171411]">ModlyAI room match</div>
              <div className="mt-1 text-xs leading-5 text-[#756a5f]">Fit and customization help on the product page.</div>
            </div>
            <span className="rounded-full bg-[#f1eadf] px-3 py-1 text-[11px] font-semibold text-[#765f42]">Live</span>
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-[#cfc2b3] bg-[#fbf7f0] p-3 text-sm font-semibold text-[#2a241f]">
            Will this fit an 11 ft living room?
          </div>
          <div className="mt-4 space-y-2">
            {["Compare scale", "Check fabric color", "Ask for custom size"].map((item) => (
              <div key={item} className="rounded-xl border border-[#e5dbcf] bg-white px-3 py-2 text-sm font-medium text-[#52483f]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-[#244f85] px-3 py-2.5 text-center text-xs font-semibold text-white">
              View in catalog
            </div>
            <div className="rounded-lg border border-[#cfc3b4] bg-white px-3 py-2.5 text-center text-xs font-semibold text-[#2d2721]">
              Request quote
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#ded1c2] bg-[#fffdf9] p-5 shadow-[0_24px_70px_rgba(75,61,47,0.12)]">
      <div className="absolute -left-10 top-12 h-48 w-48 rounded-full bg-[#d8b781]/25 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase text-[#8a714f]">Store insights</div>
            <div className="mt-1 text-xl font-semibold text-[#211d19]">Shopper intent dashboard</div>
          </div>
          <BarChart3 className="h-7 w-7 text-[#244f85]" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["AI sessions", "1,284"],
            ["Quote requests", "86"],
            ["Product interest", "312"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#e5dbcf] bg-white p-4">
              <div className="text-2xl font-semibold text-[#171411]">{value}</div>
              <div className="mt-1 text-xs font-medium text-[#756a5f]">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#e5dbcf] bg-white p-4">
            <div className="text-sm font-semibold text-[#211d19]">Top shopper questions</div>
            <div className="mt-3 space-y-3">
              {["Will this sofa fit my apartment?", "Can I get this table in oak?", "What pairs with a narrow sideboard?"].map((question) => (
                <div key={question} className="rounded-xl bg-[#f8f1e7] px-3 py-2 text-sm text-[#5c5248]">
                  {question}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#e5dbcf] bg-white p-4">
            <div className="text-sm font-semibold text-[#211d19]">Product interest</div>
            <div className="mt-4 space-y-3">
              {[
                ["Modular sofas", "78%"],
                ["Dining sets", "54%"],
                ["Custom pieces", "39%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-medium text-[#675d53]">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#efe5d8]">
                    <div className="h-full rounded-full bg-[#b08a55]" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WidgetButtonLocationVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#ded1c2] bg-white shadow-[0_24px_70px_rgba(75,61,47,0.12)]">
      <div className="flex items-center gap-2 border-b border-[#e7ddd1] bg-[#f8f1e7] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d9cdbd]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d9cdbd]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d9cdbd]" />
        <span className="mx-auto text-xs font-medium text-[#8a7e70]">modlyai.tech/how-it-works</span>
      </div>

      <div className="relative min-h-[360px] px-6 py-8">
        <div className="mx-auto max-w-md text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a0937f]">How ModlyAI works</div>
          <div className="mt-3 text-base font-semibold text-[#211d19]">
            Connect your catalog, add the widget, and let shoppers get guidance before they buy.
          </div>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          <div className="h-16 rounded-xl bg-[#f4ede1]" />
          <div className="h-16 rounded-xl bg-[#f4ede1]" />
          <div className="h-16 rounded-xl bg-[#f4ede1]" />
        </div>
        <div className="mt-3 h-24 rounded-xl bg-[#f4ede1]" />

        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
          <span className="rounded-full bg-[#faece7] px-3 py-1 text-xs font-semibold text-[#993c1d]">
            Widget button appears here
          </span>
          <div className="flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#244f85] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.25)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.93 7.93 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            ModlyAI
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="bg-[#fffaf2] text-[#171411]">
      <TryWidgetHint />
      <section className="relative overflow-hidden px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,178,132,0.22),transparent_34%),linear-gradient(180deg,#fffaf2_0%,#f8efe3_100%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dfd3c4] bg-white/70 px-4 py-2 text-sm font-medium text-[#695d51] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#9a7445]" />
            Furniture retail walkthrough
          </div>
          <h1 className="font-heading mt-6 text-4xl font-semibold leading-tight text-[#171411] md:text-6xl">
            How ModlyAI works
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#665c52]">
            Connect your catalog, add the widget, and let shoppers get catalog-grounded furniture guidance before they buy.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid items-center gap-8 rounded-3xl border border-[#e1d7ca] bg-[#fbf6ee] p-5 shadow-[0_24px_70px_rgba(75,61,47,0.08)] md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <CatalogVisual />
            <StepText step={steps[0]} />
          </div>

          <div className="grid items-center gap-8 rounded-3xl border border-[#e1d7ca] bg-[#fffdf9] p-5 shadow-[0_24px_70px_rgba(75,61,47,0.08)] md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <StepText step={steps[1]} />
            <WidgetVisual />
          </div>

          <div className="grid items-center gap-8 rounded-3xl border border-[#e1d7ca] bg-[#fbf6ee] p-5 shadow-[0_24px_70px_rgba(75,61,47,0.08)] md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <DashboardVisual />
            <StepText step={steps[2]} />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfd3c4] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#856a47] shadow-sm">
              Where to find it
            </div>
            <h2 className="font-heading mt-5 text-3xl font-semibold leading-tight text-[#171411] md:text-4xl">
              The widget button lives in the bottom-right corner of this page.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#665c52]">
              It only appears here, on the how it works page, and only when you are signed in. It will not appear on
              the homepage.
            </p>
          </div>
          <div className="mt-8 max-w-3xl">
            <WidgetButtonLocationVisual />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfd3c4] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#856a47] shadow-sm">
              What the widget can do
            </div>
            <h2 className="font-heading mt-5 text-3xl font-semibold leading-tight text-[#171411] md:text-4xl">
              Everything shoppers need to buy with confidence, in one panel.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {widgetCapabilities.map(({ title, body, Icon }) => (
              <div key={title} className="rounded-3xl border border-[#e1d7ca] bg-[#fffdf9] p-6 shadow-[0_18px_45px_rgba(75,61,47,0.07)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f1e7d9] text-[#8a6238]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1e1a16]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#665c52]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e7ddd1] bg-[#f8f1e7] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold text-[#171411] md:text-4xl">Works With Your Platform</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#665c52]">
              Start with the catalog source you already use, then expand as your storefront grows.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map(([platform, copy]) => (
              <div key={platform} className="rounded-3xl border border-[#e0d5c8] bg-[#fffdf9] p-6 shadow-[0_18px_45px_rgba(75,61,47,0.07)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f1e7d9] text-sm font-semibold text-[#8a6238]">
                  {platform.charAt(0)}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1e1a16]">{platform}</h3>
                <p className="mt-2 text-sm leading-6 text-[#665c52]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#ded1c2] bg-[radial-gradient(circle_at_20%_0%,rgba(216,183,129,0.22),transparent_34%),linear-gradient(135deg,#171411_0%,#24374c_100%)] px-6 py-14 text-center shadow-[0_28px_80px_rgba(75,61,47,0.18)] md:px-10 md:py-16">
          <h2 className="font-heading mx-auto max-w-3xl text-3xl font-semibold text-[#fffaf2] md:text-4xl">
            Ready to help shoppers buy with confidence?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#d8cfc4]">
            Start with a free trial or book a walkthrough tailored to your furniture store.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-lg bg-[#fffaf2] px-6 py-3.5 text-sm font-semibold text-[#171411] transition hover:bg-white"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
