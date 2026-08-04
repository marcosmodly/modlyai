import { FurnitureItem, QuoteRequest } from '../types';
import { WidgetConfig } from '../utils/config';
interface SampleRoomPhoto {
    id: string;
    label: string;
    src: string;
}
interface FurnitureRoomPlannerWidgetProps {
    config?: WidgetConfig;
    onCustomizeItem?: (item: FurnitureItem) => void;
    onNavigateToCustomizer?: () => void;
    /** Optional preset room photos offered alongside file upload (e.g. for demos). */
    sampleRooms?: SampleRoomPhoto[];
    /** Called after a quote request submits successfully. */
    onQuoteSubmitted?: (data: {
        quoteRequest: QuoteRequest;
        response: any;
    }) => void;
}
export declare function FurnitureRoomPlannerWidget({ config, onCustomizeItem, onNavigateToCustomizer, sampleRooms, onQuoteSubmitted, }: FurnitureRoomPlannerWidgetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureRoomPlannerWidget.d.ts.map