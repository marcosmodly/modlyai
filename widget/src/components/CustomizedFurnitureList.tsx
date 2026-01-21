import React, { useState } from 'react';
import { CustomizedFurnitureItem } from '../types';
import { useWidgetContext } from '../utils/WidgetContext';

interface CustomizedFurnitureListProps {
  items: CustomizedFurnitureItem[];
  onItemRemoved?: () => void;
  onNavigateToCustomizer?: () => void;
}

export default function CustomizedFurnitureList({ items, onItemRemoved, onNavigateToCustomizer }: CustomizedFurnitureListProps) {
  const { storage } = useWidgetContext();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    if (!confirm('Are you sure you want to remove this customized furniture item?')) {
      return;
    }

    setRemovingId(id);
    try {
      storage.removeCustomizedFurniture(id);
      if (onItemRemoved) {
        onItemRemoved();
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleNavigateToCustomizer = () => {
    console.log('[CustomizedFurnitureList] Navigate to Customizer button clicked');
    if (onNavigateToCustomizer) {
      console.log('[CustomizedFurnitureList] Calling onNavigateToCustomizer callback');
      onNavigateToCustomizer();
    } else {
      console.log('[CustomizedFurnitureList] Dispatching modly:navigate-to-customizer event');
      // Fallback: dispatch custom event for parent widget
      window.dispatchEvent(new CustomEvent('modly:navigate-to-customizer'));
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 relative">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-lg text-text-primary mb-2">No customized furniture yet</p>
        <p className="text-sm text-text-muted mb-4">
          Customize furniture in the Customizer to see your creations here
        </p>
        <button
          type="button"
          onClick={handleNavigateToCustomizer}
          className="px-6 py-3 bg-earth-forest text-white rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 cursor-pointer relative z-10"
        >
          Go to Customizer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text-heading mb-6">
        My Customized Furniture
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-earth-card rounded-xl shadow-soft border border-earth-border overflow-hidden hover:shadow-lg transition-shadow relative"
          >
            {/* Custom Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-earth-sage text-text-primary rounded-lg text-xs font-semibold">
                Custom
              </span>
            </div>

            {/* Image Placeholder */}
            <div className="w-full h-48 bg-earth-input flex items-center justify-center">
              <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-text-heading mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-text-muted capitalize">
                  {item.baseItemType}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Saved {new Date(item.savedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Dimensions */}
              <div className="mb-4 p-3 bg-earth-input rounded-xl border border-earth-border">
                <h4 className="text-sm font-semibold text-text-heading mb-2">Dimensions:</h4>
                <div className="text-sm text-text-primary space-y-1">
                  <div>Length: <strong>{item.dimensions.length.toFixed(2)}m</strong></div>
                  <div>Width: <strong>{item.dimensions.width.toFixed(2)}m</strong></div>
                  <div>Height: <strong>{item.dimensions.height.toFixed(2)}m</strong></div>
                </div>
              </div>

              {/* Color Scheme */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-text-heading mb-2">Colors:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary">
                    {item.colorScheme.primary}
                  </span>
                  {item.colorScheme.secondary && (
                    <span className="px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary">
                      {item.colorScheme.secondary}
                    </span>
                  )}
                  {item.colorScheme.accent && (
                    <span className="px-3 py-1 bg-earth-input border border-earth-border rounded-lg text-sm text-text-primary">
                      {item.colorScheme.accent}
                    </span>
                  )}
                </div>
              </div>

              {/* Materials */}
              {(item.materials.primary || item.materials.legs || item.materials.upholstery) && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-heading mb-1">Materials:</h4>
                  <p className="text-sm text-text-primary">
                    {item.materials.primary}
                    {item.materials.legs && ` • Legs: ${item.materials.legs}`}
                    {item.materials.upholstery && ` • Upholstery: ${item.materials.upholstery}`}
                  </p>
                </div>
              )}

              {/* Ornament Details */}
              {item.ornamentDetails && item.ornamentDetails.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-heading mb-2">Details:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.ornamentDetails.map((detail, i) => (
                      <span
                        key={i}
                        className="text-xs bg-earth-sage/20 text-text-primary px-2 py-1 rounded"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Notes Preview */}
              {item.aiNotes && (
                <div className="mb-4 pt-4 border-t border-earth-border">
                  <p className="text-xs text-text-muted line-clamp-2">{item.aiNotes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-earth-border">
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={removingId === item.id}
                  className="flex-1 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {removingId === item.id ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
