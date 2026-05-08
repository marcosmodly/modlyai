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
}
export declare function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog, enabledActions, primaryColor }: MessageBubbleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MessageBubble.d.ts.map