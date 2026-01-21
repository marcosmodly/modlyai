import { AIService } from '../utils/aiService';
import { FurnitureItem } from '../types';
interface ConversationInterfaceProps {
    aiService: AIService;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onAddToRoomPlanner?: (item: FurnitureItem) => void;
    onOpenRoomPlanner?: () => void;
    onOpenCustomizer?: () => void;
    onShowCatalog?: () => void;
    onViewInCatalog?: (itemId: string) => void;
}
export declare function ConversationInterface({ aiService, onCustomizeItem, onAddToRoomPlanner, onOpenRoomPlanner, onOpenCustomizer, onShowCatalog, onViewInCatalog, }: ConversationInterfaceProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConversationInterface.d.ts.map