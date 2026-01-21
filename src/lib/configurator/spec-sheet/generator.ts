/**
 * Spec Sheet Generator
 * Generates JSON and prepares data for HTML/PDF export
 */

import { ProductConfig, ProductSelection, SpecSheetData } from '../types';

/**
 * Generate spec sheet JSON from product selection
 */
export function generateSpecSheetJSON(
  selection: ProductSelection,
  productConfig: ProductConfig
): SpecSheetData {
  // Build selections with labels
  const selectionsWithLabels: Record<string, {
    groupLabel: string;
    selectedLabel: string;
    selectedValue: string;
  }> = {};

  for (const [groupId, selectedValue] of Object.entries(selection.selections)) {
    const optionGroup = productConfig.optionGroups.find(og => og.id === groupId);
    if (!optionGroup) continue;

    const valueStr = Array.isArray(selectedValue) 
      ? selectedValue.join(', ') 
      : String(selectedValue);
    
    // Find the selected option to get its label
    let selectedLabel = valueStr;
    if (typeof selectedValue === 'string') {
      const option = optionGroup.options.find(opt => opt.id === selectedValue || opt.value === selectedValue);
      if (option) {
        selectedLabel = option.label;
      }
    }

    selectionsWithLabels[groupId] = {
      groupLabel: optionGroup.label,
      selectedLabel,
      selectedValue: valueStr,
    };
  }

  return {
    productId: productConfig.id,
    productName: productConfig.name,
    sku: productConfig.sku,
    timestamp: selection.timestamp || new Date().toISOString(),
    quoteId: selection.quoteId || generateQuoteId(),
    selections: selectionsWithLabels,
    dimensions: {
      ...productConfig.dimensions,
      unit: productConfig.dimensions.unit || 'cm',
    },
    notes: selection.notes,
    metadata: {
      ...productConfig.metadata,
      brand: productConfig.brand,
      category: productConfig.category,
    },
  };
}

/**
 * Generate a unique quote/request ID
 */
function generateQuoteId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `QUOTE-${timestamp}-${random}`.toUpperCase();
}

/**
 * Format spec sheet data as a printable string
 */
export function formatSpecSheetText(data: SpecSheetData): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(60));
  lines.push(`PRODUCT SPECIFICATION SHEET`);
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Product: ${data.productName}`);
  lines.push(`SKU: ${data.sku}`);
  lines.push(`Quote ID: ${data.quoteId || 'N/A'}`);
  lines.push(`Generated: ${new Date(data.timestamp).toLocaleString()}`);
  lines.push('');
  lines.push('-'.repeat(60));
  lines.push('CONFIGURATION');
  lines.push('-'.repeat(60));
  lines.push('');

  // Selections
  for (const [groupId, selection] of Object.entries(data.selections)) {
    lines.push(`${selection.groupLabel}: ${selection.selectedLabel}`);
  }

  lines.push('');
  lines.push('-'.repeat(60));
  lines.push('DIMENSIONS');
  lines.push('-'.repeat(60));
  lines.push('');
  lines.push(`Length: ${data.dimensions.length} ${data.dimensions.unit || 'cm'}`);
  lines.push(`Width: ${data.dimensions.width} ${data.dimensions.unit || 'cm'}`);
  lines.push(`Height: ${data.dimensions.height} ${data.dimensions.unit || 'cm'}`);

  if (data.notes) {
    lines.push('');
    lines.push('-'.repeat(60));
    lines.push('NOTES');
    lines.push('-'.repeat(60));
    lines.push('');
    lines.push(data.notes);
  }

  lines.push('');
  lines.push('='.repeat(60));
  lines.push(`End of Specification Sheet`);
  lines.push('='.repeat(60));

  return lines.join('\n');
}
