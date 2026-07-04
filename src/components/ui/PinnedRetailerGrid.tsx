"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

type PinnedCard = {
  title: string;
  image: string;
  alt: string;
  body: string;
};

const sectionLabel = "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]";
const sectionTitle = "mt-3 text-3xl font-semibold tracking-[-0.01em] text-[#171411] md:text-4xl";

function CardGridHeader() {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <div className={sectionLabel}>Built for furniture retailers</div>
        <h2 className={sectionTitle}>Merchandise your catalog with room-aware guidance.</h2>
      </div>
      <p className="max-w-xl text-base leading-7 text-[#665c52]">
        ModlyAI is designed around the categories where size, proportion, style, and customization matter before
        checkout.
      </p>
    </div>
  );
}

function Card({ category, active, delayMs }: { category: PinnedCard; active: boolean; delayMs: number }) {
  return (
    <div
      className={`group rounded-2xl border border-[#e1d7ca] bg-[#fffdf9] p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(75,61,47,0.09)] ${
        active ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
      }`}
      style={{ transitionDelay: active ? `${delayMs}ms` : "0ms" }}
    >
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-[#e7ddd1] bg-[#f7eee2]">
        <img
          src={category.image}
          alt={category.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#1e1a16]">{category.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#665c52]">{category.body}</p>
    </div>
  );
}

/**
 * On desktop with motion allowed: pins the section in place while the viewport
 * scrolls through it, revealing cards one by one based on scroll progress.
 * On mobile, or when prefers-reduced-motion is set, falls back to a normal
 * in-flow grid with per-card scroll reveal (no pinning) to avoid janky
 * long-scroll sections on small screens.
 */
export default function PinnedRetailerGrid({ items, id }: { items: readonly PinnedCard[]; id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [pinEnabled, setPinEnabled] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setPinEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    evaluate();

    desktopQuery.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);
    return () => {
      desktopQuery.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!pinEnabled) {
      setActiveCount(items.length);
      return;
    }

    let ticking = false;

    const update = () => {
      const node = containerRef.current;
      ticking = false;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = node.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setActiveCount(items.length);
        return;
      }

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      const count = Math.min(items.length, Math.max(0, Math.ceil(progress * items.length)));
      setActiveCount(count);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinEnabled, items.length]);

  if (!pinEnabled) {
    return (
      <section id={id} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <CardGridHeader />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((category, idx) => (
              <Reveal key={category.title} delayMs={idx * 70}>
                <Card category={category} active delayMs={0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} ref={containerRef} className="relative" style={{ height: `${(items.length + 0.4) * 48}vh` }}>
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-10">
        <div className="mx-auto w-full max-w-7xl px-6">
          <CardGridHeader />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((category, idx) => (
              <Card key={category.title} category={category} active={idx < activeCount} delayMs={(idx % 3) * 60} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
