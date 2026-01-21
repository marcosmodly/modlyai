/**
 * Rule engine for validating product configurations and filtering available options
 */

import {
  Rule,
  ConditionalRule,
  ExclusionRule,
  RequirementRule,
  CustomRule,
  RuleContext,
  RuleEngineResult,
  RuleViolation,
  RuleEvaluationResult,
} from './types';
import { ProductConfig, ProductSelection } from '../types';

/**
 * Evaluate a single condition against the current selections
 */
function evaluateCondition(
  condition: { optionGroupId: string; operator: string; value: any },
  selections: Record<string, any>
): boolean {
  const selectedValue = selections[condition.optionGroupId];
  
  if (selectedValue === undefined || selectedValue === null) {
    return false;
  }

  switch (condition.operator) {
    case 'equals':
      return selectedValue === condition.value;
    
    case 'notEquals':
      return selectedValue !== condition.value;
    
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(selectedValue);
    
    case 'notIn':
      return Array.isArray(condition.value) && !condition.value.includes(selectedValue);
    
    case 'greaterThan':
      return typeof selectedValue === 'number' && typeof condition.value === 'number' && selectedValue > condition.value;
    
    case 'lessThan':
      return typeof selectedValue === 'number' && typeof condition.value === 'number' && selectedValue < condition.value;
    
    default:
      return false;
  }
}

/**
 * Evaluate a conditional rule
 */
function evaluateConditionalRule(
  rule: ConditionalRule,
  context: RuleContext
): RuleEvaluationResult {
  const conditionMet = evaluateCondition(rule.condition, context.selections);
  
  if (conditionMet) {
    return applyRuleAction(rule.then, context);
  } else if (rule.else) {
    return applyRuleAction(rule.else, context);
  }
  
  return { valid: true };
}

/**
 * Apply a rule action and return available options
 */
function applyRuleAction(
  action: { optionGroupId: string; action: string; values?: string[]; value?: any },
  context: RuleContext
): RuleEvaluationResult {
  const availableOptions: Record<string, string[]> = {};
  
  switch (action.action) {
    case 'allow':
      if (action.values) {
        availableOptions[action.optionGroupId] = action.values;
      }
      return { valid: true, availableOptions };
    
    case 'disallow':
      // Get all options for this group and filter out disallowed ones
      const productConfig = context.productConfig as ProductConfig;
      const optionGroup = productConfig.optionGroups.find(og => og.id === action.optionGroupId);
      if (optionGroup && action.values) {
        const allowed = optionGroup.options
          .map(opt => opt.id)
          .filter(id => !action.values!.includes(id));
        availableOptions[action.optionGroupId] = allowed;
      }
      return { valid: true, availableOptions };
    
    case 'require':
      // This is handled by requirement rules
      return { valid: true };
    
    default:
      return { valid: true };
  }
}

/**
 * Evaluate an exclusion rule
 */
function evaluateExclusionRule(
  rule: ExclusionRule,
  context: RuleContext
): RuleEvaluationResult {
  const violations: RuleViolation[] = [];
  
  // Check if any conflicting combinations are selected
  const selectedGroups = Object.keys(context.selections);
  const conflictingGroups = rule.optionGroupIds.filter(id => selectedGroups.includes(id));
  
  if (conflictingGroups.length > 1) {
    // Check if selected values match the exclusion pattern
    for (const groupId of conflictingGroups) {
      const selectedValue = context.selections[groupId];
      const excludedValues = rule.values[groupId] || [];
      
      if (excludedValues.includes(String(selectedValue))) {
        // Check if other groups also have excluded values
        const otherConflicts = conflictingGroups
          .filter(id => id !== groupId)
          .some(id => {
            const otherValue = context.selections[id];
            const otherExcluded = rule.values[id] || [];
            return otherExcluded.includes(String(otherValue));
          });
        
        if (otherConflicts) {
          violations.push({
            ruleId: rule.id,
            ruleName: rule.name,
            message: rule.message || `Cannot combine selected options from ${conflictingGroups.join(', ')}`,
            affectedOptionGroups: conflictingGroups,
          });
        }
      }
    }
  }
  
  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * Evaluate a requirement rule
 */
function evaluateRequirementRule(
  rule: RequirementRule,
  context: RuleContext
): RuleEvaluationResult {
  const conditionMet = evaluateCondition(rule.condition, context.selections);
  
  if (conditionMet) {
    const requirementMet = evaluateCondition(rule.requires, context.selections);
    
    if (!requirementMet) {
      return {
        valid: false,
        violations: [{
          ruleId: rule.id,
          ruleName: rule.name,
          message: rule.message || `Selection requires ${rule.requires.optionGroupId} to be ${rule.requires.value}`,
          affectedOptionGroups: [rule.condition.optionGroupId, rule.requires.optionGroupId],
        }],
      };
    }
  }
  
  return { valid: true };
}

/**
 * Evaluate a custom rule
 */
function evaluateCustomRule(
  rule: CustomRule,
  context: RuleContext
): RuleEvaluationResult {
  return rule.evaluate(context);
}

/**
 * Validate a product selection against all rules
 */
export function validateSelection(
  selection: ProductSelection,
  rules: Rule[],
  productConfig: ProductConfig
): RuleEngineResult {
  const context: RuleContext = {
    selections: selection.selections,
    productConfig,
  };
  
  const violations: RuleViolation[] = [];
  const availableOptions: Record<string, string[]> = {};
  const messages: string[] = [];
  
  // Evaluate all rules
  for (const rule of rules) {
    let result: RuleEvaluationResult;
    
    switch (rule.type) {
      case 'conditional':
        result = evaluateConditionalRule(rule, context);
        break;
      
      case 'exclusion':
        result = evaluateExclusionRule(rule, context);
        break;
      
      case 'requirement':
        result = evaluateRequirementRule(rule, context);
        break;
      
      case 'custom':
        result = evaluateCustomRule(rule, context);
        break;
      
      default:
        continue;
    }
    
    if (!result.valid && result.violations) {
      violations.push(...result.violations);
    }
    
    if (result.availableOptions) {
      // Merge available options (intersection of all rules)
      for (const [groupId, options] of Object.entries(result.availableOptions)) {
        if (availableOptions[groupId]) {
          // Intersection: only keep options that are allowed by all rules
          availableOptions[groupId] = availableOptions[groupId].filter(opt => options.includes(opt));
        } else {
          availableOptions[groupId] = options;
        }
      }
    }
  }
  
  // Generate human-readable messages
  if (violations.length > 0) {
    violations.forEach(v => {
      if (v.message) {
        messages.push(v.message);
      }
    });
  }
  
  return {
    isValid: violations.length === 0,
    violations,
    availableOptions,
    messages,
  };
}

/**
 * Get available options for each option group based on current selections and rules
 */
export function getAvailableOptions(
  currentSelection: Partial<ProductSelection>,
  rules: Rule[],
  productConfig: ProductConfig
): Record<string, string[]> {
  const result = validateSelection(
    {
      productId: productConfig.id,
      selections: currentSelection.selections || {},
      timestamp: new Date().toISOString(),
    },
    rules,
    productConfig
  );
  
  // Start with all options available
  const allAvailable: Record<string, string[]> = {};
  
  for (const optionGroup of productConfig.optionGroups) {
    allAvailable[optionGroup.id] = optionGroup.options.map(opt => opt.id);
  }
  
  // Apply rule-based restrictions
  for (const [groupId, restrictedOptions] of Object.entries(result.availableOptions)) {
    if (allAvailable[groupId]) {
      // Intersection: only keep options that are in both lists
      allAvailable[groupId] = allAvailable[groupId].filter(opt => restrictedOptions.includes(opt));
    }
  }
  
  return allAvailable;
}

/**
 * Get human-readable rule violations
 */
export function getRuleViolations(
  selection: ProductSelection,
  rules: Rule[],
  productConfig: ProductConfig
): string[] {
  const result = validateSelection(selection, rules, productConfig);
  return result.messages;
}
