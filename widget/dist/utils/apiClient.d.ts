import { RoomAnalysisResponse, RoomDimensions, RoomPreferences, CustomizationConfig, ChatRequest, ChatResponse, ChatCatalogPayload } from '../types';
import { WidgetConfig } from './config';
export declare class ApiClient {
    private config;
    constructor(config: WidgetConfig);
    private getBaseUrl;
    private getEndpoint;
    private withStoreQuery;
    private withStorePayload;
    private normalizeCatalogProductForChat;
    private getCatalogForChat;
    private normalizeChatResponse;
    analyzeRoom(photos: File[], dimensions: RoomDimensions, preferences?: RoomPreferences): Promise<RoomAnalysisResponse>;
    customizeFurniture(config: CustomizationConfig): Promise<any>;
    chat(request: ChatRequest): Promise<ChatResponse>;
    getCatalog(): Promise<{
        items: any[];
        catalog?: ChatCatalogPayload & {
            count?: number;
        };
        meta?: any;
    }>;
    submitQuoteRequest(quoteRequest: any): Promise<any>;
    getRecommendations(request: {
        catalog: any[];
        roomInfo?: {
            dimensions?: {
                length: number;
                width: number;
                height: number;
            };
            roomType?: string;
        };
        style?: string[];
        budget?: {
            min?: number;
            max?: number;
        };
        constraints?: string[];
        excludeOutOfStock?: boolean;
        maxResults?: number;
    }): Promise<any>;
    addToCart(item: {
        productId: string;
        configuration: any;
        specSheet?: any;
        quantity: number;
    }): Promise<any>;
}
//# sourceMappingURL=apiClient.d.ts.map