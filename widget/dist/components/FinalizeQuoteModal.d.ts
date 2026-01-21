import { CustomizedFurnitureItem, Recommendation } from '../types';
interface FinalizeQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
    item?: CustomizedFurnitureItem | null;
    recommendation?: Recommendation | null;
}
export declare function FinalizeQuoteModal({ isOpen, onClose, onProceed, item, recommendation, }: FinalizeQuoteModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=FinalizeQuoteModal.d.ts.map