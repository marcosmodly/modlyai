import { QuoteRequest, CustomizedFurnitureItem, Recommendation } from '../types';
interface QuoteRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: QuoteRequest) => Promise<void>;
    item?: CustomizedFurnitureItem | null;
    recommendation?: Recommendation | null;
}
export declare function QuoteRequestForm({ isOpen, onClose, onSubmit, item, recommendation, }: QuoteRequestFormProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=QuoteRequestForm.d.ts.map