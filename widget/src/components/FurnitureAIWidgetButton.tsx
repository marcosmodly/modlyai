import React, { useState, useEffect, useMemo } from 'react';
import { WidgetConfig } from '../utils/config';
import { FurnitureAIWidget } from './FurnitureAIWidget';

interface FurnitureAIWidgetButtonProps {
  config?: WidgetConfig;
  defaultTab?: 'room-planner' | 'customizer';
  buttonText?: string;
  buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonStyle?: React.CSSProperties;
  className?: string;
}

// Helper function to check if a color is dark
const isDarkColor = (color: string): boolean => {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return false;
  }
  
  // Handle rgb/rgba
  const rgbMatch = color.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const r = parseInt(rgbMatch[0]);
    const g = parseInt(rgbMatch[1]);
    const b = parseInt(rgbMatch[2]);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  
  // Handle hex
  if (color.startsWith('#')) {
    const hex = color.length === 4 
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }
  
  // Named colors
  const darkColors = ['black', 'navy', 'darkblue', 'dark', 'darkslategray', 'darkslategrey'];
  return darkColors.includes(color.toLowerCase());
};

export function FurnitureAIWidgetButton({ 
  config = {}, 
  defaultTab = 'room-planner',
  buttonText = 'ModlyAI',
  buttonPosition = 'bottom-right',
  buttonStyle,
  className = ''
}: FurnitureAIWidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto contrast detection: check user preference and page background
  useEffect(() => {
    const detectDarkMode = () => {
      // Check user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Check page background
      const body = document.body;
      const root = document.documentElement;
      const bodyComputed = window.getComputedStyle(body);
      const rootComputed = window.getComputedStyle(root);
      
      const bodyBg = bodyComputed.backgroundColor || bodyComputed.getPropertyValue('background-color');
      const rootBg = rootComputed.backgroundColor || rootComputed.getPropertyValue('background-color');
      
      const isDarkBackground = isDarkColor(bodyBg) || isDarkColor(rootBg);
      
      setIsDarkMode(prefersDark || isDarkBackground);
    };

    detectDarkMode();
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => detectDarkMode();
    mediaQuery.addEventListener('change', handleChange);
    
    // Observe DOM changes
    const observer = new MutationObserver(detectDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme']
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
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
    const baseStyle: React.CSSProperties = {
      height: '44px',
      minWidth: '140px',
      padding: '12px 16px',
      // Frosted glass background
      background: isDarkMode 
        ? 'rgba(0, 0, 0, 0.35)' 
        : 'rgba(255, 255, 255, 0.14)',
      border: isDarkMode
        ? '1px solid rgba(255, 255, 255, 0.16)'
        : '1px solid rgba(255, 255, 255, 0.22)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', // Safari support
      // Text color
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      // Shadow
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.28)',
      ...buttonStyle
    };
    return baseStyle;
  }, [isDarkMode, buttonStyle]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={finalButtonStyle}
        className={`modly-widget-button fixed ${positionClasses[buttonPosition]} z-50 font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${className}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.04)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.28)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.28)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid rgba(99, 102, 241, 0.5)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        aria-label="Open ModlyAI Widget"
      >
        <span 
          className="text-base font-semibold"
          style={{ 
            letterSpacing: '0.02em',
            fontWeight: 600
          }}
        >
          {buttonText}
        </span>
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ opacity: 0.75 }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
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
              <FurnitureAIWidget config={config} defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}