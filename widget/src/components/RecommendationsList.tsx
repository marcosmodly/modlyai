import React from 'react';
import { ExternalLink, ImageIcon, MessageSquareQuote, Pencil, Ruler } from 'lucide-react';
import { Recommendation, FurnitureItem } from '../types';
import { getRealProductUrl } from '../utils/productUrl';
import { getReadableTextColor } from '../utils/config';
import { trackWidgetEvent } from '../utils/analytics';

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
  analyticsContext?: {
    apiBaseUrl?: string;
    storeId?: string;
    widgetId?: string;
  };
}

function getProductCatalogUrl(item: FurnitureItem) {
  return getRealProductUrl(item);
}

function getProductImageUrl(item: FurnitureItem) {
  return item.images?.find((image) => image?.trim()) ?? undefined;
}

function getPriceLabel(item: FurnitureItem) {
  if (typeof item.price === 'number') {
    return `$${item.price.toLocaleString()}`;
  }

  if (!item.priceRange) return 'Price on request';

  const min = item.priceRange.min;
  const max = item.priceRange.max;

  if (max && max !== min) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }

  return `$${min.toLocaleString()}`;
}

function getDimensionLabel(item: FurnitureItem) {
  const { length, width, height } = item.dimensions;
  if (!length || !width || !height) return null;
  return `${length}m L x ${width}m W x ${height}m H`;
}

export default function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor, analyticsContext }: RecommendationsListProps) {
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
      <div>
        <h2 className="text-3xl font-bold text-gray-950">
          Matching catalog products
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Suggestions are based on the uploaded room photo, your preferences, and available catalog data.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => {
          const catalogUrl = getProductCatalogUrl(rec.item);
          const imageUrl = getProductImageUrl(rec.item);
          const dimensionLabel = getDimensionLabel(rec.item);
          const priceLabel = getPriceLabel(rec.item);
          const handleViewInCatalogClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();

            if (!catalogUrl || typeof window === 'undefined') return;

            trackWidgetEvent({
              ...analyticsContext,
              type: 'view_in_catalog_clicked',
              productId: rec.item.id,
              productName: rec.item.name,
              metadata: {
                source: 'room_planner',
                category: rec.item.category,
                productUrl: catalogUrl,
              },
            });
            window.open(catalogUrl, '_blank', 'noopener,noreferrer');
          };

          return (
            <div
              key={rec.item.id || index}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-stone-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={rec.item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-50 text-stone-400">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight text-gray-950">
                      {rec.item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {rec.item.category} {rec.item.subCategory && `- ${rec.item.subCategory}`}
                    </p>
                  </div>
                  {rec.matchScore && (
                    <span className="shrink-0 text-sm px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      {Math.round(rec.matchScore * 100)}% match
                    </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-gray-900">
                    {priceLabel}
                  </span>
                  {dimensionLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-gray-600">
                      <Ruler className="h-3.5 w-3.5" />
                      {dimensionLabel}
                    </span>
                  )}
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
                  <div className="mb-4 rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <h4 className="text-sm font-semibold mb-2 text-gray-800">Placement notes</h4>

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

                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
                  <h4 className="text-sm font-semibold mb-1 text-blue-950">Why it fits</h4>
                  <p className="text-sm text-gray-800">{rec.reasoning}</p>
                </div>

                <div className="mt-4 space-y-2 border-t border-stone-200 pt-4">
                  {actions.customize && onCustomize && (
                    <button
                      type="button"
                      onClick={() => onCustomize(rec.item)}
                      className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center gap-2"
                      style={primaryColor ? { borderColor: primaryColor, color: primaryColor } : undefined}
                    >
                      <Pencil className="w-4 h-4" />
                      Customize this
                    </button>
                  )}

                  {actions.viewInCatalog && catalogUrl ? (
                    <button
                      type="button"
                      onClick={handleViewInCatalogClick}
                      className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View in Catalog
                    </button>
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
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onFinalize(rec);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 text-white flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: primaryColor || '#10B981',
                        color: primaryColor ? primaryTextColor : '#ffffff',
                      }}
                    >
                      <MessageSquareQuote className="h-4 w-4" />
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
