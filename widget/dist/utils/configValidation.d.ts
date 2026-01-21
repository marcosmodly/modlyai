import { CustomizationConfig } from '../types';
export interface ValidationError {
    field: string;
    message: string;
    severity: 'error' | 'warning';
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}
export interface ValidationRule {
    field: string;
    validate: (value: any, config: CustomizationConfig) => ValidationError | null;
}
/**
 * Validates a configuration against a set of rules
 */
export declare function validateConfiguration(config: CustomizationConfig, customRules?: ValidationRule[]): ValidationResult;
/**
 * Validates specific fields in a configuration
 */
export declare function validateField(field: string, value: any, config: CustomizationConfig, customRules?: ValidationRule[]): ValidationError | null;
/**
 * Creates a custom validation rule
 */
export declare function createValidationRule(field: string, validate: (value: any, config: CustomizationConfig) => ValidationError | null): ValidationRule;
//# sourceMappingURL=configValidation.d.ts.map