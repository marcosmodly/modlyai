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
export function generateSpecSheet(
  config: CustomizationConfig,
  additionalData?: {
    estimatedCost?: number;
    customerNotes?: string;
    requiresQuote?: boolean;
  }
): SpecSheet {
  const specId = `SPEC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const generatedAt = new Date().toISOString();
  
  // Build customizations list
  const customizations: string[] = [];
  
  if (config.dimensionAdjustments) {
    if (config.dimensionAdjustments.length) {
      customizations.push(`Length adjustment: ${config.dimensionAdjustments.length > 0 ? '+' : ''}${config.dimensionAdjustments.length}m`);
    }
    if (config.dimensionAdjustments.width) {
      customizations.push(`Width adjustment: ${config.dimensionAdjustments.width > 0 ? '+' : ''}${config.dimensionAdjustments.width}m`);
    }
    if (config.dimensionAdjustments.height) {
      customizations.push(`Height adjustment: ${config.dimensionAdjustments.height > 0 ? '+' : ''}${config.dimensionAdjustments.height}m`);
    }
  }
  
  if (config.ornamentDetails && config.ornamentDetails.length > 0) {
    customizations.push(...config.ornamentDetails.map(detail => `Ornament: ${detail}`));
  }
  
  if (config.aiNotes) {
    customizations.push(`AI Notes: ${config.aiNotes}`);
  }
  
  return {
    specId,
    generatedAt,
    product: {
      name: config.baseItemName || config.baseItemType || 'Custom Furniture',
      baseItemId: config.baseItemId,
      category: config.baseItemType || 'furniture',
    },
    configuration: {
      dimensions: config.dimensionAdjustments,
      materials: {
        ...config.materialOverrides,
      },
      colors: config.colorScheme,
      customizations,
    },
    pricing: {
      estimatedCost: additionalData?.estimatedCost,
      requiresQuote: additionalData?.requiresQuote ?? true,
    },
    customerNotes: additionalData?.customerNotes,
  };
}

/**
 * Generates HTML representation of a spec sheet (for printing/download)
 */
export function generateSpecSheetHTML(specSheet: SpecSheet): string {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Specification Sheet - ${specSheet.specId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      border-bottom: 3px solid #2c3e50;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .spec-id {
      color: #7f8c8d;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 15px;
      background: #ecf0f1;
      border-radius: 5px;
    }
    
    .meta-item {
      flex: 1;
    }
    
    .meta-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .meta-value {
      font-size: 14px;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      color: #2c3e50;
      font-size: 18px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #ecf0f1;
    }
    
    .field {
      margin-bottom: 12px;
      padding-left: 10px;
    }
    
    .field-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    
    .field-value {
      font-size: 15px;
      color: #2c3e50;
      font-weight: 500;
    }
    
    .color-swatch {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid #ddd;
      vertical-align: middle;
      margin-right: 8px;
    }
    
    .customization-list {
      list-style: none;
      padding-left: 10px;
    }
    
    .customization-list li {
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
      font-size: 14px;
    }
    
    .customization-list li:last-child {
      border-bottom: none;
    }
    
    .customization-list li::before {
      content: "→";
      color: #3498db;
      margin-right: 10px;
      font-weight: bold;
    }
    
    .pricing {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 5px;
      border-left: 4px solid #4caf50;
    }
    
    .pricing-label {
      font-size: 14px;
      color: #2e7d32;
      margin-bottom: 5px;
    }
    
    .pricing-value {
      font-size: 24px;
      color: #1b5e20;
      font-weight: 700;
    }
    
    .requires-quote {
      background: #fff3e0;
      border-left-color: #ff9800;
    }
    
    .requires-quote .pricing-label {
      color: #e65100;
    }
    
    .requires-quote .pricing-value {
      color: #bf360c;
    }
    
    .notes {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      font-style: italic;
      color: #555;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #ecf0f1;
      text-align: center;
      color: #95a5a6;
      font-size: 12px;
    }
    
    @media print {
      body {
        padding: 20px;
      }
      
      .header {
        page-break-after: avoid;
      }
      
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Product Specification Sheet</h1>
    <div class="spec-id">Spec ID: ${specSheet.specId}</div>
  </div>
  
  <div class="meta">
    <div class="meta-item">
      <div class="meta-label">Product Name</div>
      <div class="meta-value">${specSheet.product.name}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Category</div>
      <div class="meta-value">${specSheet.product.category}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Generated</div>
      <div class="meta-value">${formatDate(specSheet.generatedAt)}</div>
    </div>
  </div>
  
  ${specSheet.product.baseItemId ? `
  <div class="section">
    <div class="section-title">Base Product</div>
    <div class="field">
      <div class="field-label">Base Item ID</div>
      <div class="field-value">${specSheet.product.baseItemId}</div>
    </div>
  </div>
  ` : ''}
  
  ${specSheet.configuration.dimensions && Object.keys(specSheet.configuration.dimensions).length > 0 ? `
  <div class="section">
    <div class="section-title">Dimensions</div>
    ${specSheet.configuration.dimensions.length ? `
    <div class="field">
      <div class="field-label">Length</div>
      <div class="field-value">${specSheet.configuration.dimensions.length}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.width ? `
    <div class="field">
      <div class="field-label">Width</div>
      <div class="field-value">${specSheet.configuration.dimensions.width}m</div>
    </div>
    ` : ''}
    ${specSheet.configuration.dimensions.height ? `
    <div class="field">
      <div class="field-label">Height</div>
      <div class="field-value">${specSheet.configuration.dimensions.height}m</div>
    </div>
    ` : ''}
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Materials</div>
    ${Object.entries(specSheet.configuration.materials)
      .filter(([key, value]) => value)
      .map(([key, value]) => `
    <div class="field">
      <div class="field-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
      <div class="field-value">${value}</div>
    </div>
    `).join('')}
  </div>
  
  <div class="section">
    <div class="section-title">Color Scheme</div>
    <div class="field">
      <div class="field-label">Primary Color</div>
      <div class="field-value">${specSheet.configuration.colors.primary}</div>
    </div>
    ${specSheet.configuration.colors.secondary ? `
    <div class="field">
      <div class="field-label">Secondary Color</div>
      <div class="field-value">${specSheet.configuration.colors.secondary}</div>
    </div>
    ` : ''}
    ${specSheet.configuration.colors.accent ? `
    <div class="field">
      <div class="field-label">Accent Color</div>
      <div class="field-value">${specSheet.configuration.colors.accent}</div>
    </div>
    ` : ''}
  </div>
  
  ${specSheet.configuration.customizations.length > 0 ? `
  <div class="section">
    <div class="section-title">Customizations</div>
    <ul class="customization-list">
      ${specSheet.configuration.customizations.map(custom => `
      <li>${custom}</li>
      `).join('')}
    </ul>
  </div>
  ` : ''}
  
  <div class="section">
    <div class="section-title">Pricing</div>
    <div class="pricing ${specSheet.pricing.requiresQuote ? 'requires-quote' : ''}">
      <div class="pricing-label">
        ${specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost'}
      </div>
      <div class="pricing-value">
        ${specSheet.pricing.estimatedCost 
          ? `$${specSheet.pricing.estimatedCost.toLocaleString()}` 
          : 'Contact for Pricing'}
      </div>
    </div>
  </div>
  
  ${specSheet.customerNotes ? `
  <div class="section">
    <div class="section-title">Customer Notes</div>
    <div class="notes">
      ${specSheet.customerNotes}
    </div>
  </div>
  ` : ''}
  
  <div class="footer">
    This specification sheet was generated automatically. Please contact us for any questions or modifications.
  </div>
</body>
</html>
  `.trim();
}

/**
 * Opens spec sheet HTML in a new window for printing
 */
export function printSpecSheet(specSheet: SpecSheet): void {
  const html = generateSpecSheetHTML(specSheet);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  } else {
    console.error('Failed to open print window. Please check your popup blocker settings.');
  }
}
