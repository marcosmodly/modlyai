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
interface CustomizedFurnitureItem {
    id: string;
    savedAt: string;
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
type MessageRole = 'user' | 'assistant' | 'system';
type MessageType = 'text' | 'recommendations' | 'question' | 'action' | 'thinking';
interface ConversationMessage {
    id: string;
    role: MessageRole;
    type: MessageType;
    content: string;
    timestamp: number;
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
interface ChatRequest {
    message: string;
    conversationHistory: ConversationMessage[];
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
    name: string;
    email: string;
    phone?: string;
    notes?: string;
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
interface QuoteRequestResponse {
    success: boolean;
    quoteId?: string;
    message: string;
}

interface WidgetConfig {
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

interface FurnitureRoomPlannerWidgetProps {
    config?: WidgetConfig;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onNavigateToCustomizer?: () => void;
}
declare function FurnitureRoomPlannerWidget({ config, onCustomizeItem, onNavigateToCustomizer }: FurnitureRoomPlannerWidgetProps): react_jsx_runtime.JSX.Element;

interface FurnitureCustomizerWidgetProps {
    config?: WidgetConfig;
    onNavigateToRoomPlanner?: () => void;
}
declare function FurnitureCustomizerWidget({ config, onNavigateToRoomPlanner }: FurnitureCustomizerWidgetProps): react_jsx_runtime.JSX.Element;

interface FurnitureAIWidgetProps {
    config?: WidgetConfig;
    defaultTab?: 'room-planner' | 'customizer';
}
declare function FurnitureAIWidget({ config, defaultTab }: FurnitureAIWidgetProps): react_jsx_runtime.JSX.Element;

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
export type { ChatRequest, ChatResponse, ConversationMessage, ConversationState, CustomizationConfig, CustomizedFurnitureItem, FurnitureItem, MessageRole, MessageType, QuoteRequest, QuoteRequestResponse, Recommendation, RoomAnalysisRequest, RoomAnalysisResponse, RoomDimensions, RoomPreferences, WidgetConfig };
