import { CustomizationConfig } from '../types';
export interface SpecSheet {
    specId: string;
    generatedAt: string;
    product: {
        name: string;
        baseItemId?: string;
        category: string;
    };
    configuration: {
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
        };
        materials: {
            primary?: string;
            secondary?: string;
            legs?: string;
            upholstery?: string;
            [key: string]: string | undefined;
        };
        colors: {
            primary: string;
            secondary?: string;
            accent?: string;
        };
        customizations: string[];
    };
    pricing: {
        estimatedCost?: number;
        requiresQuote: boolean;
    };
    customerNotes?: string;
}
/**
 * Generates a spec sheet from a customization configuration
 */
export declare function generateSpecSheet(config: CustomizationConfig, additionalData?: {
    estimatedCost?: number;
    customerNotes?: string;
    requiresQuote?: boolean;
}): SpecSheet;
/**
 * Generates HTML representation of a spec sheet (for printing/download)
 */
export declare function generateSpecSheetHTML(specSheet: SpecSheet): string;
/**
 * Opens spec sheet HTML in a new window for printing
 */
export declare function printSpecSheet(specSheet: SpecSheet): void;
//# sourceMappingURL=specSheetGenerator.d.ts.map