import { RoomAnalysisResponse, CustomizationConfig } from '../types';

export interface WidgetConfig {
  apiBaseUrl?: string;
  storeId?: string;
  storeName?: string;
  storeUrl?: string;
  supportEmail?: string;
  widgetTitle?: string;
  primaryColor?: string;
  titleColor?: string;
  messageTextColor?: string;
  welcomeMessage?: string;
  enabledActions?: {
    viewInCatalog?: boolean;
    customize?: boolean;
    requestQuote?: boolean;
  };
  quoteEmail?: string;
  apiKey?: string;
  publicApiKey?: string;
  storeDomain?: string;
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
    titleColor?: string;
    messageTextColor?: string;
    buttonText?: string; // NEW
    buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'; // NEW
    buttonStyle?: 'text' | 'logo';
    logoUrl?: string;
  };
  features?: {
    roomPlanner?: boolean;
    customizer?: boolean;
  };
  onError?: (error: Error) => void;
  onRoomAnalyzed?: (data: RoomAnalysisResponse) => void;
  onFurnitureCustomized?: (data: any) => void;
  storageKey?: string;
  access?: {
    active: boolean;
    reason?: string;
  };
}

export const DEFAULT_WIDGET_TITLE = 'ModlyAI';
export const DEFAULT_PRIMARY_COLOR = '#3B82F6';
export const DEFAULT_TITLE_COLOR = '#FFFFFF';
export const DEFAULT_MESSAGE_TEXT_COLOR = '#1F2937';
export const DEFAULT_WELCOME_MESSAGE =
  "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog.";
export const DEFAULT_ENABLED_ACTIONS = {
  viewInCatalog: true,
  customize: true,
  requestQuote: true,
};

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export const defaultConfig: Required<Omit<WidgetConfig, 'apiBaseUrl' | 'storeId' | 'apiKey' | 'publicApiKey' | 'storeDomain' | 'configUrl' | 'widgetId' | 'onError' | 'onRoomAnalyzed' | 'onFurnitureCustomized' | 'theme'>> = {
  storeName: '',
  storeUrl: '',
  supportEmail: '',
  widgetTitle: DEFAULT_WIDGET_TITLE,
  primaryColor: DEFAULT_PRIMARY_COLOR,
  titleColor: DEFAULT_TITLE_COLOR,
  messageTextColor: DEFAULT_MESSAGE_TEXT_COLOR,
  welcomeMessage: DEFAULT_WELCOME_MESSAGE,
  enabledActions: DEFAULT_ENABLED_ACTIONS,
  quoteEmail: '',
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
  access: {
    active: true,
  },
};

export function mergeConfig(userConfig: WidgetConfig = {}): WidgetConfig {
  const widgetTitle = hasText(userConfig.widgetTitle)
    ? userConfig.widgetTitle.trim()
    : hasText(userConfig.theme?.buttonText)
      ? userConfig.theme.buttonText.trim()
      : DEFAULT_WIDGET_TITLE;
  const primaryColor = hasText(userConfig.primaryColor)
    ? userConfig.primaryColor.trim()
    : hasText(userConfig.theme?.primaryColor)
      ? userConfig.theme.primaryColor.trim()
      : DEFAULT_PRIMARY_COLOR;
  const titleColor = hasText(userConfig.titleColor)
    ? userConfig.titleColor.trim()
    : hasText(userConfig.theme?.titleColor)
      ? userConfig.theme.titleColor.trim()
      : DEFAULT_TITLE_COLOR;
  const messageTextColor = hasText(userConfig.messageTextColor)
    ? userConfig.messageTextColor.trim()
    : hasText(userConfig.theme?.messageTextColor)
      ? userConfig.theme.messageTextColor.trim()
      : DEFAULT_MESSAGE_TEXT_COLOR;
  const welcomeMessage = hasText(userConfig.welcomeMessage)
    ? userConfig.welcomeMessage.trim()
    : DEFAULT_WELCOME_MESSAGE;

  return {
    ...defaultConfig,
    ...userConfig,
    storeId: userConfig.storeId,
    widgetTitle,
    primaryColor,
    titleColor,
    messageTextColor,
    welcomeMessage,
    enabledActions: {
      ...DEFAULT_ENABLED_ACTIONS,
      ...userConfig.enabledActions,
    },
    apiEndpoints: {
      ...defaultConfig.apiEndpoints,
      ...userConfig.apiEndpoints,
    },
    theme: {
      ...userConfig.theme,
      primaryColor,
      titleColor,
      messageTextColor,
      buttonText: widgetTitle,
    },
    features: {
      ...defaultConfig.features,
      ...userConfig.features,
    },
  };
}

export function getWidgetTitle(config: WidgetConfig = {}): string {
  return hasText(config.widgetTitle)
    ? config.widgetTitle.trim()
    : hasText(config.theme?.buttonText)
      ? config.theme.buttonText.trim()
      : DEFAULT_WIDGET_TITLE;
}

export function getPrimaryColor(config: WidgetConfig = {}): string {
  return hasText(config.primaryColor)
    ? config.primaryColor.trim()
    : hasText(config.theme?.primaryColor)
      ? config.theme.primaryColor.trim()
      : DEFAULT_PRIMARY_COLOR;
}

export function getButtonStyle(config: WidgetConfig = {}): 'text' | 'logo' {
  return config.theme?.buttonStyle === 'logo' ? 'logo' : 'text';
}

export function getButtonLogoUrl(config: WidgetConfig = {}): string | undefined {
  return hasText(config.theme?.logoUrl) ? config.theme!.logoUrl!.trim() : undefined;
}

export function isDarkColor(color: string): boolean {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
    return false;
  }

  const rgbMatch = color.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const r = parseInt(rgbMatch[0], 10);
    const g = parseInt(rgbMatch[1], 10);
    const b = parseInt(rgbMatch[2], 10);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }

  if (color.startsWith('#')) {
    const hex = color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;
    if (hex.length >= 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  }

  const darkColors = ['black', 'navy', 'darkblue', 'dark', 'darkslategray', 'darkslategrey'];
  return darkColors.includes(color.toLowerCase());
}

export function getReadableTextColor(backgroundColor: string): string {
  return isDarkColor(backgroundColor) ? '#ffffff' : '#111827';
}

export function getWelcomeMessage(config: WidgetConfig = {}): string {
  return hasText(config.welcomeMessage) ? config.welcomeMessage.trim() : DEFAULT_WELCOME_MESSAGE;
}

export function getEnabledActions(config: WidgetConfig = {}) {
  return {
    viewInCatalog:
      typeof config.enabledActions?.viewInCatalog === 'boolean'
        ? config.enabledActions.viewInCatalog
        : DEFAULT_ENABLED_ACTIONS.viewInCatalog,
    customize:
      typeof config.enabledActions?.customize === 'boolean'
        ? config.enabledActions.customize
        : DEFAULT_ENABLED_ACTIONS.customize,
    requestQuote:
      typeof config.enabledActions?.requestQuote === 'boolean'
        ? config.enabledActions.requestQuote
        : DEFAULT_ENABLED_ACTIONS.requestQuote,
  };
}

export function getApiBaseUrlFromConfigUrl(configUrl?: string): string | undefined {
  if (!configUrl) return undefined;

  try {
    const url = new URL(
      configUrl,
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    );
    return url.origin;
  } catch (error) {
    return undefined;
  }
}

function isLocalhostUrl(value?: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  } catch (error) {
    return false;
  }
}

// NEW: Fetch config from server
export async function fetchRemoteConfig(configUrl: string, widgetId?: string, storeId?: string): Promise<WidgetConfig> {
  const apiBaseUrl = getApiBaseUrlFromConfigUrl(configUrl);

  try {
    const url = new URL(configUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (storeId) {
      url.searchParams.set('storeId', storeId);
    }
    if (widgetId) {
      url.searchParams.set('widgetId', widgetId);
    }
    if (typeof window !== 'undefined' && window.location.hostname) {
      url.searchParams.set('domain', window.location.hostname);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }
    const remoteConfig = await response.json();
    const remoteApiBaseUrl =
      hasText(remoteConfig?.apiBaseUrl) && !isLocalhostUrl(remoteConfig.apiBaseUrl)
        ? remoteConfig.apiBaseUrl.trim()
        : undefined;

    return {
      ...remoteConfig,
      apiBaseUrl: apiBaseUrl || remoteApiBaseUrl,
    };
  } catch (error) {
    console.warn('Failed to fetch remote config, using defaults:', error);
    return apiBaseUrl ? { apiBaseUrl } : {};
  }
}
