import { RoomAnalysisResponse } from '../types';
export interface WidgetConfig {
    apiBaseUrl?: string;
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
export declare const defaultConfig: Required<Omit<WidgetConfig, 'apiBaseUrl' | 'configUrl' | 'widgetId' | 'onError' | 'onRoomAnalyzed' | 'onFurnitureCustomized' | 'theme'>>;
export declare function mergeConfig(userConfig?: WidgetConfig): WidgetConfig;
export declare function fetchRemoteConfig(configUrl: string, widgetId?: string): Promise<WidgetConfig>;
//# sourceMappingURL=config.d.ts.map