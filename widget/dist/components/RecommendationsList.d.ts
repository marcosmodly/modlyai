import { Recommendation, FurnitureItem } from '../types';
interface RecommendationsListProps {
    recommendations: Recommendation[];
    onCustomize?: (item: FurnitureItem) => void;
    onFinalize?: (recommendation: Recommendation) => void;
}
export default function RecommendationsList({ recommendations, onCustomize, onFinalize }: RecommendationsListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RecommendationsList.d.ts.map