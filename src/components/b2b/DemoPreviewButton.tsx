"use client";

import type { MouseEvent } from "react";

const ariaLabels = {
  "View in catalog": "Demo preview: view in catalog",
  "Customize this": "Demo preview: customize this",
  "Request quote": "Demo preview: request quote",
} as const;

type DemoPreviewAction = keyof typeof ariaLabels;

export default function DemoPreviewButton({ action }: { action: DemoPreviewAction }) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <button
      type="button"
      className="shrink-0 rounded-lg border border-[#cfc3b4] px-3 py-2 text-xs font-semibold text-[#244f85]"
      aria-label={ariaLabels[action]}
      title="Demo preview only"
      onClick={handleClick}
    >
      {action}
    </button>
  );
}
