'use client';

/**
 * SpecSheetViewer - Display and export spec sheets
 */

import { useState } from 'react';
import { ProductConfig, ProductSelection } from '@/lib/configurator/types';
import { generateSpecSheetJSON, formatSpecSheetText } from '@/lib/configurator/spec-sheet/generator';
import { SpecSheetHTML, renderSpecSheetHTML } from '@/lib/configurator/spec-sheet/html-template';

interface SpecSheetViewerProps {
  selection: ProductSelection;
  productConfig: ProductConfig;
}

export default function SpecSheetViewer({
  selection,
  productConfig,
}: SpecSheetViewerProps) {
  const [showPreview, setShowPreview] = useState(false);

  const specSheetData = generateSpecSheetJSON(selection, productConfig);

  const handleDownloadJSON = () => {
    const json = JSON.stringify(specSheetData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spec-sheet-${specSheetData.quoteId || specSheetData.productId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const html = renderSpecSheetHTML(specSheetData);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spec-sheet-${specSheetData.quoteId || specSheetData.productId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
      setShowPreview(false);
    }, 100);
  };

  const handleDownloadText = () => {
    const text = formatSpecSheetText(specSheetData);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spec-sheet-${specSheetData.quoteId || specSheetData.productId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showPreview) {
    return (
      <div className="print-only">
        <SpecSheetHTML data={specSheetData} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-earth-input p-4 rounded-lg border border-earth-border space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-text-heading">Product:</span>
          <span className="text-sm text-text-primary">{specSheetData.productName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-text-heading">SKU:</span>
          <span className="text-sm text-text-primary">{specSheetData.sku}</span>
        </div>
        {specSheetData.quoteId && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-text-heading">Quote ID:</span>
            <span className="text-sm text-text-primary font-mono">{specSheetData.quoteId}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-text-heading">Date:</span>
          <span className="text-sm text-text-primary">
            {new Date(specSheetData.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Selections Summary */}
      <div className="bg-earth-input p-4 rounded-lg border border-earth-border">
        <h4 className="text-sm font-semibold text-text-heading mb-3">Configuration:</h4>
        <div className="space-y-2">
          {Object.entries(specSheetData.selections).map(([groupId, selection]) => (
            <div key={groupId} className="flex justify-between items-center text-sm">
              <span className="text-text-muted">{selection.groupLabel}:</span>
              <span className="text-text-heading font-medium">{selection.selectedLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="bg-earth-input p-4 rounded-lg border border-earth-border">
        <h4 className="text-sm font-semibold text-text-heading mb-3">Dimensions:</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <div className="font-semibold text-text-heading">{specSheetData.dimensions.length}</div>
            <div className="text-text-muted text-xs">Length</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-text-heading">{specSheetData.dimensions.width}</div>
            <div className="text-text-muted text-xs">Width</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-text-heading">{specSheetData.dimensions.height}</div>
            <div className="text-text-muted text-xs">Height</div>
          </div>
        </div>
        <div className="text-xs text-text-muted text-center mt-2">
          ({specSheetData.dimensions.unit || 'cm'})
        </div>
      </div>

      {/* Export Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleDownloadJSON}
          className="w-full px-4 py-2 bg-earth-forest text-white rounded-lg font-medium hover:bg-earth-forest/90 transition-all text-sm"
        >
          Download JSON
        </button>
        <button
          onClick={handleDownloadHTML}
          className="w-full px-4 py-2 bg-earth-sage text-white rounded-lg font-medium hover:bg-earth-sage/90 transition-all text-sm"
        >
          Download HTML
        </button>
        <button
          onClick={handlePrint}
          className="w-full px-4 py-2 bg-earth-card border border-earth-border text-text-heading rounded-lg font-medium hover:bg-earth-input transition-all text-sm"
        >
          Print / PDF
        </button>
        <button
          onClick={handleDownloadText}
          className="w-full px-4 py-2 bg-earth-card border border-earth-border text-text-heading rounded-lg font-medium hover:bg-earth-input transition-all text-sm"
        >
          Download Text
        </button>
      </div>

      {/* Notes */}
      {specSheetData.notes && (
        <div className="bg-earth-input p-4 rounded-lg border border-earth-border">
          <h4 className="text-sm font-semibold text-text-heading mb-2">Notes:</h4>
          <p className="text-sm text-text-primary">{specSheetData.notes}</p>
        </div>
      )}
    </div>
  );
}
