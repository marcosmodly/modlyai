import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Info, Palette } from 'lucide-react';
import { CustomizationConfig, CustomizedFurnitureItem, FurnitureItem, QuoteRequest } from '../types';
import {
  Product,
  productFromFurnitureItem,
  products as sharedProducts,
} from '../data/products';
import { getEnabledActions, getPrimaryColor, mergeConfig, WidgetConfig } from '../utils/config';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { WidgetProvider } from '../utils/WidgetContext';
import FurnitureCustomizerPanel, {
  CustomizerDraft,
  DraftPriceBreakdown,
} from './FurnitureCustomizerPanel';
import { FinalizeQuoteModal } from './FinalizeQuoteModal';
import { QuoteRequestForm } from './QuoteRequestForm';

interface FurnitureCustomizerWidgetProps {
  config?: WidgetConfig;
  onNavigateToRoomPlanner?: () => void;
  selectedProduct?: Product | null;
  onSelectedProductChange?: (product: Product) => void;
}

const createDraftForProduct = (product: Product): CustomizerDraft => ({
  productId: product.id,
  fabricColor: product.colors[0]?.hex ?? '#9CA3AF',
  materialId: product.customizer.materialOptions[0]?.id ?? 'standard_material',
  widthIn: product.customizer.defaultWidthIn,
  depthIn: product.customizer.defaultDepthIn,
  addons: { throwPillows: false, ottoman: false },
  rotationDeg: 0,
  zoom: 1,
  roomContext: { lengthFt: 12.5, widthFt: 15.2 },
});

const getColorName = (product: Product, hex: string): string =>
  product.colors.find((color) => color.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;

const getMaterialOption = (product: Product, materialId: string) =>
  product.customizer.materialOptions.find((option) => option.id === materialId) ??
  product.customizer.materialOptions[0];

const dimensionRange = (base: number): [number, number] => [
  Math.round(base * 0.8),
  Math.round(base * 1.2),
];

export function FurnitureCustomizerWidget({
  config = {},
  onNavigateToRoomPlanner,
  selectedProduct: sharedSelectedProduct,
  onSelectedProductChange,
}: FurnitureCustomizerWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  const enabledActions = useMemo(() => getEnabledActions(mergedConfig), [mergedConfig]);
  const primaryColor = getPrimaryColor(mergedConfig);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const availableProducts = useMemo(() => {
    const baseProducts = catalogProducts.length > 0 ? catalogProducts : sharedProducts;

    if (!sharedSelectedProduct) {
      return baseProducts;
    }

    const existing = baseProducts.find((product) => product.id === sharedSelectedProduct.id);
    return existing ? baseProducts : [sharedSelectedProduct, ...baseProducts];
  }, [catalogProducts, sharedSelectedProduct]);
  const defaultProduct = useMemo(
    () => sharedSelectedProduct ?? availableProducts[0] ?? sharedProducts[0]!,
    [availableProducts, sharedSelectedProduct]
  );

  const [customizedItem, setCustomizedItem] = useState<any>(null);
  const [savedItem, setSavedItem] = useState<CustomizedFurnitureItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<CustomizationConfig | null>(null);
  const [baseProduct, setBaseProduct] = useState<Product>(defaultProduct);
  const [draft, setDraft] = useState<CustomizerDraft>(() => createDraftForProduct(defaultProduct));
  const [history, setHistory] = useState<CustomizerDraft[]>(() => [createDraftForProduct(defaultProduct)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const setDraftWithHistory = useCallback(
    (next: CustomizerDraft) => {
      setDraft(next);
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        const nextHistory = [...sliced, next];
        return nextHistory.length > 60 ? nextHistory.slice(nextHistory.length - 60) : nextHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 59));
    },
    [historyIndex]
  );

  const applySelectedProduct = useCallback(
    (product: Product, clearSessionStorage = false) => {
      const nextDraft = createDraftForProduct(product);
      setBaseProduct(product);
      setDraft(nextDraft);
      setHistory([nextDraft]);
      setHistoryIndex(0);
      setCustomizedItem(null);
      setSavedItem(null);
      setError(null);
      setSaveNotification(null);
      setLastConfig(null);
      onSelectedProductChange?.(product);

      if (clearSessionStorage && typeof window !== 'undefined') {
        sessionStorage.removeItem('modly-customize-item');
      }
    },
    [onSelectedProductChange]
  );

  useEffect(() => {
    let cancelled = false;

    const loadCatalogProducts = async () => {
      try {
        const response = await apiClient.getCatalog();
        if (cancelled) {
          return;
        }

        const nextProducts = Array.isArray(response.items)
          ? response.items.map((item) => productFromFurnitureItem(item as FurnitureItem))
          : [];

        setCatalogProducts(nextProducts.filter(Boolean));
      } catch (catalogError) {
        if (!cancelled) {
          console.warn('Failed to load catalog products for customizer:', catalogError);
          setCatalogProducts([]);
        }
      }
    };

    loadCatalogProducts();

    return () => {
      cancelled = true;
    };
  }, [apiClient]);

  useEffect(() => {
    if (defaultProduct.id !== baseProduct.id) {
      applySelectedProduct(defaultProduct);
    }
  }, [applySelectedProduct, baseProduct.id, defaultProduct]);

  useEffect(() => {
    const loadFromSessionStorage = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const stored = sessionStorage.getItem('modly-customize-item');
      if (!stored) {
        return;
      }

      try {
        const item = JSON.parse(stored) as FurnitureItem;
        const product = productFromFurnitureItem(item);

        if (product.id !== baseProduct.id) {
          applySelectedProduct(product, true);
        } else {
          sessionStorage.removeItem('modly-customize-item');
        }
      } catch (sessionError) {
        console.warn('Failed to parse selected catalog item:', sessionError);
      }
    };

    loadFromSessionStorage();
    window.addEventListener('focus', loadFromSessionStorage);

    return () => {
      window.removeEventListener('focus', loadFromSessionStorage);
    };
  }, [applySelectedProduct, baseProduct.id]);

  const handleUndo = useCallback(() => {
    setHistoryIndex((idx) => {
      const nextIdx = Math.max(0, idx - 1);
      setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
      return nextIdx;
    });
  }, [baseProduct, history]);

  const handleRedo = useCallback(() => {
    setHistoryIndex((idx) => {
      const nextIdx = Math.min(history.length - 1, idx + 1);
      setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
      return nextIdx;
    });
  }, [baseProduct, history]);

  const selectedProduct = useMemo(
    () => availableProducts.find((product) => product.id === draft.productId) ?? baseProduct,
    [availableProducts, baseProduct, draft.productId]
  );

  useEffect(() => {
    if (selectedProduct.id !== baseProduct.id) {
      setBaseProduct(selectedProduct);
      onSelectedProductChange?.(selectedProduct);
    }
  }, [baseProduct.id, onSelectedProductChange, selectedProduct]);

  const validationErrors = useMemo(() => {
    const errs: string[] = [];
    const widthRange = dimensionRange(selectedProduct.customizer.defaultWidthIn);
    const depthRange = dimensionRange(selectedProduct.customizer.defaultDepthIn);

    if (draft.widthIn < widthRange[0] || draft.widthIn > widthRange[1]) {
      errs.push(`Width must be between ${widthRange[0]} and ${widthRange[1]} inches.`);
    }
    if (draft.depthIn < depthRange[0] || draft.depthIn > depthRange[1]) {
      errs.push(`Depth must be between ${depthRange[0]} and ${depthRange[1]} inches.`);
    }
    if (draft.zoom < 0.8 || draft.zoom > 1.4) {
      errs.push('Zoom must be between 0.8x and 1.4x.');
    }
    return errs;
  }, [draft.depthIn, draft.widthIn, draft.zoom, selectedProduct]);

  const price: DraftPriceBreakdown = useMemo(() => {
    const materialUpcharge = getMaterialOption(selectedProduct, draft.materialId)?.priceDelta ?? 0;
    const addonsUpcharge = (draft.addons.throwPillows ? 60 : 0) + (draft.addons.ottoman ? 350 : 0);
    const deltaW = Math.abs(draft.widthIn - selectedProduct.customizer.defaultWidthIn);
    const deltaD = Math.abs(draft.depthIn - selectedProduct.customizer.defaultDepthIn);
    const dimensionUpcharge = Math.round(deltaW * 6 + deltaD * 10);
    const customizations = materialUpcharge + addonsUpcharge + dimensionUpcharge;
    const total = selectedProduct.basePrice + customizations;

    const lineItems = [
      { label: 'Material', amount: materialUpcharge },
      { label: 'Add-ons', amount: addonsUpcharge },
      { label: 'Dimensions', amount: dimensionUpcharge },
    ].filter((lineItem) => lineItem.amount !== 0);

    return {
      base: selectedProduct.basePrice,
      customizations,
      total,
      lineItems,
    };
  }, [draft.addons.ottoman, draft.addons.throwPillows, draft.depthIn, draft.materialId, draft.widthIn, selectedProduct]);

  const configStorageKey = useMemo(
    () => `${mergedConfig.storageKey}:customizer-configs`,
    [mergedConfig.storageKey]
  );

  const saveDraftConfig = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;

      const existingRaw = localStorage.getItem(configStorageKey);
      const existing = existingRaw
        ? (JSON.parse(existingRaw) as Array<{
            id: string;
            savedAt: string;
            productId: string;
            name: string;
            draft: CustomizerDraft;
            price: number;
          }>)
        : [];
      const materialName = getMaterialOption(selectedProduct, draft.materialId)?.name ?? 'Custom';
      const entry = {
        id: `cfg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        savedAt: new Date().toISOString(),
        productId: selectedProduct.id,
        name: `${selectedProduct.name} · ${materialName}`,
        draft,
        price: price.total,
      };

      localStorage.setItem(configStorageKey, JSON.stringify([entry, ...existing].slice(0, 25)));
      setSaveNotification('Configuration saved!');
      setTimeout(() => setSaveNotification(null), 2500);
    } catch (saveError) {
      console.error('Failed to save configuration:', saveError);
      setError('Failed to save configuration.');
    }
  }, [configStorageKey, draft, price.total, selectedProduct]);

  const encodeSharePayload = useCallback((payload: unknown) => {
    const json = JSON.stringify(payload);
    const b64 =
      typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(json))) : '';
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }, []);

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.set(
      'modlyConfig',
      encodeSharePayload({ v: 1, productId: selectedProduct.id, draft, total: price.total })
    );
    return url.toString();
  }, [draft, encodeSharePayload, price.total, selectedProduct.id]);

  const copyShareLink = useCallback(async () => {
    try {
      if (typeof window === 'undefined') return;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareLink);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setSaveNotification('Share link copied to clipboard!');
      setTimeout(() => setSaveNotification(null), 2500);
    } catch (copyError) {
      console.error('Failed to copy share link:', copyError);
      setError('Failed to copy share link.');
    }
  }, [shareLink]);

  const exportAsPdf = useCallback(() => {
    if (typeof window === 'undefined') return;

    const materialName = getMaterialOption(selectedProduct, draft.materialId)?.name ?? draft.materialId;
    const colorName = getColorName(selectedProduct, draft.fabricColor);
    const previewWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');

    if (!previewWindow) {
      setError('Popup blocked. Please allow popups to export PDF.');
      return;
    }

    const html = `
      <html>
        <head>
          <title>Furniture Configuration</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; padding: 24px; color: #111827; }
            .card { border: 1px solid #E5E7EB; border-radius: 16px; padding: 18px; margin-bottom: 14px; }
            h1 { margin: 0 0 8px 0; font-size: 22px; }
            h2 { margin: 0 0 10px 0; font-size: 14px; color: #6B7280; text-transform: uppercase; letter-spacing: .08em; }
            .row { display: flex; justify-content: space-between; gap: 12px; margin: 8px 0; }
            .muted { color: #6B7280; }
            .total { font-size: 18px; font-weight: 800; }
            .swatch { width: 16px; height: 16px; border-radius: 4px; border: 1px solid #E5E7EB; display:inline-block; vertical-align: middle; margin-right: 8px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${selectedProduct.name.replace(/</g, '&lt;')}</h1>
            <div class="muted">Generated: ${new Date().toLocaleString()}</div>
          </div>
          <div class="card">
            <h2>Configuration</h2>
            <div class="row"><div class="muted">Material</div><div>${materialName}</div></div>
            <div class="row"><div class="muted">Color</div><div><span class="swatch" style="background:${draft.fabricColor}"></span>${colorName}</div></div>
            <div class="row"><div class="muted">Width</div><div>${draft.widthIn} in</div></div>
            <div class="row"><div class="muted">Depth</div><div>${draft.depthIn} in</div></div>
            <div class="row"><div class="muted">Base Dimensions</div><div>${selectedProduct.dimensions.length}${selectedProduct.dimensions.unit} L × ${selectedProduct.dimensions.width}${selectedProduct.dimensions.unit} W × ${selectedProduct.dimensions.height}${selectedProduct.dimensions.unit} H</div></div>
            <div class="row"><div class="muted">Add-ons</div><div>${[
              draft.addons.throwPillows ? 'Throw pillows (2)' : '',
              draft.addons.ottoman ? 'Ottoman' : '',
            ]
              .filter(Boolean)
              .join(', ') || 'None'}</div></div>
          </div>
          <div class="card">
            <h2>Pricing</h2>
            <div class="row"><div class="muted">Base</div><div>$${price.base.toLocaleString()}</div></div>
            ${price.lineItems
              .map(
                (lineItem) =>
                  `<div class="row"><div class="muted">${lineItem.label}</div><div>+$${lineItem.amount.toLocaleString()}</div></div>`
              )
              .join('')}
            <div class="row total"><div>Total</div><div>$${price.total.toLocaleString()}</div></div>
          </div>
          <script>
            window.focus();
            setTimeout(() => window.print(), 250);
          </script>
        </body>
      </html>
    `;

    previewWindow.document.open();
    previewWindow.document.write(html);
    previewWindow.document.close();
  }, [draft, price, selectedProduct]);

  const handleNavigateToRoomPlanner = () => {
    if (onNavigateToRoomPlanner) {
      onNavigateToRoomPlanner();
    } else {
      window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
    }
  };

  const buildCustomizationConfig = useCallback((): CustomizationConfig => {
    const currentMaterial = getMaterialOption(selectedProduct, draft.materialId);
    const widthDeltaIn = draft.widthIn - selectedProduct.customizer.defaultWidthIn;
    const depthDeltaIn = draft.depthIn - selectedProduct.customizer.defaultDepthIn;
    const inchToMeters = 0.0254;
    const ornamentDetails: string[] = [];

    if (draft.addons.throwPillows) ornamentDetails.push('Throw Pillows (2)');
    if (draft.addons.ottoman) ornamentDetails.push('Ottoman');

    return {
      baseItemId: selectedProduct.id,
      baseItemType: selectedProduct.customizer.type,
      baseItemName: selectedProduct.name,
      source: selectedProduct.source,
      productUrl: selectedProduct.productUrl,
      price: selectedProduct.basePrice,
      externalId: selectedProduct.externalId,
      shopifyProductId: selectedProduct.shopifyProductId,
      storeId: selectedProduct.storeId,
      colorScheme: {
        primary: draft.fabricColor,
        secondary: selectedProduct.colors[1]?.hex,
      },
      materialOverrides: {
        primary: currentMaterial?.name,
        upholstery: currentMaterial?.name,
        legs: selectedProduct.materials[1],
      },
      ornamentDetails,
      dimensionAdjustments: {
        width: Number((widthDeltaIn * inchToMeters).toFixed(3)),
        length: Number((depthDeltaIn * inchToMeters).toFixed(3)),
      },
      aiNotes: `Configurator snapshot · ${selectedProduct.name} · Total $${price.total.toLocaleString()}`,
    };
  }, [draft.addons.ottoman, draft.addons.throwPillows, draft.depthIn, draft.fabricColor, draft.materialId, draft.widthIn, price.total, selectedProduct]);

  const handleCustomize = useCallback(
    async (customizationConfig: CustomizationConfig) => {
      setIsLoading(true);
      setError(null);
      setSaveNotification(null);
      setLastConfig(customizationConfig);

      const immediatePreview = {
        name: selectedProduct.name,
        colorScheme: customizationConfig.colorScheme,
        materials: {
          primary: customizationConfig.materialOverrides.primary,
          legs: customizationConfig.materialOverrides.legs,
          upholstery: customizationConfig.materialOverrides.upholstery,
        },
        ornamentDetails: customizationConfig.ornamentDetails || [],
        dimensionAdjustments: customizationConfig.dimensionAdjustments,
        aiNotes: 'Processing AI customization...',
      };

      setCustomizedItem(immediatePreview);

      try {
        const data = await apiClient.customizeFurniture(customizationConfig);
        const mergedDimensions = data.dimensions || {
          length: Number(
            (
              selectedProduct.dimensions.length +
              (customizationConfig.dimensionAdjustments?.length ?? 0)
            ).toFixed(3)
          ),
          width: Number(
            (
              selectedProduct.dimensions.width +
              (customizationConfig.dimensionAdjustments?.width ?? 0)
            ).toFixed(3)
          ),
          height: Number(
            (
              selectedProduct.dimensions.height +
              (customizationConfig.dimensionAdjustments?.height ?? 0)
            ).toFixed(3)
          ),
        };
        const mergedData = {
          ...immediatePreview,
          ...data,
          name: selectedProduct.name,
          dimensions: mergedDimensions,
          colorScheme: data.colorScheme || customizationConfig.colorScheme,
          materials: data.materials || {
            primary: customizationConfig.materialOverrides.primary,
            legs: customizationConfig.materialOverrides.legs,
            upholstery: customizationConfig.materialOverrides.upholstery,
          },
          ornamentDetails: data.ornamentDetails || customizationConfig.ornamentDetails,
          dimensionAdjustments:
            data.dimensionAdjustments || customizationConfig.dimensionAdjustments,
        };

        setCustomizedItem(mergedData);

        try {
          const saved = storage.saveCustomizedFurniture({
            productId: selectedProduct.id,
            source: selectedProduct.source,
            productUrl: selectedProduct.productUrl,
            price: selectedProduct.basePrice,
            externalId: selectedProduct.externalId,
            shopifyProductId: selectedProduct.shopifyProductId,
            storeId: selectedProduct.storeId,
            name: selectedProduct.name,
            baseItemType: selectedProduct.category,
            dimensions: mergedData.dimensions,
            colorScheme: {
              primary: getColorName(selectedProduct, draft.fabricColor),
              secondary: selectedProduct.colors[1]?.name,
            },
            materials: mergedData.materials,
            ornamentDetails: mergedData.ornamentDetails,
            aiNotes: mergedData.aiNotes,
            dimensionChanges: mergedData.dimensionAdjustments,
          });

          setSavedItem(saved);
          setSaveNotification('Customized furniture saved automatically!');
          setTimeout(() => setSaveNotification(null), 3000);
        } catch (saveError) {
          console.error('Failed to auto-save:', saveError);
        }
      } catch (customizeError) {
        const errorMessage =
          customizeError instanceof Error ? customizeError.message : 'An error occurred';
        setError(errorMessage);
        mergedConfig.onError?.(
          customizeError instanceof Error ? customizeError : new Error(errorMessage)
        );
      } finally {
        setIsLoading(false);
      }
    },
    [apiClient, draft.fabricColor, mergedConfig, selectedProduct, storage]
  );

  const handleApply = useCallback(() => {
    setError(null);
    if (validationErrors.length > 0) {
      setError(validationErrors[0] ?? 'Please review your customizations.');
      return;
    }
    handleCustomize(buildCustomizationConfig());
  }, [buildCustomizationConfig, handleCustomize, validationErrors]);

  const handleFinalize = () => {
    if (!enabledActions.requestQuote) return;
    if (!savedItem && !customizedItem) {
      setError('Please customize an item first before requesting a quote.');
      return;
    }
    setShowFinalizeModal(true);
  };

  const handleProceedToQuote = () => {
    if (!enabledActions.requestQuote) return;
    setShowFinalizeModal(false);
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    try {
      await apiClient.submitQuoteRequest(quoteRequest);
      setShowQuoteForm(false);
      setQuoteSuccess(true);
      setSaveNotification("Quote request submitted successfully! We'll contact you soon.");

      setTimeout(() => {
        setQuoteSuccess(false);
        setSaveNotification(null);
      }, 5000);
    } catch (quoteError) {
      throw quoteError;
    }
  };

  return (
    <WidgetProvider apiClient={apiClient} storage={storage} config={mergedConfig}>
      <div className="min-h-screen bg-white">
        <section className="py-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Customization</span>
              </div>

              <h1 className="text-5xl font-bold mb-4">Furniture Customizer</h1>
              <p className="text-xl text-purple-100 mb-8">
                Customize furniture colors, materials, and dimensions with AI assistance. See
                changes in real-time and get instant feasibility feedback.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Real-time preview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Factory-approved options</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Instant pricing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {saveNotification && (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3">
              <Check className="w-5 h-5" />
              <span className="font-medium">{saveNotification}</span>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 mt-0.5" />
                <div>{error}</div>
              </div>
            </div>
          )}
        </div>

        <FurnitureCustomizerPanel
          products={availableProducts}
          draft={draft}
          setDraft={setDraftWithHistory}
          isApplying={isLoading}
          validationErrors={validationErrors}
          price={price}
          onApply={handleApply}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          onSaveConfig={saveDraftConfig}
          onShareLink={copyShareLink}
          onExportPdf={exportAsPdf}
        />

        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Love Your Custom Design?</h2>
            <p className="text-gray-600 mb-8">Save your configuration or share it with others</p>

            <div className="flex flex-wrap justify-center gap-4">
              {enabledActions.requestQuote && (
                <button
                  type="button"
                  onClick={handleFinalize}
                  className="px-8 py-4 text-white rounded-lg font-semibold transition shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add to Quote - ${price.total.toLocaleString()}
                </button>
              )}
              <button
                type="button"
                onClick={saveDraftConfig}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Save Configuration
              </button>
              <button
                type="button"
                onClick={copyShareLink}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Share Design
              </button>
              <button
                type="button"
                onClick={exportAsPdf}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Export PDF
              </button>
              <button
                type="button"
                onClick={handleNavigateToRoomPlanner}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                View in Room Planner
              </button>
            </div>
          </div>
        </section>
      </div>

      <FinalizeQuoteModal
        isOpen={enabledActions.requestQuote && showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        onProceed={handleProceedToQuote}
        item={savedItem}
      />

      <QuoteRequestForm
        isOpen={enabledActions.requestQuote && showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        onSubmit={handleQuoteSubmit}
        item={savedItem}
      />

      {quoteSuccess && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-semibold">Quote Request Submitted!</p>
            <p className="text-sm text-white/90">We&apos;ll contact you soon with details.</p>
          </div>
        </div>
      )}
    </WidgetProvider>
  );
}
