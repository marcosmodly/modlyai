import { FurnitureItem, Recommendation } from '../types';
interface ProductDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCustomize: () => void;
    onFinalize: () => void;
    item?: FurnitureItem | null;
    recommendation?: Recommendation | null;
}
export declare function ProductDetailsModal({ isOpen, onClose, onCustomize, onFinalize, item, recommendation, }: ProductDetailsModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ProductDetailsModal.d.ts.map