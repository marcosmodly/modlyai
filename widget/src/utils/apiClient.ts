import { RoomAnalysisResponse, RoomDimensions, RoomPreferences, CustomizationConfig, ChatRequest, ChatResponse } from '../types';
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

  async analyzeRoom(
    photos: File[],
    dimensions: RoomDimensions,
    preferences?: RoomPreferences
  ): Promise<RoomAnalysisResponse> {
    const endpoint = this.config.apiEndpoints?.roomAnalyze || '/api/rooms/analyze';
    const url = this.getEndpoint(endpoint);

    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    formData.append('dimensions', JSON.stringify(dimensions));
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
    const url = this.getEndpoint(endpoint);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        let errorMessage = `Failed to get chat response: ${response.statusText}`;
        try {
          const errorData = await response.json();
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

      return await response.json();
    } catch (error) {
      // Re-throw with more context if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error('Network error: Unable to connect to the server. Please check your connection.');
        this.config.onError?.(networkError);
        throw networkError;
      }
      throw error;
    }
  }

  async getCatalog(): Promise<{ items: any[] }> {
    const endpoint = this.config.apiEndpoints?.catalog || '/api/catalog/items';
    const url = this.getEndpoint(endpoint);

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch catalog: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    return await response.json();
  }

  async submitQuoteRequest(quoteRequest: any): Promise<any> {
    const endpoint = this.config.apiEndpoints?.quoteRequest || '/api/quotes/request';
    const url = this.getEndpoint(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteRequest),
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
      body: JSON.stringify(request),
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
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const error = new Error(`Failed to add to cart: ${response.statusText}`);
      this.config.onError?.(error);
      throw error;
    }

    return await response.json();
  }
}
