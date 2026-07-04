import { ConversationMessage, FurnitureItem } from '../types';
interface MessageBubbleProps {
    message: ConversationMessage;
    onCustomizeItem?: (item: any) => void;
    onAddToRoomPlanner?: (item: any) => void;
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
}
export declare function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor, messageTextColor, analyticsContext }: MessageBubbleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MessageBubble.d.ts.map