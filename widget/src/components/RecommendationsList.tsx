import React from 'react';
import { Info, Pencil } from 'lucide-react';
import { Recommendation, FurnitureItem } from '../types';
import { getRealProductUrl } from '../utils/productUrl';
import { getReadableTextColor } from '../utils/config';

interface RecommendationsListProps {
  recommendations: Recommendation[];
  onCustomize?: (item: FurnitureItem) => void;
  onFinalize?: (recommendation: Recommendation) => void;
  enabledActions?: {
    viewInCatalog: boolean;
    customize: boolean;
    requestQuote: boolean;
  };
  primaryColor?: string;
}

function getProductCatalogUrl(item: FurnitureItem) {
  return getRealProductUrl(item);
}

export default function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor }: RecommendationsListProps) {
  const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
  const primaryTextColor = primaryColor ? getReadableTextColor(primaryColor) : undefined;

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No recommendations available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        AI Recommendations
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => {
          const catalogUrl = getProductCatalogUrl(rec.item);

          return (
            <div
              key={rec.item.id || index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {rec.item.name}
                  </h3>
                  {rec.matchScore && (
                    <span className="shrink-0 text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      {Math.round(rec.matchScore * 100)}% match
                    </span>
                  )}
                </div>

                <p className="text-sm mb-4 text-gray-500">
                  {rec.item.category} {rec.item.subCategory && `- ${rec.item.subCategory}`}
                </p>

                <div className="mb-4 p-3 rounded bg-gray-50 border border-gray-200">
                  <h4 className="text-sm font-medium mb-2 text-gray-700">Dimensions:</h4>
                  <div className="text-sm space-y-1 text-gray-800">
                    <div>Length: <strong>{rec.item.dimensions.length}m</strong></div>
                    <div>Width: <strong>{rec.item.dimensions.width}m</strong></div>
                    <div>Height: <strong>{rec.item.dimensions.height}m</strong></div>
                    {rec.item.dimensions.seatHeight && (
                      <div>Seat Height: <strong>{rec.item.dimensions.seatHeight}m</strong></div>
                    )}
                    {rec.item.dimensions.clearance && (
                      <div className="text-xs mt-2 text-gray-500">
                        Clearance: Front {rec.item.dimensions.clearance.front || 'N/A'}m
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1 text-gray-700">Materials:</h4>
                  <p className="text-sm text-gray-800">
                    {rec.item.materials.primary}
                    {rec.item.materials.secondary && `, ${rec.item.materials.secondary}`}
                    {rec.item.materials.upholstery && ` - Upholstery: ${rec.item.materials.upholstery}`}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1 text-gray-700">Colors:</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800">{rec.item.colors.main}</span>
                    {rec.item.colors.accent && (
                      <>
                        <span className="text-gray-400">-</span>
                        <span className="text-sm text-gray-800">{rec.item.colors.accent}</span>
                      </>
                    )}
                  </div>
                </div>

                {rec.item.styleTags && rec.item.styleTags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {rec.item.styleTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {rec.placement && (
                  <div className="mb-4 p-3 rounded bg-gray-50 border border-gray-200">
                    <h4 className="text-sm font-medium mb-2 text-gray-700">Placement:</h4>

                    {rec.placement.coordinates && (
                      <div className="mb-2 text-xs text-gray-800">
                        <span className="font-semibold">Position: </span>
                        ({rec.placement.coordinates.x.toFixed(2)}m, {rec.placement.coordinates.y.toFixed(2)}m)
                        <span className="ml-2 text-gray-500">from southwest corner</span>
                      </div>
                    )}

                    {rec.placement.distanceFromWalls && (
                      <div className="mb-2 text-xs space-y-1 text-gray-800">
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

                    {rec.placement.rotation !== undefined && rec.placement.rotation !== 0 && (
                      <div className="mb-2 text-xs text-gray-800">
                        <span className="font-semibold">Rotation: </span>
                        {rec.placement.rotation} deg
                      </div>
                    )}

                    {(rec.placement.wall || rec.placement.position) && (
                      <div className="mb-2 text-xs text-gray-800">
                        <span className="font-semibold">Location: </span>
                        {rec.placement.position || (rec.placement.wall ? `Against ${rec.placement.wall} wall` : 'Centered')}
                      </div>
                    )}

                    <p className="text-sm mt-2 pt-2 border-t border-gray-200 text-gray-800">
                      {rec.placement.reasoning}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-1 text-gray-700">Why this fits:</h4>
                  <p className="text-sm text-gray-800">{rec.reasoning}</p>
                </div>

                {rec.item.priceRange && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                      Price: <strong className="text-gray-900">
                        ${rec.item.priceRange.min?.toLocaleString()}
                        {rec.item.priceRange.max && rec.item.priceRange.max !== rec.item.priceRange.min
                          ? ` - $${rec.item.priceRange.max.toLocaleString()}`
                          : ''}
                      </strong>
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {actions.customize && onCustomize && (
                    <button
                      onClick={() => onCustomize(rec.item)}
                      className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2"
                      style={primaryColor ? { borderColor: primaryColor, color: primaryColor } : undefined}
                    >
                      <Pencil className="w-4 h-4" />
                      Customize this
                    </button>
                  )}

                  {actions.viewInCatalog && catalogUrl ? (
                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      View in Catalog
                    </a>
                  ) : actions.viewInCatalog ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      Catalog link unavailable
                    </button>
                  ) : null}
                  {actions.requestQuote && onFinalize && (
                    <button
                      onClick={() => onFinalize(rec)}
                      className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 text-white flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: primaryColor || '#10B981',
                        color: primaryColor ? primaryTextColor : '#ffffff',
                      }}
                    >
                      Request Quote
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
