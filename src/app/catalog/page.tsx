'use client';

import { useState } from 'react';
import { FurnitureItem } from '@/types';
import CatalogGrid from '@/components/CatalogGrid';

export default function CatalogPage() {
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  const handleCustomizeItem = (item: FurnitureItem) => {
    setSelectedItemId(item.id);
  };

  return (
    <main className="min-h-screen bg-[#242723] py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F0EFEA] mb-4">
            Furniture Catalog
          </h1>
          {isDemoMode && (
            <div className="flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-amber-200/20 text-amber-200 border border-amber-200/40">
                Sample catalog
              </span>
              <button
                onClick={() => setIsCatalogModalOpen(true)}
                className="text-sm text-[#F0EFEA] underline underline-offset-4 hover:text-white"
              >
                Catalog info
              </button>
            </div>
          )}
          <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto">
            Browse the active catalog, search by name or style, and open any item for customization.
          </p>
        </div>

        <CatalogGrid onCustomizeItem={handleCustomizeItem} />
      </div>

      {isDemoMode && isCatalogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg bg-[#1A1C19] rounded-2xl border border-earth-border p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#F0EFEA]">Sample catalog</h2>
                <p className="text-sm text-[#A0A0A0] mt-2">
                  Products shown are for demonstration purposes only. No affiliation or partnership is implied.
                </p>
              </div>
              <button
                onClick={() => setIsCatalogModalOpen(false)}
                className="text-[#A0A0A0] hover:text-white"
                aria-label="Close catalog info"
              >
                ×
              </button>
            </div>
            <div className="mt-4 text-sm text-[#A0A0A0]">
              This catalog uses generic, royalty-free imagery and demo-only data for previewing ModlyAI features.
            </div>
          </div>
        </div>
      )}

      {selectedItemId ? <span className="sr-only">Selected item: {selectedItemId}</span> : null}
    </main>
  );
}
