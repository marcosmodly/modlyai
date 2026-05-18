import { CustomizedFurnitureItem, Recommendation, RoomAnalysisResponse, RoomDimensions } from '../types';
interface FinalizeQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
    item?: CustomizedFurnitureItem | null;
    recommendation?: Recommendation | null;
    roomDimensions?: RoomDimensions | null;
    roomAnalysis?: RoomAnalysisResponse['roomAnalysis'] | null;
}
export declare function FinalizeQuoteModal({ isOpen, onClose, onProceed, item, recommendation, roomDimensions, roomAnalysis, }: FinalizeQuoteModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=FinalizeQuoteModal.d.ts.map