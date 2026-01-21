import React from 'react';
import { WidgetConfig } from '../utils/config';
interface FurnitureAIWidgetButtonProps {
    config?: WidgetConfig;
    defaultTab?: 'room-planner' | 'customizer';
    buttonText?: string;
    buttonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    buttonStyle?: React.CSSProperties;
    className?: string;
}
export declare function FurnitureAIWidgetButton({ config, defaultTab, buttonText, buttonPosition, buttonStyle, className }: FurnitureAIWidgetButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FurnitureAIWidgetButton.d.ts.map