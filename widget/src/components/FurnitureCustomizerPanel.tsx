import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  FileDown,
  Layers,
  Link2,
  Maximize2,
  Palette,
  Redo2,
  Sparkles,
  Undo2,
} from 'lucide-react';
import {
  getMaterialDescription,
  getOptionName,
  getOptionPrice,
  normalizeCustomizationOptionValues,
  Product,
} from '../data/products';
import { RoomAnalysisResponse } from '../types';

export type CustomizerDraft = {
  productId: string;
  fabricColor: string; // hex
  selectedColor?: string;
  materialId: string;
  selectedMaterial?: string;
  widthIn: number;
  depthIn: number;
  heightIn?: number;
  addons: {
    throwPillows: boolean;
    ottoman: boolean;
  };
  selectedAddOns?: string[];
  customerRequestText?: string;
  rotationDeg: number;
  zoom: number; // retained for upstream state compatibility
  roomContext?: {
    lengthFt?: number;
    widthFt?: number;
  };
};

export type DraftPriceBreakdown = {
  base: number;
  customizations: number;
  total: number;
  quoteRequired?: boolean;
  dimensionAdjustments?: Record<DimensionKey, number> & { total?: number };
  lineItems: Array<{ label: string; amount: number }>;
};

interface FurnitureCustomizerPanelProps {
  products: Product[];
  draft: CustomizerDraft;
  setDraft: (next: CustomizerDraft) => void;
  isApplying?: boolean;
  validationErrors?: string[];
  price: DraftPriceBreakdown;
  onApply: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onSaveConfig: () => void;
  onShareLink: () => void;
  onExportPdf: () => void;
  onViewFullRoomAnalysis?: () => void;
}

interface PersistedRoomPlannerState {
  uploadedPhotos?: string[];
  recommendations?: RoomAnalysisResponse | null;
}

const ROOM_PLANNER_STORAGE_KEY = 'modly-room-planner-state';
const CUSTOMIZER_SUGGESTION_LIMIT = 3;
const SHORT_REASON_MAX_LENGTH = 120;

type DimensionKey = 'width' | 'length' | 'height';
type DimensionOption = { min?: number; max?: number; default?: number; unit?: string; pricePerExtraUnit?: number };
type DisplayOption = { name: string; price?: number };
type CompactAiRecommendation = { type?: string; suggestion?: string; reason?: string };
type CustomizerAiSuggestions = {
  fitScore?: number;
  fitReason?: string;
  roomStyle?: string;
  dominantColors?: string[];
  recommendations?: CompactAiRecommendation[];
  warning?: string;
};

const isDemoProduct = (product?: Product) => Boolean(product && !product.source);

const normalizeOptionNames = (value: unknown): string[] => {
  const entries = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/[|,]/)
      : [];

  return Array.from(
    new Set(entries.map((entry) => String(entry ?? '').trim()).filter(Boolean))
  );
};

const normalizeDisplayOptions = (value: unknown): DisplayOption[] =>
  normalizeCustomizationOptionValues(value).map((option) => ({
    name: getOptionName(option),
    price: getOptionPrice(option),
  }));

const formatModifierLabel = (price: number | undefined, includedLabel = 'Included') => {
  if (typeof price !== 'number') return null;
  if (price <= 0) return includedLabel;
  return `+$${price.toLocaleString()}`;
};

const getShortReason = (reason?: string) => {
  const normalized = (reason || 'Recommended by Room Planner.').replace(/\s+/g, ' ').trim();
  const firstSentence = normalized.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || normalized;

  return firstSentence.length > SHORT_REASON_MAX_LENGTH
    ? `${firstSentence.slice(0, SHORT_REASON_MAX_LENGTH - 3).trim()}...`
    : firstSentence;
};

const hasDimensionRange = (dimension?: DimensionOption) =>
  dimension?.min !== undefined || dimension?.max !== undefined;

const readFlatDimension = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return undefined;
};

const toDimensionRange = (
  dimension: DimensionOption | undefined,
  fallbackDefault: number,
  fallbackRange?: [number, number],
  allowFallback = false
): (DimensionOption & { min: number; max: number; default: number; unit: string }) | null => {
  const min = dimension?.min ?? (allowFallback ? fallbackRange?.[0] : undefined);
  const max = dimension?.max ?? (allowFallback ? fallbackRange?.[1] : undefined);
  const defaultValue = dimension?.default ?? (allowFallback ? fallbackDefault : undefined);

  if (min === undefined && max === undefined && defaultValue === undefined) return null;

  const resolvedDefault = defaultValue ?? min ?? max ?? fallbackDefault;
  return {
    min: min ?? resolvedDefault,
    max: max ?? resolvedDefault,
    default: resolvedDefault,
    unit: dimension?.unit ?? 'in',
  };
};

const getProductCustomization = (product?: Product) => {
  if (!product) {
    return {
      colors: [] as Product['colors'],
      materials: [] as Product['customizer']['materialOptions'],
      dimensions: {} as Record<DimensionKey, ReturnType<typeof toDimensionRange>>,
      dimensionSummary: {} as Partial<Record<DimensionKey, { value: number; unit: string }>>,
      addOns: [] as Array<{ name: string; price?: number }>,
      optionLabels: [] as Array<{ name: string; values: DisplayOption[] }>,
      hasOptions: false,
    };
  }

  const explicit = product.customizationOptions;
  const allowDemoFallback = isDemoProduct(product);
  const explicitColorOptions = normalizeDisplayOptions(explicit?.colors);
  const explicitMaterialOptions = normalizeDisplayOptions(explicit?.materials);
  const explicitColorNames = explicitColorOptions.map((option) => option.name);
  const explicitMaterialNames = explicitMaterialOptions.map((option) => option.name);
  const productColorNames = product.colors
    .map((color) => color.name)
    .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
  const productMaterialNames = product.materials
    .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
  const colorNames = explicitColorNames.length > 0 ? explicitColorNames : productColorNames;
  const materialNames = explicitMaterialNames.length > 0 ? explicitMaterialNames : productMaterialNames;
  const colors = colorNames
    .map((name, index) => {
      const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
      const pricedOption = explicitColorOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
      return {
        ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
        price: pricedOption?.price,
      };
    })
    .filter((color) => color.available);
  const materials = materialNames.map((name, index) => {
    const existing = product.customizer.materialOptions.find(
      (option) => option.name.toLowerCase() === name.toLowerCase()
    );
    const pricedOption = explicitMaterialOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
    return existing
      ? { ...existing, priceDelta: explicitMaterialOptions.length > 0 ? pricedOption?.price : existing.priceDelta }
      : {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
      name,
      priceDelta: pricedOption?.price ?? 0,
      description: getMaterialDescription(name),
    };
  });
  const dimensions = {
    width: toDimensionRange(
      hasDimensionRange(explicit?.dimensions?.width) ? explicit?.dimensions?.width : undefined,
      product.customizer.defaultWidthIn,
      product.customizer.widthRangeIn,
      allowDemoFallback
    ),
    length: toDimensionRange(
      hasDimensionRange(explicit?.dimensions?.length) ? explicit?.dimensions?.length : undefined,
      product.customizer.defaultDepthIn,
      product.customizer.depthRangeIn,
      allowDemoFallback
    ),
    height: toDimensionRange(
      hasDimensionRange(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined,
      product.dimensions.height,
      undefined,
      false
    ),
  };
  const dimensionSummary = {
    width: !dimensions.width && readFlatDimension(product.width)
      ? { value: readFlatDimension(product.width)!, unit: 'in' }
      : undefined,
    length: !dimensions.length && readFlatDimension(product.length)
      ? { value: readFlatDimension(product.length)!, unit: 'in' }
      : undefined,
    height: !dimensions.height && readFlatDimension(product.height)
      ? { value: readFlatDimension(product.height)!, unit: 'in' }
      : undefined,
  };
  const addOns =
    explicit?.addOns ??
    (allowDemoFallback
      ? [
          { name: 'Throw Pillows (2)', price: 60 },
          { name: 'Ottoman', price: 350 },
        ]
      : []);
  const optionLabels = (explicit?.shopifyOptions ?? explicit?.optionLabels ?? []).map((option) => ({
    name: option.name,
    values: normalizeDisplayOptions(option.values),
  }));

  return {
    colors,
    materials,
    dimensions,
    dimensionSummary,
    addOns,
    optionLabels,
    hasOptions:
      colors.length > 0 ||
      materials.length > 0 ||
      Boolean(dimensions.width || dimensions.length || dimensions.height) ||
      Boolean(dimensionSummary.width || dimensionSummary.length || dimensionSummary.height) ||
      addOns.length > 0 ||
      optionLabels.length > 0,
  };
};

export default function FurnitureCustomizerPanel({
  products,
  draft,
  setDraft,
  isApplying,
  validationErrors,
  price,
  onApply,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSaveConfig,
  onShareLink,
  onExportPdf,
  onViewFullRoomAnalysis,
}: FurnitureCustomizerPanelProps) {
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === draft.productId) ?? products[0],
    [draft.productId, products]
  );

  const customization = useMemo(
    () => getProductCustomization(selectedProduct),
    [selectedProduct]
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || !selectedProduct) {
      return;
    }

    console.debug('[Modly customizer] selected product customization fields', {
      name: selectedProduct.name,
      colors: selectedProduct.colors,
      materials: selectedProduct.materials,
      length: selectedProduct.length,
      width: selectedProduct.width,
      height: selectedProduct.height,
      customization,
    });
  }, [customization, selectedProduct]);

  const materialOptions = customization.materials;
  const colorSwatches = customization.colors;

  const baseDimensions = {
    width: customization.dimensions.width?.default ?? selectedProduct?.customizer.defaultWidthIn ?? 36,
    length: customization.dimensions.length?.default ?? selectedProduct?.customizer.defaultDepthIn ?? 60,
    height: customization.dimensions.height?.default ?? selectedProduct?.dimensions.height ?? 30,
  };
  const widthMin = customization.dimensions.width?.min ?? baseDimensions.width;
  const widthMax = customization.dimensions.width?.max ?? baseDimensions.width;
  const lengthMin = customization.dimensions.length?.min ?? baseDimensions.length;
  const lengthMax = customization.dimensions.length?.max ?? baseDimensions.length;
  const heightMin = customization.dimensions.height?.min ?? baseDimensions.height;
  const heightMax = customization.dimensions.height?.max ?? baseDimensions.height;
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [roomPlannerPhoto, setRoomPlannerPhoto] = useState<string | null>(null);
  const [roomPlannerRecommendations, setRoomPlannerRecommendations] =
    useState<RoomAnalysisResponse | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<CustomizerAiSuggestions | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const roomPlannerSuggestions = useMemo(() => {
    if (!roomPlannerRecommendations) return null;

    const topRecommendation = roomPlannerRecommendations.recommendations?.[0];

    return {
      fitScore: topRecommendation?.matchScore ?? 0,
      fitReason:
        topRecommendation?.reasoning ||
        roomPlannerRecommendations.roomAnalysis?.freeSpace?.description ||
        'Room Planner analysis is ready for this space.',
      roomStyle: roomPlannerRecommendations.roomAnalysis?.detectedStyle || 'Unknown',
      dominantColors: roomPlannerRecommendations.roomAnalysis?.dominantColors || [],
      recommendations: roomPlannerRecommendations.recommendations?.map((rec) => ({
        type: rec.item.category || 'recommendation',
        suggestion: rec.item.name,
        reason: rec.reasoning || rec.placement?.reasoning || 'Recommended by Room Planner.',
      })) || [],
      warning: roomPlannerPhoto
        ? undefined
        : 'Room Planner analysis was found, but the uploaded photo is not available.',
    };
  }, [roomPlannerPhoto, roomPlannerRecommendations]);

  useEffect(() => {
    const loadRoomPlannerState = () => {
      if (typeof window === 'undefined') return;

      try {
        const saved = sessionStorage.getItem(ROOM_PLANNER_STORAGE_KEY);
        if (!saved) {
          setRoomPlannerPhoto(null);
          setRoomPlannerRecommendations(null);
          return;
        }

        const state = JSON.parse(saved) as PersistedRoomPlannerState;
        setRoomPlannerPhoto(state.uploadedPhotos?.[0] || null);
        setRoomPlannerRecommendations(state.recommendations || null);
      } catch (error) {
        console.warn('Failed to load Room Planner state for customizer:', error);
      }
    };

    loadRoomPlannerState();
    window.addEventListener('focus', loadRoomPlannerState);

    return () => {
      window.removeEventListener('focus', loadRoomPlannerState);
    };
  }, []);

  useEffect(() => {
    setAiSuggestions(roomPlannerSuggestions);
  }, [roomPlannerSuggestions]);

  const getRoomPlannerImagePayload = () => {
    if (!roomPlannerPhoto) return null;

    const match = roomPlannerPhoto.match(/^data:(.*?);base64,(.*)$/);
    if (!match) return null;

    return {
      imageType: match[1] || 'image/jpeg',
      imageBase64: match[2] || '',
    };
  };

  const analyzeRoom = async (base64: string, imageType: string) => {
    setAnalyzing(true);
    setAiSuggestions(null);
    try {
      const res = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          imageType,
          productName: selectedProduct?.name || 'furniture piece',
          productCategory: selectedProduct?.category || 'furniture',
          colors: selectedProduct?.colors?.map((c: any) => c.name) || [],
          materials: selectedProduct?.materials || [],
          additionalDetails: additionalDetails || null,
        })
      });
      const data = await res.json();
      if (data.success) setAiSuggestions(data.suggestions);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAnalyzeWithRoomPlannerPhoto = () => {
    const payload = getRoomPlannerImagePayload();
    if (!payload) return;
    analyzeRoom(payload.imageBase64, payload.imageType);
  };

  const compactSuggestions = useMemo(
    () => (aiSuggestions?.recommendations ?? []).slice(0, CUSTOMIZER_SUGGESTION_LIMIT),
    [aiSuggestions]
  );
  const hasMoreSuggestions =
    (aiSuggestions?.recommendations?.length ?? 0) > CUSTOMIZER_SUGGESTION_LIMIT;

  const handleViewFullRoomAnalysis = () => {
    if (onViewFullRoomAnalysis) {
      onViewFullRoomAnalysis();
      return;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="self-start lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Select Product</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    B2B-ready configs with instant pricing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onUndo}
                    disabled={!canUndo || isApplying}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                  >
                    <Undo2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={onRedo}
                    disabled={!canRedo || isApplying}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                  >
                    <Redo2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <select
                value={draft.productId}
                onChange={(e) => {
                  const nextProduct = products.find((product) => product.id === e.target.value);
                  if (!nextProduct) {
                    return;
                  }

                  setDraft({
                    ...draft,
                    productId: nextProduct.id,
                    fabricColor: getProductCustomization(nextProduct).colors[0]?.hex ?? draft.fabricColor,
                    selectedColor: getProductCustomization(nextProduct).colors[0]?.name,
                    materialId:
                      getProductCustomization(nextProduct).materials[0]?.id ?? draft.materialId,
                    selectedMaterial: getProductCustomization(nextProduct).materials[0]?.name,
                    widthIn:
                      getProductCustomization(nextProduct).dimensions.width?.default ??
                      nextProduct.customizer.defaultWidthIn,
                    depthIn:
                      getProductCustomization(nextProduct).dimensions.length?.default ??
                      nextProduct.customizer.defaultDepthIn,
                    heightIn: getProductCustomization(nextProduct).dimensions.height?.default,
                    selectedAddOns: [],
                  });
                }}
                disabled={isApplying}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 disabled:opacity-60"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="aspect-square bg-purple-50 rounded-lg mb-6 flex flex-col items-center justify-center border border-purple-200 text-center px-4">
                <Layers className="w-12 h-12 text-purple-400 mb-2" />
                <p className="text-sm text-purple-600 font-medium">
                  {selectedProduct?.customizer.thumbnailLabel ?? 'Sectional'}
                </p>
                <p className="text-xs text-gray-500">Instantly updates with your selections</p>
              </div>

              <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Base Price:</span>
                  <span className="font-medium text-gray-900">
                    {price.base > 0 ? `$${price.base.toLocaleString()}` : 'Quote required'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Base Size:</span>
                  <span className="font-medium text-gray-900">
                    {selectedProduct?.dimensions.width}
                    {selectedProduct?.dimensions.unit} W
                  </span>
                </div>
                <div className="text-gray-600">
                  <span className="block mb-1">Materials:</span>
                  <span className="font-medium text-gray-900">
                    {selectedProduct?.materials.join(', ') || 'Custom'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Customizations:</span>
                  <span className="font-medium text-purple-600">
                    +${price.customizations.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-gray-900">
                    {price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={onSaveConfig}
                  disabled={isApplying}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onShareLink}
                  disabled={isApplying}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={onExportPdf}
                  disabled={isApplying}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>
          </div>

          <div className="self-start lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Customization Options
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Color
                </label>
                {colorSwatches.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {colorSwatches.map((color) => {
                      const isSelected = draft.fabricColor.toLowerCase() === color.hex.toLowerCase();
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() =>
                            setDraft({ ...draft, fabricColor: color.hex, selectedColor: color.name })
                          }
                          disabled={isApplying}
                          className={[
                            'flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all',
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300',
                            isApplying ? 'opacity-60 cursor-not-allowed' : '',
                          ].join(' ')}
                          aria-label={`Select color ${color.name}`}
                          title={color.name}
                        >
                          <div
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                          {formatModifierLabel(color.price) && (
                            <span className="text-xs font-semibold text-gray-500">
                              {formatModifierLabel(color.price)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No colors available for this product
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">Material</label>
                {materialOptions.length > 0 ? (
                  <div className="space-y-2">
                  {materialOptions.map((m) => {
                    const isSelected = draft.materialId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setDraft({ ...draft, materialId: m.id, selectedMaterial: m.name })
                        }
                        disabled={isApplying}
                        className={[
                          'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all text-left',
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300',
                          isApplying ? 'opacity-60 cursor-not-allowed' : '',
                        ].join(' ')}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {m.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {m.description || getMaterialDescription(m.name)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {formatModifierLabel(m.priceDelta) && (
                            <span className="text-xs font-semibold text-gray-500">
                              {formatModifierLabel(m.priceDelta)}
                            </span>
                          )}
                          {isSelected && <Check className="w-4 h-4 text-purple-500" />}
                        </div>
                      </button>
                    );
                  })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No materials available for this product
                  </p>
                )}
              </div>

              {(customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-purple-600" />
                  Dimensions
                </label>
                <div className="space-y-4">
                  {customization.dimensions.width && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Width</span>
                      <span className="font-medium text-gray-900">
                        {draft.widthIn} {customization.dimensions.width.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={widthMin}
                      max={widthMax}
                      value={draft.widthIn}
                      onChange={(e) => setDraft({ ...draft, widthIn: Number(e.target.value) })}
                      disabled={isApplying}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{widthMin}{customization.dimensions.width.unit}</span>
                      <span>{widthMax}{customization.dimensions.width.unit}</span>
                    </div>
                    {typeof customization.dimensions.width.pricePerExtraUnit === 'number' && (
                      <p className="mt-1 text-xs text-gray-500">
                        +${customization.dimensions.width.pricePerExtraUnit.toLocaleString()} per extra {customization.dimensions.width.unit}
                      </p>
                    )}
                  </div>
                  )}
                  {customization.dimensions.length && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Length</span>
                      <span className="font-medium text-gray-900">
                        {draft.depthIn} {customization.dimensions.length.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={lengthMin}
                      max={lengthMax}
                      value={draft.depthIn}
                      onChange={(e) => setDraft({ ...draft, depthIn: Number(e.target.value) })}
                      disabled={isApplying}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{lengthMin}{customization.dimensions.length.unit}</span>
                      <span>{lengthMax}{customization.dimensions.length.unit}</span>
                    </div>
                    {typeof customization.dimensions.length.pricePerExtraUnit === 'number' && (
                      <p className="mt-1 text-xs text-gray-500">
                        +${customization.dimensions.length.pricePerExtraUnit.toLocaleString()} per extra {customization.dimensions.length.unit}
                      </p>
                    )}
                  </div>
                  )}
                  {customization.dimensions.height && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium text-gray-900">
                        {draft.heightIn ?? baseDimensions.height} {customization.dimensions.height.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={heightMin}
                      max={heightMax}
                      value={draft.heightIn ?? baseDimensions.height}
                      onChange={(e) => setDraft({ ...draft, heightIn: Number(e.target.value) })}
                      disabled={isApplying}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{heightMin}{customization.dimensions.height.unit}</span>
                      <span>{heightMax}{customization.dimensions.height.unit}</span>
                    </div>
                    {typeof customization.dimensions.height.pricePerExtraUnit === 'number' && (
                      <p className="mt-1 text-xs text-gray-500">
                        +${customization.dimensions.height.pricePerExtraUnit.toLocaleString()} per extra {customization.dimensions.height.unit}
                      </p>
                    )}
                  </div>
                  )}
                </div>
                {validationErrors && validationErrors.length > 0 && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                    <div className="font-semibold mb-1">Adjustments need review</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {validationErrors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              )}

              {!(customization.dimensions.width || customization.dimensions.length || customization.dimensions.height) &&
                (customization.dimensionSummary.width ||
                  customization.dimensionSummary.length ||
                  customization.dimensionSummary.height) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-purple-600" />
                    Dimensions
                  </label>
                  <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                    {customization.dimensionSummary.width && (
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Width</span>
                        <span className="font-medium text-gray-900">
                          {customization.dimensionSummary.width.value} {customization.dimensionSummary.width.unit}
                        </span>
                      </div>
                    )}
                    {customization.dimensionSummary.length && (
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Length</span>
                        <span className="font-medium text-gray-900">
                          {customization.dimensionSummary.length.value} {customization.dimensionSummary.length.unit}
                        </span>
                      </div>
                    )}
                    {customization.dimensionSummary.height && (
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Height</span>
                        <span className="font-medium text-gray-900">
                          {customization.dimensionSummary.height.value} {customization.dimensionSummary.height.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {customization.optionLabels.length > 0 && (
                <div className="mb-6 space-y-3">
                  {customization.optionLabels.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-gray-900 mb-2">{option.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <span
                            key={value.name}
                            className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700"
                          >
                            {value.name}
                            {formatModifierLabel(value.price, '') && (
                              <span className="ml-1 text-xs font-semibold text-gray-500">
                                {formatModifierLabel(value.price, '')}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {customization.addOns.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Add-ons
                </label>
                <div className="space-y-2">
                  {customization.addOns.map((addOn) => {
                    const selectedAddOns = draft.selectedAddOns ?? [];
                    const isChecked = selectedAddOns.includes(addOn.name);
                    return (
                      <label
                        key={addOn.name}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const nextSelectedAddOns = e.target.checked
                              ? [...selectedAddOns, addOn.name]
                              : selectedAddOns.filter((name) => name !== addOn.name);
                            setDraft({ ...draft, selectedAddOns: nextSelectedAddOns });
                          }}
                          disabled={isApplying}
                          className="w-4 h-4 text-purple-600 rounded accent-purple-600"
                        />
                        <span className="flex-1 text-sm text-gray-900">{addOn.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {typeof addOn.price === 'number' ? `+$${addOn.price.toLocaleString()}` : 'Quote'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              )}

              {!customization.hasOptions && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  This product does not have predefined customization options. Tell us what you want and we&apos;ll send it as a quote request.
                </div>
              )}

              <button
                type="button"
                onClick={onApply}
                disabled={isApplying || (validationErrors?.length ?? 0) > 0}
                className="w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                {isApplying ? 'Applying...' : 'Apply Customizations'}
              </button>
            </div>
          </div>

          <div className="self-start lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-6">
              {/* Additional Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Tell Us What You Want
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Describe exactly what you need - AI will tailor suggestions to your specific request
                </p>

                <textarea
                  value={additionalDetails}
                  onChange={(e) => {
                    setAdditionalDetails(e.target.value);
                    setCharCount(e.target.value.length);
                    setDraft({ ...draft, customerRequestText: e.target.value });
                  }}
                  maxLength={500}
                  rows={5}
                  placeholder={`Examples:
- I want something that matches my grey walls
- Need storage space underneath
- Looking for pet-friendly fabric
- Want it to feel cozy but modern
- Must fit through a 32 inch doorway`}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {charCount}/500 characters
                  </span>
                  {additionalDetails && (
                    <button
                      onClick={() => {
                        setAdditionalDetails('');
                        setCharCount(0);
                        setDraft({ ...draft, customerRequestText: '' });
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick chips */}
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Quick adds:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Pet-friendly fabric',
                      'Easy to clean',
                      'Extra storage',
                      'Child-safe',
                      'Matches grey walls',
                      'Cozy and warm feel',
                      'Minimalist style',
                      'Must fit small space',
                    ].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => {
                          const newText = additionalDetails
                            ? `${additionalDetails}, ${chip.toLowerCase()}`
                            : chip;
                          setAdditionalDetails(newText);
                          setCharCount(newText.length);
                          setDraft({ ...draft, customerRequestText: newText });
                        }}
                        className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1 rounded-full transition-colors"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              {roomPlannerPhoto && (
                <button
                  onClick={handleAnalyzeWithRoomPlannerPhoto}
                  disabled={analyzing}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Analyzing your room...
                    </>
                  ) : (
                    '✨ Get AI Suggestions'
                  )}
                </button>
              )}

              {/* AI Results */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 max-h-[380px] overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-3">
                  AI Suggestions
                </h3>

                {/* No room planner photo */}
                {!roomPlannerPhoto && !analyzing && (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-2">🏠</p>
                    <p className="text-sm text-gray-500">
                      Use Room Planner first to upload a room photo and get personalized suggestions
                    </p>
                  </div>
                )}

                {/* Loading */}
                {analyzing && (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    <p className="text-sm text-gray-500">
                      Analyzing your room and requirements...
                    </p>
                  </div>
                )}

                {/* Results */}
                {aiSuggestions && !analyzing && (
                  <div className="space-y-3">

                    {/* Fit Score */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-blue-900">
                          Room Fit Score
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          {aiSuggestions.fitScore}%
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${aiSuggestions.fitScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-blue-700 mt-2">
                        {getShortReason(aiSuggestions.fitReason)}
                      </p>
                    </div>

                    {/* Room Style */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">
                        Room style detected:
                      </span>
                      <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {aiSuggestions.roomStyle}
                      </span>
                    </div>

                    {/* Colors detected */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1.5">Room colors:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {aiSuggestions.dominantColors?.map(
                          (color: string, i: number) => (
                            <span key={i}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {color}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      {compactSuggestions.map(
                        (rec, i) => (
                          <div key={i}
                            className="border border-gray-100 rounded-lg p-2.5">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              rec.type === 'color'
                                ? 'bg-purple-100 text-purple-700'
                                : rec.type === 'material'
                                ? 'bg-green-100 text-green-700'
                                : rec.type === 'customization'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {rec.type}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1.5">
                              {rec.suggestion}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {getShortReason(rec.reason)}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    {hasMoreSuggestions && (
                      <button
                        type="button"
                        onClick={handleViewFullRoomAnalysis}
                        className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        View full room analysis
                      </button>
                    )}

                    {/* Warning */}
                    {aiSuggestions.warning && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
                        <p className="text-xs text-yellow-800">
                          ⚠️ {aiSuggestions.warning}
                        </p>
                      </div>
                    )}

                    {/* Re-analyze button */}
                    {roomPlannerPhoto && (
                      <button
                        onClick={handleAnalyzeWithRoomPlannerPhoto}
                        className="w-full text-sm text-blue-600 hover:underline text-center mt-2"
                      >
                        Re-analyze with updated details
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
