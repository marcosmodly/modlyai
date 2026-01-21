import React from 'react';
import { FurnitureItem, Recommendation } from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onFinalize: () => void;
  item?: FurnitureItem | null;
  recommendation?: Recommendation | null;
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  onCustomize,
  onFinalize,
  item,
  recommendation,
}: ProductDetailsModalProps) {
  const websiteColors = useWebsiteColors();

  if (!isOpen) return null;

  const displayItem = item || recommendation?.item;
  if (!displayItem) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2A2D28] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Product Details</h2>
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
          {/* Product Name */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {displayItem.name}
            </h3>
            <p className="text-white/60 text-sm">
              {displayItem.category}
              {displayItem.subCategory && ` • ${displayItem.subCategory}`}
              {displayItem.brand && ` • ${displayItem.brand}`}
            </p>
          </div>

          {/* Short Description / Reasoning */}
          {recommendation?.reasoning && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-2">Why this fits:</h4>
              <p className="text-white/90 text-sm">{recommendation.reasoning}</p>
            </div>
          )}

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
            {displayItem.dimensions.seatHeight && (
              <div className="mt-3 text-sm">
                <span className="text-white/60">Seat Height: </span>
                <span className="text-white font-medium">{displayItem.dimensions.seatHeight}m</span>
              </div>
            )}
          </div>

          {/* Materials */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white/80 mb-3">Materials</h4>
            <div className="space-y-2 text-sm">
              {displayItem.materials.primary && (
                <div className="flex justify-between">
                  <span className="text-white/60">Primary:</span>
                  <span className="text-white font-medium">{displayItem.materials.primary}</span>
                </div>
              )}
              {displayItem.materials.secondary && (
                <div className="flex justify-between">
                  <span className="text-white/60">Secondary:</span>
                  <span className="text-white font-medium">{displayItem.materials.secondary}</span>
                </div>
              )}
              {displayItem.materials.upholstery && (
                <div className="flex justify-between">
                  <span className="text-white/60">Upholstery:</span>
                  <span className="text-white font-medium">{displayItem.materials.upholstery}</span>
                </div>
              )}
              {displayItem.materials.legs && (
                <div className="flex justify-between">
                  <span className="text-white/60">Legs:</span>
                  <span className="text-white font-medium">{displayItem.materials.legs}</span>
                </div>
              )}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-white/80 mb-3">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {displayItem.colors.main && (
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">Main:</span>
                  <span className="text-white font-medium text-sm">{displayItem.colors.main}</span>
                </div>
              )}
              {displayItem.colors.accent && (
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">Accent:</span>
                  <span className="text-white font-medium text-sm">{displayItem.colors.accent}</span>
                </div>
              )}
            </div>
          </div>

          {/* Style Tags */}
          {displayItem.styleTags && displayItem.styleTags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-2">Style</h4>
              <div className="flex flex-wrap gap-2">
                {displayItem.styleTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          {displayItem.priceRange && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white/80 mb-2">Price Range</h4>
              <p className="text-lg font-semibold text-white">
                ${displayItem.priceRange.min?.toLocaleString()}
                {displayItem.priceRange.max && displayItem.priceRange.max !== displayItem.priceRange.min
                  ? ` - $${displayItem.priceRange.max.toLocaleString()}`
                  : ''}
              </p>
            </div>
          )}

          {/* Coming Soon Message */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Catalog coming soon</p>
                <p className="text-blue-200/80 text-sm">
                  For now, you can customize this item or finalize a quote to get started.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-[#2A2D28] border-t border-white/10 px-6 py-4 space-y-3">
          {/* Primary Action */}
          <button
            onClick={onCustomize}
            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: websiteColors.primary,
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Customize this
          </button>

          {/* Secondary Action */}
          <button
            onClick={onFinalize}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Finalize & Request Quote
          </button>

          {/* Tertiary Action */}
          <button
            onClick={onClose}
            className="w-full text-center text-white/60 hover:text-white transition-colors text-sm py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
