import { RoomAnalysisResponse } from '../types';
export interface WidgetConfig {
    apiBaseUrl?: string;
    storeId?: string;
    storeName?: string;
    storeUrl?: string;
    supportEmail?: string;
    widgetTitle?: string;
    primaryColor?: string;
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
    configUrl?: string;
    widgetId?: string;
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
        buttonText?: string;
        buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
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
export declare const DEFAULT_WIDGET_TITLE = "ModlyAI";
export declare const DEFAULT_PRIMARY_COLOR = "#3B82F6";
export declare const DEFAULT_WELCOME_MESSAGE = "Hello! I'm your furniture assistant. I can help you choose the right products, plan your room, or customize items from this store's catalog.";
export declare const DEFAULT_ENABLED_ACTIONS: {
    viewInCatalog: boolean;
    customize: boolean;
    requestQuote: boolean;
};
export declare const defaultConfig: Required<Omit<WidgetConfig, 'apiBaseUrl' | 'storeId' | 'apiKey' | 'publicApiKey' | 'storeDomain' | 'configUrl' | 'widgetId' | 'onError' | 'onRoomAnalyzed' | 'onFurnitureCustomized' | 'theme'>>;
export declare function mergeConfig(userConfig?: WidgetConfig): WidgetConfig;
export declare function getWidgetTitle(config?: WidgetConfig): string;
export declare function getPrimaryColor(config?: WidgetConfig): string;
export declare function isDarkColor(color: string): boolean;
export declare function getReadableTextColor(backgroundColor: string): string;
export declare function getWelcomeMessage(config?: WidgetConfig): string;
export declare function getEnabledActions(config?: WidgetConfig): {
    viewInCatalog: boolean;
    customize: boolean;
    requestQuote: boolean;
};
export declare function fetchRemoteConfig(configUrl: string, widgetId?: string, storeId?: string): Promise<WidgetConfig>;
//# sourceMappingURL=config.d.ts.map