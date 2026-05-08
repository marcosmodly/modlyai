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
}
export default function RecommendationsList({ recommendations, onCustomize, onFinalize, enabledActions, primaryColor }: RecommendationsListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecommendationsList.d.ts.map