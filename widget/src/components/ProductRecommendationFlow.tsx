import React, { useState } from 'react';
import { FurnitureItem } from '../types';
import { ApiClient } from '../utils/apiClient';

interface RecommendationMatchRequest {
  catalog: FurnitureItem[];
  roomInfo?: {
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    roomType?: string;
  };
  style?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
  constraints?: string[];
  excludeOutOfStock?: boolean;
  maxResults?: number;
}

interface RecommendationResult {
  productId: string;
  matchScore: number;
  reason: string;
}

interface RecommendationResponse {
  summary: string;
  recommendations: RecommendationResult[];
}

interface ProductRecommendationFlowProps {
  apiClient: ApiClient;
  onCustomizeProduct: (product: FurnitureItem) => void;
  onClose?: () => void;
}

export function ProductRecommendationFlow({
  apiClient,
  onCustomizeProduct,
  onClose,
}: ProductRecommendationFlowProps) {
  const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
  const [catalog, setCatalog] = useState<FurnitureItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [roomType, setRoomType] = useState<string>('living');
  const [dimensions, setDimensions] = useState({ length: 5, width: 4, height: 2.5 });
  const [stylePreferences, setStylePreferences] = useState<string[]>([]);
  const [budgetMin, setBudgetMin] = useState<string>('');
  const [budgetMax, setBudgetMax] = useState<string>('');

  const handleGetRecommendations = async () => {
    setStep('loading');
    setError(null);

    try {
      // Fetch catalog first
      const catalogResponse = await apiClient.getCatalog();
      setCatalog(catalogResponse.items);

      // Build request
      const request: RecommendationMatchRequest = {
        catalog: catalogResponse.items,
        roomInfo: {
          dimensions,
          roomType,
        },
        style: stylePreferences.length > 0 ? stylePreferences : undefined,
        budget:
          budgetMin || budgetMax
            ? {
                min: budgetMin ? parseInt(budgetMin) : undefined,
                max: budgetMax ? parseInt(budgetMax) : undefined,
              }
            : undefined,
        excludeOutOfStock: true,
        maxResults: 10,
      };

      // Get recommendations
      const response = await fetch(
        `${apiClient['config'].apiBaseUrl || window.location.origin}/api/recommendations/match`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const result: RecommendationResponse = await response.json();
      setRecommendations(result);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStep('input');
    }
  };

  const toggleStyle = (style: string) => {
    if (stylePreferences.includes(style)) {
      setStylePreferences(stylePreferences.filter((s) => s !== style));
    } else {
      setStylePreferences([...stylePreferences, style]);
    }
  };

  const getProductById = (productId: string): FurnitureItem | undefined => {
    return catalog.find((item) => item.id === productId);
  };

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">Finding the perfect furniture for your room...</p>
      </div>
    );
  }

  if (step === 'results' && recommendations) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Recommendations for You</h3>
            <p className="text-sm text-gray-600 mt-1">{recommendations.summary}</p>
          </div>
          <button
            onClick={() => {
              setStep('input');
              setRecommendations(null);
            }}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            New Search
          </button>
        </div>

        {recommendations.recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No products match your criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.recommendations.map((rec) => {
              const product = getProductById(rec.productId);
              if (!product) return null;

              return (
                <div
                  key={rec.productId}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          {Math.round(rec.matchScore * 100)}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {product.category}
                        {product.subCategory ? ` • ${product.subCategory}` : ''}
                      </p>
                      {product.priceRange && (
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          ${product.priceRange.min.toLocaleString()}
                          {product.priceRange.max && product.priceRange.max !== product.priceRange.min
                            ? ` - $${product.priceRange.max.toLocaleString()}`
                            : ''}
                        </p>
                      )}
                    </div>
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded ml-3"
                      />
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCustomizeProduct(product)}
                      className="flex-1 py-2 px-4 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Customize This
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Perfect Furniture</h3>
        <p className="text-sm text-gray-600">
          Tell us about your room and preferences, and we'll recommend the best products for you.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Room Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="living">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="office">Office</option>
          <option value="dining">Dining Room</option>
          <option value="kitchen">Kitchen</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Room Dimensions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Dimensions (meters)
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Length</label>
            <input
              type="number"
              value={dimensions.length}
              onChange={(e) =>
                setDimensions({ ...dimensions, length: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Width</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Height</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) =>
                setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })
              }
              step="0.1"
              min="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Style Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Style Preferences</label>
        <div className="flex flex-wrap gap-2">
          {['Modern', 'Scandinavian', 'Minimalist', 'Bohemian', 'Earthy', 'Natural', 'Rustic'].map(
            (style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  stylePreferences.includes(style)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                {style}
              </button>
            )
          )}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (USD)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min</label>
            <input
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              placeholder="No minimum"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max</label>
            <input
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              placeholder="No maximum"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGetRecommendations}
          className="flex-1 py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Recommendations
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
