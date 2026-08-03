"use client";

import { useRef, useState } from "react";
import type { ConversationMessage } from "@/types";
import {
  DEMO_CATALOG,
  DEMO_ROOM_PHOTOS,
  DEMO_SUGGESTED_PROMPTS,
  type DemoProduct,
} from "@/lib/demo-catalog";

type UploadedPhoto = {
  label: string;
  src: string;
};

const DEMO_CATALOG_BY_ID = new Map(DEMO_CATALOG.map((product) => [product.id, product]));

function formatMoney(value: number) {
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function AssistantBubble({
  message,
  onCustomize,
}: {
  message: ConversationMessage;
  onCustomize: (product: DemoProduct) => void;
}) {
  const recommendations = message.metadata?.recommendations ?? [];

  return (
    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e1d7ca] bg-white px-4 py-3 text-sm leading-6 text-[#2b2621]">
      <div className="whitespace-pre-line">{message.content}</div>
      {recommendations.length > 0 && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {recommendations.slice(0, 4).map((rec) => {
            const demoProduct = DEMO_CATALOG_BY_ID.get(rec.item.id);
            return (
              <div key={rec.item.id} className="flex flex-col gap-2 rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] p-2">
                <div className="flex items-center gap-2">
                  {rec.item.images?.[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={rec.item.images[0]} alt={rec.item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#211d19]">{rec.item.name}</p>
                    <p className="text-[11px] text-[#8a714f]">
                      {Math.round(rec.item.dimensions.length * 39.37)}"L x {Math.round(rec.item.dimensions.width * 39.37)}"W
                      {rec.item.price ? ` · $${rec.item.price.toLocaleString()}` : ""}
                    </p>
                  </div>
                </div>
                {demoProduct?.customizationOptions && (
                  <button
                    type="button"
                    onClick={() => onCustomize(demoProduct)}
                    className="rounded-full border border-[#8a714f] bg-white px-3 py-1 text-[11px] font-semibold text-[#8a714f] transition hover:bg-[#f1e6d6]"
                  >
                    Customize this
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

type Selection = {
  colorIndex: number;
  materialIndex: number;
  width: number;
};

function CustomizePanel({
  product,
  selection,
  onChange,
  onRequestQuote,
  onClose,
}: {
  product: DemoProduct;
  selection: Selection;
  onChange: (next: Selection) => void;
  onRequestQuote: () => void;
  onClose: () => void;
}) {
  const options = product.customizationOptions!;
  const colorPrice = options.colors?.[selection.colorIndex]?.price ?? 0;
  const materialPrice = options.materials?.[selection.materialIndex]?.price ?? 0;
  const widthDelta = options.width ? (selection.width - options.width.default) * options.width.pricePerExtraInch : 0;
  const total = product.price + colorPrice + materialPrice + widthDelta;

  return (
    <div className="border-t border-[#e1d7ca] bg-white px-6 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a714f]">Customize</p>
          <p className="text-base font-semibold text-[#171411]">{product.title}</p>
        </div>
        <button type="button" onClick={onClose} className="text-xs font-semibold text-[#a0937f] hover:text-[#171411]">
          Close
        </button>
      </div>

      <p className="mt-2 text-xs leading-5 text-[#8a714f]">
        These are the same option groups the widget renders on your product page. No image re-render in this demo
        yet — the spec below is exactly what would be attached to the quote.
      </p>

      {options.colors && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-[#2b2621]">Color</p>
          <div className="flex flex-wrap gap-2">
            {options.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => onChange({ ...selection, colorIndex: idx })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  idx === selection.colorIndex
                    ? "border-[#171411] bg-[#171411] text-[#fffaf2]"
                    : "border-[#d7cab9] bg-[#fbf7f0] text-[#6a5f54] hover:bg-[#f1e6d6]"
                }`}
              >
                {color.name}
                {color.price > 0 ? ` (+$${color.price})` : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {options.materials && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold text-[#2b2621]">Material</p>
          <div className="flex flex-wrap gap-2">
            {options.materials.map((material, idx) => (
              <button
                key={material.name}
                type="button"
                onClick={() => onChange({ ...selection, materialIndex: idx })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  idx === selection.materialIndex
                    ? "border-[#171411] bg-[#171411] text-[#fffaf2]"
                    : "border-[#d7cab9] bg-[#fbf7f0] text-[#6a5f54] hover:bg-[#f1e6d6]"
                }`}
              >
                {material.name}
                {material.price > 0 ? ` (+$${material.price})` : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {options.width && (
        <div className="mt-4">
          <p className="mb-2 flex items-center justify-between text-xs font-semibold text-[#2b2621]">
            <span>Width</span>
            <span className="font-normal text-[#8a714f]">{selection.width}"</span>
          </p>
          <input
            type="range"
            min={options.width.min}
            max={options.width.max}
            step={1}
            value={selection.width}
            onChange={(event) => onChange({ ...selection, width: Number(event.target.value) })}
            className="w-full accent-[#171411]"
          />
          <div className="flex justify-between text-[10px] text-[#a0937f]">
            <span>{options.width.min}"</span>
            <span>{options.width.max}"</span>
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] px-4 py-3">
        <span className="text-sm font-semibold text-[#171411]">As configured</span>
        <span className="text-lg font-semibold text-[#171411]">{formatMoney(total)}</span>
      </div>

      <button
        type="button"
        onClick={onRequestQuote}
        className="mt-4 w-full rounded-lg bg-[#171411] px-5 py-3 text-sm font-semibold text-[#fffaf2] transition hover:bg-black"
      >
        Request quote with this spec
      </button>
    </div>
  );
}

function QuotePanel({
  product,
  selection,
  roomLabel,
  onClose,
}: {
  product: DemoProduct;
  selection: Selection;
  roomLabel?: string;
  onClose: () => void;
}) {
  const options = product.customizationOptions!;
  const color = options.colors?.[selection.colorIndex];
  const material = options.materials?.[selection.materialIndex];
  const widthDelta = options.width ? (selection.width - options.width.default) * options.width.pricePerExtraInch : 0;
  const total = product.price + (color?.price ?? 0) + (material?.price ?? 0) + widthDelta;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "submitting" | "submitted">("form");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("submitting");
    // Demo only: no backend call. A real store's widget posts this same
    // payload to /api/quotes/request, which emails the retailer directly.
    window.setTimeout(() => setStatus("submitted"), 700);
  }

  return (
    <div className="border-t border-[#e1d7ca] bg-white px-6 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a714f]">Quote request</p>
          <p className="text-base font-semibold text-[#171411]">What the retailer receives</p>
        </div>
        <button type="button" onClick={onClose} className="text-xs font-semibold text-[#a0937f] hover:text-[#171411]">
          Close
        </button>
      </div>

      <div className="mt-3 space-y-1.5 rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] px-4 py-3 text-xs leading-5 text-[#3c342b]">
        <p>
          <span className="font-semibold">Product:</span> {product.title} ({product.sku})
        </p>
        {color && (
          <p>
            <span className="font-semibold">Color:</span> {color.name}
          </p>
        )}
        {material && (
          <p>
            <span className="font-semibold">Material:</span> {material.name}
          </p>
        )}
        {options.width && (
          <p>
            <span className="font-semibold">Width:</span> {selection.width}" (standard {options.width.default}")
          </p>
        )}
        {roomLabel && (
          <p>
            <span className="font-semibold">Room:</span> {roomLabel}
          </p>
        )}
        <p>
          <span className="font-semibold">Price as configured:</span> {formatMoney(total)}
        </p>
      </div>

      {status === "submitted" ? (
        <div className="mt-4 rounded-xl border border-[#bcd9c1] bg-[#eef7f0] px-4 py-4 text-sm text-[#2f6b3f]">
          Quote request sent. In a live store, the retailer receives this exact spec by email within minutes — not a
          "hi, do you do custom?" message with no detail attached.
        </div>
      ) : (
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2b2621]" htmlFor="quote-name">
              Name
            </label>
            <input
              id="quote-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-3 py-2.5 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#2b2621]" htmlFor="quote-email">
              Email
            </label>
            <input
              id="quote-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-3 py-2.5 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting" || !name.trim() || !email.trim()}
            className="w-full rounded-lg bg-[#171411] px-5 py-3 text-sm font-semibold text-[#fffaf2] transition hover:bg-black disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send quote request"}
          </button>
          <p className="text-center text-[11px] text-[#a0937f]">
            Demo only — this doesn't send a real email or store your details anywhere.
          </p>
        </form>
      )}
    </div>
  );
}

export default function DemoExperience() {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      type: "text",
      content:
        "Hi, I'm the ModlyAI demo assistant. Ask me whether something fits, then try customizing one of the made-to-order pieces to see the quote it would send a retailer.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<UploadedPhoto | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [flowStep, setFlowStep] = useState<"idle" | "customize" | "quote">("idle");
  const [customizeTarget, setCustomizeTarget] = useState<DemoProduct | null>(null);
  const [selection, setSelection] = useState<Selection>({ colorIndex: 0, materialIndex: 0, width: 0 });

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      type: "text",
      content: trimmed,
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/widget/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          conversationHistory: nextMessages.slice(0, -1),
          catalog: { source: "manual", products: DEMO_CATALOG },
          context: { pageType: "demo", currentPage: "/demo" },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || data?.error || "The demo assistant is temporarily unavailable.");
      }

      const assistantMessage: ConversationMessage = data.message ?? {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        type: "text",
        content: data.reply ?? "Sorry, I couldn't generate a response.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The demo assistant is temporarily unavailable. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setActivePhoto({ label: file.name, src });
  }

  function handleSamplePhoto(photo: (typeof DEMO_ROOM_PHOTOS)[number]) {
    setActivePhoto({ label: photo.label, src: photo.src });
    void sendMessage(photo.prompt);
  }

  function handleCustomize(product: DemoProduct) {
    const options = product.customizationOptions;
    setCustomizeTarget(product);
    setSelection({
      colorIndex: 0,
      materialIndex: 0,
      width: options?.width?.default ?? product.width,
    });
    setFlowStep("customize");
  }

  function closeFlow() {
    setFlowStep("idle");
    setCustomizeTarget(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Chat panel */}
      <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-[#ded2c3] bg-[#fbf7f0] shadow-[0_24px_70px_rgba(75,61,47,0.10)]">
        <div className="border-b border-[#e1d7ca] bg-white px-6 py-4">
          <p className="text-sm font-semibold text-[#171411]">ModlyAI assistant</p>
          <p className="text-xs text-[#8a714f]">Answers only from the demo catalog below, no invented products.</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6" style={{ maxHeight: "26rem", minHeight: "20rem" }}>
          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#171411] px-4 py-3 text-sm leading-6 text-[#fffaf2]">
                  {message.content}
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-start">
                <AssistantBubble message={message} onCustomize={handleCustomize} />
              </div>
            )
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm border border-[#e1d7ca] bg-white px-4 py-3 text-sm text-[#8a714f]">
                Thinking…
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-[#e2b9a8] bg-[#fbeee9] px-4 py-3 text-sm text-[#8a3f28]">{error}</div>
          )}
        </div>

        {flowStep === "customize" && customizeTarget && (
          <CustomizePanel
            product={customizeTarget}
            selection={selection}
            onChange={setSelection}
            onRequestQuote={() => setFlowStep("quote")}
            onClose={closeFlow}
          />
        )}

        {flowStep === "quote" && customizeTarget && (
          <QuotePanel product={customizeTarget} selection={selection} roomLabel={activePhoto?.label} onClose={closeFlow} />
        )}

        {flowStep === "idle" && (
          <div className="border-t border-[#e1d7ca] bg-white px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {DEMO_SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  disabled={loading}
                  className="rounded-full border border-[#d7cab9] bg-[#fbf7f0] px-3.5 py-1.5 text-xs font-medium text-[#6a5f54] transition hover:bg-[#f1e6d6] disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about fit, size, or a product…"
                className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-lg bg-[#171411] px-5 py-3 text-sm font-semibold text-[#fffaf2] transition hover:bg-black disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Room photo + catalog panel */}
      <div className="flex flex-col gap-6">
        <div className="rounded-[1.5rem] border border-[#ded2c3] bg-white p-6 shadow-[0_24px_70px_rgba(75,61,47,0.10)]">
          <p className="text-sm font-semibold text-[#171411]">Room photo</p>
          <p className="mt-1 text-xs leading-5 text-[#8a714f]">
            Pick a sample room, or upload your own. Uploaded photos are only previewed in your browser for this
            demo — tell the assistant the room's rough dimensions for a fit check.
          </p>

          {activePhoto && (
            <div className="mt-4 overflow-hidden rounded-xl border border-[#e1d7ca]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activePhoto.src} alt={activePhoto.label} className="h-40 w-full object-cover" />
              <p className="bg-[#fbf7f0] px-3 py-2 text-xs font-medium text-[#6a5f54]">{activePhoto.label}</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2">
            {DEMO_ROOM_PHOTOS.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleSamplePhoto(photo)}
                className="overflow-hidden rounded-lg border border-[#e1d7ca] transition hover:border-[#8a714f]"
                title={photo.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.label} className="h-16 w-full object-cover" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 w-full rounded-lg border border-dashed border-[#d7cab9] bg-[#fbf7f0] px-4 py-2.5 text-xs font-semibold text-[#6a5f54] transition hover:bg-[#f1e6d6]"
          >
            Upload your own room photo
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>

        <div className="rounded-[1.5rem] border border-[#ded2c3] bg-white p-6 shadow-[0_24px_70px_rgba(75,61,47,0.10)]">
          <button
            type="button"
            onClick={() => setShowCatalog((prev) => !prev)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-semibold text-[#171411]">
              Demo catalog ({DEMO_CATALOG.length} products)
            </span>
            <span className="text-xs font-semibold text-[#8a714f]">{showCatalog ? "Hide" : "Show"}</span>
          </button>
          {showCatalog && (
            <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
              {DEMO_CATALOG.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-lg border border-[#e1d7ca] p-2">
                  {product.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={product.title} className="h-10 w-10 shrink-0 rounded-md object-cover" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#211d19]">{product.title}</p>
                    <p className="truncate text-[11px] text-[#8a714f]">
                      {product.category} · {product.dimensions} · ${Number(product.price).toLocaleString()}
                    </p>
                  </div>
                  {product.customizationOptions && (
                    <button
                      type="button"
                      onClick={() => handleCustomize(product)}
                      className="shrink-0 rounded-full border border-[#8a714f] px-2.5 py-1 text-[10px] font-semibold text-[#8a714f] transition hover:bg-[#f1e6d6]"
                    >
                      Customize
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
