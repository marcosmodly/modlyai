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
}
export default function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor, analyticsContext }: RecommendationsListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecommendationsList.d.ts.map