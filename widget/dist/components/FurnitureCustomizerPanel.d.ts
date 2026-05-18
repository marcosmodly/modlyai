import { Product } from '../data/products';
export type CustomizerDraft = {
    productId: string;
    fabricColor: string;
    selectedColor?: string;
    materialId: string;
    selectedMaterial?: string;
    widthIn: number;
    depthIn: number;
    heightIn?: number;
    addons: {
        throwPillows: boolean;
        ottoman: boolean;
    };
    selectedAddOns?: string[];
    customerRequestText?: string;
    rotationDeg: number;
    zoom: number;
    roomContext?: {
        lengthFt?: number;
        widthFt?: number;
    };
};
export type DraftPriceBreakdown = {
    base: number;
    customizations: number;
    total: number;
    quoteRequired?: boolean;
    dimensionAdjustments?: Record<DimensionKey, number> & {
        total?: number;
    };
    lineItems: Array<{
        label: string;
        amount: number;
    }>;
};
interface FurnitureCustomizerPanelProps {
    products: Product[];
    draft: CustomizerDraft;
    setDraft: (next: CustomizerDraft) => void;
    isApplying?: boolean;
    validationErrors?: string[];
    price: DraftPriceBreakdown;
    onApply: () => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onSaveConfig: () => void;
    onShareLink: () => void;
    onExportPdf: () => void;
    onViewFullRoomAnalysis?: () => void;
}
type DimensionKey = 'width' | 'length' | 'height';
export default function FurnitureCustomizerPanel({ products, draft, setDraft, isApplying, validationErrors, price, onApply, onUndo, onRedo, canUndo, canRedo, onSaveConfig, onShareLink, onExportPdf, onViewFullRoomAnalysis, }: FurnitureCustomizerPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureCustomizerPanel.d.ts.map