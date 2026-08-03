"use client";

import { useRef, useState } from "react";
import type { ConversationMessage } from "@/types";
import { DEMO_CATALOG, DEMO_ROOM_PHOTOS, DEMO_SUGGESTED_PROMPTS } from "@/lib/demo-catalog";

type UploadedPhoto = {
  label: string;
  src: string;
};

function AssistantBubble({ message }: { message: ConversationMessage }) {
  const recommendations = message.metadata?.recommendations ?? [];

  return (
    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e1d7ca] bg-white px-4 py-3 text-sm leading-6 text-[#2b2621]">
      <div className="whitespace-pre-line">{message.content}</div>
      {recommendations.length > 0 && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {recommendations.slice(0, 4).map((rec) => (
            <div key={rec.item.id} className="flex items-center gap-2 rounded-xl border border-[#e1d7ca] bg-[#fbf7f0] p-2">
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
          ))}
        </div>
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
        "Hi, I'm the ModlyAI demo assistant. Ask me about the catalog below, or try one of the suggested questions to see how fit-checking works.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<UploadedPhoto | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
                <AssistantBubble message={message} />
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
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#211d19]">{product.title}</p>
                    <p className="truncate text-[11px] text-[#8a714f]">
                      {product.category} · {product.dimensions} · ${Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
