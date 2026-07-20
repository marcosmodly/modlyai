import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface RoomDimensions {
    length: number;
    width: number;
    height: number;
    roomType: 'living' | 'bedroom' | 'office' | 'dining' | 'kitchen' | 'other';
}
interface RoomPreferences {
    style?: string[];
    colors?: string[];
    budget?: {
        min?: number;
        max?: number;
    };
    mustKeepItems?: string[];
}
interface FurnitureItem {
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
    customizationOptions?: unknown;
}
interface Recommendation {
    item: FurnitureItem;
    placement: {
        wall?: 'north' | 'south' | 'east' | 'west';
        position?: string;
        coordinates?: {
            x: number;
            y: number;
        };
        distanceFromWalls?: {
            north?: number;
            south?: number;
            east?: number;
            west?: number;
        };
        rotation?: number;
        reasoning: string;
    };
    reasoning: string;
    matchScore: number;
}
interface CustomizationConfig {
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
interface RoomAnalysisRequest {
    photos: File[];
    dimensions: RoomDimensions;
    preferences?: RoomPreferences;
}
interface RoomAnalysisResponse {
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
interface SelectedPricedCustomization {
    name: string;
    price?: number;
}
interface SelectedShopifyOption {
    name: string;
    value: string;
    price?: number;
}
interface CustomizedFurnitureItem {
    id: string;
    savedAt: string;
    productId?: string;
    productName?: string;
    category?: string;
    imageUrl?: string;
    source?: string;
    productUrl?: string;
    price?: number;
    externalId?: string;
    shopifyProductId?: string;
    storeId?: string;
    widgetId?: string;
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
    selectedColor?: string | SelectedPricedCustomization;
    selectedColorPrice?: number;
    selectedMaterial?: string | SelectedPricedCustomization;
    selectedMaterialPrice?: number;
    selectedShopifyOptions?: SelectedShopifyOption[];
    selectedDimensions?: {
        length?: number;
        width?: number;
        height?: number;
        unit?: string;
    };
    dimensionPriceAdjustments?: {
        width?: number;
        length?: number;
        height?: number;
        total?: number;
    };
    selectedAddOns?: Array<{
        name: string;
        price?: number;
    }>;
    customerRequestText?: string;
    customizationPrice?: number;
    estimatedTotal?: number;
    basePrice?: number;
    pricingMode?: 'estimated' | 'quote_required';
}
type MessageRole = 'user' | 'assistant' | 'system';
type MessageType = 'text' | 'recommendations' | 'question' | 'action' | 'thinking';
interface ConversationMessage {
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
interface ConversationState {
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
interface ChatCatalogProduct {
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
    customizationOptions?: unknown;
}
interface ChatCatalogPayload {
    source?: 'instantdb' | 'csv' | 'shopify' | 'manual' | 'woocommerce' | 'bigcommerce' | 'none' | string;
    products?: ChatCatalogProduct[];
}
interface ChatRequest {
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
interface ChatResponse {
    message: ConversationMessage;
    updatedPreferences?: ConversationState['userPreferences'];
    shouldTriggerAction?: {
        type: 'open_room_planner' | 'open_customizer' | 'show_catalog' | 'customize_item';
        data?: any;
    };
}
interface QuoteRequest {
    customer: {
        name: string;
        email: string;
        phone?: string;
        message?: string;
    };
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
    quoteEmail?: string;
    supportEmail?: string;
    storeId?: string;
    widgetId?: string;
    source?: string;
    item: {
        productId?: string;
        productName?: string;
        category?: string;
        imageUrl?: string;
        savedAt?: string;
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
        widgetId?: string;
        source?: string;
        aiNotes?: string;
        basePrice?: number;
        selectedColor?: string | SelectedPricedCustomization;
        selectedColorPrice?: number;
        selectedMaterial?: string | SelectedPricedCustomization;
        selectedMaterialPrice?: number;
        selectedShopifyOptions?: SelectedShopifyOption[];
        selectedDimensions?: {
            length?: number;
            width?: number;
            height?: number;
            unit?: string;
        };
        dimensionPriceAdjustments?: {
            width?: number;
            length?: number;
            height?: number;
            total?: number;
        };
        selectedAddOns?: Array<{
            name: string;
            price?: number;
        }>;
        customerRequestText?: string;
        customizationPrice?: number;
        estimatedTotal?: number;
        pricingMode?: 'estimated' | 'quote_required';
        placement?: {
            wall?: string;
            position?: string;
            coordinates?: {
                x: number;
                y: number;
            };
            reasoning?: string;
        };
        fitScore?: number;
        placementNote?: string;
        roomAnalysis?: {
            roomType?: RoomDimensions['roomType'];
            detectedStyle?: string;
            dominantColors?: string[];
            freeSpaceDescription?: string;
            whyItFits?: string;
        };
        roomDetails?: RoomDimensions;
    };
    customization?: {
        selectedColor?: string | SelectedPricedCustomization;
        selectedMaterial?: string | SelectedPricedCustomization;
        selectedShopifyOptions?: SelectedShopifyOption[];
        selectedDimensions?: {
            length?: number;
            width?: number;
            height?: number;
            unit?: string;
        };
        dimensionPriceAdjustments?: {
            width?: number;
            length?: number;
            height?: number;
            total?: number;
        };
        selectedAddOns?: Array<{
            name: string;
            price?: number;
        }>;
        customizationPrice?: number;
        estimatedTotal?: number;
        pricingMode?: 'estimated' | 'quote_required';
        customerRequestText?: string;
    };
}
interface QuoteRequestResponse {
    success: boolean;
    quoteId?: string;
    message: string;
    delivery?: string[];
    warnings?: string[];
    emailWarning?: string;
    emailSkipped?: boolean;
}

interface WidgetConfig {
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
        titleColor?: string;
        messageTextColor?: string;
        buttonText?: string;
        buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
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

interface FurnitureRoomPlannerWidgetProps {
    config?: WidgetConfig;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onNavigateToCustomizer?: () => void;
}
declare function FurnitureRoomPlannerWidget({ config, onCustomizeItem, onNavigateToCustomizer, }: FurnitureRoomPlannerWidgetProps): react_jsx_runtime.JSX.Element;

interface ProductColor {
    name: string;
    hex: string;
    available: boolean;
    price?: number;
}
interface ProductMaterialOption {
    id: string;
    name: string;
    priceDelta?: number;
    description: string;
}
type PricedOption = {
    name: string;
    price?: number;
};
type CustomizationOptionValue = string | PricedOption;
type DimensionOption = {
    min?: number;
    max?: number;
    default?: number;
    unit?: string;
    pricePerExtraUnit?: number;
};
interface Product {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    length?: number;
    width?: number;
    height?: number;
    source?: string;
    productUrl?: string;
    imageUrl?: string;
    image?: string;
    thumbnail?: string;
    externalId?: string;
    shopifyProductId?: string;
    storeId?: string;
    status?: string;
    customizationOptions?: {
        colors?: CustomizationOptionValue[] | string;
        materials?: CustomizationOptionValue[] | string;
        dimensions?: {
            width?: DimensionOption;
            length?: DimensionOption;
            height?: DimensionOption;
        };
        addOns?: Array<{
            name: string;
            price?: number;
        }>;
        shopifyOptions?: Array<{
            name: string;
            values: CustomizationOptionValue[];
        }>;
        optionLabels?: Array<{
            name: string;
            values: CustomizationOptionValue[];
        }>;
    };
    dimensions: {
        length: number;
        width: number;
        height: number;
        unit: 'cm' | 'm' | 'inches' | 'ft';
    };
    materials: string[];
    colors: ProductColor[];
    images: {
        front: string;
        side: string;
        angle: string;
        thumbnail: string;
    };
    tags: string[];
    customizer: {
        type: string;
        thumbnailLabel: string;
        defaultWidthIn: number;
        defaultDepthIn: number;
        widthRangeIn: [number, number];
        depthRangeIn: [number, number];
        materialOptions: ProductMaterialOption[];
    };
}

interface FurnitureCustomizerWidgetProps {
    config?: WidgetConfig;
    onNavigateToRoomPlanner?: () => void;
    selectedProduct?: Product | null;
    onSelectedProductChange?: (product: Product) => void;
}
declare function FurnitureCustomizerWidget({ config, onNavigateToRoomPlanner, selectedProduct: sharedSelectedProduct, onSelectedProductChange, }: FurnitureCustomizerWidgetProps): react_jsx_runtime.JSX.Element;

interface FurnitureAIWidgetProps {
    config?: WidgetConfig;
    defaultTab?: 'room-planner' | 'customizer';
    widgetTitle?: string;
}
declare function FurnitureAIWidget({ config, defaultTab, widgetTitle }: FurnitureAIWidgetProps): react_jsx_runtime.JSX.Element;

interface FurnitureAIWidgetButtonProps {
    config?: WidgetConfig;
    defaultTab?: 'room-planner' | 'customizer';
    buttonText?: string;
    buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    buttonStyle?: React.CSSProperties;
    className?: string;
}
declare function FurnitureAIWidgetButton({ config, defaultTab, buttonText, buttonPosition, buttonStyle, className }: FurnitureAIWidgetButtonProps): react_jsx_runtime.JSX.Element;

export { FurnitureAIWidget, FurnitureAIWidgetButton, FurnitureCustomizerWidget, FurnitureRoomPlannerWidget };
export type { ChatCatalogPayload, ChatCatalogProduct, ChatRequest, ChatResponse, ConversationMessage, ConversationState, CustomizationConfig, CustomizedFurnitureItem, FurnitureItem, MessageRole, MessageType, QuoteRequest, QuoteRequestResponse, Recommendation, RoomAnalysisRequest, RoomAnalysisResponse, RoomDimensions, RoomPreferences, SelectedPricedCustomization, SelectedShopifyOption, WidgetConfig };
