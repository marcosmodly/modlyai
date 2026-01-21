import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RoomDimensions, RoomPreferences, RoomAnalysisResponse, CustomizedFurnitureItem, FurnitureItem, QuoteRequest, Recommendation } from '../types';
import { mergeConfig, WidgetConfig } from '../utils/config';
import { ApiClient } from '../utils/apiClient';
import { Storage } from '../utils/storage';
import { WidgetProvider } from '../utils/WidgetContext';
import RoomUploadForm from './RoomUploadForm';
import RecommendationsList from './RecommendationsList';
import RoomPhotoPreview from './RoomPhotoPreview';
import CustomizedFurnitureList from './CustomizedFurnitureList';
import { FinalizeQuoteModal } from './FinalizeQuoteModal';
import { QuoteRequestForm } from './QuoteRequestForm';

interface FurnitureRoomPlannerWidgetProps {
  config?: WidgetConfig;
  onCustomizeItem?: (item: FurnitureItem) => void;
  onNavigateToCustomizer?: () => void;
}

const STORAGE_KEY = 'modly-room-planner-state';

interface PersistedState {
  uploadedPhotos: string[]; // base64 strings
  recommendations: RoomAnalysisResponse | null;
  lastDimensions?: RoomDimensions;
  lastPreferences?: RoomPreferences;
}

// Helper to convert base64 to File (for form submission if needed)
async function base64ToFile(base64: string, filename: string): Promise<File> {
  const response = await fetch(base64);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export function FurnitureRoomPlannerWidget({ config = {}, onCustomizeItem, onNavigateToCustomizer }: FurnitureRoomPlannerWidgetProps) {
  const mergedConfig = useMemo(() => mergeConfig(config), [config]);
  const apiClient = useMemo(() => new ApiClient(mergedConfig), [mergedConfig]);
  const storage = useMemo(() => new Storage(mergedConfig.storageKey), [mergedConfig.storageKey]);
  
  const [recommendations, setRecommendations] = useState<RoomAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [customizedFurniture, setCustomizedFurniture] = useState<CustomizedFurnitureItem[]>([]);
  const [savedDimensions, setSavedDimensions] = useState<RoomDimensions | undefined>(undefined);
  const [savedPreferences, setSavedPreferences] = useState<RoomPreferences | undefined>(undefined);
  const formRef = useRef<HTMLFormElement | null>(null);
  
  // Finalize & Quote state
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  // Load persisted state on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const state: PersistedState = JSON.parse(saved);
          if (state.uploadedPhotos && state.uploadedPhotos.length > 0) {
            setUploadedPhotos(state.uploadedPhotos);
          }
          if (state.recommendations) {
            setRecommendations(state.recommendations);
          }
          if (state.lastDimensions) {
            setSavedDimensions(state.lastDimensions);
          }
          if (state.lastPreferences) {
            setSavedPreferences(state.lastPreferences);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load persisted room planner state:', e);
    }
  }, []);

  // Save state whenever it changes
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
    const loadCustomizedFurniture = () => {
      const items = storage.getCustomizedFurniture();
      setCustomizedFurniture(items);
    };
    loadCustomizedFurniture();
  }, [storage]);

  const handleItemRemoved = () => {
    const items = storage.getCustomizedFurniture();
    setCustomizedFurniture(items);
  };

  const handleCustomize = (item: FurnitureItem) => {
    // Store the item in sessionStorage for the customizer to pick up
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('modly-customize-item', JSON.stringify(item));
    }
    
    // Trigger callback if provided (for parent widget to switch tabs)
    if (onCustomizeItem) {
      onCustomizeItem(item);
    } else {
      // Fallback: dispatch custom event for parent widget
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('modly:customize-item', { detail: item }));
      }
    }
  };

  const handleNavigateToCustomizer = () => {
    console.log('[FurnitureRoomPlannerWidget] handleNavigateToCustomizer called');
    // Trigger callback if provided (for parent widget to switch tabs)
    if (onNavigateToCustomizer) {
      console.log('[FurnitureRoomPlannerWidget] Calling parent onNavigateToCustomizer');
      onNavigateToCustomizer();
    } else {
      console.log('[FurnitureRoomPlannerWidget] Dispatching modly:navigate-to-customizer event');
      // Fallback: dispatch custom event for parent widget
      window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
    }
  };

  const handlePhotosChange = async (photos: File[]) => {
    // Convert files to base64 for persistence
    const photoPromises = photos.map((photo) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(photo);
      });
    });
    
    const base64Photos = await Promise.all(photoPromises);
    setUploadedPhotos(base64Photos);
  };

  const handleDimensionsChange = (dimensions: RoomDimensions) => {
    setSavedDimensions(dimensions);
  };

  const handlePreferencesChange = (preferences: RoomPreferences) => {
    setSavedPreferences(preferences);
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
      // Dimensions and preferences are already saved via handleDimensionsChange and handlePreferencesChange
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      mergedConfig.onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizeRecommendation = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
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
      setSelectedRecommendation(null);
      
      setTimeout(() => {
        setQuoteSuccess(false);
      }, 5000);
    } catch (err) {
      throw err; // Let the form handle the error display
    }
  };

  return (
    <WidgetProvider apiClient={apiClient} storage={storage} config={mergedConfig}>
      <div className="furniture-widget-room-planner min-h-screen bg-[#1A1C19] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0EFEA] mb-4">
              Room Planner
            </h1>
            <p className="text-lg md:text-xl text-[#F0EFEA] max-w-2xl mx-auto">
              Upload photos of your room and provide dimensions. Our AI will recommend 
              the perfect furniture with detailed measurements and placement suggestions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8 items-stretch">
            <div className="flex flex-col">
              <div className="bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-[#3A3F38] h-full flex flex-col">
                <RoomUploadForm 
                  onUpload={handleUpload} 
                  isLoading={isLoading}
                  onPhotosChange={handlePhotosChange}
                  formRef={(form) => { formRef.current = form; }}
                  initialDimensions={savedDimensions}
                  initialPreferences={savedPreferences}
                  onDimensionsChange={handleDimensionsChange}
                  onPreferencesChange={handlePreferencesChange}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <RoomPhotoPreview 
                photoUrl={uploadedPhotos[0]}
                showFurniture={!!recommendations}
              />
            </div>
          </div>

          <div className="mb-12 flex justify-center">
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              disabled={isLoading}
              className="px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Room...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Get AI Recommendations</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          <div className="mb-12 bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border">
            <CustomizedFurnitureList 
              items={customizedFurniture} 
              onItemRemoved={handleItemRemoved}
              onNavigateToCustomizer={handleNavigateToCustomizer}
            />
          </div>

          {recommendations && (
            <div className="bg-earth-card p-6 md:p-8 rounded-xl shadow-soft border border-earth-border">
              {recommendations.roomAnalysis && (
                <div className="mb-8 p-6 bg-earth-background rounded-xl border border-earth-border">
                  <h2 className="text-2xl font-semibold text-text-heading mb-4">
                    Room Analysis
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-muted mb-1">Detected Style:</p>
                      <p className="text-lg font-semibold text-text-primary">
                        {recommendations.roomAnalysis.detectedStyle}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted mb-1">Dominant Colors:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {recommendations.roomAnalysis.dominantColors.map((color, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-earth-input border border-earth-border rounded-xl text-sm text-text-primary"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted mb-1">Free Space:</p>
                      <p className="text-lg font-semibold text-text-primary">
                        {recommendations.roomAnalysis.freeSpace.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <RecommendationsList 
                recommendations={recommendations.recommendations} 
                onCustomize={handleCustomize}
                onFinalize={handleFinalizeRecommendation}
              />

              {/* Finalize Button for Room Planner */}
              {recommendations.recommendations && recommendations.recommendations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-earth-border text-center">
                  <p className="text-white/80 mb-4">Found the perfect piece?</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {recommendations.recommendations.slice(0, 3).map((rec, idx) => (
                      <button
                        key={rec.item.id || idx}
                        onClick={() => handleFinalizeRecommendation(rec)}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Request Quote for {rec.item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Finalize Quote Modal */}
      <FinalizeQuoteModal
        isOpen={showFinalizeModal}
        onClose={() => {
          setShowFinalizeModal(false);
          setSelectedRecommendation(null);
        }}
        onProceed={handleProceedToQuote}
        recommendation={selectedRecommendation}
      />

      {/* Quote Request Form */}
      <QuoteRequestForm
        isOpen={showQuoteForm}
        onClose={() => {
          setShowQuoteForm(false);
          setSelectedRecommendation(null);
        }}
        onSubmit={handleQuoteSubmit}
        recommendation={selectedRecommendation}
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
