import { QuoteRequest, CustomizedFurnitureItem, Recommendation, RoomAnalysisResponse, RoomDimensions } from '../types';
interface QuoteSubmitResult {
    success?: boolean;
    quoteId?: string;
    message?: string;
    emailWarning?: string;
    emailSkipped?: boolean;
    warnings?: string[];
}
interface QuoteRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: QuoteRequest) => Promise<QuoteSubmitResult | void>;
    item?: CustomizedFurnitureItem | null;
    recommendation?: Recommendation | null;
    storeId?: string;
    widgetId?: string;
    roomDimensions?: RoomDimensions | null;
    roomAnalysis?: RoomAnalysisResponse['roomAnalysis'] | null;
}
export declare function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, storeId, widgetId, roomDimensions, roomAnalysis, }: QuoteRequestFormProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=QuoteRequestForm.d.ts.map