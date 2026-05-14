import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Camera,
  Check,
  Flower2,
  Lamp,
  Ruler,
  ShoppingBag,
  Sofa,
  Sparkles,
  Upload,
  Warehouse,
} from 'lucide-react';
import {
  CustomizedFurnitureItem,
  FurnitureItem,
  QuoteRequest,
  Recommendation,
  RoomAnalysisResponse,
  RoomDimensions,
  RoomPreferences,
} from '../types';
import { ApiClient } from '../utils/apiClient';
import { getEnabledActions, getPrimaryColor, mergeConfig, WidgetConfig } from '../utils/config';
import { Storage } from '../utils/storage';
import { WidgetProvider } from '../utils/WidgetContext';
import { trackWidgetEvent } from '../utils/analytics';
import CustomizedFurnitureList from './CustomizedFurnitureList';
import { FinalizeQuoteModal } from './FinalizeQuoteModal';
import { QuoteRequestForm } from './QuoteRequestForm';
import RecommendationsList from './RecommendationsList';

interface FurnitureRoomPlannerWidgetProps {
  config?: WidgetConfig;
  onCustomizeItem?: (item: FurnitureItem) => void;
  onNavigateToCustomizer?: () => void;
}

type UnitSystem = 'meters' | 'feet';

interface PersistedState {
  uploadedPhotos: string[];
  recommendations: RoomAnalysisResponse | null;
  lastDimensions?: RoomDimensions;
  lastPreferences?: RoomPreferences;
}

const STORAGE_KEY = 'modly-room-planner-state';
const FEET_PER_METER = 3.28084;

const styleOptions = [
  { id: 'modern', label: 'Modern', Icon: Sparkles, tone: 'from-slate-50 to-white' },
  { id: 'scandi', label: 'Scandi', Icon: Lamp, tone: 'from-stone-50 to-white' },
  { id: 'industrial', label: 'Industrial', Icon: Warehouse, tone: 'from-zinc-50 to-white' },
  { id: 'boho', label: 'Boho', Icon: Flower2, tone: 'from-amber-50 to-white' },
] as const;

const roomSizePresets = [
  { id: 'small', label: 'Small', dimensions: { length: 3.2, width: 3, height: 2.4 } },
  { id: 'medium', label: 'Medium', dimensions: { length: 4.6, width: 3.8, height: 2.6 } },
  { id: 'large', label: 'Large', dimensions: { length: 6.2, width: 4.8, height: 2.8 } },
] as const;

const trustItems = [
  'Room size and layout',
  'Preferred style',
  'Budget range',
  'Product dimensions',
  'Catalog availability',
];

async function base64ToFile(base64: string, filename: string): Promise<File> {
  const response = await fetch(base64);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

function formatDimensionForUnit(valueMeters: number, unitSystem: UnitSystem): string {
  if (!valueMeters || valueMeters <= 0) return '';
  const value = unitSystem === 'meters' ? valueMeters : valueMeters * FEET_PER_METER;
  return value.toFixed(1).replace(/\.0$/, '');
}

function parseDimensionToMeters(value: string, unitSystem: UnitSystem): number {
  const numericValue = Number(value);
  if (!numericValue || numericValue <= 0) return 0;
  return unitSystem === 'meters' ? numericValue : numericValue / FEET_PER_METER;
}

export function FurnitureRoomPlannerWidget({
  config = {},
  onCustomizeItem,
  onNavigateToCustomizer,
}: FurnitureRoomPlannerWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  const enabledActions = useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
  const analyticsContext = useMemo(
    () => ({
      apiBaseUrl: mergedConfig.apiBaseUrl,
      storeId: mergedConfig.storeId || mergedConfig.widgetId,
      widgetId: mergedConfig.widgetId,
    }),
    [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]
  );
  const primaryColor = getPrimaryColor(mergedConfig);

  const [recommendations, setRecommendations] = useState<RoomAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [resultsScrollRequest, setResultsScrollRequest] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [customizedFurniture, setCustomizedFurniture] = useState<CustomizedFurnitureItem[]>([]);
  const [savedDimensions, setSavedDimensions] = useState<RoomDimensions | undefined>(undefined);
  const [savedPreferences, setSavedPreferences] = useState<RoomPreferences | undefined>(undefined);
  const [roomType, setRoomType] = useState<RoomDimensions['roomType']>('living');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('meters');
  const [lengthValue, setLengthValue] = useState('');
  const [widthValue, setWidthValue] = useState('');
  const [heightValue, setHeightValue] = useState('2.4');
  const [colorInput, setColorInput] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['modern']);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [selectedCustomizedItem, setSelectedCustomizedItem] = useState<CustomizedFurnitureItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const lastScrolledRequestRef = useRef(0);

  useEffect(() => {
    trackWidgetEvent({
      ...analyticsContext,
      type: 'room_planner_opened',
    });
  }, [analyticsContext]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const state: PersistedState = JSON.parse(saved);
          if (state.uploadedPhotos?.length) {
            setUploadedPhotos(state.uploadedPhotos);
          }
          if (state.recommendations) {
            setRecommendations(state.recommendations);
          }
          if (state.lastDimensions) {
            setSavedDimensions(state.lastDimensions);
            setRoomType(state.lastDimensions.roomType);
            setLengthValue(formatDimensionForUnit(state.lastDimensions.length, 'meters'));
            setWidthValue(formatDimensionForUnit(state.lastDimensions.width, 'meters'));
            setHeightValue(formatDimensionForUnit(state.lastDimensions.height, 'meters'));
          }
          if (state.lastPreferences) {
            setSavedPreferences(state.lastPreferences);
            setSelectedStyles(state.lastPreferences.style?.length ? state.lastPreferences.style : ['modern']);
            setColorInput(state.lastPreferences.colors?.join(', ') || '');
            setBudgetMin(state.lastPreferences.budget?.min ? String(state.lastPreferences.budget.min) : '');
            setBudgetMax(state.lastPreferences.budget?.max ? String(state.lastPreferences.budget.max) : '');
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load persisted room planner state:', e);
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const state: PersistedState = {
          uploadedPhotos,
          recommendations,
          lastDimensions: savedDimensions,
          lastPreferences: savedPreferences,
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.warn('Failed to save room planner state:', e);
    }
  }, [uploadedPhotos, recommendations, savedDimensions, savedPreferences]);

  useEffect(() => {
    const items = storage.getCustomizedFurniture();
    setCustomizedFurniture(items);
  }, [storage]);

  useEffect(() => {
    if (
      resultsScrollRequest === 0 ||
      lastScrolledRequestRef.current === resultsScrollRequest ||
      !recommendations ||
      isLoading
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      lastScrolledRequestRef.current = resultsScrollRequest;
    }, 100);

    return () => window.clearTimeout(timer);
  }, [isLoading, recommendations, resultsScrollRequest]);

  const handleItemRemoved = () => {
    const items = storage.getCustomizedFurniture();
    setCustomizedFurniture(items);
  };

  const handleCustomize = (item: FurnitureItem) => {
    if (!onCustomizeItem) {
      trackWidgetEvent({
        ...analyticsContext,
        type: 'customize_clicked',
        productId: item.id,
        productName: item.name,
        metadata: {
          source: 'room_planner',
          category: item.category,
        },
      });
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
    }

    if (onCustomizeItem) {
      onCustomizeItem(item);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('modly:customize-item', { detail: item }));
    }
  };

  const handleNavigateToCustomizer = () => {
    if (onNavigateToCustomizer) {
      onNavigateToCustomizer();
    } else {
      window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
    }
  };

  const handlePhotosChange = async (photos: File[]) => {
    const photoPromises = photos.map(
      (photo) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(photo);
        })
    );

    const base64Photos = await Promise.all(photoPromises);
    setUploadedPhotos(base64Photos);
    setError(null);
    setShareMessage(null);
  };

  const handleUpload = async (
    photos: File[],
    dimensions: RoomDimensions,
    preferences?: RoomPreferences
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.analyzeRoom(photos, dimensions, preferences);
      setRecommendations(data);
      setSavedDimensions(dimensions);
      setSavedPreferences(preferences);
      setResultsScrollRequest((request) => request + 1);
      trackWidgetEvent({
        ...analyticsContext,
        type: 'room_analyzed',
        metadata: {
          roomType: dimensions.roomType,
          budgetMin: preferences?.budget?.min,
          budgetMax: preferences?.budget?.max,
          recommendationCount: data.recommendations?.length ?? 0,
        },
      });
      data.recommendations?.forEach((rec) => {
        trackWidgetEvent({
          ...analyticsContext,
          type: 'product_recommended',
          productId: rec.item.id,
          productName: rec.item.name,
          metadata: {
            category: rec.item.category,
            price: rec.item.priceRange?.min ?? rec.item.price,
            recommendationSource: 'room_planner',
          },
        });
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizeRecommendation = (recommendation: Recommendation) => {
    if (!enabledActions.requestQuote) return;
    setSelectedCustomizedItem(null);
    setSelectedRecommendation(recommendation);
    setShowFinalizeModal(true);
  };

  const handleRequestQuoteForCustomizedItem = (item: CustomizedFurnitureItem) => {
    if (!enabledActions.requestQuote) return;
    trackWidgetEvent({
      ...analyticsContext,
      type: 'quote_started',
      productId: item.productId,
      productName: item.productName || item.name,
      metadata: {
        source: 'room_planner_saved_configuration',
        quoteType: 'customized_furniture',
        estimatedTotal: item.estimatedTotal,
        pricingMode: item.pricingMode,
      },
    });
    setSelectedRecommendation(null);
    setSelectedCustomizedItem(item);
    setShowQuoteForm(true);
  };

  const handleProceedToQuote = () => {
    if (!enabledActions.requestQuote) return;
    const item = selectedCustomizedItem || selectedRecommendation?.item;
    trackWidgetEvent({
      ...analyticsContext,
      type: 'quote_started',
      productId: selectedCustomizedItem?.productId || selectedRecommendation?.item.id,
      productName: selectedCustomizedItem?.productName || item?.name,
      metadata: {
        source: selectedRecommendation ? 'room_planner_recommendation' : 'room_planner_saved_configuration',
        quoteType: selectedRecommendation ? 'room_analysis_recommendation' : 'customized_furniture',
        estimatedTotal:
          selectedCustomizedItem?.estimatedTotal ||
          selectedRecommendation?.item.priceRange?.min ||
          selectedRecommendation?.item.price,
        pricingMode: selectedCustomizedItem?.pricingMode,
      },
    });
    setShowFinalizeModal(false);
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    try {
      const response = await apiClient.submitQuoteRequest(quoteRequest);
      setQuoteSuccess(true);

      setTimeout(() => {
        setQuoteSuccess(false);
      }, 5000);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const handleExportPdf = () => {
    trackWidgetEvent({
      ...analyticsContext,
      type: 'pdf_exported',
      metadata: {
        source: 'room_planner',
        recommendationCount: recommendations?.recommendations?.length ?? 0,
      },
    });
    if (typeof window !== 'undefined') window.print();
  };

  const buildShareText = () => {
    const dimText =
      savedDimensions
        ? `L ${savedDimensions.length.toFixed(1)}m x W ${savedDimensions.width.toFixed(1)}m x H ${savedDimensions.height.toFixed(1)}m`
        : 'Dimensions: (not provided)';
    const items =
      recommendations?.recommendations?.slice(0, 5).map((r) => r.item.name).join(', ') ||
      'No matches yet';
    return `Room Planner results\n${dimText}\nTop matches: ${items}`;
  };

  const handleShare = async () => {
    try {
      const text = buildShareText();
      const nav = navigator as Navigator & {
        share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
      };
      if (typeof nav.share === 'function') {
        await nav.share({ title: 'Room Planner', text });
        setShareMessage('Shared successfully.');
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareMessage('Copied share summary to clipboard.');
    } catch (e) {
      console.warn('Share failed:', e);
      setShareMessage('Could not share automatically. Please copy the details manually.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await handlePhotosChange(Array.from(e.target.files));
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) {
      await handlePhotosChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleUnitToggle = () => {
    const nextUnitSystem: UnitSystem = unitSystem === 'meters' ? 'feet' : 'meters';
    const lengthMeters = parseDimensionToMeters(lengthValue, unitSystem);
    const widthMeters = parseDimensionToMeters(widthValue, unitSystem);
    const heightMeters = parseDimensionToMeters(heightValue, unitSystem);

    setUnitSystem(nextUnitSystem);
    setLengthValue(formatDimensionForUnit(lengthMeters, nextUnitSystem));
    setWidthValue(formatDimensionForUnit(widthMeters, nextUnitSystem));
    setHeightValue(formatDimensionForUnit(heightMeters, nextUnitSystem));
  };

  const applyRoomPreset = (preset: (typeof roomSizePresets)[number]) => {
    setLengthValue(formatDimensionForUnit(preset.dimensions.length, unitSystem));
    setWidthValue(formatDimensionForUnit(preset.dimensions.width, unitSystem));
    setHeightValue(formatDimensionForUnit(preset.dimensions.height, unitSystem));
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((currentStyles) =>
      currentStyles.includes(style)
        ? currentStyles.filter((currentStyle) => currentStyle !== style)
        : [...currentStyles, style]
    );
  };

  const handleAnalyze = async () => {
    setError(null);
    setShareMessage(null);

    if (uploadedPhotos.length === 0) {
      setError('Please upload a room photo first.');
      return;
    }

    const dimensions: RoomDimensions = {
      roomType,
      length: parseDimensionToMeters(lengthValue, unitSystem),
      width: parseDimensionToMeters(widthValue, unitSystem),
      height: parseDimensionToMeters(heightValue, unitSystem),
    };

    if (dimensions.length <= 0 || dimensions.width <= 0 || dimensions.height <= 0) {
      setError('Please provide valid room dimensions.');
      return;
    }

    const preferences: RoomPreferences = {
      style: selectedStyles,
      colors: colorInput
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      budget: {
        min: budgetMin ? Number(budgetMin) : undefined,
        max: budgetMax ? Number(budgetMax) : undefined,
      },
    };

    setSavedDimensions(dimensions);
    setSavedPreferences(preferences);

    const files = await Promise.all(
      uploadedPhotos.map((photo, index) => base64ToFile(photo, `room-photo-${index + 1}.png`))
    );

    await handleUpload(files, dimensions, preferences);
  };

  return (
    <WidgetProvider apiClient={apiClient} storage={storage} config={mergedConfig}>
      <div className="furniture-widget-room-planner min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}</style>

        <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Room Analysis</span>
              </div>

              <h1 className="text-5xl font-bold mb-4">Room Planner</h1>

              <p className="text-xl text-blue-100 mb-8">
                Upload a photo of your room and get catalog-based furniture and customization
                suggestions based on your space and style.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Room photo upload</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Catalog-based product suggestions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Style-aware recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Placement guidance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-xl md:p-6">
              {recommendations && (
                <div className="mb-4 flex justify-end">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Suggested analysis
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-950">Upload a room photo</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        ModlyAI compares your room, style, and budget with products in this store&apos;s catalog.
                      </p>
                    </div>
                    {uploadedPhotos.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setUploadedPhotos([])}
                        className="shrink-0 rounded-full border border-stone-200 px-3 py-1 text-sm font-medium text-gray-500 transition hover:border-stone-300 hover:text-gray-900"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={handleDrop}
                    className="mt-5 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-white px-6 text-center outline-none transition-colors hover:border-blue-500 hover:bg-blue-50/40 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex max-w-sm flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 shadow-inner">
                        <Upload className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {uploadedPhotos.length > 0
                            ? `${uploadedPhotos.length} photo${uploadedPhotos.length > 1 ? 's' : ''} ready`
                            : 'Drag your photo here'}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          JPG or PNG. For best results, use a clear photo with good lighting.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Choose Room Photo
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Use room details and catalog data to improve recommendations.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-gray-950">Room preview</h2>
                    <span className="text-sm text-gray-500">
                      {uploadedPhotos[0] ? 'Photo loaded' : 'Awaiting upload'}
                    </span>
                  </div>
                  <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                    {uploadedPhotos[0] ? (
                      <img
                        src={uploadedPhotos[0]}
                        alt="Uploaded room preview"
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="px-6 text-center text-gray-500">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                          <Camera className="h-7 w-7 text-blue-500" />
                        </div>
                        <p className="text-sm font-semibold text-gray-800">Your uploaded room photo will appear here.</p>
                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          Tip: Take the photo from a corner or doorway to capture more of the room.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Ruler className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">Room Details</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Optional, but improves fit recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value as RoomDimensions['roomType'])}
                        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="living">Living Room</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="dining">Dining Room</option>
                        <option value="office">Office</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <label className="text-sm font-medium text-gray-700">
                          Room Dimensions
                        </label>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                          <span>Meters</span>
                          <button
                            type="button"
                            onClick={handleUnitToggle}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                              unitSystem === 'feet' ? 'bg-blue-600' : 'bg-stone-200'
                            }`}
                            aria-label="Toggle meters or feet"
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span>Feet</span>
                        </div>
                      </div>

                      <div className="mb-3 grid grid-cols-3 gap-2">
                        {roomSizePresets.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyRoomPreset(preset)}
                            className="rounded-full border border-stone-300 bg-stone-50 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Length</label>
                          <input
                            type="number"
                            placeholder={unitSystem === 'meters' ? '4.6' : '15.1'}
                            value={lengthValue}
                            onChange={(e) => setLengthValue(e.target.value)}
                            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Width</label>
                          <input
                            type="number"
                            placeholder={unitSystem === 'meters' ? '3.8' : '12.5'}
                            value={widthValue}
                            onChange={(e) => setWidthValue(e.target.value)}
                            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Ceiling Height</label>
                        <input
                          type="number"
                          placeholder={unitSystem === 'meters' ? '2.6' : '8.5'}
                          value={heightValue}
                          onChange={(e) => setHeightValue(e.target.value)}
                          className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Sofa className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">Preferences</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Guide matches toward the showroom look you want.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Styles
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {styleOptions.map((styleOption) => {
                          const isSelected = selectedStyles.includes(styleOption.id);
                          const StyleIcon = styleOption.Icon;
                          return (
                            <button
                              key={styleOption.id}
                              type="button"
                              onClick={() => toggleStyle(styleOption.id)}
                              className={[
                                `rounded-xl border bg-gradient-to-br ${styleOption.tone} p-3 text-left transition`,
                                isSelected
                                  ? 'border-blue-500 shadow-sm ring-2 ring-blue-100'
                                  : 'border-stone-200 hover:border-stone-300 hover:shadow-sm',
                              ].join(' ')}
                            >
                              <span
                                className={[
                                  'mb-3 flex h-10 w-10 items-center justify-center rounded-lg border',
                                  isSelected
                                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                                    : 'border-stone-200 bg-white text-gray-600',
                                ].join(' ')}
                              >
                                <StyleIcon className="h-5 w-5" />
                              </span>
                              <span
                                className={[
                                  'block text-sm font-semibold',
                                  isSelected ? 'text-blue-950' : 'text-gray-800',
                                ].join(' ')}
                              >
                                {styleOption.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Colors
                      </label>
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        placeholder="e.g., Beige, Forest Green, Terracotta"
                        className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm lg:col-span-4">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">Budget & Actions</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Recommendations stay grounded in your imported catalog.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Min ($)
                        </label>
                        <input
                          type="number"
                          value={budgetMin}
                          onChange={(e) => setBudgetMin(e.target.value)}
                          placeholder="500"
                          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Max ($)
                        </label>
                        <input
                          type="number"
                          value={budgetMax}
                          onChange={(e) => setBudgetMax(e.target.value)}
                          placeholder="2000"
                          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-4 text-sm text-blue-950">
                      <p className="font-semibold">What ModlyAI checks</p>
                      <div className="mt-3 grid gap-2">
                        {trustItems.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-blue-900">
                            <Check className="h-4 w-4 shrink-0 text-blue-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {isLoading ? (
                          <>
                            <span className="h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                            Finding matches...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Find matching catalog products
                          </>
                        )}
                      </button>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={handleExportPdf}
                          className="min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50"
                        >
                          Export PDF
                        </button>
                        <button
                          type="button"
                          onClick={handleShare}
                          className="min-h-11 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-stone-50"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {shareMessage && (
                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  {shareMessage}
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="print-only hidden mt-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900">Room Planner Share Summary</h3>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{buildShareText()}</pre>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
              <CustomizedFurnitureList
                items={customizedFurniture}
                onItemRemoved={handleItemRemoved}
                onNavigateToCustomizer={handleNavigateToCustomizer}
                onRequestQuote={enabledActions.requestQuote ? handleRequestQuoteForCustomizedItem : undefined}
              />
            </div>

            {recommendations && (
              <div
                ref={resultsRef}
                className="mt-8 scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all md:p-8"
              >
                {recommendations.roomAnalysis && (
                  <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50/80 p-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-950">Room analysis</h2>
                        <p className="mt-1 text-sm text-blue-900/70">
                          Use room details and catalog data to improve recommendations.
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        Success
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Observed style cues</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {recommendations.roomAnalysis.detectedStyle}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Color cues</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {recommendations.roomAnalysis.dominantColors.map((color, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-gray-900"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Layout notes</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {recommendations.roomAnalysis.freeSpace.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <RecommendationsList
                  recommendations={recommendations.recommendations}
                  onCustomize={enabledActions.customize ? handleCustomize : undefined}
                  onFinalize={enabledActions.requestQuote ? handleFinalizeRecommendation : undefined}
                  enabledActions={enabledActions}
                  primaryColor={primaryColor}
                  analyticsContext={analyticsContext}
                />

                {enabledActions.requestQuote && recommendations.recommendations && recommendations.recommendations.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-gray-700 mb-4 font-medium">Ready to convert this into a quote?</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {recommendations.recommendations.slice(0, 3).map((rec, idx) => (
                        <button
                          key={rec.item.id || idx}
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleFinalizeRecommendation(rec);
                          }}
                          className="w-full px-4 py-3 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <span className="text-center leading-snug">Request Quote for {rec.item.name}</span>
                          <ArrowRight className="w-5 h-5 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      <FinalizeQuoteModal
        isOpen={enabledActions.requestQuote && showFinalizeModal}
        onClose={() => {
          setShowFinalizeModal(false);
          setSelectedRecommendation(null);
          setSelectedCustomizedItem(null);
        }}
        onProceed={handleProceedToQuote}
        item={selectedCustomizedItem}
        recommendation={selectedRecommendation}
        roomDimensions={savedDimensions}
        roomAnalysis={recommendations?.roomAnalysis}
      />

      <QuoteRequestForm
        isOpen={enabledActions.requestQuote && showQuoteForm}
        onClose={() => {
          setShowQuoteForm(false);
          setSelectedRecommendation(null);
          setSelectedCustomizedItem(null);
        }}
        item={selectedCustomizedItem}
        onSubmit={handleQuoteSubmit}
        recommendation={selectedRecommendation}
        storeId={mergedConfig.storeId}
        widgetId={mergedConfig.widgetId}
        roomDimensions={savedDimensions}
        roomAnalysis={recommendations?.roomAnalysis}
      />

      {quoteSuccess && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50">
          <Sparkles className="w-6 h-6" />
          <div>
            <p className="font-semibold">Quote Request Submitted!</p>
            <p className="text-sm text-white/90">Quote request sent. The store will follow up with pricing and next steps.</p>
          </div>
        </div>
      )}
    </WidgetProvider>
  );
}
