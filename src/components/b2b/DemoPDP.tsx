"use client";

import { useEffect, useMemo, useState } from "react";
import { FurnitureAIWidget } from "@widget/components/FurnitureAIWidget";
import type { QuoteRequest } from "@widget/types";
import {
  DEMO_CATALOG,
  DEMO_ROOM_PHOTOS,
  FEATURED_DEMO_PRODUCT,
  demoProductToFurnitureItem,
} from "@/lib/demo-catalog";
import DemoDisclaimer from "@/components/DemoDisclaimer";
import TrackedLink from "@/components/b2b/TrackedLink";
import { WIDGET_THEMES } from "@/lib/widget-themes";

// Kept in sync with WIDGET_THEMES' ids by isThemeKey below - this is the
// single source of truth for widget colours, imported (not duplicated) so a
// preset picked here has the same name in the dashboard after signup.
type ThemeKey = "charcoal" | "forest" | "walnut" | "brass";

type Theme = {
  label: string;
  primaryColor: string;
  titleColor: string;
  messageTextColor: string;
  fontFamily: string;
  pageBg: string;
  cardBg: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  fontClassName: string;
};

// Store-shell chrome only (page/card background, body text, font) - the
// widget colours themselves come from WIDGET_THEMES, not from here.
const DEMO_THEME_CHROME: Record<ThemeKey, Omit<Theme, "label" | "primaryColor" | "titleColor" | "messageTextColor" | "fontFamily">> = {
  charcoal: {
    pageBg: "#111111",
    cardBg: "#1C1C1C",
    textColor: "#F5F5F5",
    mutedColor: "#A3A3A3",
    borderColor: "#2E2E2E",
    fontClassName: "font-heading",
  },
  forest: {
    pageBg: "#FAF8F4",
    cardBg: "#FFFFFF",
    textColor: "#1F2937",
    mutedColor: "#6B7280",
    borderColor: "#E1D7CA",
    fontClassName: "font-sans",
  },
  walnut: {
    pageBg: "#FDF6EC",
    cardBg: "#FFFFFF",
    textColor: "#3C342B",
    mutedColor: "#8A714F",
    borderColor: "#E7D8C2",
    fontClassName: "font-heading",
  },
  brass: {
    pageBg: "#FBF7EE",
    cardBg: "#FFFFFF",
    textColor: "#3A2F1B",
    mutedColor: "#8A7550",
    borderColor: "#E6D9B0",
    fontClassName: "font-sans",
  },
};

const THEMES: Record<ThemeKey, Theme> = Object.fromEntries(
  WIDGET_THEMES.map((preset) => [
    preset.id,
    {
      label: preset.name,
      primaryColor: preset.primaryColor,
      titleColor: preset.titleColor,
      // The widget's own chat message bubbles are always a white card
      // (hardcoded in ConversationInterface/MessageBubble, independent of
      // this page's theme) - messageTextColor needs to stay dark/readable
      // against that white background regardless of how dark the page theme
      // is, unlike pageBg/textColor which govern the page itself.
      messageTextColor: preset.messageTextColor,
      fontFamily: preset.fontFamily,
      ...DEMO_THEME_CHROME[preset.id as ThemeKey],
    },
  ])
) as Record<ThemeKey, Theme>;

type QuoteResult = {
  quoteRequest: QuoteRequest;
  response: { quoteId?: string; message?: string };
};

function formatMoney(value: number) {
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const INCHES_TO_METERS = 0.0254;

function isThemeKey(value: string | null | undefined): value is ThemeKey {
  return WIDGET_THEMES.some((theme) => theme.id === value);
}

interface DemoPDPProps {
  /** True when rendered inside the mobile-preview iframe: hides the theme/
   * viewport controls and disclaimer so only the bare PDP + widget show, at
   * the iframe's own real (narrow) viewport width. */
  framed?: boolean;
  initialTheme?: string;
}

export default function DemoPDP({ framed = false, initialTheme }: DemoPDPProps) {
  const [themeKey, setThemeKey] = useState<ThemeKey>(isThemeKey(initialTheme) ? initialTheme : "forest");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [finishIndex, setFinishIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(1);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  const theme = THEMES[themeKey];
  const product = FEATURED_DEMO_PRODUCT;
  const options = product.customizationOptions;

  const featuredItem = useMemo(() => demoProductToFurnitureItem(product), [product]);
  const sampleRooms = useMemo(
    () => DEMO_ROOM_PHOTOS.map(({ id, label, src }) => ({ id, label, src })),
    []
  );

  // Tell the widget's PageContextExtractor which product this page is about,
  // the same way a real merchant integration would via data-modly-* attributes
  // on <body> — without this the assistant treats every question generically
  // instead of assuming "this piece" means the featured product.
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-modly-page-type", "product");
    body.setAttribute("data-modly-product-id", featuredItem.id);
    body.setAttribute("data-modly-product-name", featuredItem.name);
    body.setAttribute("data-modly-category", featuredItem.category);
    return () => {
      body.removeAttribute("data-modly-page-type");
      body.removeAttribute("data-modly-product-id");
      body.removeAttribute("data-modly-product-name");
      body.removeAttribute("data-modly-category");
    };
  }, [featuredItem]);

  const finishes = options?.colors?.length ? options.colors : [{ name: product.colors?.[0] ?? "Natural", price: 0 }];
  const sizeSteps = options?.width
    ? [options.width.min, options.width.default, options.width.max]
    : [product.width];
  const selectedFinish = finishes[finishIndex] ?? finishes[0];
  const selectedSizeIn = sizeSteps[sizeIndex] ?? sizeSteps[0];
  const sizeDelta = options?.width ? (selectedSizeIn - options.width.default) * options.width.pricePerExtraInch : 0;
  const displayPrice = product.price + (selectedFinish?.price ?? 0) + sizeDelta;

  const handleQuoteSubmitted = (data: QuoteResult) => {
    setQuoteResult(data);
  };

  const shopperSummary = (() => {
    if (!quoteResult) return null;
    const { customer, item } = quoteResult.quoteRequest;
    const color = item.colorScheme?.primary;
    const material = item.materials ? Object.values(item.materials).filter(Boolean).join(", ") : undefined;
    return {
      name: customer.name,
      email: customer.email,
      message:
        customer.message?.trim() ||
        `Hi, interested in the ${item.productName || item.name}${color ? ` in ${color}` : ""}${
          material ? `, ${material}` : ""
        }. Can you send pricing?`,
    };
  })();

  const inboxLines = (() => {
    if (!quoteResult) return [];
    const { item } = quoteResult.quoteRequest;
    return [
      { label: "Product", value: item.productName || item.name },
      { label: "Finish", value: item.colorScheme?.primary },
      { label: "Material", value: item.materials ? Object.values(item.materials).filter(Boolean).join(", ") : undefined },
      {
        label: "Dimensions",
        value: item.selectedDimensions
          ? `L ${item.selectedDimensions.length}" × W ${item.selectedDimensions.width}"`
          : item.dimensions
            ? `L ${(item.dimensions.length / INCHES_TO_METERS).toFixed(0)}" × W ${(item.dimensions.width / INCHES_TO_METERS).toFixed(0)}" × H ${(item.dimensions.height / INCHES_TO_METERS).toFixed(0)}"`
            : undefined,
      },
      {
        label: "Estimated total",
        value:
          item.estimatedTotal !== undefined
            ? formatMoney(item.estimatedTotal)
            : item.basePrice !== undefined
              ? formatMoney(item.basePrice)
              : undefined,
      },
      { label: "Quote ID", value: quoteResult.response.quoteId },
    ].filter((line): line is { label: string; value: string } => Boolean(line.value));
  })();

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors md:px-8 ${theme.fontClassName}`}
      style={{ backgroundColor: theme.pageBg, color: theme.textColor }}
    >
      <div className="mx-auto max-w-6xl">
        {!framed && (
          <>
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: theme.mutedColor }}>
                Live demo
              </div>
              <h2 className="font-heading mt-3 text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
                See it work. No signup, no calendar.
              </h2>
              <p className="mt-4 text-base leading-7" style={{ color: theme.mutedColor }}>
                This is the real ModlyAI assistant, answering only from the fictional catalog on this page. Ask
                whether something fits, then customize one of the made-to-order pieces and see the exact spec it
                would send a retailer as a quote request.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold" style={{ color: theme.mutedColor }}>
              {["1. Ask about fit", "2. See it in your room", "3. Customize it", "4. Send the quote"].map((step) => (
                <span
                  key={step}
                  className="rounded-full border px-3 py-1.5"
                  style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}
                >
                  {step}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Controls */}
        {!framed && (
          <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setThemeKey(key)}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition"
                  style={
                    themeKey === key
                      ? { backgroundColor: theme.textColor, color: theme.pageBg, borderColor: theme.textColor }
                      : { borderColor: theme.borderColor, color: theme.mutedColor }
                  }
                >
                  {THEMES[key].label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border p-1" style={{ borderColor: theme.borderColor }}>
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className="rounded-full px-3 py-1 text-xs font-semibold transition"
                style={
                  viewport === "desktop"
                    ? { backgroundColor: theme.textColor, color: theme.pageBg }
                    : { color: theme.mutedColor }
                }
              >
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className="rounded-full px-3 py-1 text-xs font-semibold transition"
                style={
                  viewport === "mobile"
                    ? { backgroundColor: theme.textColor, color: theme.pageBg }
                    : { color: theme.mutedColor }
                }
              >
                Mobile
              </button>
            </div>
          </div>
        )}

        {viewport === "mobile" && !framed ? (
          // The widget's internal layouts (e.g. FurnitureCustomizerPanel's
          // lg:grid-cols-12) key off the real browser viewport width, not a
          // container's CSS width — squeezing them into a narrow div while the
          // page itself stays desktop-wide doesn't trigger their mobile
          // stacking. An iframe gets its own real (narrow) viewport, so it
          // renders exactly like a visitor's actual phone would.
          <div className="flex justify-center">
            <iframe
              key={themeKey}
              src={`/demo?frame=mobile&theme=${themeKey}`}
              title="Mobile preview"
              className="rounded-[2.5rem] border-[10px] shadow-2xl"
              style={{ width: 390, height: 844, borderColor: theme.textColor, backgroundColor: theme.pageBg }}
            />
          </div>
        ) : (
          <div>
            {/* PDP */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Gallery */}
              <div
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}
              >
                {product.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image} alt={product.title} className="aspect-square w-full object-cover" />
                )}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl font-semibold tracking-[-0.01em]">{product.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: theme.mutedColor }}>
                  <span>★★★★☆</span>
                  <span>24 reviews</span>
                </div>
                <p className="mt-3 text-2xl font-semibold">{formatMoney(displayPrice)}</p>

                {finishes.length > 1 && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.mutedColor }}>
                      Finish
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {finishes.map((finish, idx) => (
                        <button
                          key={finish.name}
                          type="button"
                          onClick={() => setFinishIndex(idx)}
                          className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
                          style={
                            idx === finishIndex
                              ? { backgroundColor: theme.textColor, color: theme.pageBg, borderColor: theme.textColor }
                              : { borderColor: theme.borderColor, color: theme.mutedColor }
                          }
                        >
                          {finish.name}
                          {finish.price ? ` (+$${finish.price})` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {options?.width && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.mutedColor }}>
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sizeSteps.map((size, idx) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSizeIndex(idx)}
                          className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
                          style={
                            idx === sizeIndex
                              ? { backgroundColor: theme.textColor, color: theme.pageBg, borderColor: theme.textColor }
                              : { borderColor: theme.borderColor, color: theme.mutedColor }
                          }
                        >
                          {size}&quot;{size === options.width!.default ? " (standard)" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  title="This demo focuses on the assistant below, not checkout."
                  className="mt-6 w-full rounded-lg px-5 py-3 text-sm font-semibold opacity-60"
                  style={{ backgroundColor: theme.textColor, color: theme.pageBg }}
                  disabled
                >
                  Add to cart
                </button>

                <div className="mt-6 rounded-xl border p-4 text-sm" style={{ borderColor: theme.borderColor }}>
                  <p className="mb-1 font-semibold">Dimensions</p>
                  <p style={{ color: theme.mutedColor }}>
                    W {product.width}&quot; × D {product.length}&quot; × H {product.height}&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Widget, mounted inline right below the dimensions block */}
            <div
              className="mt-8 overflow-hidden rounded-2xl border shadow-xl"
              style={{ borderColor: theme.borderColor, height: 620 }}
            >
              <FurnitureAIWidget
                widgetTitle="Ask about this piece"
                initialProduct={featuredItem}
                sampleRooms={sampleRooms}
                suggestedPrompts={[
                  "Will this fit a 3.5m dining room?",
                  "Show me this in my room",
                  "Can I get this in a darker finish?",
                  "What is the widest sideboard that fits a 2m wall?",
                ]}
                onQuoteSubmitted={handleQuoteSubmitted}
                config={{
                  catalog: { source: "manual", products: DEMO_CATALOG },
                  primaryColor: theme.primaryColor,
                  titleColor: theme.titleColor,
                  messageTextColor: theme.messageTextColor,
                  fontFamily: theme.fontFamily,
                  welcomeMessage:
                    "Hi, I'm the ModlyAI demo assistant. Ask whether this piece fits your space, see it in a sample room, or customize the finish and size.",
                  enabledActions: { viewInCatalog: false, customize: true, requestQuote: true },
                  apiEndpoints: { quoteRequest: "/api/demo/quote-request", catalog: "/api/demo/catalog-items" },
                }}
              />
            </div>

            {/* Quote comparison panel */}
            {quoteResult && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border p-5" style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.mutedColor }}>
                    What the shopper sent
                  </p>
                  <p className="mt-3 text-sm">
                    {shopperSummary?.name} ({shopperSummary?.email})
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm" style={{ color: theme.mutedColor }}>
                    {shopperSummary?.message}
                  </p>
                </div>
                <div
                  className="rounded-2xl border p-5"
                  style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: theme.mutedColor }}>
                    What lands in your inbox
                  </p>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {inboxLines.map((line) => (
                      <div key={line.label} className="flex justify-between gap-4">
                        <dt style={{ color: theme.mutedColor }}>{line.label}</dt>
                        <dd className="text-right font-medium">{line.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>
        )}

        {!framed && (
          <>
            <div
              className="mt-10 flex flex-col items-start gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}
            >
              <div>
                <p className="text-base font-semibold">Ready to try it on your own catalog?</p>
                <p className="mt-1 text-sm" style={{ color: theme.mutedColor }}>
                  Free trial, no card required. Or talk to us first.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="/auth/signup"
                  ctaId="demo-page-get-started-free"
                  ctaText="Get Started Free"
                  location="demo"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                  style={{ backgroundColor: theme.textColor, color: theme.pageBg }}
                >
                  Get Started Free
                </TrackedLink>
                <TrackedLink
                  href="/request-pilot"
                  ctaId="demo-page-request-pilot"
                  ctaText="Request the design-partner pilot"
                  location="demo"
                  className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition"
                  style={{ borderColor: theme.borderColor, color: theme.textColor, backgroundColor: theme.cardBg }}
                >
                  Request the pilot
                </TrackedLink>
              </div>
            </div>

            <DemoDisclaimer className="mt-6 text-xs leading-5" style={{ color: theme.mutedColor }} />
          </>
        )}
      </div>
    </div>
  );
}
