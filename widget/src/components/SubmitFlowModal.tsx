import React, { useState, useEffect } from 'react';
import { CustomizationConfig, FurnitureItem } from '../types';
import { generateSpecSheet, SpecSheet } from '../utils/specSheetGenerator';
import { validateConfiguration, ValidationResult } from '../utils/configValidation';
import { SpecSheetPreview } from './SpecSheetPreview';
import { ApiClient } from '../utils/apiClient';

interface SubmitFlowModalProps {
  config: CustomizationConfig;
  product?: FurnitureItem;
  apiClient: ApiClient;
  onSuccess: (data: { type: 'cart' | 'quote'; id: string }) => void;
  onClose: () => void;
}

type FlowType = 'cart' | 'quote';
type Step = 'validate' | 'preview' | 'form' | 'submitting' | 'success';

export function SubmitFlowModal({
  config,
  product,
  apiClient,
  onSuccess,
  onClose,
}: SubmitFlowModalProps) {
  const [step, setStep] = useState<Step>('validate');
  const [flowType, setFlowType] = useState<FlowType>('quote');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [specSheet, setSpecSheet] = useState<SpecSheet | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form fields for quote request
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  useEffect(() => {
    // Validate configuration
    const validationResult = validateConfiguration(config);
    setValidation(validationResult);

    // Determine flow type based on product pricing
    const requiresQuote =
      !product?.priceRange || product.stockStatus === 'custom_order';
    setFlowType(requiresQuote ? 'quote' : 'cart');

    // Generate spec sheet
    const sheet = generateSpecSheet(config, {
      estimatedCost: product?.priceRange?.min,
      requiresQuote,
    });
    setSpecSheet(sheet);

    // Move to preview if validation passes
    if (validationResult.valid) {
      setStep('preview');
    }
  }, [config, product]);

  const handleContinue = () => {
    if (!validation?.valid) {
      return;
    }

    if (flowType === 'cart') {
      handleAddToCart();
    } else {
      setStep('form');
    }
  };

  const handleAddToCart = async () => {
    if (!product || !specSheet) return;

    setStep('submitting');
    setError(null);

    try {
      // Call API to add to cart
      const response = await fetch(
        `${apiClient['config'].apiBaseUrl || window.location.origin}/api/cart/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            configuration: config,
            specSheet,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();
      setStep('success');
      setTimeout(() => {
        onSuccess({ type: 'cart', id: data.cartItemId });
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      setStep('preview');
    }
  };

  const handleSubmitQuote = async () => {
    if (!customerName || !customerEmail || !specSheet) {
      setError('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setStep('submitting');
    setError(null);

    try {
      const response = await apiClient.submitQuoteRequest({
        name: customerName,
        email: customerEmail,
        phone: customerPhone || undefined,
        notes: customerNotes || undefined,
        item: {
          name: config.baseItemName || config.baseItemType || 'Custom Furniture',
          dimensions: config.dimensionAdjustments || {},
          materials: config.materialOverrides,
          colorScheme: config.colorScheme,
          aiNotes: config.aiNotes,
        },
        specSheet,
      });

      setStep('success');
      setTimeout(() => {
        onSuccess({ type: 'quote', id: response.quoteId });
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quote request');
      setStep('form');
    }
  };

  if (step === 'validate' && validation && !validation.valid) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Issues</h3>

          <div className="space-y-3 mb-6">
            {validation.errors.map((error, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm font-medium text-red-900">{error.field}</p>
                <p className="text-sm text-red-700">{error.message}</p>
              </div>
            ))}
            {validation.warnings.map((warning, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm font-medium text-yellow-900">{warning.field}</p>
                <p className="text-sm text-yellow-700">{warning.message}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Go Back & Fix
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview' && specSheet) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <SpecSheetPreview specSheet={specSheet} onClose={onClose} />

          {validation && validation.warnings.length > 0 && (
            <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium mb-1">⚠️ Warnings:</p>
              {validation.warnings.map((warning, index) => (
                <p key={index} className="text-xs text-yellow-700">
                  • {warning.message}
                </p>
              ))}
            </div>
          )}

          {error && (
            <div className="px-6 py-3 bg-red-50 border-t border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="border-t border-gray-200 p-4 flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
            >
              {flowType === 'cart' ? 'Add to Cart' : 'Request Quote'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request a Quote</h3>
          <p className="text-sm text-gray-600 mb-6">
            Fill in your details and we'll get back to you with a personalized quote.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Any special requests or questions?"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('preview')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmitQuote}
              className="flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
            >
              Submit Quote Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'submitting') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">
            {flowType === 'cart' ? 'Adding to cart...' : 'Submitting quote request...'}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {flowType === 'cart' ? 'Added to Cart!' : 'Quote Request Submitted!'}
          </h3>
          <p className="text-gray-600">
            {flowType === 'cart'
              ? 'Your customized product has been added to your cart.'
              : "We'll review your request and get back to you soon."}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
