import { FurnitureItem } from '../types';
import { ApiClient } from '../utils/apiClient';
interface ProductRecommendationFlowProps {
    apiClient: ApiClient;
    onCustomizeProduct: (product: FurnitureItem) => void;
    onClose?: () => void;
}
export declare function ProductRecommendationFlow({ apiClient, onCustomizeProduct, onClose, }: ProductRecommendationFlowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProductRecommendationFlow.d.ts.map