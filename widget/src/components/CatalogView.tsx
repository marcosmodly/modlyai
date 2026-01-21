import React, { useState, useEffect, useRef } from 'react';
import { FurnitureItem } from '../types';
import { useWidgetContext } from '../utils/WidgetContext';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface CatalogViewProps {
  onCustomizeItem?: (item: FurnitureItem) => void;
  highlightItemId?: string | null;
}

export function CatalogView({ onCustomizeItem, highlightItemId }: CatalogViewProps) {
  const { apiClient, config } = useWidgetContext();
  const websiteColors = useWebsiteColors();
  const [items, setItems] = useState<FurnitureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(highlightItemId || null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const loadCatalog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiClient.getCatalog();
        setItems(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load catalog');
      } finally {
        setIsLoading(false);
      }
    };

    loadCatalog();
  }, [apiClient]);

  // Handle highlighting and scrolling to item
  useEffect(() => {
    if (highlightItemId && itemRefs.current[highlightItemId]) {
      const element = itemRefs.current[highlightItemId];
      
      // Scroll to the item with smooth behavior
      setTimeout(() => {
        element?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
        });
      }, 100);
      
      // Set highlight
      setHighlightedId(highlightItemId);
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
    }
  }, [highlightItemId]);

  const handleCustomize = (item: FurnitureItem) => {
    if (onCustomizeItem) {
      onCustomizeItem(item);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1C19] flex items-center justify-center py-12 px-6">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white text-lg">Loading catalog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1A1C19] flex items-center justify-center py-12 px-6">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-xl max-w-lg text-center">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold mb-2">Failed to Load Catalog</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1C19] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Furniture Catalog
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Browse our collection of customizable furniture pieces
          </p>
        </div>

        {/* Catalog Grid */}
        {items.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p className="text-lg">No items available in the catalog.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const isHighlighted = highlightedId === item.id;
              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[item.id] = el; }}
                  className={`bg-zinc-900 rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    isHighlighted 
                      ? 'border-emerald-500 ring-4 ring-emerald-500/30 shadow-emerald-500/20' 
                      : 'border-white/10'
                  }`}
                >
                  {/* Image */}
                  {item.images && item.images.length > 0 && (
                    <div className="h-48 bg-white/5 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {item.name}
                      </h3>
                      {isHighlighted && (
                        <span className="text-xs px-2 py-1 rounded bg-emerald-500/15 text-emerald-200 font-medium animate-pulse">
                          Highlighted
                        </span>
                      )}
                    </div>

                    <p className="text-sm mb-4 text-white/60">
                      {item.category} {item.subCategory && `• ${item.subCategory}`}
                    </p>

                    {/* Dimensions */}
                    <div className="mb-4 p-3 rounded bg-white/5 border border-white/10">
                      <h4 className="text-xs font-medium mb-2 text-white/60">Dimensions:</h4>
                      <div className="text-xs space-y-1 text-white">
                        <div className="flex justify-between">
                          <span>Length:</span>
                          <strong>{item.dimensions.length}m</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Width:</span>
                          <strong>{item.dimensions.width}m</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Height:</span>
                          <strong>{item.dimensions.height}m</strong>
                        </div>
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium mb-1 text-white/60">Materials:</h4>
                      <p className="text-sm text-white">
                        {item.materials.primary}
                        {item.materials.secondary && `, ${item.materials.secondary}`}
                      </p>
                    </div>

                    {/* Colors */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium mb-1 text-white/60">Colors:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white">{item.colors.main}</span>
                        {item.colors.accent && (
                          <>
                            <span className="text-white/40">•</span>
                            <span className="text-sm text-white">{item.colors.accent}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Price Range */}
                    {item.priceRange && (
                      <div className="mb-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-white/60">
                          Price: <strong className="text-white">
                            ${item.priceRange.min?.toLocaleString()}
                            {item.priceRange.max && item.priceRange.max !== item.priceRange.min
                              ? ` - $${item.priceRange.max.toLocaleString()}`
                              : ''}
                          </strong>
                        </p>
                      </div>
                    )}

                    {/* Customize Button */}
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleCustomize(item)}
                        className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: websiteColors.primary,
                          color: '#FFFFFF',
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Customize This
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
