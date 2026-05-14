import React, { useState } from 'react';
import { CustomizedFurnitureItem, Recommendation, RoomAnalysisResponse, RoomDimensions } from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface FinalizeQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
  roomDimensions?: RoomDimensions | null;
  roomAnalysis?: RoomAnalysisResponse['roomAnalysis'] | null;
}

const formatCurrency = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;

const formatDimension = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? `${value.toFixed(3).replace(/\.?0+$/, '')}m` : undefined;

const formatFitScore = (value: number | undefined) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  return `${Math.round(value <= 1 ? value * 100 : value)}%`;
};

const getEstimatedTotalLabel = (displayItem: {
  price?: number;
  basePrice?: number;
  estimatedTotal?: number;
  pricingMode?: 'estimated' | 'quote_required';
}) => {
  if (displayItem.pricingMode === 'quote_required') return 'Quote required';
  return (
    formatCurrency(displayItem.estimatedTotal) ||
    formatCurrency(displayItem.basePrice) ||
    formatCurrency(displayItem.price) ||
    'Quote required'
  );
};

const uniqueValues = (values: Array<string | undefined>) =>
  Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))));

export function FinalizeQuoteModal({
  isOpen,
  onClose,
  onProceed,
  item,
  recommendation,
  roomDimensions,
  roomAnalysis,
}: FinalizeQuoteModalProps) {
  const websiteColors = useWebsiteColors();
  const [inlineError, setInlineError] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayItem = item || (recommendation ? {
    name: recommendation.item.name,
    category: recommendation.item.category,
    imageUrl: recommendation.item.images?.find((image) => image?.trim()),
    dimensions: recommendation.item.dimensions,
    materials: recommendation.item.materials,
    colorScheme: {
      primary: recommendation.item.colors.main,
      secondary: recommendation.item.colors.accent,
      accent: undefined,
    },
    aiNotes: recommendation.reasoning,
    placement: recommendation.placement,
    price: recommendation.item.priceRange?.min ?? recommendation.item.price,
    estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
    pricingMode: (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' as const : 'quote_required' as const,
    matchScore: recommendation.matchScore,
  } : null);

  const fitScore = formatFitScore(recommendation?.matchScore);
  const estimatedTotal = displayItem ? getEstimatedTotalLabel(displayItem) : 'Quote required';
  const materialChips = displayItem
    ? uniqueValues([
        displayItem.materials?.primary,
        displayItem.materials?.secondary,
        displayItem.materials?.upholstery,
        displayItem.materials?.legs,
      ])
    : [];
  const roomColorChips = uniqueValues([
    displayItem?.colorScheme?.primary ? `Primary: ${displayItem.colorScheme.primary}` : undefined,
    displayItem?.colorScheme?.secondary ? `Secondary: ${displayItem.colorScheme.secondary}` : undefined,
    displayItem?.colorScheme?.accent ? `Accent: ${displayItem.colorScheme.accent}` : undefined,
    ...(roomAnalysis?.dominantColors?.slice(0, 3).map((color) => `Room: ${color}`) ?? []),
  ]);
  const placementText = recommendation?.placement?.reasoning || recommendation?.placement?.position;
  const hasProduct = Boolean(displayItem);

  const handleProceed = () => {
    if (!hasProduct) {
      setInlineError('Select a product before requesting a quote.');
      return;
    }
    setInlineError(null);
    onProceed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Request quote</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Review this room recommendation before sending it to the store.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900"
              aria-label="Close quote review"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          {!displayItem ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Select a product before requesting a quote.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-100">
                    {displayItem.imageUrl ? (
                      <img
                        src={displayItem.imageUrl}
                        alt={displayItem.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-400">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M4 6h16v12H4z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      {displayItem.category || roomDimensions?.roomType || 'Room recommendation'}
                    </p>
                    <h3 className="mt-1 text-xl font-bold leading-tight text-gray-950">
                      {displayItem.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fitScore && (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                          Room fit score: {fitScore}
                        </span>
                      )}
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900">
                        Estimated total: {estimatedTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-950">Room fit summary</h4>
                <div className="mt-4 space-y-4 text-sm">
                  {recommendation?.reasoning && (
                    <div>
                      <p className="font-semibold text-gray-900">Why it fits</p>
                      <p className="mt-1 leading-6 text-gray-700">{recommendation.reasoning}</p>
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900">Dimensions</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        ['Length', formatDimension(displayItem.dimensions.length)],
                        ['Width', formatDimension(displayItem.dimensions.width)],
                        ['Height', formatDimension(displayItem.dimensions.height)],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-stone-50 px-3 py-2">
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="mt-0.5 font-semibold text-gray-950">{value || 'N/A'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {placementText && (
                    <div>
                      <p className="font-semibold text-gray-900">Placement</p>
                      <p className="mt-1 leading-6 text-gray-700">{placementText}</p>
                    </div>
                  )}
                </div>
              </section>

              {(materialChips.length > 0 || roomColorChips.length > 0) && (
                <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-950">Materials and colors</h4>
                  {materialChips.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase text-gray-500">Materials</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {materialChips.map((material) => (
                          <span key={material} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-medium text-gray-800">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {roomColorChips.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase text-gray-500">Color scheme</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {roomColorChips.map((color) => (
                          <span key={color} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-950">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {displayItem.aiNotes && (
                <section className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
                  <p className="text-sm font-bold text-indigo-950">AI recommendation note</p>
                  <p className="mt-2 text-sm leading-6 text-gray-800">{displayItem.aiNotes}</p>
                </section>
              )}
            </div>
          )}

          {inlineError && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {inlineError}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105"
            style={{
              backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
            }}
          >
            Continue to quote form
          </button>
        </div>
      </div>
    </div>
  );
}
