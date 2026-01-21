/**
 * Rule type definitions for the configurator rule engine
 */

export type RuleType = 'conditional' | 'exclusion' | 'requirement' | 'custom';

export interface RuleCondition {
  optionGroupId: string;
  operator: 'equals' | 'notEquals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan';
  value: string | string[] | number;
}

export interface RuleAction {
  optionGroupId: string;
  action: 'allow' | 'disallow' | 'require' | 'setDefault';
  values?: string[]; // For allow/disallow: list of allowed/disallowed values
  value?: string | number; // For setDefault: the default value
}

export interface ConditionalRule {
  type: 'conditional';
  id: string;
  name?: string;
  description?: string;
  condition: RuleCondition;
  then: RuleAction;
  else?: RuleAction; // Optional else action
}

export interface ExclusionRule {
  type: 'exclusion';
  id: string;
  name?: string;
  description?: string;
  optionGroupIds: string[]; // Groups that cannot be combined
  values: Record<string, string[]>; // optionGroupId -> values that conflict
  message?: string; // Human-readable violation message
}

export interface RequirementRule {
  type: 'requirement';
  id: string;
  name?: string;
  description?: string;
  condition: RuleCondition;
  requires: RuleCondition; // If condition is true, requires must be true
  message?: string; // Human-readable violation message
}

export interface CustomRule {
  type: 'custom';
  id: string;
  name?: string;
  description?: string;
  evaluate: (context: RuleContext) => RuleEvaluationResult;
}

export type Rule = ConditionalRule | ExclusionRule | RequirementRule | CustomRule;

export interface RuleContext {
  selections: Record<string, string | string[] | number>;
  productConfig: any; // ProductConfig reference
}

export interface RuleEvaluationResult {
  valid: boolean;
  message?: string;
  availableOptions?: Record<string, string[]>; // optionGroupId -> available option IDs
  violations?: RuleViolation[];
}

export interface RuleViolation {
  ruleId: string;
  ruleName?: string;
  message: string;
  affectedOptionGroups: string[];
}

export interface RuleEngineResult {
  isValid: boolean;
  violations: RuleViolation[];
  availableOptions: Record<string, string[]>; // optionGroupId -> available option IDs
  messages: string[]; // Human-readable messages
}
