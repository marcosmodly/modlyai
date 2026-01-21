import React from 'react';
import { CustomizedFurnitureItem, Recommendation } from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface FinalizeQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
}

export function FinalizeQuoteModal({
  isOpen,
  onClose,
  onProceed,
  item,
  recommendation,
}: FinalizeQuoteModalProps) {
  const websiteColors = useWebsiteColors();

  if (!isOpen) return null;

  const displayItem = item || (recommendation ? {
    name: recommendation.item.name,
    dimensions: recommendation.item.dimensions,
    materials: recommendation.item.materials,
    colorScheme: {
      primary: recommendation.item.colors.main,
      secondary: recommendation.item.colors.accent,
      accent: undefined,
    },
    aiNotes: recommendation.reasoning,
  } : null);

  if (!displayItem) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2A2D28] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Finalize & Request Quote</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {displayItem.name}
            </h3>
            <p className="text-white/60 text-sm">Review your customization details</p>
          </div>

          {/* Dimensions */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white/80 mb-3">Dimensions</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/60">Length:</span>
                <p className="text-white font-medium">{displayItem.dimensions.length}m</p>
              </div>
              <div>
                <span className="text-white/60">Width:</span>
                <p className="text-white font-medium">{displayItem.dimensions.width}m</p>
              </div>
              <div>
                <span className="text-white/60">Height:</span>
                <p className="text-white font-medium">{displayItem.dimensions.height}m</p>
              </div>
            </div>
          </div>

          {/* Materials */}
          {displayItem.materials && Object.keys(displayItem.materials).length > 0 && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-3">Materials</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(displayItem.materials).map(([key, value]) => 
                  value ? (
                    <div key={key} className="flex justify-between">
                      <span className="text-white/60 capitalize">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Colors */}
          {displayItem.colorScheme && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-3">Color Scheme</h4>
              <div className="flex flex-wrap gap-3">
                {displayItem.colorScheme.primary && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Primary:</span>
                    <span className="text-white font-medium text-sm">{displayItem.colorScheme.primary}</span>
                  </div>
                )}
                {displayItem.colorScheme.secondary && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Secondary:</span>
                    <span className="text-white font-medium text-sm">{displayItem.colorScheme.secondary}</span>
                  </div>
                )}
                {displayItem.colorScheme?.accent && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Accent:</span>
                    <span className="text-white font-medium text-sm">{displayItem.colorScheme.accent}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Notes */}
          {displayItem.aiNotes && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-2">AI Notes</h4>
              <p className="text-white/90 text-sm">{displayItem.aiNotes}</p>
            </div>
          )}

          {/* Room Planner Placement Info */}
          {recommendation?.placement && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-3">Placement Information</h4>
              
              {recommendation.placement.coordinates && (
                <div className="mb-2 text-sm">
                  <span className="text-white/60">Position: </span>
                  <span className="text-white">
                    ({recommendation.placement.coordinates.x.toFixed(2)}m, {recommendation.placement.coordinates.y.toFixed(2)}m)
                  </span>
                  <span className="text-white/60 ml-2">from southwest corner</span>
                </div>
              )}

              {recommendation.placement.distanceFromWalls && (
                <div className="mb-2">
                  <div className="text-sm text-white/60 mb-1">Distance from walls:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {recommendation.placement.distanceFromWalls.north !== undefined && (
                      <div className="text-white">
                        North: <span className="font-medium">{recommendation.placement.distanceFromWalls.north.toFixed(2)}m</span>
                      </div>
                    )}
                    {recommendation.placement.distanceFromWalls.south !== undefined && (
                      <div className="text-white">
                        South: <span className="font-medium">{recommendation.placement.distanceFromWalls.south.toFixed(2)}m</span>
                      </div>
                    )}
                    {recommendation.placement.distanceFromWalls.east !== undefined && (
                      <div className="text-white">
                        East: <span className="font-medium">{recommendation.placement.distanceFromWalls.east.toFixed(2)}m</span>
                      </div>
                    )}
                    {recommendation.placement.distanceFromWalls.west !== undefined && (
                      <div className="text-white">
                        West: <span className="font-medium">{recommendation.placement.distanceFromWalls.west.toFixed(2)}m</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {recommendation.placement.rotation !== undefined && recommendation.placement.rotation !== 0 && (
                <div className="mb-2 text-sm">
                  <span className="text-white/60">Rotation: </span>
                  <span className="text-white font-medium">{recommendation.placement.rotation}°</span>
                </div>
              )}

              {recommendation.placement.reasoning && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-sm text-white/90">{recommendation.placement.reasoning}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-[#2A2D28] border-t border-white/10 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors shadow-lg"
            style={{
              backgroundColor: websiteColors.primary,
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
