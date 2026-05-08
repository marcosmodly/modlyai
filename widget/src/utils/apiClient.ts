import { RoomAnalysisResponse, RoomDimensions, RoomPreferences, CustomizationConfig, ChatRequest, ChatResponse, ConversationMessage, ChatCatalogProduct, ChatCatalogPayload } from '../types';
import { WidgetConfig } from './config';

export class ApiClient {
  private config: WidgetConfig;

  constructor(config: WidgetConfig) {
    this.config = config;
  }

  private getBaseUrl(): string {
    return this.config.apiBaseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  }

  private getEndpoint(path: string): string {
    const baseUrl = this.getBaseUrl();
    return `${baseUrl}${path}`;
  }

  private withStoreQuery(url: string): string {
    const parsed = new URL(url, this.getBaseUrl() || 'http://localhost');

    if (this.config.storeId || this.config.widgetId) {
      parsed.searchParams.set('storeId', String(this.config.storeId || this.config.widgetId));
    }

    if (this.config.apiKey) {
      parsed.searchParams.set('apiKey', this.config.apiKey);
    } else if (this.config.publicApiKey) {
      parsed.searchParams.set('apiKey', this.config.publicApiKey);
    }

    if (this.config.storeDomain) {
      parsed.searchParams.set('domain', this.config.storeDomain);
    }

    return parsed.toString();
  }

  private withStorePayload<T extends Record<string, any>>(payload: T): T {
    return {
      ...payload,
      ...((this.config.storeId || this.config.widgetId) ? { storeId: this.config.storeId || this.config.widgetId } : {}),
      ...(this.config.widgetId ? { widgetId: this.config.widgetId } : {}),
      ...(this.config.apiKey ? { apiKey: this.config.apiKey } : {}),
      ...(this.config.publicApiKey ? { publicApiKey: this.config.publicApiKey } : {}),
      ...(this.config.storeDomain ? { storeDomain: this.config.storeDomain } : {}),
    };
  }

  private normalizeCatalogProductForChat(product: any, index: number): ChatCatalogProduct | null {
    const title = String(product?.title ?? product?.name ?? '').trim();
    if (!title) return null;

    const dimensions = typeof product?.dimensions === 'string'
      ? product.dimensions
      : product?.dimensions
        ? [
            product.dimensions.length !== undefined ? `${product.dimensions.length} in L` : null,
            product.dimensions.width !== undefined ? `${product.dimensions.width} in W` : null,
            product.dimensions.height !== undefined ? `${product.dimensions.height} in H` : null,
          ].filter(Boolean).join(' x ')
        : undefined;

    return {
      id: String(product?.id ?? `catalog-product-${index + 1}`),
      title,
      name: title,
      category: product?.category ? String(product.category) : undefined,
      description: product?.description ? String(product.description) : undefined,
      price: product?.price ?? product?.priceRange?.min,
      sku: product?.sku ? String(product.sku) : undefined,
      dimensions: dimensions || undefined,
      image: product?.image ?? product?.imageUrl ?? product?.images?.[0],
      imageUrl: product?.imageUrl ?? product?.image ?? product?.images?.[0],
      tags: Array.isArray(product?.tags)
        ? product.tags
        : Array.isArray(product?.styleTags)
          ? product.styleTags
          : undefined,
      source: product?.source ? String(product.source) : undefined,
      length: product?.length ?? product?.dimensions?.length,
      width: product?.width ?? product?.dimensions?.width,
      height: product?.height ?? product?.dimensions?.height,
      productUrl: product?.productUrl ? String(product.productUrl) : product?.url ? String(product.url) : undefined,
      url: product?.url ? String(product.url) : product?.productUrl ? String(product.productUrl) : undefined,
      handle: product?.handle ? String(product.handle) : undefined,
      externalId: product?.externalId ? String(product.externalId) : undefined,
      shopifyProductId: product?.shopifyProductId ? String(product.shopifyProductId) : undefined,
      storeId: product?.storeId ? String(product.storeId) : undefined,
      status: product?.status ? String(product.status) : undefined,
    };
  }

  private async getCatalogForChat(): Promise<ChatCatalogPayload> {
    try {
      const catalogResponse = await this.getCatalog();
      const source = catalogResponse.catalog?.source ?? catalogResponse.meta?.catalogSource ?? catalogResponse.meta?.source;
      const rawProducts = Array.isArray(catalogResponse.catalog?.products)
        ? catalogResponse.catalog.products
        : Array.isArray(catalogResponse.items)
          ? catalogResponse.items
          : [];
      const products = rawProducts
        .map((product: any, index: number) => this.normalizeCatalogProductForChat(product, index))
        .filter(Boolean) as ChatCatalogProduct[];

      return {
        source: products.length > 0 ? 'instantdb' : (source ?? 'none'),
        products,
      };
    } catch (error) {
      console.warn('Failed to load catalog before chat request:', error);
      return {
        source: 'none',
        products: [],
      };
    }
  }

  private normalizeChatResponse(data: any): ChatResponse {
    if (data?.message && typeof data.message === 'object') {
      return data as ChatResponse;
    }

    const content =
      typeof data?.reply === 'string' ? data.reply :
      typeof data?.message === 'string' ? data.message :
      typeof data?.content === 'string' ? data.content :
      typeof data?.text === 'string' ? data.text :
      '';

    if (!content.trim()) {
      throw new Error('Chat response did not include a readable assistant message.');
    }

    const message: ConversationMessage = {
      id: `msg-assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      type: 'text',
      content,
      timestamp: Date.now(),
    };

    return {
      message,
      updatedPreferences: data?.updatedPreferences,
      shouldTriggerAction: data?.shouldTriggerAction,
    };
  }

  async analyzeRoom(
    photos: File[],
    dimensions: RoomDimensions,
    preferences?: RoomPreferences
  ): Promise<RoomAnalysisResponse> {
    const endpoint = this.config.apiEndpoints?.roomAnalyze || '/api/rooms/analyze';
    const url = this.withStoreQuery(this.getEndpoint(endpoint));

    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    formData.append('dimensions', JSON.stringify(dimensions));
    if (this.config.apiKey) {
      formData.append('apiKey', this.config.apiKey);
    }
    if (this.config.storeDomain) {
      formData.append('storeDomain', this.config.storeDomain);
    }
    if (preferences) {
      formData.append('preferences', JSON.stringify(preferences));
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = new Error(`Failed to analyze room: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    const data: RoomAnalysisResponse = await response.json();
    this.config.onRoomAnalyzed?.(data);
    return data;
  }

  async customizeFurniture(config: CustomizationConfig): Promise<any> {
    const endpoint = this.config.apiEndpoints?.furnitureCustomize || '/api/furniture/customize';
    const url = this.getEndpoint(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      const error = new Error(`Failed to customize furniture: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    const data = await response.json();
    this.config.onFurnitureCustomized?.(data);
    return data;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const endpoint = this.config.apiEndpoints?.chat || '/api/widget/chat';
    const url = this.withStoreQuery(this.getEndpoint(endpoint));
    const catalog = request.catalog ?? await this.getCatalogForChat();
    const payload = this.withStorePayload({
      ...request,
      history: request.history ?? request.conversationHistory,
      catalog,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Failed to get chat response: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.warn('ModlyAI chat error response:', errorData);
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // If error response is not JSON, use status text
        }
        const error = new Error(errorMessage);
        this.config.onError?.(error);
        throw error;
      }

      const data = await response.json();
      return this.normalizeChatResponse(data);
    } catch (error) {
      console.error('Chat request failed:', error);
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error('Network error: Unable to connect to the server. Please check your connection.');
        this.config.onError?.(networkError);
        throw networkError;
      }
      throw error;
    }
  }

  async getCatalog(): Promise<{ items: any[]; catalog?: ChatCatalogPayload & { count?: number }; meta?: any }> {
    const endpoint = this.config.apiEndpoints?.catalog || '/api/catalog/items';
    const url = this.withStoreQuery(this.getEndpoint(endpoint));

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch catalog: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    const data = await response.json();
    return Array.isArray(data) ? { items: data } : data;
  }

  async submitQuoteRequest(quoteRequest: any): Promise<any> {
    const endpoint = this.config.apiEndpoints?.quoteRequest || '/api/quotes/request';
    const url = this.getEndpoint(endpoint);
    const payload = {
      ...quoteRequest,
      ...(this.config.quoteEmail ? { quoteEmail: this.config.quoteEmail } : {}),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.withStorePayload(payload)),
    });

    if (!response.ok) {
      const error = new Error(`Failed to submit quote request: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    return await response.json();
  }

  async getRecommendations(request: {
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
  }): Promise<any> {
    const endpoint = this.config.apiEndpoints?.recommendationsMatch || '/api/recommendations/match';
    const url = this.getEndpoint(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.withStorePayload(request)),
    });

    if (!response.ok) {
      const error = new Error(`Failed to get recommendations: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    return await response.json();
  }

  async addToCart(item: {
    productId: string;
    configuration: any;
    specSheet?: any;
    quantity: number;
  }): Promise<any> {
    const endpoint = this.config.apiEndpoints?.cartAdd || '/api/cart/add';
    const url = this.getEndpoint(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.withStorePayload(item)),
    });

    if (!response.ok) {
      const error = new Error(`Failed to add to cart: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    return await response.json();
  }
}
