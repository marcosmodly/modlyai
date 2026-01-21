'use client';

import { Recommendation } from '@/types';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-white/60">
        <p className="text-lg">No recommendations available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">
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
                  <span className="text-sm bg-emerald-500/15 text-emerald-200 px-2 py-1 rounded font-medium">
                    {Math.round(rec.matchScore * 100)}% match
                  </span>
                )}
              </div>

              <p className="text-sm text-white/60 mb-4">
                {rec.item.category} {rec.item.subCategory && `• ${rec.item.subCategory}`}
              </p>

              {/* Dimensions */}
              <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-sm font-medium text-white/80 mb-2">Dimensions:</h4>
                <div className="text-sm text-white space-y-1">
                  <div>Length: <strong>{rec.item.dimensions.length}m</strong></div>
                  <div>Width: <strong>{rec.item.dimensions.width}m</strong></div>
                  <div>Height: <strong>{rec.item.dimensions.height}m</strong></div>
                  {rec.item.dimensions.seatHeight && (
                    <div>Seat Height: <strong>{rec.item.dimensions.seatHeight}m</strong></div>
                  )}
                  {rec.item.dimensions.clearance && (
                    <div className="text-xs text-white/60 mt-2">
                      Clearance: Front {rec.item.dimensions.clearance.front || 'N/A'}m
                    </div>
                  )}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/80 mb-1">Materials:</h4>
                <p className="text-sm text-white">
                  {rec.item.materials.primary}
                  {rec.item.materials.secondary && `, ${rec.item.materials.secondary}`}
                  {rec.item.materials.upholstery && ` • Upholstery: ${rec.item.materials.upholstery}`}
                </p>
              </div>

              {/* Colors */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/80 mb-1">Colors:</h4>
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
                      className="text-xs bg-purple-500/15 text-purple-200 px-2 py-1 rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Placement */}
              {rec.placement && (
                <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
                  <h4 className="text-sm font-medium text-white/80 mb-2">Placement:</h4>
                  
                  {/* Coordinates */}
                  {rec.placement.coordinates && (
                    <div className="mb-2 text-xs text-white">
                      <span className="font-semibold">Position: </span>
                      ({rec.placement.coordinates.x.toFixed(2)}m, {rec.placement.coordinates.y.toFixed(2)}m)
                      <span className="text-white/60 ml-2">from southwest corner</span>
                    </div>
                  )}

                  {/* Distance from Walls */}
                  {rec.placement.distanceFromWalls && (
                    <div className="mb-2 text-xs text-white space-y-1">
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
                  <p className="text-sm text-white mt-2 pt-2 border-t border-white/10">
                    {rec.placement.reasoning}
                  </p>
                </div>
              )}

              {/* Reasoning */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-white/80 mb-1">Why this fits:</h4>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
