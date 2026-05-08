export interface RoomDimensions {
  length: number; // in meters
  width: number; // in meters
  height: number; // ceiling height in meters
  roomType: 'living' | 'bedroom' | 'office' | 'dining' | 'kitchen' | 'other';
}

export interface RoomPreferences {
  style?: string[];
  colors?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
  mustKeepItems?: string[];
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  brand?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    seatHeight?: number;
    depth?: number;
    clearance?: {
      front?: number;
      back?: number;
      sides?: number;
    };
  };
  materials: {
    primary: string;
    secondary?: string;
    upholstery?: string;
    legs?: string;
  };
  colors: {
    main: string;
    accent?: string;
  };
  styleTags: string[];
  images: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  stockStatus?: 'in_stock' | 'out_of_stock' | 'custom_order';
  productUrl?: string;
  url?: string;
  handle?: string;
  source?: string;
  price?: number;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  status?: string;
}

export interface Recommendation {
  item: FurnitureItem;
  placement: {
    wall?: 'north' | 'south' | 'east' | 'west';
    position?: string;
    coordinates?: {
      x: number; // meters from west wall
      y: number; // meters from south wall
    };
    distanceFromWalls?: {
      north?: number;
      south?: number;
      east?: number;
      west?: number;
    };
    rotation?: number; // degrees (0-360)
    reasoning: string;
  };
  reasoning: string;
  matchScore: number;
}

export interface CustomizationConfig {
  baseItemId?: string;
  baseItemType?: string;
  baseItemName?: string;
  source?: string;
  productUrl?: string;
  price?: number;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  colorScheme: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  materialOverrides: {
    [key: string]: string;
  };
  ornamentDetails?: string[];
  dimensionAdjustments?: {
    length?: number;
    width?: number;
    height?: number;
  };
  aiNotes?: string;
}

export interface RoomAnalysisRequest {
  photos: File[];
  dimensions: RoomDimensions;
  preferences?: RoomPreferences;
}

export interface RoomAnalysisResponse {
  recommendations: Recommendation[];
  roomAnalysis: {
    detectedStyle: string;
    dominantColors: string[];
    existingFurniture: string[];
    freeSpace: {
      estimated: number;
      description: string;
    };
  };
}

export interface CustomizedFurnitureItem {
  id: string; // unique ID (timestamp-based)
  savedAt: string; // ISO timestamp
  productId?: string;
  source?: string;
  productUrl?: string;
  price?: number;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  name: string;
  baseItemType: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  colorScheme: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  materials: {
    primary?: string;
    legs?: string;
    upholstery?: string;
    [key: string]: string | undefined;
  };
  ornamentDetails?: string[];
  aiNotes?: string;
  dimensionChanges?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

// Conversation types
export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageType = 'text' | 'recommendations' | 'question' | 'action' | 'thinking';

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  timestamp: number;
  isWelcome?: boolean;
  metadata?: {
    recommendations?: Recommendation[];
    furnitureItems?: FurnitureItem[];
    action?: {
      type: 'open_room_planner' | 'open_customizer' | 'show_catalog' | 'customize_item';
      data?: any;
    };
    reasoning?: string;
  };
}

export interface ConversationState {
  messages: ConversationMessage[];
  currentIntent?: 'room_planning' | 'browsing' | 'customization' | 'general';
  userPreferences?: {
    style?: string[];
    colors?: string[];
    budget?: {
      min?: number;
      max?: number;
    };
    roomType?: string;
    constraints?: string[];
  };
  context?: {
    pageType?: string;
    productId?: string;
    category?: string;
    currentPage?: string;
  };
}

export interface ChatCatalogProduct {
  id?: string;
  title?: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number | string;
  sku?: string;
  dimensions?: string;
  image?: string;
  imageUrl?: string;
  tags?: string[];
  source?: string;
  length?: number;
  width?: number;
  height?: number;
  colors?: string[];
  materials?: string[];
  productUrl?: string;
  url?: string;
  handle?: string;
  externalId?: string;
  shopifyProductId?: string;
  storeId?: string;
  status?: string;
}

export interface ChatCatalogPayload {
  source?: 'instantdb' | 'csv' | 'shopify' | 'manual' | 'woocommerce' | 'bigcommerce' | 'none' | string;
  products?: ChatCatalogProduct[];
}

export interface ChatRequest {
  message: string;
  conversationHistory: ConversationMessage[];
  history?: ConversationMessage[];
  storeId?: string;
  widgetId?: string;
  apiKey?: string;
  publicApiKey?: string;
  storeDomain?: string;
  catalog?: ChatCatalogPayload;
  context?: {
    pageType?: string;
    productId?: string;
    category?: string;
    currentPage?: string;
  };
  userPreferences?: ConversationState['userPreferences'];
}

export interface ChatResponse {
  message: ConversationMessage;
  updatedPreferences?: ConversationState['userPreferences'];
  shouldTriggerAction?: {
    type: 'open_room_planner' | 'open_customizer' | 'show_catalog' | 'customize_item';
    data?: any;
  };
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  quoteEmail?: string;
  item: {
    name: string;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    materials: {
      [key: string]: string | undefined;
    };
    colorScheme: {
      primary: string;
      secondary?: string;
      accent?: string;
    };
    productUrl?: string;
    price?: number;
    externalId?: string;
    shopifyProductId?: string;
    storeId?: string;
    source?: string;
    aiNotes?: string;
    placement?: {
      wall?: string;
      position?: string;
      coordinates?: {
        x: number;
        y: number;
      };
      reasoning?: string;
    };
  };
}

export interface QuoteRequestResponse {
  success: boolean;
  quoteId?: string;
  message: string;
}
