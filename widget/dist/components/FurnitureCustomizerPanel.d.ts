import { CustomizationConfig } from '../types';
interface FurnitureCustomizerPanelProps {
    baseItem?: {
        id?: string;
        name: string;
        type: string;
        currentConfig?: CustomizationConfig;
    };
    onCustomize: (config: CustomizationConfig) => void;
    isLoading?: boolean;
}
export default function FurnitureCustomizerPanel({ baseItem, onCustomize, isLoading, }: FurnitureCustomizerPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureCustomizerPanel.d.ts.map