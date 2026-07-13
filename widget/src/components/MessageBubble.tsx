import React from 'react';
import { ConversationMessage, Recommendation, FurnitureItem } from '../types';
import { getRealProductUrl } from '../utils/productUrl';
import { getReadableTextColor } from '../utils/config';
import { trackWidgetEvent } from '../utils/analytics';

interface MessageBubbleProps {
  message: ConversationMessage;
  onCustomizeItem?: (item: any) => void;
  onAddToRoomPlanner?: (item: any) => void;
  onViewInCatalog?: (item: FurnitureItem) => void;
  enabledActions?: {
    viewInCatalog: boolean;
    customize: boolean;
    requestQuote: boolean;
  };
  primaryColor?: string;
  messageTextColor?: string;
  analyticsContext?: {
    apiBaseUrl?: string;
    storeId?: string;
    widgetId?: string;
  };
}

export function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, messageTextColor, analyticsContext }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isThinking = message.type === 'thinking';
  const actions = enabledActions ?? { viewInCatalog: true, customize: true, requestQuote: true };
  const assistantTextStyle = !isUser && !isThinking && messageTextColor ? { color: messageTextColor } : undefined;
  const accentColor = primaryColor || '#3B82F6';
  const accentTextColor = getReadableTextColor(accentColor);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3.5`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 ${
          isThinking ? 'bg-gray-100 text-gray-600' : !isUser ? 'bg-white border border-gray-200 shadow-[0_2px_10px_rgba(15,23,42,0.04)]' : ''
        }`}
        style={isUser ? { backgroundColor: accentColor, color: accentTextColor } : assistantTextStyle}
      >
        {isThinking ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        ) : (
          <>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
            
            {message.metadata?.recommendations && message.metadata?.recommendations.length > 0 && (
              <div className="mt-4 space-y-3">
                {message.metadata?.recommendations.map((rec: Recommendation, index: number) => (
                  <RecommendationCard
                    key={rec.item.id || index}
                    recommendation={rec}
                    onCustomize={onCustomizeItem}
                    onAddToRoomPlanner={onAddToRoomPlanner}
                    onViewInCatalog={onViewInCatalog}
                    enabledActions={actions}
                    primaryColor={primaryColor}
                    analyticsContext={analyticsContext}
                  />
                ))}
              </div>
            )}

            {message.metadata?.action && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {message.metadata?.action?.type === 'open_room_planner' && 'Ready to analyze your room'}
                  {message.metadata?.action?.type === 'open_customizer' && 'Ready to customize'}
                  {message.metadata?.action?.type === 'show_catalog' && 'Ready to browse catalog'}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function getProductCatalogUrl(item: FurnitureItem) {
  return getRealProductUrl(item);
}

function RecommendationCard({ 
  recommendation, 
  onCustomize, 
  onAddToRoomPlanner,
  onViewInCatalog,
  enabledActions,
  primaryColor,
  analyticsContext,
}: { 
  recommendation: Recommendation; 
  onCustomize?: (item: any) => void; 
  onAddToRoomPlanner?: (item: any) => void;
  onViewInCatalog?: (item: FurnitureItem) => void;
  enabledActions: {
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
}) {
  const item = recommendation.item;
  const catalogUrl = getProductCatalogUrl(item);
  const accentColor = primaryColor || '#3B82F6';
  const accentTextColor = getReadableTextColor(accentColor);
  const thumbnail = (item as any).images?.[0] || (item as any).imageUrl || (item as any).image;

  const handleViewInCatalogClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!catalogUrl || typeof window === 'undefined') return;

    if (onViewInCatalog) {
      onViewInCatalog(item);
      return;
    }

    trackWidgetEvent({
      ...analyticsContext,
      type: 'view_in_catalog_clicked',
      productId: item.id,
      productName: item.name,
      metadata: {
        category: item.category,
        productUrl: catalogUrl,
      },
    });
    window.open(catalogUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {thumbnail ? (
        <div className="h-24 w-full bg-gray-100">
          <img src={thumbnail} alt={item.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="h-24 w-full bg-gray-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l9-4 9 4M3 7v10l9 4m-9-14l9 4m0 10V11m0 10l9-4V7" />
          </svg>
        </div>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-sm text-gray-900 leading-tight">{item.name}</h4>
          {recommendation.matchScore && (
            <span className="shrink-0 text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
              {Math.round(recommendation.matchScore * 100)}% match
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mb-1.5">{item.category}{item.subCategory ? ` · ${item.subCategory}` : ''}</p>

        {item.priceRange && (
          <p className="text-sm font-semibold text-gray-900 mb-2">
            ${item.priceRange.min?.toLocaleString()}
            {item.priceRange.max && item.priceRange.max !== item.priceRange.min
              ? ` - $${item.priceRange.max.toLocaleString()}`
              : ''}
          </p>
        )}

        {recommendation.reasoning && (
          <p className="text-xs text-gray-500 mb-2 leading-relaxed">{recommendation.reasoning}</p>
        )}

        <div className="mt-2.5 flex gap-2">
          {enabledActions.viewInCatalog && catalogUrl ? (
            <button
              type="button"
              onClick={handleViewInCatalogClick}
              className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
            >
              View
            </button>
          ) : enabledActions.viewInCatalog ? (
            <button
              type="button"
              disabled
              className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-400 text-xs font-medium rounded-full cursor-not-allowed flex items-center justify-center gap-1"
            >
              Catalog link unavailable
            </button>
          ) : null}
          {enabledActions.customize && onCustomize && (
            <button
              type="button"
              onClick={() => onCustomize(item)}
              className="flex-1 py-1.5 px-3 text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-1"
              style={{ backgroundColor: accentColor, color: accentTextColor }}
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
