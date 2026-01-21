import React from 'react';
import { SpecSheet, printSpecSheet } from '../utils/specSheetGenerator';

interface SpecSheetPreviewProps {
  specSheet: SpecSheet;
  onClose?: () => void;
}

export function SpecSheetPreview({ specSheet, onClose }: SpecSheetPreviewProps) {
  const handlePrint = () => {
    printSpecSheet(specSheet);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg max-w-2xl mx-auto">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Specification Sheet</h3>
          <p className="text-xs text-gray-500 mt-1">Spec ID: {specSheet.specId}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
        {/* Product Info */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Product</h4>
          <div className="bg-gray-50 rounded p-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Name:</span>
              <span className="text-sm font-medium text-gray-900">{specSheet.product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Category:</span>
              <span className="text-sm font-medium text-gray-900">{specSheet.product.category}</span>
            </div>
            {specSheet.product.baseItemId && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Base Item ID:</span>
                <span className="text-sm font-medium text-gray-900">
                  {specSheet.product.baseItemId}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Generated:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(specSheet.generatedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        {specSheet.configuration.dimensions &&
          Object.keys(specSheet.configuration.dimensions).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Dimensions</h4>
              <div className="bg-gray-50 rounded p-3 space-y-1">
                {specSheet.configuration.dimensions.length && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Length:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {specSheet.configuration.dimensions.length}m
                    </span>
                  </div>
                )}
                {specSheet.configuration.dimensions.width && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Width:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {specSheet.configuration.dimensions.width}m
                    </span>
                  </div>
                )}
                {specSheet.configuration.dimensions.height && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Height:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {specSheet.configuration.dimensions.height}m
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Materials */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Materials</h4>
          <div className="bg-gray-50 rounded p-3 space-y-1">
            {Object.entries(specSheet.configuration.materials)
              .filter(([key, value]) => value)
              .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm text-gray-600 capitalize">{key}:</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Color Scheme</h4>
          <div className="bg-gray-50 rounded p-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Primary:</span>
              <span className="text-sm font-medium text-gray-900">
                {specSheet.configuration.colors.primary}
              </span>
            </div>
            {specSheet.configuration.colors.secondary && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Secondary:</span>
                <span className="text-sm font-medium text-gray-900">
                  {specSheet.configuration.colors.secondary}
                </span>
              </div>
            )}
            {specSheet.configuration.colors.accent && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Accent:</span>
                <span className="text-sm font-medium text-gray-900">
                  {specSheet.configuration.colors.accent}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Customizations */}
        {specSheet.configuration.customizations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Customizations</h4>
            <div className="bg-gray-50 rounded p-3">
              <ul className="space-y-1">
                {specSheet.configuration.customizations.map((custom, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2">→</span>
                    <span>{custom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Pricing */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Pricing</h4>
          <div
            className={`rounded p-3 ${
              specSheet.pricing.requiresQuote
                ? 'bg-orange-50 border border-orange-200'
                : 'bg-green-50 border border-green-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {specSheet.pricing.requiresQuote ? 'Quote Required' : 'Estimated Cost'}
              </span>
              <span className="text-lg font-bold text-gray-900">
                {specSheet.pricing.estimatedCost
                  ? `$${specSheet.pricing.estimatedCost.toLocaleString()}`
                  : 'Contact for Pricing'}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        {specSheet.customerNotes && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer Notes</h4>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-700 italic">{specSheet.customerNotes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
