import { WidgetConfig } from '../utils/config';
import { FurnitureItem, QuoteRequest } from '../types';
interface SampleRoomPhoto {
    id: string;
    label: string;
    src: string;
}
interface FurnitureAIWidgetProps {
    config?: WidgetConfig;
    defaultTab?: 'room-planner' | 'customizer';
    widgetTitle?: string;
    /** Hide the persistent Chat/Room planner/Customize tab strip. View transitions
     * still happen (driven by chat actions), they're just not visitor-clickable. */
    hideNav?: boolean;
    /** Seeds the customizer's selected product so a generic "open_customizer" chat
     * action (no explicit item) lands on this product instead of blank. */
    initialProduct?: FurnitureItem;
    /** Sample room photos offered in the room planner alongside file upload. */
    sampleRooms?: SampleRoomPhoto[];
    /** Suggested prompt chips shown before the visitor sends their first message. */
    suggestedPrompts?: string[];
    /** Called after a quote request submits successfully (from the room planner
     * or customizer's own quote form — the actual live submission paths). */
    onQuoteSubmitted?: (data: {
        quoteRequest: QuoteRequest;
        response: any;
    }) => void;
}
export declare function FurnitureAIWidget({ config, defaultTab, widgetTitle, hideNav, initialProduct, sampleRooms, suggestedPrompts, onQuoteSubmitted, }: FurnitureAIWidgetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureAIWidget.d.ts.map