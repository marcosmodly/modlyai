import { useState, useEffect } from 'react';

export interface WebsiteColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  border: string;
}

/**
 * Extracts color palette from the parent website by analyzing computed styles
 * of the body and root elements
 */
export function useWebsiteColors(): WebsiteColors {
  const [colors, setColors] = useState<WebsiteColors>({
    primary: '#3D543F', // Default fallback
    secondary: '#8DA38E',
    background: '#FFFFFF',
    text: '#1A1C19',
    accent: '#8DA38E',
    border: '#E5E7EB',
  });

  useEffect(() => {
    const extractColors = (): WebsiteColors => {
      try {
        // Try to get parent document (if in iframe), fallback to current document
        let doc: Document;
        let body: HTMLElement;
        let root: HTMLElement;
        
        try {
          // Check if we can access parent document (for iframe scenarios)
          if (window.parent && window.parent !== window && window.parent.document) {
            doc = window.parent.document;
          } else {
            doc = document;
          }
          body = doc.body;
          root = doc.documentElement;
        } catch (e) {
          // CORS or security restriction - use current document
          doc = document;
          body = doc.body;
          root = doc.documentElement;
        }

        // Helper to get computed color value from CSS variables or computed styles
        const getComputedColor = (element: HTMLElement, property: string, fallback?: string): string => {
          try {
            const computed = window.getComputedStyle(element);
            // Try CSS custom properties first
            const cssVar = computed.getPropertyValue(`--${property}`).trim();
            if (cssVar) return cssVar;
            
            // Try direct property
            const direct = computed.getPropertyValue(property).trim();
            if (direct) return direct;
            
            return fallback || '';
          } catch (e) {
            return fallback || '';
          }
        };

        // Helper to convert any color format to hex
        const toHex = (color: string): string => {
          if (!color || color.trim() === '') return '';
          
          // Already hex
          if (color.startsWith('#')) {
            return color.length === 4 
              ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
              : color;
          }
          
          // Handle rgb/rgba
          const rgbMatch = color.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0]).toString(16).padStart(2, '0');
            const g = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
            const b = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
          }
          
          // Handle named colors (basic set)
          const namedColors: Record<string, string> = {
            'white': '#FFFFFF',
            'black': '#000000',
            'red': '#FF0000',
            'green': '#008000',
            'blue': '#0000FF',
            'yellow': '#FFFF00',
            'orange': '#FFA500',
            'purple': '#800080',
            'pink': '#FFC0CB',
            'gray': '#808080',
            'grey': '#808080',
          };
          const lowerColor = color.toLowerCase().trim();
          if (namedColors[lowerColor]) {
            return namedColors[lowerColor];
          }
          
          return color;
        };

        // Try to extract primary color from links and buttons (common UI elements)
        const getElementColor = (selector: string, property: string = 'color'): string => {
          try {
            const element = doc.querySelector(selector);
            if (element) {
              const computed = window.getComputedStyle(element);
              return computed.getPropertyValue(property).trim();
            }
          } catch (e) {
            // Ignore errors
          }
          return '';
        };

        // Extract primary color - try multiple sources
        const primary = 
          getComputedColor(root, 'primary-color') ||
          getComputedColor(root, 'color-primary') ||
          getComputedColor(root, 'brand-color') ||
          getComputedColor(root, 'theme-color') ||
          getElementColor('a', 'color') || // Try link color
          getElementColor('button', 'background-color') || // Try button background
          getElementColor('[class*="primary"]', 'background-color') || // Try elements with "primary" in class
          getComputedColor(body, 'color') ||
          '#3D543F';

        // Extract background color
        const background = 
          getComputedColor(root, 'background-color') ||
          getComputedColor(root, 'bg-color') ||
          getComputedColor(body, 'background-color') ||
          '#FFFFFF';

        // Extract text color
        const text = 
          getComputedColor(root, 'text-color') ||
          getComputedColor(root, 'color-text') ||
          getComputedColor(body, 'color') ||
          '#1A1C19';

        // Extract accent color
        const accent = 
          getComputedColor(root, 'accent-color') ||
          getComputedColor(root, 'color-accent') ||
          getComputedColor(root, 'secondary-color') ||
          primary;

        // Extract secondary color
        const secondary = 
          getComputedColor(root, 'secondary-color') ||
          getComputedColor(root, 'color-secondary') ||
          accent;

        // Extract border color
        const border = 
          getComputedColor(root, 'border-color') ||
          getComputedColor(root, 'color-border') ||
          getComputedColor(body, 'border-color') ||
          '#E5E7EB';

        return {
          primary: toHex(primary) || '#3D543F',
          secondary: toHex(secondary) || '#8DA38E',
          background: toHex(background) || '#FFFFFF',
          text: toHex(text) || '#1A1C19',
          accent: toHex(accent) || '#8DA38E',
          border: toHex(border) || '#E5E7EB',
        };
      } catch (error) {
        console.warn('Failed to extract website colors:', error);
        // Return defaults
        return {
          primary: '#3D543F',
          secondary: '#8DA38E',
          background: '#FFFFFF',
          text: '#1A1C19',
          accent: '#8DA38E',
          border: '#E5E7EB',
        };
      }
    };

    // Extract colors on mount and when window resizes (in case styles change)
    setColors(extractColors());

    const handleResize = () => {
      setColors(extractColors());
    };

    window.addEventListener('resize', handleResize);
    
    // Also try to observe style changes if MutationObserver is available
    let observer: MutationObserver | null = null;
    try {
      const doc = window.parent?.document || document;
      observer = new MutationObserver(() => {
        setColors(extractColors());
      });
      observer.observe(doc.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    } catch (e) {
      // MutationObserver not supported or failed
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return colors;
}
