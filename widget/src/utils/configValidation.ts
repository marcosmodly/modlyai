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

// Default validation rules
const defaultRules: ValidationRule[] = [
  // Dimension constraints
  {
    field: 'dimensionAdjustments.length',
    validate: (value, config) => {
      if (!value) return null;
      if (value < -2 || value > 3) {
        return {
          field: 'dimensionAdjustments.length',
          message: 'Length adjustment must be between -2m and +3m',
          severity: 'error',
        };
      }
      return null;
    },
  },
  {
    field: 'dimensionAdjustments.width',
    validate: (value, config) => {
      if (!value) return null;
      if (value < -1.5 || value > 2) {
        return {
          field: 'dimensionAdjustments.width',
          message: 'Width adjustment must be between -1.5m and +2m',
          severity: 'error',
        };
      }
      return null;
    },
  },
  {
    field: 'dimensionAdjustments.height',
    validate: (value, config) => {
      if (!value) return null;
      if (value < -0.5 || value > 1.5) {
        return {
          field: 'dimensionAdjustments.height',
          message: 'Height adjustment must be between -0.5m and +1.5m',
          severity: 'error',
        };
      }
      return null;
    },
  },
  // Color scheme validation
  {
    field: 'colorScheme.primary',
    validate: (value, config) => {
      if (!value || value.trim() === '') {
        return {
          field: 'colorScheme.primary',
          message: 'Primary color is required',
          severity: 'error',
        };
      }
      return null;
    },
  },
  // Material compatibility
  {
    field: 'materialOverrides',
    validate: (value, config) => {
      if (!value) return null;
      
      // Check for incompatible material combinations
      const primary = value.primary?.toLowerCase();
      const legs = value.legs?.toLowerCase();
      
      if (primary?.includes('glass') && legs?.includes('wood')) {
        return {
          field: 'materialOverrides',
          message: 'Glass primary material may not pair well with wooden legs. Consider metal legs for better structural support.',
          severity: 'warning',
        };
      }
      
      if (primary?.includes('marble') && !legs?.includes('metal')) {
        return {
          field: 'materialOverrides',
          message: 'Marble surfaces require metal legs for proper support',
          severity: 'error',
        };
      }
      
      return null;
    },
  },
  // Ornament validation
  {
    field: 'ornamentDetails',
    validate: (value, config) => {
      if (!value || !Array.isArray(value)) return null;
      
      if (value.length > 10) {
        return {
          field: 'ornamentDetails',
          message: 'Too many ornament details (maximum 10)',
          severity: 'error',
        };
      }
      
      if (value.length > 5) {
        return {
          field: 'ornamentDetails',
          message: 'Consider reducing the number of ornaments for a cleaner look',
          severity: 'warning',
        };
      }
      
      return null;
    },
  },
];

/**
 * Validates a configuration against a set of rules
 */
export function validateConfiguration(
  config: CustomizationConfig,
  customRules: ValidationRule[] = []
): ValidationResult {
  const rules = [...defaultRules, ...customRules];
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  for (const rule of rules) {
    const fieldParts = rule.field.split('.');
    let value: any = config;
    
    // Navigate to nested field
    for (const part of fieldParts) {
      if (value && typeof value === 'object') {
        value = value[part];
      } else {
        value = undefined;
        break;
      }
    }
    
    const error = rule.validate(value, config);
    if (error) {
      if (error.severity === 'error') {
        errors.push(error);
      } else {
        warnings.push(error);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates specific fields in a configuration
 */
export function validateField(
  field: string,
  value: any,
  config: CustomizationConfig,
  customRules: ValidationRule[] = []
): ValidationError | null {
  const rules = [...defaultRules, ...customRules];
  const matchingRule = rules.find(rule => rule.field === field);
  
  if (!matchingRule) {
    return null;
  }
  
  return matchingRule.validate(value, config);
}

/**
 * Creates a custom validation rule
 */
export function createValidationRule(
  field: string,
  validate: (value: any, config: CustomizationConfig) => ValidationError | null
): ValidationRule {
  return { field, validate };
}
