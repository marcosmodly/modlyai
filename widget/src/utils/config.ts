import { RoomAnalysisResponse, CustomizationConfig } from '../types';

export interface WidgetConfig {
  apiBaseUrl?: string;
  configUrl?: string; // NEW: URL to fetch config from server
  widgetId?: string; // NEW: Widget instance ID
  apiEndpoints?: {
    roomAnalyze?: string;
    furnitureCustomize?: string;
    chat?: string;
    catalog?: string;
    recommendationsMatch?: string;
    cartAdd?: string;
    quoteRequest?: string;
  };
  theme?: {
    primaryColor?: string;
    buttonText?: string; // NEW
    buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'; // NEW
  };
  features?: {
    roomPlanner?: boolean;
    customizer?: boolean;
  };
  onError?: (error: Error) => void;
  onRoomAnalyzed?: (data: RoomAnalysisResponse) => void;
  onFurnitureCustomized?: (data: any) => void;
  storageKey?: string;
}

export const defaultConfig: Required<Omit<WidgetConfig, 'apiBaseUrl' | 'configUrl' | 'widgetId' | 'onError' | 'onRoomAnalyzed' | 'onFurnitureCustomized' | 'theme'>> = {
  apiEndpoints: {
    roomAnalyze: '/api/rooms/analyze',
    furnitureCustomize: '/api/furniture/customize',
    chat: '/api/widget/chat',
    catalog: '/api/catalog/items',
    recommendationsMatch: '/api/recommendations/match',
    cartAdd: '/api/cart/add',
    quoteRequest: '/api/quotes/request',
  },
  features: {
    roomPlanner: true,
    customizer: true,
  },
  storageKey: 'modly-customized-furniture',
};

export function mergeConfig(userConfig: WidgetConfig = {}): WidgetConfig {
  return {
    ...defaultConfig,
    ...userConfig,
    apiEndpoints: {
      ...defaultConfig.apiEndpoints,
      ...userConfig.apiEndpoints,
    },
    features: {
      ...defaultConfig.features,
      ...userConfig.features,
    },
  };
}

// NEW: Fetch config from server
export async function fetchRemoteConfig(configUrl: string, widgetId?: string): Promise<WidgetConfig> {
  try {
    const url = widgetId ? `${configUrl}?widgetId=${widgetId}` : configUrl;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch remote config, using defaults:', error);
    return {};
  }
}