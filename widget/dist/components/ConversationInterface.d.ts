import { AIService } from '../utils/aiService';
import { FurnitureItem } from '../types';
interface ConversationInterfaceProps {
    aiService: AIService;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onAddToRoomPlanner?: (item: FurnitureItem) => void;
    onOpenRoomPlanner?: () => void;
    onOpenCustomizer?: () => void;
    onShowCatalog?: () => void;
    onViewInCatalog?: (item: FurnitureItem) => void;
    enabledActions?: {
        viewInCatalog: boolean;
        customize: boolean;
        requestQuote: boolean;
    };
    primaryColor?: string;
    messageTextColor?: string;
    analyticsContext?: {
        apiBaseUrl?: string;
        storeId?: string;
        widgetId?: string;
    };
    storeDomain?: string;
    platform?: string;
    /** Suggested prompt chips shown before the visitor sends their first message. */
    suggestedPrompts?: string[];
}
export declare function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, enabledActions, primaryColor, messageTextColor, analyticsContext, storeDomain, platform, suggestedPrompts, }: ConversationInterfaceProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConversationInterface.d.ts.map