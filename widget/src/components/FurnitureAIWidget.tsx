import React, { useState, useMemo, useEffect } from 'react';
import { WidgetConfig } from '../utils/config';
import { FurnitureItem, CustomizedFurnitureItem, CustomizationConfig } from '../types';
import { Product, productFromFurnitureItem } from '../data/products';
import { FurnitureRoomPlannerWidget } from './FurnitureRoomPlannerWidget';
import { FurnitureCustomizerWidget } from './FurnitureCustomizerWidget';
import { ConversationInterface } from './ConversationInterface';
import { SubmitFlowModal } from './SubmitFlowModal';
import { AIService } from '../utils/aiService';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { DEFAULT_WIDGET_TITLE, getEnabledActions, getPrimaryColor, getReadableTextColor, mergeConfig } from '../utils/config';
import { getRealProductUrl } from '../utils/productUrl';
import { trackWidgetEvent } from '../utils/analytics';

type ViewMode = 'conversation' | 'room-planner' | 'customizer';

interface FurnitureAIWidgetProps {
  config?: WidgetConfig;
  defaultTab?: 'room-planner' | 'customizer';
  widgetTitle?: string;
}

export function FurnitureAIWidget({ config = {}, defaultTab, widgetTitle }: FurnitureAIWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  const aiService = useMemo(() => new AIService(apiClient, mergedConfig), [apiClient, mergedConfig]);
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
  const displayTitle =
    widgetTitle ||
    config.widgetTitle ||
    config.theme?.buttonText ||
    DEFAULT_WIDGET_TITLE;
  const isAccessActive = mergedConfig.access ? mergedConfig.access.active !== false : true;

  const [viewMode, setViewMode] = useState<ViewMode>(defaultTab || 'conversation');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    const catalogUrl = getRealProductUrl(item);
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

  const handleSubmitSuccess = (data: { type: 'cart' | 'quote'; id: string }) => {
    setShowSubmitModal(false);
    setSubmitConfig(null);
    setSaveNotification(
      data.type === 'cart' 
        ? `Added to cart! (ID: ${data.id})` 
        : `Quote request submitted! (ID: ${data.id})`
    );
    setTimeout(() => setSaveNotification(null), 5000);
  };

  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
    setSubmitConfig(null);
  };

  return (
    <div className="furniture-widget-ai h-full flex flex-col" style={{ ['--modly-panel-accent' as any]: primaryColor }}>
      {/* Header */}
      <div
        className="border-b border-transparent px-5 py-3.5 pr-16 flex items-center gap-4"
        style={{ backgroundColor: primaryColor }}
      >
        <h1 className="text-base font-semibold shrink-0" style={{ color: titleColor }}>
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
        <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: 'rgba(255,255,255,0.14)' }} role="tablist">
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
            Chat
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'room-planner'}
            onClick={handleOpenRoomPlanner}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
            style={
              viewMode === 'room-planner'
                ? { backgroundColor: 'rgba(255,255,255,0.92)', color: primaryColor }
                : { color: titleColor, opacity: 0.85 }
            }
          >
            Room planner
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
              Customize
            </button>
          )}
        </div>
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
            />
          </div>
        )}
        {viewMode === 'customizer' && (
          <div key="customizer" className="modly-panel-fade h-full overflow-y-auto">
            {enabledActions.customize && (
              <FurnitureCustomizerWidget 
                config={mergedConfig} 
                onNavigateToRoomPlanner={handleOpenRoomPlanner}
                selectedProduct={selectedProduct}
                onSelectedProductChange={setSelectedProduct}
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
