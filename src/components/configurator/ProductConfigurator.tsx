'use client';

/**
 * ProductConfigurator - Main orchestrator component
 * Handles option selection, rule validation, preview, and spec sheet generation
 */

import { useState, useEffect, useMemo } from 'react';
import { ProductConfig, ProductSelection } from '@/lib/configurator/types';
import { Rule } from '@/lib/configurator/rules/types';
import { validateSelection, getAvailableOptions } from '@/lib/configurator/rules/engine';
import OptionSelector from './OptionSelector';
import PreviewContainer from './PreviewContainer';
import SpecSheetViewer from './SpecSheetViewer';

interface ProductConfiguratorProps {
  productConfig: ProductConfig;
  rules: Rule[];
  initialSelection?: Partial<ProductSelection>;
  onSelectionChange?: (selection: ProductSelection) => void;
}

export default function ProductConfigurator({
  productConfig,
  rules,
  initialSelection,
  onSelectionChange,
}: ProductConfiguratorProps) {
  // Initialize selection with defaults
  const getInitialSelections = (): Record<string, any> => {
    const selections: Record<string, any> = {};
    
    for (const optionGroup of productConfig.optionGroups) {
      if (optionGroup.defaultOptionId) {
        selections[optionGroup.id] = optionGroup.defaultOptionId;
      } else if (optionGroup.required && optionGroup.options.length > 0) {
        // Auto-select first option if required
        selections[optionGroup.id] = optionGroup.options[0].id;
      }
    }
    
    // Merge with initial selection if provided
    if (initialSelection?.selections) {
      Object.assign(selections, initialSelection.selections);
    }
    
    return selections;
  };

  const [selections, setSelections] = useState<Record<string, any>>(getInitialSelections());
  const [currentSelection, setCurrentSelection] = useState<ProductSelection>({
    productId: productConfig.id,
    selections,
    timestamp: new Date().toISOString(),
  });

  // Update current selection when selections change
  useEffect(() => {
    const newSelection: ProductSelection = {
      productId: productConfig.id,
      selections,
      timestamp: new Date().toISOString(),
    };
    setCurrentSelection(newSelection);
    onSelectionChange?.(newSelection);
  }, [selections, productConfig.id, onSelectionChange]);

  // Validate current selection
  const validationResult = useMemo(() => {
    return validateSelection(currentSelection, rules, productConfig);
  }, [currentSelection, rules, productConfig]);

  // Get available options (filtered by rules)
  const availableOptions = useMemo(() => {
    return getAvailableOptions(currentSelection, rules, productConfig);
  }, [currentSelection, rules, productConfig]);

  const handleOptionChange = (optionGroupId: string, value: string | string[] | number) => {
    setSelections(prev => ({
      ...prev,
      [optionGroupId]: value,
    }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Configuration Panel */}
      <div className="bg-earth-card p-6 rounded-xl shadow-soft border border-earth-border">
        <h2 className="text-2xl font-semibold text-text-heading mb-6">
          Configure {productConfig.name}
        </h2>

        {/* Validation Messages */}
        {validationResult.violations.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold mb-2">Configuration Issues:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {validationResult.messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Option Selectors */}
        <div className="space-y-6">
          {productConfig.optionGroups.map((optionGroup) => (
            <OptionSelector
              key={optionGroup.id}
              optionGroup={optionGroup}
              selectedValue={selections[optionGroup.id]}
              availableOptions={availableOptions[optionGroup.id]}
              onChange={(value) => handleOptionChange(optionGroup.id, value)}
            />
          ))}
        </div>
      </div>

      {/* Preview and Spec Sheet */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="bg-earth-card p-6 rounded-xl shadow-soft border border-earth-border">
          <h3 className="text-xl font-semibold text-text-heading mb-4">Preview</h3>
          <div className="h-[500px]">
            <PreviewContainer
              productConfig={productConfig}
              selection={currentSelection}
            />
          </div>
        </div>

        {/* Spec Sheet */}
        <div className="bg-earth-card p-6 rounded-xl shadow-soft border border-earth-border">
          <h3 className="text-xl font-semibold text-text-heading mb-4">Specification Sheet</h3>
          <SpecSheetViewer
            selection={currentSelection}
            productConfig={productConfig}
          />
        </div>
      </div>
    </div>
  );
}
