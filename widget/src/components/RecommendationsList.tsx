import React, { useState } from 'react';
import { Recommendation, FurnitureItem } from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';
import { ProductDetailsModal } from './ProductDetailsModal';

interface RecommendationsListProps {
  recommendations: Recommendation[];
  onCustomize?: (item: FurnitureItem) => void;
  onFinalize?: (recommendation: Recommendation) => void;
}

// Helper function to lighten a color
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * percent));
  const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent));
  const b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Helper function to darken a color
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * percent));
  const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * percent));
  const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Helper function to add opacity to a color
function addOpacity(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

export default function RecommendationsList({ recommendations, onCustomize, onFinalize }: RecommendationsListProps) {
  const websiteColors = useWebsiteColors();
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Use website colors for button only
  const accentText = websiteColors.primary;

  const handleViewDetails = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setShowDetailsModal(true);
  };

  const handleCustomizeFromModal = () => {
    if (selectedRecommendation && onCustomize) {
      setShowDetailsModal(false);
      onCustomize(selectedRecommendation.item);
    }
  };

  const handleFinalizeFromModal = () => {
    if (selectedRecommendation && onFinalize) {
      setShowDetailsModal(false);
      onFinalize(selectedRecommendation);
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-white/60">
        <p className="text-lg">No recommendations available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-white">
        AI Recommendations
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.item.id || index}
            className="bg-zinc-900 rounded-lg shadow-md border border-white/10 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {rec.item.name}
                </h3>
                {rec.matchScore && (
                  <span className="text-sm px-2 py-1 rounded bg-emerald-500/15 text-emerald-200 font-medium">
                    {Math.round(rec.matchScore * 100)}% match
                  </span>
                )}
              </div>

              <p className="text-sm mb-4 text-white/60">
                {rec.item.category} {rec.item.subCategory && `• ${rec.item.subCategory}`}
              </p>

              {/* Dimensions */}
              <div className="mb-4 p-3 rounded bg-white/5 border border-white/10">
                <h4 className="text-sm font-medium mb-2 text-white/80">Dimensions:</h4>
                <div className="text-sm space-y-1 text-white">
                  <div>Length: <strong>{rec.item.dimensions.length}m</strong></div>
                  <div>Width: <strong>{rec.item.dimensions.width}m</strong></div>
                  <div>Height: <strong>{rec.item.dimensions.height}m</strong></div>
                  {rec.item.dimensions.seatHeight && (
                    <div>Seat Height: <strong>{rec.item.dimensions.seatHeight}m</strong></div>
                  )}
                  {rec.item.dimensions.clearance && (
                    <div className="text-xs mt-2 text-white/60">
                      Clearance: Front {rec.item.dimensions.clearance.front || 'N/A'}m
                    </div>
                  )}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1 text-white/80">Materials:</h4>
                <p className="text-sm text-white">
                  {rec.item.materials.primary}
                  {rec.item.materials.secondary && `, ${rec.item.materials.secondary}`}
                  {rec.item.materials.upholstery && ` • Upholstery: ${rec.item.materials.upholstery}`}
                </p>
              </div>

              {/* Colors */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1 text-white/80">Colors:</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">{rec.item.colors.main}</span>
                  {rec.item.colors.accent && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-sm text-white">{rec.item.colors.accent}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Style Tags */}
              {rec.item.styleTags && rec.item.styleTags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {rec.item.styleTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-purple-500/15 text-purple-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Placement */}
              {rec.placement && (
                <div className="mb-4 p-3 rounded bg-white/5 border border-white/10">
                  <h4 className="text-sm font-medium mb-2 text-white/80">Placement:</h4>
                  
                  {/* Coordinates */}
                  {rec.placement.coordinates && (
                    <div className="mb-2 text-xs text-white">
                      <span className="font-semibold">Position: </span>
                      ({rec.placement.coordinates.x.toFixed(2)}m, {rec.placement.coordinates.y.toFixed(2)}m)
                      <span className="ml-2 text-white/60">from southwest corner</span>
                    </div>
                  )}

                  {/* Distance from Walls */}
                  {rec.placement.distanceFromWalls && (
                    <div className="mb-2 text-xs space-y-1 text-white">
                      <div className="font-semibold mb-1">Distance from walls:</div>
                      <div className="grid grid-cols-2 gap-1">
                        {rec.placement.distanceFromWalls.north !== undefined && (
                          <div>North: <strong>{rec.placement.distanceFromWalls.north.toFixed(2)}m</strong></div>
                        )}
                        {rec.placement.distanceFromWalls.south !== undefined && (
                          <div>South: <strong>{rec.placement.distanceFromWalls.south.toFixed(2)}m</strong></div>
                        )}
                        {rec.placement.distanceFromWalls.east !== undefined && (
                          <div>East: <strong>{rec.placement.distanceFromWalls.east.toFixed(2)}m</strong></div>
                        )}
                        {rec.placement.distanceFromWalls.west !== undefined && (
                          <div>West: <strong>{rec.placement.distanceFromWalls.west.toFixed(2)}m</strong></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Rotation */}
                  {rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (
                    <div className="mb-2 text-xs text-white">
                      <span className="font-semibold">Rotation: </span>
                      {rec.placement.rotation}°
                    </div>
                  )}

                  {/* Wall/Position */}
                  {(rec.placement.wall || rec.placement.position) && (
                    <div className="mb-2 text-xs text-white">
                      <span className="font-semibold">Location: </span>
                      {rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')}
                    </div>
                  )}

                  {/* Reasoning */}
                  <p className="text-sm mt-2 pt-2 border-t border-white/10 text-white">
                    {rec.placement.reasoning}
                  </p>
                </div>
              )}

              {/* Reasoning */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium mb-1 text-white/80">Why this fits:</h4>
                <p className="text-sm text-white">{rec.reasoning}</p>
              </div>

              {/* Price Range */}
              {rec.item.priceRange && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/80">
                    Price: <strong className="text-white">
                      ${rec.item.priceRange.min?.toLocaleString()}
                      {rec.item.priceRange.max && rec.item.priceRange.max !== rec.item.priceRange.min
                        ? ` - $${rec.item.priceRange.max.toLocaleString()}`
                        : ''}
                    </strong>
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                {/* Primary Button: Customize this */}
                {onCustomize && (
                  <button
                    onClick={() => onCustomize(rec.item)}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Customize this
                  </button>
                )}
                
                {/* Secondary Button: View in Catalog / View Details */}
                <button
                  onClick={() => handleViewDetails(rec)}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View in Catalog
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedRecommendation(null);
        }}
        onCustomize={handleCustomizeFromModal}
        onFinalize={handleFinalizeFromModal}
        recommendation={selectedRecommendation}
      />
    </div>
  );
}
