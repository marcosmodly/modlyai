import React from 'react';
import { ConversationMessage, Recommendation, FurnitureItem } from '../types';

interface MessageBubbleProps {
  message: ConversationMessage;
  onCustomizeItem?: (item: any) => void;
  onAddToRoomPlanner?: (item: any) => void;
  onViewInCatalog?: (item: FurnitureItem) => void;
}

export function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isThinking = message.type === 'thinking';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : isThinking
            ? 'bg-gray-100 text-gray-600'
            : 'bg-gray-50 text-gray-900 border border-gray-200'
        }`}
      >
        {isThinking ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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

function RecommendationCard({ 
  recommendation, 
  onCustomize, 
  onAddToRoomPlanner,
  onViewInCatalog 
}: { 
  recommendation: Recommendation; 
  onCustomize?: (item: any) => void; 
  onAddToRoomPlanner?: (item: any) => void;
  onViewInCatalog?: (item: FurnitureItem) => void;
}) {
  const item = recommendation.item;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
        {recommendation.matchScore && (
          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
            {Math.round(recommendation.matchScore * 100)}% match
          </span>
        )}
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{item.category}{item.subCategory ? ` • ${item.subCategory}` : ''}</p>
      
      {item.priceRange && (
        <p className="text-xs font-medium text-gray-900 mb-2">
          ${item.priceRange.min?.toLocaleString()}
          {item.priceRange.max && item.priceRange.max !== item.priceRange.min
            ? ` - $${item.priceRange.max.toLocaleString()}`
            : ''}
        </p>
      )}

      {recommendation.reasoning && (
        <p className="text-xs text-gray-500 mb-2">{recommendation.reasoning}</p>
      )}

      <div className="mt-3 flex gap-2">
        {onViewInCatalog && (
          <button
            onClick={() => onViewInCatalog(item)}
            className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 border border-gray-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View in Catalog
          </button>
        )}
        {onCustomize && (
          <button
            onClick={() => onCustomize(item)}
            className="flex-1 py-1.5 px-3 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Customize this
          </button>
        )}
      </div>
    </div>
  );
}
