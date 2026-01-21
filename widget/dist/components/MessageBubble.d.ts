import { ConversationMessage } from '../types';
interface MessageBubbleProps {
    message: ConversationMessage;
    onCustomizeItem?: (item: any) => void;
    onAddToRoomPlanner?: (item: any) => void;
    onViewInCatalog?: (itemId: string) => void;
}
export declare function MessageBubble({ message, onCustomizeItem, onAddToRoomPlanner, onViewInCatalog }: MessageBubbleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MessageBubble.d.ts.map