import React, { useState, useEffect, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { DEFAULT_WIDGET_TITLE, getPrimaryColor, getReadableTextColor, isDarkColor, WidgetConfig } from '../utils/config';
import { FurnitureAIWidget } from './FurnitureAIWidget';

interface FurnitureAIWidgetButtonProps {
  config?: WidgetConfig;
  defaultTab?: 'room-planner' | 'customizer';
  buttonText?: string;
  buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonStyle?: React.CSSProperties;
  className?: string;
}

export function FurnitureAIWidgetButton({ 
  config = {}, 
  defaultTab = 'room-planner',
  buttonText,
  buttonPosition = 'bottom-right',
  buttonStyle,
  className = ''
}: FurnitureAIWidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayTitle =
    config.widgetTitle ||
    config.theme?.buttonText ||
    buttonText ||
    DEFAULT_WIDGET_TITLE;

  useEffect(() => {
    const onOpen = () => setIsOpen(true);
    window.addEventListener('modly:open-widget', onOpen as EventListener);
    return () => window.removeEventListener('modly:open-widget', onOpen as EventListener);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const finalButtonStyle: React.CSSProperties = useMemo(() => {
    const primaryColor = getPrimaryColor(config);
    const textColor = getReadableTextColor(primaryColor);
    const isDarkPrimary = isDarkColor(primaryColor);
    const baseStyle: React.CSSProperties = {
      height: '44px',
      minWidth: '112px',
      padding: '0 18px',
      background: isDarkPrimary
        ? `linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 48%, rgba(0,0,0,0.10) 100%), ${primaryColor}`
        : `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.10) 45%, rgba(17,24,39,0.06) 100%), ${primaryColor}`,
      border: isDarkPrimary
        ? '1px solid rgba(255, 255, 255, 0.20)'
        : '1px solid rgba(17, 24, 39, 0.14)',
      color: textColor,
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
      ...buttonStyle
    };
    return baseStyle;
  }, [config, buttonStyle]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={finalButtonStyle}
        className={`modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 cursor-pointer rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200 ease-out ${className}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.filter = 'brightness(1.04)';
          e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.24)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.filter = 'brightness(1)';
          e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.20)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid rgba(99, 102, 241, 0.5)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        aria-label={`Open ${displayTitle} widget`}
      >
        <MessageCircle
          aria-hidden="true"
          className="h-4 w-4 shrink-0"
          strokeWidth={2}
        />
        <span 
          className="text-[14.5px] font-semibold"
          style={{ 
            letterSpacing: '0',
            lineHeight: 1,
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          {displayTitle}
        </span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg 
                className="w-6 h-6 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            <div className="flex-1 overflow-hidden">
              <FurnitureAIWidget
                config={config}
                defaultTab={defaultTab}
                widgetTitle={displayTitle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
