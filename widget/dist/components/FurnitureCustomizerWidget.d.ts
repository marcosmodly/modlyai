import { Product } from '../data/products';
import { WidgetConfig } from '../utils/config';
interface FurnitureCustomizerWidgetProps {
    config?: WidgetConfig;
    onNavigateToRoomPlanner?: () => void;
    selectedProduct?: Product | null;
    onSelectedProductChange?: (product: Product) => void;
}
export declare function FurnitureCustomizerWidget({ config, onNavigateToRoomPlanner, selectedProduct: sharedSelectedProduct, onSelectedProductChange, }: FurnitureCustomizerWidgetProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureCustomizerWidget.d.ts.map