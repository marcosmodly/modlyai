import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MessageCircle, Sofa, Ruler, Sliders, X } from 'lucide-react';
import {
  DEFAULT_WIDGET_TITLE,
  getButtonLogoUrl,
  getButtonStyle,
  getPrimaryColor,
  getReadableTextColor,
  isDarkColor,
  WidgetConfig,
} from '../utils/config';
import { FurnitureAIWidget } from './FurnitureAIWidget';
import { trackWidgetEvent } from '../utils/analytics';

interface FurnitureAIWidgetButtonProps {
  config?: WidgetConfig;
  defaultTab?: 'room-planner' | 'customizer';
  buttonText?: string;
  buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  buttonStyle?: React.CSSProperties;
  className?: string;
}

type EntryTab = 'conversation' | 'room-planner' | 'customizer';

const menuOptions: Array<{ tab: EntryTab; label: string; Icon: typeof MessageCircle }> = [
  { tab: 'conversation', label: 'Chat', Icon: MessageCircle },
  { tab: 'customizer', label: 'Customize', Icon: Sliders },
  { tab: 'room-planner', label: 'Room planner', Icon: Ruler },
];

export function FurnitureAIWidgetButton({ 
  config = {}, 
  defaultTab = 'room-planner',
  buttonText,
  buttonPosition = 'bottom-right',
  buttonStyle,
  className = ''
}: FurnitureAIWidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [entryTab, setEntryTab] = useState<EntryTab>('conversation');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const wantsLogo = getButtonStyle(config) === 'logo';
  const logoUrl = getButtonLogoUrl(config);
  const showLogo = wantsLogo && Boolean(logoUrl) && !logoFailed;

  useEffect(() => {
    setLogoFailed(false);
  }, [logoUrl]);

  const displayTitle =
    config.widgetTitle ||
    config.theme?.buttonText ||
    buttonText ||
    DEFAULT_WIDGET_TITLE;

  const trackOpen = (source: string) => {
    trackWidgetEvent({
      apiBaseUrl: config.apiBaseUrl,
      storeId: config.storeId || config.widgetId,
      widgetId: config.widgetId,
      type: 'widget_opened',
      metadata: {
        source,
      },
    });
  };

  useEffect(() => {
    setIsTouchDevice(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);
    const reducedMotionQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (reducedMotionQuery) {
      setPrefersReducedMotion(reducedMotionQuery.matches);
      const listener = () => setPrefersReducedMotion(reducedMotionQuery.matches);
      reducedMotionQuery.addEventListener('change', listener);
      return () => reducedMotionQuery.removeEventListener('change', listener);
    }
  }, []);

  const openWidget = (tab: EntryTab, source: string) => {
    setEntryTab(tab);
    setMenuOpen(false);
    setIsOpen(true);
    trackOpen(source);
  };

  useEffect(() => {
    const onOpen = () => openWidget('conversation', 'widget_button_event');
    window.addEventListener('modly:open-widget', onOpen as EventListener);
    return () => window.removeEventListener('modly:open-widget', onOpen as EventListener);
  }, [config.apiBaseUrl, config.storeId, config.widgetId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, menuOpen]);

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

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    clearCloseTimer();
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setMenuOpen(false), 220);
  };

  const handleMainButtonClick = () => {
    if (isTouchDevice) {
      setMenuOpen((prev) => !prev);
      return;
    }
    // Desktop: clicking the main button jumps straight into chat, matching prior behavior.
    openWidget('conversation', 'widget_button');
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };
  const isRightAligned = buttonPosition === 'bottom-right' || buttonPosition === 'top-right';
  const isBottomAligned = buttonPosition === 'bottom-right' || buttonPosition === 'bottom-left';

  const primaryColor = getPrimaryColor(config);
  const textColor = getReadableTextColor(primaryColor);
  const isDarkPrimary = isDarkColor(primaryColor);

  const finalButtonStyle: React.CSSProperties = useMemo(() => {
    const baseStyle: React.CSSProperties = showLogo
      ? {
          height: '52px',
          width: '52px',
          padding: '2px',
          background: '#ffffff',
          border: isDarkPrimary
            ? '1px solid rgba(255, 255, 255, 0.20)'
            : '1px solid rgba(17, 24, 39, 0.10)',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
          ...buttonStyle,
        }
      : {
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
          ...buttonStyle,
        };
    return baseStyle;
  }, [primaryColor, textColor, isDarkPrimary, buttonStyle, showLogo]);

  const transitionClass = prefersReducedMotion ? '' : 'transition-all duration-200 ease-out';

  return (
    <>
      <div
        className={`fixed ${positionClasses[buttonPosition]} z-50 flex flex-col items-end gap-2`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Expand menu: three options, stacked vertically above the button */}
        <div
          className={`flex flex-col items-end gap-2 ${isBottomAligned ? 'order-1' : 'order-2'}`}
          aria-hidden={!menuOpen}
        >
          {menuOptions.map(({ tab, label, Icon }, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => openWidget(tab, `widget_menu_${tab}`)}
              className={`modly-widget-menu-item flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-[0_10px_24px_rgba(15,23,42,0.16)] ${transitionClass}`}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.94)',
                pointerEvents: menuOpen ? 'auto' : 'none',
                transitionDelay: menuOpen ? `${index * 55}ms` : '0ms',
              }}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} style={{ color: primaryColor }} />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>

        {/* Main button */}
        <button
          onClick={handleMainButtonClick}
          style={finalButtonStyle}
          className={`modly-widget-button order-${isBottomAligned ? '2' : '1'} cursor-pointer rounded-full inline-flex items-center justify-center gap-2 ${transitionClass} ${className}`}
          onMouseOver={(e) => {
            if (isTouchDevice) return;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.filter = 'brightness(1.04)';
            e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.24)';
          }}
          onMouseOut={(e) => {
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
          aria-label={menuOpen ? `Close ${displayTitle} menu` : `Open ${displayTitle} widget`}
          aria-expanded={menuOpen}
        >
          {showLogo ? (
            <img
              src={logoUrl}
              alt={displayTitle}
              className="h-full w-full rounded-full object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <>
              {menuOpen && isTouchDevice ? (
                <X aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
              ) : (
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
              )}
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
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div 
          className="modly-widget-modal-backdrop fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="modly-widget-modal-panel bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col relative">
            <button
              onClick={() => setIsOpen(false)}
              className="modly-widget-modal-close absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
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
                defaultTab={entryTab === 'conversation' ? undefined : entryTab}
                widgetTitle={displayTitle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
