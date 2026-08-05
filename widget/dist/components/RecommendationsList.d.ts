import { Recommendation, FurnitureItem } from '../types';
interface RecommendationsListProps {
    recommendations: Recommendation[];
    onCustomize?: (item: FurnitureItem) => void;
    onFinalize?: (recommendation: Recommendation) => void;
    enabledActions?: {
        viewInCatalog: boolean;
        customize: boolean;
        requestQuote: boolean;
    };
    primaryColor?: string;
    analyticsContext?: {
        apiBaseUrl?: string;
        storeId?: string;
        widgetId?: string;
    };
    storeDomain?: string;
    platform?: string;
    productUrlTemplate?: string;
}
export default function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor, analyticsContext, storeDomain, platform, productUrlTemplate }: RecommendationsListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecommendationsList.d.ts.map