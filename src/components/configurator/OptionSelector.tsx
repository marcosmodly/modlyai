'use client';

/**
 * OptionSelector - Reusable selector for option groups
 */

import { OptionGroup, Option, ApprovalStatus } from '@/lib/configurator/types';

interface OptionSelectorProps {
  optionGroup: OptionGroup;
  selectedValue: string | string[] | number | undefined;
  availableOptions?: string[]; // Option IDs that are available (filtered by rules)
  disabled?: boolean;
  onChange: (value: string | string[] | number) => void;
}

export default function OptionSelector({
  optionGroup,
  selectedValue,
  availableOptions,
  disabled = false,
  onChange,
}: OptionSelectorProps) {
  const isOptionDisabled = (optionId: string): boolean => {
    if (disabled) return true;
    if (availableOptions && !availableOptions.includes(optionId)) {
      return true;
    }
    return false;
  };

  const getOptionTooltip = (option: Option, isDisabled: boolean): string | undefined => {
    if (!isDisabled) return undefined;
    
    if (availableOptions && !availableOptions.includes(option.id)) {
      return 'This option is not available with your current selections';
    }
    
    return undefined;
  };

  const renderSelect = () => {
    return (
      <select
        value={typeof selectedValue === 'string' ? selectedValue : ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2.5 border border-earth-border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth-sage focus:ring-opacity-50 focus:border-earth-sage transition-all disabled:opacity-50 disabled:cursor-not-allowed [&>option]:bg-white [&>option]:text-[#1A1C19]"
      >
        {!optionGroup.required && (
          <option value="">-- Select --</option>
        )}
        {optionGroup.options.map((option) => {
          const isDisabled = isOptionDisabled(option.id);
          return (
            <option
              key={option.id}
              value={option.id}
              disabled={isDisabled}
            >
              {option.label}
              {option.approvalStatus && option.approvalStatus !== 'none' && (
                ` (${option.approvalStatus.replace('-', ' ')})`
              )}
            </option>
          );
        })}
      </select>
    );
  };

  const renderRadio = () => {
    return (
      <div className="space-y-2">
        {optionGroup.options.map((option) => {
          const isDisabled = isOptionDisabled(option.id);
          const isSelected = selectedValue === option.id;
          const tooltip = getOptionTooltip(option, isDisabled);

          return (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-earth-sage/20 border-earth-sage'
                  : 'bg-earth-card border-earth-border hover:border-earth-sage/50'
              } ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              title={tooltip}
            >
              <input
                type="radio"
                name={optionGroup.id}
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                disabled={isDisabled || disabled}
                className="w-4 h-4 text-earth-sage focus:ring-earth-sage"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-heading">{option.label}</span>
                  {option.approvalStatus && option.approvalStatus !== 'none' && (
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      option.approvalStatus === 'designer-approved'
                        ? 'bg-blue-100 text-blue-700'
                        : option.approvalStatus === 'factory-approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {option.approvalStatus.replace('-', ' ')}
                    </span>
                  )}
                </div>
                {option.description && (
                  <p className="text-sm text-text-muted mt-1">{option.description}</p>
                )}
              </div>
              {option.imageUrl && (
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="w-16 h-16 object-cover rounded border border-earth-border"
                />
              )}
            </label>
          );
        })}
      </div>
    );
  };

  const renderCheckbox = () => {
    const selectedArray = Array.isArray(selectedValue) ? selectedValue : [];
    
    return (
      <div className="space-y-2">
        {optionGroup.options.map((option) => {
          const isDisabled = isOptionDisabled(option.id);
          const isSelected = selectedArray.includes(option.id);
          const tooltip = getOptionTooltip(option, isDisabled);

          return (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-earth-sage/20 border-earth-sage'
                  : 'bg-earth-card border-earth-border hover:border-earth-sage/50'
              } ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              title={tooltip}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...selectedArray, option.id]
                    : selectedArray.filter(id => id !== option.id);
                  onChange(newValue);
                }}
                disabled={isDisabled || disabled}
                className="w-4 h-4 text-earth-sage focus:ring-earth-sage rounded"
              />
              <div className="flex-1">
                <span className="font-medium text-text-heading">{option.label}</span>
                {option.description && (
                  <p className="text-sm text-text-muted mt-1">{option.description}</p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-text-heading">
        {optionGroup.label}
        {optionGroup.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {optionGroup.description && (
        <p className="text-sm text-text-muted">{optionGroup.description}</p>
      )}

      {optionGroup.type === 'select' && renderSelect()}
      {optionGroup.type === 'radio' && renderRadio()}
      {optionGroup.type === 'checkbox' && renderCheckbox()}
    </div>
  );
}
