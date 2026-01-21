import React, { useState, useMemo, useEffect } from 'react';
import { CustomizationConfig, CustomizedFurnitureItem, QuoteRequest } from '../types';
import { mergeConfig, WidgetConfig } from '../utils/config';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { WidgetProvider } from '../utils/WidgetContext';
import FurnitureCustomizerPanel from './FurnitureCustomizerPanel';
import { FinalizeQuoteModal } from './FinalizeQuoteModal';
import { QuoteRequestForm } from './QuoteRequestForm';

interface FurnitureCustomizerWidgetProps {
  config?: WidgetConfig;
  onNavigateToRoomPlanner?: () => void;
}

export function FurnitureCustomizerWidget({ config = {}, onNavigateToRoomPlanner }: FurnitureCustomizerWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  
  const [customizedItem, setCustomizedItem] = useState<any>(null);
  const [savedItem, setSavedItem] = useState<CustomizedFurnitureItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<CustomizationConfig | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('fabric');
  const [baseItem, setBaseItem] = useState<{
    id?: string;
    name: string;
    type: string;
    currentConfig?: CustomizationConfig;
  } | null>({
    id: 'custom-1',
    name: 'Customizable Sofa',
    type: 'sofa',
  });
  
  // Finalize & Quote state
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Load item from sessionStorage on mount
  useEffect(() => {
    const loadFromSessionStorage = () => {
      if (typeof window === 'undefined') {
        return false;
      }
      
      const stored = sessionStorage.getItem('modly-customize-item');
      
      if (!stored) {
        return false;
      }

      try {
        const item: any = JSON.parse(stored);
        
        // Check if this is a different item than what we currently have
        if (baseItem && baseItem.id === item.id) {
          return false;
        }
        
        const currentConfig: CustomizationConfig = {
          baseItemId: item.id,
          baseItemType: item.category || item.subCategory || 'furniture',
          baseItemName: item.name,
          colorScheme: {
            primary: item.colors?.main || 'Beige',
            secondary: item.colors?.accent || undefined,
          },
          materialOverrides: {
            primary: item.materials?.primary || undefined,
            legs: item.materials?.legs || undefined,
            upholstery: item.materials?.upholstery || undefined,
          },
        };
        
        const newBaseItem = {
          id: item.id,
          name: item.name,
          type: item.category || item.subCategory || 'furniture',
          currentConfig,
        };
        
        setBaseItem(newBaseItem);
        
        // Clear sessionStorage after reading
        sessionStorage.removeItem('modly-customize-item');
        
        // Reset customization state when loading a new item
        setCustomizedItem(null);
        setError(null);
        setSaveNotification(null);
        setLastConfig(null);
        
        return true;
      } catch (error) {
        console.warn('Failed to parse selected catalog item:', error);
        return false;
      }
    };

    // Load on mount
    loadFromSessionStorage();

    // Set up an interval to check for new items
    const interval = setInterval(() => {
      loadFromSessionStorage();
    }, 500);

    // Also check when the window gains focus
    const handleFocus = () => {
      loadFromSessionStorage();
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [baseItem]);

  const handleNavigateToRoomPlanner = () => {
    if (onNavigateToRoomPlanner) {
      onNavigateToRoomPlanner();
    } else {
      // Fallback: dispatch custom event for parent widget
      window.dispatchEvent(new CustomEvent('modly:navigate-to-room-planner'));
    }
  };

  const handleCustomize = async (config: CustomizationConfig) => {
    setIsLoading(true);
    setError(null);
    setSaveNotification(null);
    setLastConfig(config);

    // Immediately update preview with the config data (single source of truth)
    const immediatePreview = {
      name: `Custom ${config.baseItemName || config.baseItemType || 'Furniture'}`,
      colorScheme: config.colorScheme,
      materials: {
        primary: config.materialOverrides.primary,
        legs: config.materialOverrides.legs,
        upholstery: config.materialOverrides.upholstery,
      },
      ornamentDetails: config.ornamentDetails || [],
      dimensionAdjustments: config.dimensionAdjustments,
      aiNotes: 'Processing AI customization...',
    };
    
    console.log('Applied customization updated', { nextCustomization: immediatePreview });
    setCustomizedItem(immediatePreview);

    try {
      const data = await apiClient.customizeFurniture(config);
      console.log('AI response', { aiResult: data });
      
      // Merge API response with the config to ensure all fields are included
      const mergedData = {
        ...immediatePreview,
        ...data,
        colorScheme: data.colorScheme || config.colorScheme,
        materials: data.materials || {
          primary: config.materialOverrides.primary,
          legs: config.materialOverrides.legs,
          upholstery: config.materialOverrides.upholstery,
        },
        ornamentDetails: data.ornamentDetails || config.ornamentDetails,
        dimensionAdjustments: data.dimensionAdjustments || config.dimensionAdjustments,
      };
      
      setCustomizedItem(mergedData);

      try {
        const saved = storage.saveCustomizedFurniture({
          name: mergedData.name || `Custom ${config.baseItemName || config.baseItemType || 'Furniture'}`,
          baseItemType: config.baseItemType || 'furniture',
          dimensions: mergedData.dimensions,
          colorScheme: mergedData.colorScheme,
          materials: mergedData.materials,
          ornamentDetails: mergedData.ornamentDetails,
          aiNotes: mergedData.aiNotes,
          dimensionChanges: mergedData.dimensionChanges,
        });
        setSavedItem(saved);
        setSaveNotification('Customized furniture saved automatically!');
        setTimeout(() => setSaveNotification(null), 3000);
      } catch (saveErr) {
        console.error('Failed to auto-save:', saveErr);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    if (!savedItem && !customizedItem) {
      setError('Please customize an item first before requesting a quote.');
      return;
    }
    setShowFinalizeModal(true);
  };

  const handleProceedToQuote = () => {
    setShowFinalizeModal(false);
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    try {
      // Send quote request to API using apiClient
      await apiClient.submitQuoteRequest(quoteRequest);

      // Show success
      setShowQuoteForm(false);
      setQuoteSuccess(true);
      setSaveNotification('Quote request submitted successfully! We\'ll contact you soon.');
      
      setTimeout(() => {
        setQuoteSuccess(false);
        setSaveNotification(null);
      }, 5000);
    } catch (err) {
      throw err; // Let the form handle the error display
    }
  };

  return (
    <WidgetProvider apiClient={apiClient} storage={storage} config={mergedConfig}>
      <div className="furniture-widget-customizer min-h-screen bg-earth-background py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-4">
              Furniture Customizer
            </h1>
            <p className="text-lg md:text-xl text-text-primary max-w-2xl mx-auto">
              Use AI to customize furniture designs. Change colors, materials, add ornaments, 
              and adjust dimensions to match your vision.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border">
              <FurnitureCustomizerPanel
                key={baseItem?.id || baseItem?.name || 'empty'}
                baseItem={baseItem ?? undefined}
                onCustomize={handleCustomize}
                isLoading={isLoading}
              />
            </div>

            <div className="bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border">
              <h2 className="text-2xl font-semibold text-text-heading mb-6">
                Customization Preview
              </h2>

              {saveNotification && (
                <div className="mb-4 bg-earth-sage/20 border border-earth-sage/50 text-text-primary p-4 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{saveNotification}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-4">
                  <p>{error}</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12 text-text-primary">
                  <p className="text-lg">Processing your customization...</p>
                </div>
              )}

              {customizedItem && !isLoading && (
                <div className="space-y-4">
                  <div className="bg-earth-input p-6 rounded-xl border border-earth-border">
                    <h3 className="text-xl font-semibold text-text-heading mb-4">
                      {customizedItem.name || `Custom ${lastConfig?.baseItemName || lastConfig?.baseItemType || 'Furniture'}`}
                    </h3>

                    {customizedItem.dimensions && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-text-primary mb-2">
                          Updated Dimensions:
                        </h4>
                        <div className="text-sm text-text-primary space-y-1">
                          <div>
                            Length: <strong className="text-text-heading">{customizedItem.dimensions.length}m</strong>
                          </div>
                          <div>
                            Width: <strong className="text-text-heading">{customizedItem.dimensions.width}m</strong>
                          </div>
                          <div>
                            Height: <strong className="text-text-heading">{customizedItem.dimensions.height}m</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {customizedItem.colorScheme && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-text-heading mb-2">
                          Color Scheme:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {customizedItem.colorScheme.primary && (
                            <span className="px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm">
                              Primary: {customizedItem.colorScheme.primary}
                            </span>
                          )}
                          {customizedItem.colorScheme.secondary && (
                            <span className="px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm">
                              Secondary: {customizedItem.colorScheme.secondary}
                            </span>
                          )}
                          {customizedItem.colorScheme.accent && (
                            <span className="px-3 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-sm">
                              Accent: {customizedItem.colorScheme.accent}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {customizedItem.materials && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-text-heading mb-2">
                          Materials:
                        </h4>
                        <p className="text-sm text-text-primary">
                          {Object.values(customizedItem.materials).filter(Boolean).join(', ')}
                        </p>
                      </div>
                    )}

                    {customizedItem.ornamentDetails && customizedItem.ornamentDetails.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-text-heading mb-2">
                          Ornaments & Details:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {customizedItem.ornamentDetails.map((detail: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-earth-card border border-earth-border text-text-primary rounded-xl text-xs"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {customizedItem.aiNotes && (
                      <div className="mt-4 pt-4 border-t border-earth-border">
                        <h4 className="text-sm font-semibold text-text-heading mb-2">
                          AI Notes:
                        </h4>
                        <p className="text-sm text-text-primary">{customizedItem.aiNotes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-earth-border space-y-3">
                      <button
                        onClick={handleFinalize}
                        className="w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Finalize & Request Quote</span>
                      </button>
                      
                      <button
                        onClick={handleNavigateToRoomPlanner}
                        className="w-full py-3 px-6 bg-earth-forest text-white rounded-xl font-semibold text-base hover:bg-earth-forest/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span>View in Room Planner</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!customizedItem && !isLoading && (
                <div className="text-center py-12 text-text-muted">
                  <p>Your customization preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Finalize Quote Modal */}
      <FinalizeQuoteModal
        isOpen={showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        onProceed={handleProceedToQuote}
        item={savedItem}
      />

      {/* Quote Request Form */}
      <QuoteRequestForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        onSubmit={handleQuoteSubmit}
        item={savedItem}
      />

      {/* Success State */}
      {quoteSuccess && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-up">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold">Quote Request Submitted!</p>
            <p className="text-sm text-white/90">We'll contact you soon with details.</p>
          </div>
        </div>
      )}
    </WidgetProvider>
  );
}
