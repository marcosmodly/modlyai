import React, { useState, useMemo, useEffect, useRef } from 'react';
import { WidgetConfig } from '../utils/config';
import { FurnitureItem, CustomizedFurnitureItem, CustomizationConfig, QuoteRequest } from '../types';
import { Product, productFromFurnitureItem } from '../data/products';
import { FurnitureRoomPlannerWidget } from './FurnitureRoomPlannerWidget';
import { FurnitureCustomizerWidget, FurnitureCustomizerHandle } from './FurnitureCustomizerWidget';
import { ConversationInterface } from './ConversationInterface';
import { SubmitFlowModal } from './SubmitFlowModal';
import { AIService } from '../utils/aiService';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { DEFAULT_WIDGET_TITLE, getEnabledActions, getFontFamily, getPrimaryColor, getReadableTextColor, mergeConfig } from '../utils/config';
import { getRealProductUrl } from '../utils/productUrl';
import { trackWidgetEvent } from '../utils/analytics';
import { SpecSheet } from '../utils/specSheetGenerator';

type ViewMode = 'conversation' | 'room-planner' | 'customizer';

interface SampleRoomPhoto {
  id: string;
  label: string;
  src: string;
}

interface FurnitureAIWidgetProps {
  config?: WidgetConfig;
  defaultTab?: 'room-planner' | 'customizer';
  widgetTitle?: string;
  /** Hide the persistent Chat/Room planner/Customize tab strip. View transitions
   * still happen (driven by chat actions), they're just not visitor-clickable. */
  hideNav?: boolean;
  /** Seeds the customizer's selected product so a generic "open_customizer" chat
   * action (no explicit item) lands on this product instead of blank. */
  initialProduct?: FurnitureItem;
  /** Sample room photos offered in the room planner alongside file upload. */
  sampleRooms?: SampleRoomPhoto[];
  /** Suggested prompt chips shown before the visitor sends their first message. */
  suggestedPrompts?: string[];
  /** Called after a quote request submits successfully (from the room planner
   * or customizer's own quote form — the actual live submission paths). */
  onQuoteSubmitted?: (data: { quoteRequest: QuoteRequest; response: any }) => void;
}

export function FurnitureAIWidget({
  config = {},
  defaultTab,
  widgetTitle,
  hideNav,
  initialProduct,
  sampleRooms,
  suggestedPrompts,
  onQuoteSubmitted,
}: FurnitureAIWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  // apiClient/aiService only need rebuilding when something that actually
  // affects API behavior changes - purely cosmetic fields (colors, theme)
  // shouldn't tear down and reconstruct the conversation state, page-context
  // observer, etc. on every render. A host that passes a fresh `config`
  // object literal on every render (e.g. a theme switcher re-rendering its
  // parent) would otherwise reset the chat every time a color changes.
  const serviceConfigKey = JSON.stringify({
    apiBaseUrl: mergedConfig.apiBaseUrl,
    storeId: mergedConfig.storeId,
    widgetId: mergedConfig.widgetId,
    apiKey: mergedConfig.apiKey,
    publicApiKey: mergedConfig.publicApiKey,
    storeDomain: mergedConfig.storeDomain,
    apiEndpoints: mergedConfig.apiEndpoints,
    catalog: mergedConfig.catalog,
    storageKey: mergedConfig.storageKey,
    welcomeMessage: mergedConfig.welcomeMessage,
    access: mergedConfig.access,
  });
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [serviceConfigKey]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  const aiService = useMemo(() => new AIService(apiClient, mergedConfig), [apiClient, serviceConfigKey]);
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
  const primaryTextColor = getReadableTextColor(primaryColor);
  const titleColor = mergedConfig.titleColor || mergedConfig.theme?.titleColor || primaryTextColor;
  const messageTextColor = mergedConfig.messageTextColor || mergedConfig.theme?.messageTextColor;
  const fontFamily = getFontFamily(mergedConfig);
  const displayTitle =
    widgetTitle ||
    config.widgetTitle ||
    config.theme?.buttonText ||
    DEFAULT_WIDGET_TITLE;
  const isAccessActive = mergedConfig.access ? mergedConfig.access.active !== false : true;

  const [viewMode, setViewMode] = useState<ViewMode>(defaultTab || 'conversation');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct ? productFromFurnitureItem(initialProduct) : null
  );
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<FurnitureItem | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitConfig, setSubmitConfig] = useState<{ config: CustomizationConfig; product?: FurnitureItem } | null>(null);

  useEffect(() => {
    // Handle external events for backward compatibility
    const handleCustomizeItem = (event: CustomEvent<FurnitureItem>) => {
      if (!enabledActions.customize) return;
      trackWidgetEvent({
        ...analyticsContext,
        type: 'customize_clicked',
        productId: event.detail.id,
        productName: event.detail.name,
        metadata: {
          source: 'customize_event',
          category: event.detail.category,
        },
      });
      setSelectedProduct(productFromFurnitureItem(event.detail));
      setViewMode('customizer');
    };

    const handleNavigateToRoomPlanner = () => {
      setViewMode('room-planner');
    };

    const handleNavigateToCustomizer = () => {
      if (!enabledActions.customize) return;
      setViewMode('customizer');
    };

    window.addEventListener('modly:customize-item', handleCustomizeItem as EventListener);
    window.addEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
    window.addEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);

    return () => {
      window.removeEventListener('modly:customize-item', handleCustomizeItem as EventListener);
      window.removeEventListener('modly:navigate-to-room-planner', handleNavigateToRoomPlanner);
      window.removeEventListener('modly:navigate-to-customizer', handleNavigateToCustomizer);
    };
  }, [analyticsContext, enabledActions.customize]);

  // Cleanup AI service on unmount
  useEffect(() => {
    return () => {
      aiService.destroy();
    };
  }, [aiService]);

  // Convert FurnitureItem to CustomizedFurnitureItem format
  const convertFurnitureItemToCustomized = (item: FurnitureItem): Omit<CustomizedFurnitureItem, 'id' | 'savedAt'> => {
    const product = productFromFurnitureItem(item);
    return {
      productId: product.id,
      productName: product.name,
      category: product.category || item.category || item.subCategory || 'furniture',
      imageUrl: item.images?.[0] || product.imageUrl || product.image || product.thumbnail,
      source: item.source,
      productUrl: item.productUrl || item.url,
      price: item.priceRange?.min ?? item.price,
      externalId: item.externalId,
      shopifyProductId: item.shopifyProductId,
      storeId: item.storeId,
      name: product.name,
      baseItemType: product.category || item.category || item.subCategory || 'furniture',
      dimensions: {
        length: item.dimensions.length,
        width: item.dimensions.width,
        height: item.dimensions.height,
      },
      colorScheme: {
        primary: item.colors.main,
        secondary: item.colors.accent,
      },
      materials: {
        primary: item.materials.primary,
        secondary: item.materials.secondary,
        legs: item.materials.legs,
        upholstery: item.materials.upholstery,
      },
      aiNotes: `Recommended from AI conversation: ${item.name}`,
    };
  };

  const handleAddToRoomPlanner = (item: FurnitureItem) => {
    try {
      const customizedItem = convertFurnitureItemToCustomized(item);
      storage.saveCustomizedFurniture(customizedItem);
      setSaveNotification(`Added ${item.name} to Room Planner`);
      setTimeout(() => setSaveNotification(null), 3000);
    } catch (error) {
      console.error('Failed to add item to room planner:', error);
    }
  };

  const handleCustomizeItem = (item: FurnitureItem) => {
    if (!enabledActions.customize) return;
    trackWidgetEvent({
      ...analyticsContext,
      type: 'customize_clicked',
      productId: item.id,
      productName: item.name,
      metadata: {
        source: 'chat',
        category: item.category,
      },
    });
    setSelectedProduct(productFromFurnitureItem(item));
    setViewMode('customizer');
  };

  const handleOpenRoomPlanner = () => {
    setViewMode('room-planner');
  };

  const customizerRef = useRef<FurnitureCustomizerHandle>(null);

  // The customizer's own "View in Room Planner" button already saves and
  // highlights the current draft before calling handleOpenRoomPlanner. The
  // persistent nav tab bypasses that button, so it needs to trigger the same
  // save-and-highlight itself when leaving the customizer view directly.
  const handleRoomPlannerTabClick = () => {
    if (viewMode === 'customizer') {
      customizerRef.current?.saveDraftAndHighlight();
    }
    handleOpenRoomPlanner();
  };

  const handleOpenCustomizer = () => {
    if (!enabledActions.customize) return;
    trackWidgetEvent({
      ...analyticsContext,
      type: 'customize_clicked',
      metadata: {
        source: 'navigation',
      },
    });
    setViewMode('customizer');
  };

  const handleShowCatalog = () => {
    // Catalog navigation should not create a follow-up chat request.
  };

  const handleViewInCatalog = (item: FurnitureItem) => {
    const catalogUrl = getRealProductUrl(item, mergedConfig.storeDomain || mergedConfig.storeUrl, mergedConfig.platform, mergedConfig.productUrlTemplate);
    trackWidgetEvent({
      ...analyticsContext,
      type: 'view_in_catalog_clicked',
      productId: item.id,
      productName: item.name,
      metadata: {
        category: item.category,
        productUrl: catalogUrl,
      },
    });
    if (catalogUrl && typeof window !== 'undefined') {
      window.open(catalogUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseCatalogModal = () => {
    setIsCatalogModalOpen(false);
    setSelectedCatalogItem(null);
  };

  const handleCustomizeFromCatalog = () => {
    if (selectedCatalogItem) {
      handleCustomizeItem(selectedCatalogItem);
      handleCloseCatalogModal();
    }
  };

  const handleBackToConversation = () => {
    setViewMode('conversation');
  };


  const handleSubmitConfiguration = (config: CustomizationConfig, product?: FurnitureItem) => {
    setSubmitConfig({ config, product });
    setShowSubmitModal(true);
  };

  const handleSubmitSuccess = (data: {
    type: 'cart' | 'quote';
    id: string;
    specSheet?: SpecSheet;
    customer?: { name: string; email: string; phone?: string; notes?: string };
  }) => {
    setShowSubmitModal(false);
    setSaveNotification(
      data.type === 'cart'
        ? `Added to cart! (ID: ${data.id})`
        : `Quote request submitted! (ID: ${data.id})`
    );
    setTimeout(() => setSaveNotification(null), 5000);
    setSubmitConfig(null);
  };

  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
    setSubmitConfig(null);
  };

  return (
    <div
      className="furniture-widget-ai h-full flex flex-col"
      style={{ ['--modly-panel-accent' as any]: primaryColor, ...(fontFamily ? { fontFamily } : {}) }}
    >
      {/* Header */}
      <div
        className="modly-widget-header border-b border-transparent px-5 py-3.5 pr-16 flex items-center gap-4"
        style={{ backgroundColor: primaryColor }}
      >
        <h1 className="modly-widget-title text-base font-semibold shrink-0" style={{ color: titleColor }}>
          {displayTitle === DEFAULT_WIDGET_TITLE ? (
            <>
              <span>Modly</span>
              <span>AI</span>
            </>
          ) : (
            <span>{displayTitle}</span>
          )}
        </h1>

        {/* Persistent pill tab switcher, visible in every mode */}
        {!hideNav && (
          <div
            className="modly-widget-tabs flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full p-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'conversation'}
              onClick={handleBackToConversation}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={
                viewMode === 'conversation'
                  ? { backgroundColor: 'rgba(255,255,255,0.92)', color: primaryColor }
                  : { color: titleColor, opacity: 0.85 }
              }
            >
              AI Chat
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'room-planner'}
              onClick={handleRoomPlannerTabClick}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={
                viewMode === 'room-planner'
                  ? { backgroundColor: 'rgba(255,255,255,0.92)', color: primaryColor }
                  : { color: titleColor, opacity: 0.85 }
              }
            >
              Room Planner
            </button>
            {enabledActions.customize && (
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'customizer'}
                onClick={handleOpenCustomizer}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
                style={
                  viewMode === 'customizer'
                    ? { backgroundColor: 'rgba(255,255,255,0.92)', color: primaryColor }
                    : { color: titleColor, opacity: 0.85 }
                }
              >
                Customizer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {!isAccessActive ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 px-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">This assistant is temporarily unavailable</h2>
            <p className="max-w-sm text-sm text-gray-600">
              This store's ModlyAI plan has ended. Please check back soon, or contact the store directly for help.
            </p>
          </div>
        ) : (
        <>
        {viewMode === 'conversation' && (
          <div key="conversation" className="modly-panel-fade h-full flex flex-col">
            {saveNotification && (
              <div className="bg-green-500 text-white px-4 py-2 text-sm text-center flex-shrink-0">
                {saveNotification}
              </div>
            )}
            <div className="flex-1 min-h-0">
              <ConversationInterface
                aiService={aiService}
                onCustomizeItem={handleCustomizeItem}
                onAddToRoomPlanner={handleAddToRoomPlanner}
                onOpenRoomPlanner={handleOpenRoomPlanner}
                onOpenCustomizer={handleOpenCustomizer}
                onShowCatalog={handleShowCatalog}
                onViewInCatalog={handleViewInCatalog}
                enabledActions={enabledActions}
                primaryColor={primaryColor}
                messageTextColor={messageTextColor}
                analyticsContext={analyticsContext}
                storeDomain={mergedConfig.storeDomain || mergedConfig.storeUrl}
                platform={mergedConfig.platform}
                productUrlTemplate={mergedConfig.productUrlTemplate}
                suggestedPrompts={suggestedPrompts}
              />
            </div>
          </div>
        )}
        {viewMode === 'room-planner' && (
          <div key="room-planner" className="modly-panel-fade h-full overflow-y-auto">
            <FurnitureRoomPlannerWidget
              config={mergedConfig}
              onCustomizeItem={enabledActions.customize ? handleCustomizeItem : undefined}
              onNavigateToCustomizer={enabledActions.customize ? handleOpenCustomizer : undefined}
              sampleRooms={sampleRooms}
              onQuoteSubmitted={onQuoteSubmitted}
            />
          </div>
        )}
        {viewMode === 'customizer' && (
          <div key="customizer" className="modly-panel-fade h-full overflow-y-auto">
            {enabledActions.customize && (
              <FurnitureCustomizerWidget
                ref={customizerRef}
                config={mergedConfig}
                onNavigateToRoomPlanner={handleOpenRoomPlanner}
                selectedProduct={selectedProduct}
                onSelectedProductChange={setSelectedProduct}
                onQuoteSubmitted={onQuoteSubmitted}
              />
            )}
          </div>
        )}
        </>
        )}
      </div>

      {/* Submit Flow Modal */}
      {showSubmitModal && submitConfig && (
        <SubmitFlowModal
          config={submitConfig.config}
          product={submitConfig.product}
          apiClient={apiClient}
          onSuccess={handleSubmitSuccess}
          onClose={handleCloseSubmitModal}
        />
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && selectedCatalogItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCatalogItem.name}</h2>
            
            <div className="space-y-3 mb-6">
              {/* Dimensions */}
              {selectedCatalogItem.dimensions && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Dimensions</h3>
                  <p className="text-sm text-gray-600">
                    {selectedCatalogItem.dimensions.length}" L × {selectedCatalogItem.dimensions.width}" W × {selectedCatalogItem.dimensions.height}" H
                  </p>
                </div>
              )}
              
              {/* Materials */}
              {selectedCatalogItem.materials && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Materials</h3>
                  <p className="text-sm text-gray-600">
                    {selectedCatalogItem.materials.primary}
                    {selectedCatalogItem.materials.secondary && `, ${selectedCatalogItem.materials.secondary}`}
                  </p>
                </div>
              )}
              
              {/* Colors */}
              {selectedCatalogItem.colors && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Colors</h3>
                  <p className="text-sm text-gray-600">
                    {selectedCatalogItem.colors.main}
                    {selectedCatalogItem.colors.accent && ` / ${selectedCatalogItem.colors.accent}`}
                  </p>
                </div>
              )}

              {/* Coming Soon Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>Catalog coming soon.</strong> You can customize this item instead.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
            {enabledActions.customize && (
              <button
                type="button"
                onClick={handleCustomizeFromCatalog}
                className="flex-1 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                style={{ backgroundColor: primaryColor, color: primaryTextColor }}
              >
                Customize This
              </button>
            )}
              <button
                type="button"
                onClick={handleCloseCatalogModal}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
