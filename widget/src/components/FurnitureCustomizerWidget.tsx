import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CustomizationConfig,
  CustomizedFurnitureItem,
  FurnitureItem,
  QuoteRequest,
  SelectedShopifyOption,
} from '../types';
import {
  Product,
  getMaterialDescription,
  getOptionName,
  getOptionPrice,
  normalizeCustomizationOptionValues,
  productFromCatalogProduct,
  productFromFurnitureItem,
  products as sharedProducts,
} from '../data/products';
import { getEnabledActions, getPrimaryColor, mergeConfig, WidgetConfig } from '../utils/config';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { WidgetProvider } from '../utils/WidgetContext';
import { trackWidgetEvent } from '../utils/analytics';
import {
  createCustomizationPdfFilename,
  generateCustomizationPdf,
} from '../utils/customizationPdf';
import FurnitureCustomizerPanel, {
  CustomizerDraft,
  DraftPriceBreakdown,
} from './FurnitureCustomizerPanel';
import { ActionToast, ToastState } from './ActionToast';
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
  fabricColor: getCustomizationForProduct(product).colors[0]?.hex ?? '#9CA3AF',
  selectedColor: getCustomizationForProduct(product).colors[0]?.name,
  materialId: getCustomizationForProduct(product).materials[0]?.id ?? 'standard_material',
  selectedMaterial: getCustomizationForProduct(product).materials[0]?.name,
  widthIn: getCustomizationForProduct(product).dimensions.width?.default ?? product.customizer.defaultWidthIn,
  depthIn: getCustomizationForProduct(product).dimensions.length?.default ?? product.customizer.defaultDepthIn,
  heightIn: getCustomizationForProduct(product).dimensions.height?.default,
  addons: { throwPillows: false, ottoman: false },
  selectedAddOns: [],
  rotationDeg: 0,
  zoom: 1,
  roomContext: { lengthFt: 12.5, widthFt: 15.2 },
});

const isDemoProduct = (product: Product) => !product.source;

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

const normalizeDisplayOptions = (value: unknown) =>
  normalizeCustomizationOptionValues(value).map((option) => ({
    name: getOptionName(option),
    price: getOptionPrice(option),
  }));

const hasDimensionRange = (dimension?: { min?: number; max?: number }) =>
  dimension?.min !== undefined || dimension?.max !== undefined;

const getCustomizationForProduct = (product: Product) => {
  const explicit = product.customizationOptions;
  const allowDemoFallback = isDemoProduct(product);
  const pricedColors = normalizeDisplayOptions(explicit?.colors);
  const pricedMaterials = normalizeDisplayOptions(explicit?.materials);
  const colorNames = pricedColors.map((option) => option.name);
  const materialNames = pricedMaterials.map((option) => option.name);
  const productColorNames = product.colors
    .map((color) => color.name)
    .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
  const productMaterialNames = product.materials
    .filter((name) => allowDemoFallback || name.toLowerCase() !== 'custom');
  const colors = (colorNames.length > 0 ? colorNames : productColorNames)
    .map((name, index) => {
      const existing = product.colors.find((color) => color.name.toLowerCase() === name.toLowerCase());
      const pricedColor = pricedColors.find((option) => option.name.toLowerCase() === name.toLowerCase());
      return {
        ...(existing ?? { name, hex: product.colors[index]?.hex ?? '#E5E7EB', available: true }),
        price: pricedColor?.price,
      };
    })
    .filter((color) => color.available);
  const materials = (materialNames.length > 0 ? materialNames : productMaterialNames).map((name, index) => {
    const existing = product.customizer.materialOptions.find(
      (option) => option.name.toLowerCase() === name.toLowerCase()
    );
    const pricedMaterial = pricedMaterials.find((option) => option.name.toLowerCase() === name.toLowerCase());
    return existing
      ? { ...existing, priceDelta: pricedMaterials.length > 0 ? pricedMaterial?.price : existing.priceDelta }
      : {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || `material_${index}`,
      name,
      priceDelta: pricedMaterial?.price ?? 0,
      description: getMaterialDescription(name),
    };
  });
  return {
    colors,
    materials,
    dimensions: {
      width: hasDimensionRange(explicit?.dimensions?.width)
        ? explicit?.dimensions?.width
        : (allowDemoFallback ? { default: product.customizer.defaultWidthIn, unit: 'in' } : undefined),
      length: hasDimensionRange(explicit?.dimensions?.length)
        ? explicit?.dimensions?.length
        : (allowDemoFallback ? { default: product.customizer.defaultDepthIn, unit: 'in' } : undefined),
      height: hasDimensionRange(explicit?.dimensions?.height) ? explicit?.dimensions?.height : undefined,
    },
    addOns:
      explicit?.addOns ??
      (allowDemoFallback
        ? [
            { name: 'Throw Pillows (2)', price: 60 },
            { name: 'Ottoman', price: 350 },
          ]
        : []),
    shopifyOptions: explicit?.shopifyOptions ?? explicit?.optionLabels ?? [],
  };
};

const getColorName = (product: Product, hex: string): string =>
  product.colors.find((color) => color.hex.toLowerCase() === hex.toLowerCase())?.name ?? hex;

const getMaterialOption = (product: Product, materialId: string) =>
  product.customizer.materialOptions.find((option) => option.id === materialId) ??
  product.customizer.materialOptions[0];

const getSelectedColorOption = (product: Product, draft: CustomizerDraft) =>
  getCustomizationForProduct(product).colors.find((color) =>
    draft.selectedColor
      ? color.name.toLowerCase() === draft.selectedColor.toLowerCase()
      : color.hex.toLowerCase() === draft.fabricColor.toLowerCase()
  );

const getProductImageUrl = (product: Product): string | undefined => {
  const candidate =
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.images.front ||
    product.images.thumbnail ||
    product.images.angle ||
    product.images.side;

  return candidate?.trim() || undefined;
};

const getSelectedShopifyOptions = (product: Product): SelectedShopifyOption[] => {
  const customization = getCustomizationForProduct(product);
  const selectedOptions: SelectedShopifyOption[] = [];

  customization.shopifyOptions.forEach((option) => {
    const values = normalizeCustomizationOptionValues(option.values);
    if (values.length !== 1) return;

    const value = values[0]!;
    const price = getOptionPrice(value);
    selectedOptions.push({
      name: option.name,
      value: getOptionName(value),
      ...(price !== undefined ? { price } : {}),
    });
  });

  return selectedOptions;
};

const calculateDimensionAdjustment = (
  selected: number | undefined,
  dimension: { default?: number; pricePerExtraUnit?: number } | undefined
) => {
  if (!dimension || selected === undefined) return { amount: 0, quoteRequired: false };
  if (selected <= (dimension.default ?? selected)) return { amount: 0, quoteRequired: false };
  if (typeof dimension.pricePerExtraUnit !== 'number') return { amount: 0, quoteRequired: true };
  return {
    amount: Number(((selected - (dimension.default ?? selected)) * dimension.pricePerExtraUnit).toFixed(2)),
    quoteRequired: false,
  };
};

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
  const analyticsContext = useMemo(
    () => ({
      apiBaseUrl: mergedConfig.apiBaseUrl,
      storeId: mergedConfig.storeId || mergedConfig.widgetId,
      widgetId: mergedConfig.widgetId,
    }),
    [mergedConfig.apiBaseUrl, mergedConfig.storeId, mergedConfig.widgetId]
  );
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

  const [, setCustomizedItem] = useState<any>(null);
  const [savedItem, setSavedItem] = useState<CustomizedFurnitureItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastIdRef = useRef(0);
  const [lastConfig, setLastConfig] = useState<CustomizationConfig | null>(null);
  const [baseProduct, setBaseProduct] = useState<Product>(defaultProduct);
  const [draft, setDraft] = useState<CustomizerDraft>(() => createDraftForProduct(defaultProduct));
  const [history, setHistory] = useState<CustomizerDraft[]>(() => [createDraftForProduct(defaultProduct)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const dismissToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((type: ToastState['type'], message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    toastIdRef.current += 1;
    setToast({ id: toastIdRef.current, type, message });

    if (type !== 'loading') {
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
        toastTimeoutRef.current = null;
      }, 5500);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const setDraftWithHistory = useCallback(
    (next: CustomizerDraft) => {
      setDraft(next);
      setSavedItem(null);
      setCustomizedItem(null);
      setLastConfig(null);
      dismissToast();
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        const nextHistory = [...sliced, next];
        return nextHistory.length > 60 ? nextHistory.slice(nextHistory.length - 60) : nextHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 59));
    },
    [dismissToast, historyIndex]
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
      dismissToast();
      setLastConfig(null);
      onSelectedProductChange?.(product);

      if (clearSessionStorage && typeof window !== 'undefined') {
        sessionStorage.removeItem('modly-customize-item');
      }
    },
    [dismissToast, onSelectedProductChange]
  );

  useEffect(() => {
    let cancelled = false;

    const loadCatalogProducts = async () => {
      try {
        const response = await apiClient.getCatalog();
        if (cancelled) {
          return;
        }

        const catalogItems = Array.isArray(response.catalog?.products) ? response.catalog.products : [];
        const nextProducts = catalogItems.length > 0
          ? catalogItems.map((product: any, index: number) => productFromCatalogProduct(product, index))
          : Array.isArray(response.items)
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
    setSavedItem(null);
    setCustomizedItem(null);
    setLastConfig(null);
    setHistoryIndex((idx) => {
      const nextIdx = Math.max(0, idx - 1);
      setDraft(history[nextIdx] ?? createDraftForProduct(baseProduct));
      return nextIdx;
    });
  }, [baseProduct, history]);

  const handleRedo = useCallback(() => {
    setSavedItem(null);
    setCustomizedItem(null);
    setLastConfig(null);
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
    const customization = getCustomizationForProduct(selectedProduct);
    const widthRange = [
      customization.dimensions.width?.min ?? selectedProduct.customizer.widthRangeIn[0],
      customization.dimensions.width?.max ?? selectedProduct.customizer.widthRangeIn[1],
    ];
    const depthRange = [
      customization.dimensions.length?.min ?? selectedProduct.customizer.depthRangeIn[0],
      customization.dimensions.length?.max ?? selectedProduct.customizer.depthRangeIn[1],
    ];

    if (customization.dimensions.width && (draft.widthIn < widthRange[0] || draft.widthIn > widthRange[1])) {
      errs.push(`Width must be between ${widthRange[0]} and ${widthRange[1]} inches.`);
    }
    if (customization.dimensions.length && (draft.depthIn < depthRange[0] || draft.depthIn > depthRange[1])) {
      errs.push(`Depth must be between ${depthRange[0]} and ${depthRange[1]} inches.`);
    }
    if (draft.zoom < 0.8 || draft.zoom > 1.4) {
      errs.push('Zoom must be between 0.8x and 1.4x.');
    }
    return errs;
  }, [draft.depthIn, draft.widthIn, draft.zoom, selectedProduct]);

  const price: DraftPriceBreakdown = useMemo(() => {
    const customization = getCustomizationForProduct(selectedProduct);
    const selectedColor = getSelectedColorOption(selectedProduct, draft);
    const selectedMaterial = customization.materials.find((material) =>
      draft.selectedMaterial
        ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
        : material.id === draft.materialId
    );
    const selectedAddOns = draft.selectedAddOns ?? [];
    const selectedAddOnDetails = customization.addOns.filter((addOn) =>
      selectedAddOns.includes(addOn.name)
    );
    const colorPrice = selectedColor?.price;
    const materialPrice = selectedMaterial?.priceDelta;
    const widthAdjustment = calculateDimensionAdjustment(draft.widthIn, customization.dimensions.width);
    const lengthAdjustment = calculateDimensionAdjustment(draft.depthIn, customization.dimensions.length);
    const heightAdjustment = calculateDimensionAdjustment(draft.heightIn, customization.dimensions.height);
    const hasUnpricedAddOn = selectedAddOnDetails.some((addOn) => typeof addOn.price !== 'number');
    const selectedPricedColorIsUnknown =
      selectedColor !== undefined && typeof selectedColor.price !== 'number';
    const selectedPricedMaterialIsUnknown =
      selectedMaterial !== undefined && typeof selectedMaterial.priceDelta !== 'number';
    const addonsUpcharge = selectedAddOnDetails.reduce(
      (sum, addOn) => sum + (typeof addOn.price === 'number' ? addOn.price : 0),
      0
    );
    const dimensionsUpcharge =
      widthAdjustment.amount + lengthAdjustment.amount + heightAdjustment.amount;
    const dimensionAdjustments = {
      width: widthAdjustment.amount,
      length: lengthAdjustment.amount,
      height: heightAdjustment.amount,
      total: dimensionsUpcharge,
    };
    const customizations =
      (typeof colorPrice === 'number' ? colorPrice : 0) +
      (typeof materialPrice === 'number' ? materialPrice : 0) +
      dimensionsUpcharge +
      addonsUpcharge;
    const total = selectedProduct.basePrice + customizations;

    const lineItems = [
      { label: 'Color', amount: typeof colorPrice === 'number' ? colorPrice : 0 },
      { label: 'Material', amount: typeof materialPrice === 'number' ? materialPrice : 0 },
      { label: 'Dimensions', amount: dimensionsUpcharge },
      { label: 'Add-ons', amount: addonsUpcharge },
    ].filter((lineItem) => lineItem.amount !== 0);

    return {
      base: selectedProduct.basePrice,
      customizations,
      total,
      quoteRequired:
        selectedProduct.basePrice <= 0 ||
        selectedPricedColorIsUnknown ||
        selectedPricedMaterialIsUnknown ||
        widthAdjustment.quoteRequired ||
        lengthAdjustment.quoteRequired ||
        heightAdjustment.quoteRequired ||
        hasUnpricedAddOn,
      dimensionAdjustments,
      lineItems,
    };
  }, [
    draft.depthIn,
    draft.fabricColor,
    draft.heightIn,
    draft.materialId,
    draft.selectedAddOns,
    draft.selectedColor,
    draft.selectedMaterial,
    draft.widthIn,
    selectedProduct,
  ]);

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
      trackWidgetEvent({
        ...analyticsContext,
        type: 'configuration_saved',
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        metadata: {
          source: 'customizer',
          category: selectedProduct.category,
          estimatedTotal: price.quoteRequired ? undefined : price.total,
          pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
        },
      });
      showToast('success', 'Configuration saved');
    } catch (saveError) {
      console.error('Failed to save configuration:', saveError);
      showToast('error', "Couldn't save. Try again.");
    }
  }, [analyticsContext, configStorageKey, draft, price, selectedProduct, showToast]);

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
      showToast('success', 'Link copied to clipboard');
    } catch (copyError) {
      console.error('Failed to copy share link:', copyError);
      showToast('error', "Couldn't copy link. Try again.");
    }
  }, [shareLink, showToast]);

  const exportAsPdf = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const customization = getCustomizationForProduct(selectedProduct);
      const selectedColor = getSelectedColorOption(selectedProduct, draft);
      const selectedMaterial = customization.materials.find((material) =>
        draft.selectedMaterial
          ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
          : material.id === draft.materialId
      );
      const selectedColorName =
        draft.selectedColor ??
        (customization.colors.length > 0
          ? getColorName(selectedProduct, draft.fabricColor)
          : undefined);
      const selectedMaterialName =
        draft.selectedMaterial ??
        (customization.materials.length > 0
          ? getMaterialOption(selectedProduct, draft.materialId)?.name
          : undefined);
      const selectedAddOns = customization.addOns.filter((addOn) =>
        (draft.selectedAddOns ?? []).includes(addOn.name)
      );
      const generatedAt = new Date();
      const blob = generateCustomizationPdf({
        brandName: mergedConfig.widgetTitle || mergedConfig.storeName || 'ModlyAI',
        generatedAt,
        referenceId: savedItem?.id,
        storeId: selectedProduct.storeId ?? mergedConfig.storeId,
        widgetId: mergedConfig.widgetId,
        product: {
          name: selectedProduct.name,
          category: selectedProduct.category,
          productUrl: selectedProduct.productUrl,
          imageUrl: getProductImageUrl(selectedProduct),
          basePrice: selectedProduct.basePrice,
          pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
          estimatedTotal: price.quoteRequired ? undefined : price.total,
        },
        selectedCustomizations: {
          color: selectedColorName
            ? { label: 'Color', value: selectedColorName, price: selectedColor?.price }
            : undefined,
          material: selectedMaterialName
            ? { label: 'Material', value: selectedMaterialName, price: selectedMaterial?.priceDelta }
            : undefined,
          shopifyOptions: getSelectedShopifyOptions(selectedProduct).map((option) => ({
            label: option.name,
            value: option.value,
            price: option.price,
          })),
          dimensions: {
            length: draft.depthIn,
            width: draft.widthIn,
            height: draft.heightIn,
            unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
          },
          dimensionPriceAdjustments: price.dimensionAdjustments,
          addOns: selectedAddOns.map((addOn) => ({
            label: 'Add-on',
            value: addOn.name,
            price: addOn.price,
          })),
          customerRequestText: draft.customerRequestText,
        },
        pricing: {
          basePrice: price.base,
          lineItems: price.lineItems.map((lineItem) => ({
            label: lineItem.label === 'Dimensions' ? 'Dimension adjustment' : lineItem.label,
            amount: lineItem.amount,
          })),
          customizationTotal: price.customizations,
          estimatedTotal: price.quoteRequired ? undefined : price.total,
          quoteRequired: price.quoteRequired,
        },
      });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = createCustomizationPdfFilename(selectedProduct.name, generatedAt);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      trackWidgetEvent({
        ...analyticsContext,
        type: 'pdf_exported',
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        metadata: {
          source: 'customizer',
          category: selectedProduct.category,
          estimatedTotal: price.quoteRequired ? undefined : price.total,
          pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
        },
      });
      showToast('success', 'PDF download started');
    } catch (exportError) {
      console.error('Failed to export customization:', exportError);
      showToast('error', "Couldn't export PDF. Try again.");
    }
  }, [analyticsContext, draft, mergedConfig, price, savedItem?.id, selectedProduct, showToast]);

  const handleNavigateToRoomPlanner = () => {
    if (onNavigateToRoomPlanner) {
      onNavigateToRoomPlanner();
    } else {
      window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
    }
  };

  const buildCustomizationConfig = useCallback((): CustomizationConfig => {
    const customization = getCustomizationForProduct(selectedProduct);
    const currentMaterial = customization.materials.length > 0
      ? getMaterialOption(selectedProduct, draft.materialId)
      : undefined;
    const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
    const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
    const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
    const widthDeltaIn = draft.widthIn - baseWidth;
    const depthDeltaIn = draft.depthIn - baseLength;
    const heightDeltaIn = (draft.heightIn ?? baseHeight) - baseHeight;
    const inchToMeters = 0.0254;
    const selectedAddOns = customization.addOns.filter((addOn) =>
      (draft.selectedAddOns ?? []).includes(addOn.name)
    );
    const ornamentDetails = selectedAddOns.map((addOn) => addOn.name);

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
        ...(currentMaterial?.name ? { primary: currentMaterial.name, upholstery: currentMaterial.name } : {}),
        ...(selectedProduct.materials[1] ? { legs: selectedProduct.materials[1] } : {}),
      },
      ornamentDetails,
      dimensionAdjustments: {
        width: Number((widthDeltaIn * inchToMeters).toFixed(3)),
        length: Number((depthDeltaIn * inchToMeters).toFixed(3)),
        height: Number((heightDeltaIn * inchToMeters).toFixed(3)),
      },
      aiNotes: `Configurator snapshot · ${selectedProduct.name} · Total $${price.total.toLocaleString()}`,
    };
  }, [draft.depthIn, draft.fabricColor, draft.heightIn, draft.materialId, draft.selectedAddOns, draft.widthIn, price.total, selectedProduct]);

  const buildCustomizedFurniturePayload = useCallback(
    (
      customizedData?: Partial<CustomizedFurnitureItem> & {
        dimensionAdjustments?: CustomizationConfig['dimensionAdjustments'];
      }
    ): Omit<CustomizedFurnitureItem, 'id' | 'savedAt'> => {
      const customization = getCustomizationForProduct(selectedProduct);
      const selectedColor = getSelectedColorOption(selectedProduct, draft);
      const selectedMaterial = customization.materials.find((material) =>
        draft.selectedMaterial
          ? material.name.toLowerCase() === draft.selectedMaterial.toLowerCase()
          : material.id === draft.materialId
      );
      const selectedAddOns = customization.addOns.filter((addOn) =>
        (draft.selectedAddOns ?? []).includes(addOn.name)
      );
      const selectedColorName =
        draft.selectedColor ??
        (customization.colors.length > 0
          ? getColorName(selectedProduct, draft.fabricColor)
          : undefined);
      const selectedMaterialName =
        draft.selectedMaterial ??
        (customization.materials.length > 0
          ? getMaterialOption(selectedProduct, draft.materialId)?.name
          : undefined);
      const selectedShopifyOptions = getSelectedShopifyOptions(selectedProduct);
      const baseWidth = customization.dimensions.width?.default ?? selectedProduct.customizer.defaultWidthIn;
      const baseLength = customization.dimensions.length?.default ?? selectedProduct.customizer.defaultDepthIn;
      const baseHeight = customization.dimensions.height?.default ?? selectedProduct.dimensions.height;
      const inchToMeters = 0.0254;
      const dimensionAdjustments = customizedData?.dimensionAdjustments ?? {
        width: Number(((draft.widthIn - baseWidth) * inchToMeters).toFixed(3)),
        length: Number(((draft.depthIn - baseLength) * inchToMeters).toFixed(3)),
        height: Number((((draft.heightIn ?? baseHeight) - baseHeight) * inchToMeters).toFixed(3)),
      };
      const dimensions = customizedData?.dimensions ?? {
        length: Number((selectedProduct.dimensions.length + (dimensionAdjustments.length ?? 0)).toFixed(3)),
        width: Number((selectedProduct.dimensions.width + (dimensionAdjustments.width ?? 0)).toFixed(3)),
        height: Number((selectedProduct.dimensions.height + (dimensionAdjustments.height ?? 0)).toFixed(3)),
      };

      return {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        category: selectedProduct.category,
        imageUrl: getProductImageUrl(selectedProduct),
        source: selectedProduct.source,
        productUrl: selectedProduct.productUrl,
        price: selectedProduct.basePrice,
        basePrice: selectedProduct.basePrice,
        externalId: selectedProduct.externalId,
        shopifyProductId: selectedProduct.shopifyProductId,
        storeId: selectedProduct.storeId ?? mergedConfig.storeId,
        widgetId: mergedConfig.widgetId,
        name: selectedProduct.name,
        baseItemType: selectedProduct.category,
        dimensions,
        colorScheme: {
          primary: selectedColorName ?? getColorName(selectedProduct, draft.fabricColor),
          secondary: selectedProduct.colors[1]?.name,
        },
        materials: selectedMaterialName ? { primary: selectedMaterialName } : {},
        ornamentDetails: customizedData?.ornamentDetails ?? selectedAddOns.map((addOn) => addOn.name),
        aiNotes:
          customizedData?.aiNotes ??
          `Configurator snapshot - ${selectedProduct.name} - ${
            price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`
          }`,
        dimensionChanges: dimensionAdjustments,
        selectedColor: selectedColorName
          ? { name: selectedColorName, price: selectedColor?.price }
          : undefined,
        selectedColorPrice: selectedColor?.price,
        selectedMaterial: selectedMaterialName
          ? { name: selectedMaterialName, price: selectedMaterial?.priceDelta }
          : undefined,
        selectedMaterialPrice: selectedMaterial?.priceDelta,
        selectedShopifyOptions,
        selectedDimensions: {
          width: draft.widthIn,
          length: draft.depthIn,
          height: draft.heightIn,
          unit: customization.dimensions.width?.unit ?? customization.dimensions.length?.unit ?? 'in',
        },
        dimensionPriceAdjustments: price.dimensionAdjustments,
        selectedAddOns,
        customerRequestText: draft.customerRequestText,
        customizationPrice: price.customizations,
        estimatedTotal: price.quoteRequired ? undefined : price.total,
        pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
      };
    },
    [draft, mergedConfig.storeId, mergedConfig.widgetId, price, selectedProduct]
  );

  const saveCustomizedFurnitureForCurrentDraft = useCallback(
    (
      customizedData?: Partial<CustomizedFurnitureItem> & {
        dimensionAdjustments?: CustomizationConfig['dimensionAdjustments'];
      }
    ) => {
      const saved = storage.saveCustomizedFurniture(buildCustomizedFurniturePayload(customizedData));
      setSavedItem(saved);
      return saved;
    },
    [buildCustomizedFurniturePayload, storage]
  );

  const handleCustomize = useCallback(
    async (customizationConfig: CustomizationConfig) => {
      if (!selectedProduct?.id) {
        showToast('error', 'Please select a product first.');
        return;
      }

      setIsLoading(true);
      showToast('loading', 'Applying your changes...');
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
          saveCustomizedFurnitureForCurrentDraft(mergedData);
          showToast('success', 'Applied — saved and ready to quote, export, or share');
        } catch (saveError) {
          console.error('Failed to auto-save:', saveError);
        }
      } catch (customizeError) {
        const errorMessage =
          customizeError instanceof Error ? customizeError.message : "Couldn't apply changes. Try again.";
        showToast('error', errorMessage);
        mergedConfig.onError?.(
          customizeError instanceof Error ? customizeError : new Error(errorMessage)
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      apiClient,
      mergedConfig,
      saveCustomizedFurnitureForCurrentDraft,
      selectedProduct,
      showToast,
    ]
  );

  const handleApply = useCallback(() => {
    if (validationErrors.length > 0) {
      return;
    }
    handleCustomize(buildCustomizationConfig());
  }, [buildCustomizationConfig, handleCustomize, validationErrors]);

  const handleFinalize = () => {
    if (!enabledActions.requestQuote) return;

    if (!selectedProduct?.id) {
      showToast('error', 'Please customize an item first before requesting a quote.');
      return;
    }
    if (validationErrors.length > 0) {
      showToast('error', validationErrors[0] ?? 'Please review your customizations.');
      return;
    }

    try {
      if (!savedItem) {
        saveCustomizedFurnitureForCurrentDraft();
      }
      trackWidgetEvent({
        ...analyticsContext,
        type: 'quote_started',
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        metadata: {
          source: 'customizer',
          quoteType: 'customized_furniture',
          estimatedTotal: price.quoteRequired ? undefined : price.total,
          pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
        },
      });
      setShowFinalizeModal(false);
      setShowQuoteForm(true);
    } catch (saveError) {
      console.error('Failed to save customization before quote:', saveError);
      showToast('error', 'Could not prepare your customization for quote. Please try again.');
    }
  };

  const handleProceedToQuote = () => {
    if (!enabledActions.requestQuote) return;
    trackWidgetEvent({
      ...analyticsContext,
      type: 'quote_started',
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      metadata: {
        source: 'customizer',
        quoteType: 'customized_furniture',
        estimatedTotal: price.quoteRequired ? undefined : price.total,
        pricingMode: price.quoteRequired ? 'quote_required' : 'estimated',
      },
    });
    setShowFinalizeModal(false);
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    try {
      const response = await apiClient.submitQuoteRequest(quoteRequest);
      showToast('success', 'Quote sent — the store will follow up soon');
      return response;
    } catch (quoteError) {
      throw quoteError;
    }
  };

  return (
    <WidgetProvider apiClient={apiClient} storage={storage} config={mergedConfig}>
      <div className="furniture-widget-customizer min-h-screen bg-white">
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
          onViewFullRoomAnalysis={handleNavigateToRoomPlanner}
          onSuggestionsError={(message) => showToast('error', message)}
          onRequestQuote={handleFinalize}
          showRequestQuote={enabledActions.requestQuote}
          primaryColor={primaryColor}
        />

        <section className="py-8 bg-stone-50/70 border-t border-stone-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="rounded-2xl border border-stone-200 bg-[#fffaf4] p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-950">Love Your Custom Design?</h2>
                  <p className="mt-1 text-sm text-gray-600">Save, share, export, or send this configuration to the store.</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  Estimated total: {price.quoteRequired ? 'Quote required' : `$${price.total.toLocaleString()}`}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={saveDraftConfig}
                className="min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50"
              >
                Save Configuration
              </button>
              <button
                type="button"
                onClick={copyShareLink}
                className="min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50"
              >
                Share Design
              </button>
              <button
                type="button"
                onClick={exportAsPdf}
                className="min-h-12 rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-stone-50"
              >
                Export PDF
              </button>
              </div>
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

      <ActionToast toast={toast} onDismiss={dismissToast} />
    </WidgetProvider>
  );
}
