import React, { useEffect, useState } from 'react';
import {
  QuoteRequest,
  CustomizedFurnitureItem,
  Recommendation,
  RoomAnalysisResponse,
  RoomDimensions,
} from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface QuoteSubmitResult {
  success?: boolean;
  quoteId?: string;
  message?: string;
  emailWarning?: string;
  emailSkipped?: boolean;
  warnings?: string[];
}

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuoteRequest) => Promise<QuoteSubmitResult | void>;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
  storeId?: string;
  widgetId?: string;
  roomDimensions?: RoomDimensions | null;
  roomAnalysis?: RoomAnalysisResponse['roomAnalysis'] | null;
}

const getCustomizationChoiceName = (value: string | { name: string } | undefined): string | undefined =>
  typeof value === 'string' ? value : value?.name;

const formatCurrency = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? `$${value.toLocaleString()}` : undefined;

const formatChoice = (value: string | { name: string; price?: number } | undefined) => {
  const name = getCustomizationChoiceName(value);
  if (!name) return undefined;
  const price = typeof value === 'object' ? value.price : undefined;
  return price ? `${name} (+${formatCurrency(price)})` : name;
};

const formatDimensions = (
  dimensions:
    | { length?: number; width?: number; height?: number; unit?: string }
    | undefined
) => {
  if (!dimensions) return undefined;
  const unit = dimensions.unit || 'm';
  const rows = [
    dimensions.length !== undefined ? `Length: ${dimensions.length} ${unit}` : undefined,
    dimensions.width !== undefined ? `Width: ${dimensions.width} ${unit}` : undefined,
    dimensions.height !== undefined ? `Height: ${dimensions.height} ${unit}` : undefined,
  ].filter(Boolean);
  return rows.length > 0 ? rows.join(' / ') : undefined;
};

const formatFitScore = (value: number | undefined) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  return `${Math.round(value <= 1 ? value * 100 : value)}%`;
};

const getFitScoreNumber = (value: number | undefined) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  return Math.round(value <= 1 ? value * 100 : value);
};

const getRoomTypeLabel = (value: string | undefined) => {
  if (!value) return undefined;
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  notes: '',
};

export function QuoteRequestForm({
  isOpen,
  onClose,
  onSubmit,
  item,
  recommendation,
  storeId,
  widgetId,
  roomDimensions,
  roomAnalysis,
}: QuoteRequestFormProps) {
  const websiteColors = useWebsiteColors();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<QuoteSubmitResult | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData(emptyForm);
      setError(null);
      setSuccess(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !item?.customerRequestText?.trim()) return;

    setFormData((prev) => (
      prev.notes.trim() ? prev : { ...prev, notes: item.customerRequestText?.trim() ?? '' }
    ));
  }, [isOpen, item?.customerRequestText, item?.id]);

  if (!isOpen) return null;

  const displayItem = item || (recommendation ? {
    productId: recommendation.item.id,
    name: recommendation.item.name,
    category: recommendation.item.category,
    imageUrl: recommendation.item.images?.find((image) => image?.trim()),
    source: recommendation.item.source,
    productUrl: recommendation.item.productUrl || recommendation.item.url,
    price: recommendation.item.priceRange?.min ?? recommendation.item.price,
    basePrice: recommendation.item.priceRange?.min ?? recommendation.item.price,
    estimatedTotal: recommendation.item.priceRange?.min ?? recommendation.item.price,
    pricingMode:
      (recommendation.item.priceRange?.min ?? recommendation.item.price) ? 'estimated' as const : 'quote_required' as const,
    externalId: recommendation.item.externalId,
    shopifyProductId: recommendation.item.shopifyProductId,
    storeId: recommendation.item.storeId || storeId,
    widgetId,
    dimensions: recommendation.item.dimensions,
    materials: recommendation.item.materials,
    colorScheme: {
      primary: recommendation.item.colors.main,
      secondary: recommendation.item.colors.accent,
    },
    aiNotes: recommendation.reasoning,
    placement: recommendation.placement,
    fitScore: getFitScoreNumber(recommendation.matchScore),
    roomAnalysis: {
      roomType: roomDimensions?.roomType,
      detectedStyle: roomAnalysis?.detectedStyle,
      dominantColors: roomAnalysis?.dominantColors,
      freeSpaceDescription: roomAnalysis?.freeSpace?.description,
      whyItFits: recommendation.reasoning,
    },
    roomDetails: roomDimensions ?? undefined,
    placementNote: recommendation.placement?.reasoning,
  } : null);

  if (!displayItem) return null;

  const isRoomRecommendation = Boolean(recommendation && !item);
  const productName =
    'productName' in displayItem && displayItem.productName
      ? displayItem.productName
      : displayItem.name;
  const selectedColor =
    'selectedColor' in displayItem
      ? formatChoice(displayItem.selectedColor)
      : displayItem.colorScheme.primary;
  const selectedMaterial =
    'selectedMaterial' in displayItem
      ? formatChoice(displayItem.selectedMaterial)
      : displayItem.materials.primary;
  const selectedDimensions =
    'selectedDimensions' in displayItem && displayItem.selectedDimensions
      ? formatDimensions(displayItem.selectedDimensions)
      : formatDimensions(displayItem.dimensions);
  const selectedAddOns =
    'selectedAddOns' in displayItem
      ? displayItem.selectedAddOns?.map((addOn) =>
          addOn.price ? `${addOn.name} (+${formatCurrency(addOn.price)})` : addOn.name
        )
      : undefined;
  const selectedShopifyOptions =
    'selectedShopifyOptions' in displayItem
      ? displayItem.selectedShopifyOptions?.map((option) =>
          option.price
            ? `${option.name}: ${option.value} (+${formatCurrency(option.price)})`
            : `${option.name}: ${option.value}`
        )
      : undefined;
  const estimatedTotal =
    'pricingMode' in displayItem && displayItem.pricingMode === 'quote_required'
      ? 'Quote required'
      : 'estimatedTotal' in displayItem
        ? formatCurrency(displayItem.estimatedTotal)
        : formatCurrency(displayItem.price);
  const customerRequestText =
    'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined;
  const fitScore = isRoomRecommendation ? formatFitScore(recommendation?.matchScore) : undefined;
  const roomTypeLabel = getRoomTypeLabel(roomDimensions?.roomType);
  const whyItFits = isRoomRecommendation ? recommendation?.reasoning : undefined;
  const placementNote = isRoomRecommendation ? recommendation?.placement?.reasoning : undefined;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameValid = formData.name.trim().length > 0;
  const isEmailValid = emailRegex.test(formData.email.trim());
  const canSubmit = isNameValid && isEmailValid && !isSubmitting;
  const successWarning =
    success?.emailWarning ||
    success?.warnings?.[0] ||
    (success?.emailSkipped ? 'Quote saved. Email delivery may not be configured.' : undefined);

  const handleClose = () => {
    setFormData(emptyForm);
    setError(null);
    setSuccess(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);

    if (!isNameValid) {
      setError('Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const customization =
        'selectedColor' in displayItem || 'selectedMaterial' in displayItem
          ? {
              selectedColor: 'selectedColor' in displayItem ? displayItem.selectedColor : undefined,
              selectedMaterial: 'selectedMaterial' in displayItem ? displayItem.selectedMaterial : undefined,
              selectedShopifyOptions:
                'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
              selectedDimensions:
                'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
              dimensionPriceAdjustments:
                'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
              selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
              customizationPrice:
                'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
              estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : undefined,
              pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
              customerRequestText:
                'customerRequestText' in displayItem ? displayItem.customerRequestText : undefined,
            }
          : undefined;

      const quoteRequest: QuoteRequest = {
        storeId: displayItem.storeId || storeId,
        widgetId: ('widgetId' in displayItem ? displayItem.widgetId : undefined) || widgetId,
        source: isRoomRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.notes.trim() || undefined,
        },
        item: {
          productId: 'productId' in displayItem ? displayItem.productId : undefined,
          productName,
          category: 'category' in displayItem ? displayItem.category : undefined,
          productUrl: displayItem.productUrl,
          imageUrl: 'imageUrl' in displayItem ? displayItem.imageUrl : undefined,
          basePrice: 'basePrice' in displayItem ? displayItem.basePrice : displayItem.price,
          customizationPrice:
            'customizationPrice' in displayItem ? displayItem.customizationPrice : undefined,
          estimatedTotal: 'estimatedTotal' in displayItem ? displayItem.estimatedTotal : displayItem.price,
          pricingMode: 'pricingMode' in displayItem ? displayItem.pricingMode : undefined,
          savedAt: 'savedAt' in displayItem ? displayItem.savedAt : undefined,
          name: productName,
          dimensions: {
            length: displayItem.dimensions.length,
            width: displayItem.dimensions.width,
            height: displayItem.dimensions.height,
          },
          materials: displayItem.materials,
          colorScheme: displayItem.colorScheme,
          price: displayItem.price,
          externalId: displayItem.externalId,
          shopifyProductId: displayItem.shopifyProductId,
          storeId: displayItem.storeId,
          widgetId: 'widgetId' in displayItem ? displayItem.widgetId : undefined,
          source: displayItem.source,
          aiNotes: displayItem.aiNotes,
          selectedColor:
            'selectedColor' in displayItem
              ? displayItem.selectedColor
              : displayItem.colorScheme.primary,
          selectedColorPrice:
            'selectedColorPrice' in displayItem ? displayItem.selectedColorPrice : undefined,
          selectedMaterial:
            'selectedMaterial' in displayItem
              ? displayItem.selectedMaterial
              : displayItem.materials.primary,
          selectedMaterialPrice:
            'selectedMaterialPrice' in displayItem ? displayItem.selectedMaterialPrice : undefined,
          selectedShopifyOptions:
            'selectedShopifyOptions' in displayItem ? displayItem.selectedShopifyOptions : undefined,
          selectedDimensions: 'selectedDimensions' in displayItem ? displayItem.selectedDimensions : undefined,
          dimensionPriceAdjustments:
            'dimensionPriceAdjustments' in displayItem ? displayItem.dimensionPriceAdjustments : undefined,
          selectedAddOns: 'selectedAddOns' in displayItem ? displayItem.selectedAddOns : undefined,
          customerRequestText:
            'customerRequestText' in displayItem
              ? displayItem.customerRequestText
              : formData.notes.trim() || undefined,
          placement: 'placement' in displayItem && displayItem.placement ? {
            wall: displayItem.placement.wall,
            position: displayItem.placement.position,
            coordinates: displayItem.placement.coordinates,
            reasoning: displayItem.placement.reasoning,
          } : undefined,
          fitScore: 'fitScore' in displayItem ? displayItem.fitScore : undefined,
          placementNote: 'placementNote' in displayItem ? displayItem.placementNote : undefined,
          roomAnalysis: 'roomAnalysis' in displayItem ? displayItem.roomAnalysis : undefined,
          roomDetails: 'roomDetails' in displayItem ? displayItem.roomDetails : undefined,
        },
        customization: isRoomRecommendation ? undefined : customization,
      };

      const result = await onSubmit(quoteRequest);
      setSuccess(result || { success: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quote request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#fffaf4] shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="sticky top-0 z-10 border-b border-stone-200 bg-[#fffaf4]/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-950">Request quote</h2>
              <p className="mt-1 text-sm text-gray-600">
                {isRoomRecommendation
                  ? 'Send this room recommendation to the store.'
                  : 'Send this customized furniture request to the store.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-gray-500 transition hover:bg-stone-50 hover:text-gray-900"
              aria-label="Close quote request"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {success ? (
          <div className="overflow-y-auto px-6 py-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-950">Quote request sent</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Quote request sent. The store will follow up with pricing and next steps.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-gray-500">Request summary</p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Product</span>
                  <span className="text-right font-semibold text-gray-950">{productName}</span>
                </div>
                {estimatedTotal && (
                  <div className="flex justify-between gap-4 border-t border-stone-100 pt-3">
                    <span className="text-gray-500">Estimated total</span>
                    <span className="text-right font-bold text-gray-950">{estimatedTotal}</span>
                  </div>
                )}
              </div>
            </div>

            {successWarning && (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {successWarning}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
                }}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="overflow-y-auto px-6 py-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      {isRoomRecommendation ? 'Room recommendation' : 'Customization summary'}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-gray-950">{productName}</h3>
                    {isRoomRecommendation && (
                      <p className="mt-1 text-sm font-semibold text-gray-600">
                        Request quote for room recommendation
                      </p>
                    )}
                  </div>
                  {estimatedTotal && (
                    <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-900">
                      {estimatedTotal}
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  {isRoomRecommendation ? (
                    <>
                      {roomTypeLabel && (
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Room type</span>
                          <span className="text-right font-semibold text-gray-950">{roomTypeLabel}</span>
                        </div>
                      )}
                      {fitScore && (
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Fit score</span>
                          <span className="text-right font-semibold text-gray-950">{fitScore}</span>
                        </div>
                      )}
                      {whyItFits && (
                        <div className="border-t border-stone-100 pt-3">
                          <span className="block text-gray-500">Why it fits</span>
                          <p className="mt-1 leading-6 text-gray-800">{whyItFits}</p>
                        </div>
                      )}
                      {placementNote && (
                        <div className="border-t border-stone-100 pt-3">
                          <span className="block text-gray-500">Placement note</span>
                          <p className="mt-1 leading-6 text-gray-800">{placementNote}</p>
                        </div>
                      )}
                      {estimatedTotal && (
                        <div className="flex justify-between gap-4 border-t border-stone-100 pt-3">
                          <span className="text-gray-500">Estimated total</span>
                          <span className="text-right font-bold text-gray-950">{estimatedTotal}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                  {selectedColor && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Color</span>
                      <span className="text-right font-semibold text-gray-950">{selectedColor}</span>
                    </div>
                  )}
                  {selectedMaterial && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Material</span>
                      <span className="text-right font-semibold text-gray-950">{selectedMaterial}</span>
                    </div>
                  )}
                  {selectedDimensions && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Dimensions</span>
                      <span className="text-right font-semibold text-gray-950">{selectedDimensions}</span>
                    </div>
                  )}
                  {selectedShopifyOptions && selectedShopifyOptions.length > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Options</span>
                      <span className="text-right font-semibold text-gray-950">{selectedShopifyOptions.join(', ')}</span>
                    </div>
                  )}
                  {selectedAddOns && selectedAddOns.length > 0 && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Add-ons</span>
                      <span className="text-right font-semibold text-gray-950">{selectedAddOns.join(', ')}</span>
                    </div>
                  )}
                  {customerRequestText?.trim() && (
                    <div className="border-t border-stone-100 pt-3">
                      <span className="block text-gray-500">Customizer request</span>
                      <p className="mt-1 rounded-xl bg-amber-50 p-3 text-gray-800">{customerRequestText}</p>
                    </div>
                  )}
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="quote-name" className="block text-sm font-semibold text-gray-800">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="quote-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-sm font-semibold text-gray-800">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="quote-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="quote-phone" className="block text-sm font-semibold text-gray-800">
                  Phone <span className="text-xs font-medium text-gray-400">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="quote-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  placeholder="+1 (555) 123-4567"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="quote-notes" className="block text-sm font-semibold text-gray-800">
                  Message / notes <span className="text-xs font-medium text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-950 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  placeholder="Any special requests or questions..."
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-stone-200 bg-[#fffaf4]/95 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${websiteColors.primary}, #7c3aed)`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Quote Request'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
