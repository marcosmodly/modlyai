import React, { useState } from 'react';
import { QuoteRequest, CustomizedFurnitureItem, Recommendation } from '../types';
import { useWebsiteColors } from '../utils/useWebsiteColors';

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuoteRequest) => Promise<void>;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
}

export function QuoteRequestForm({
  isOpen,
  onClose,
  onSubmit,
  item,
  recommendation,
}: QuoteRequestFormProps) {
  const websiteColors = useWebsiteColors();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayItem = item || (recommendation ? {
    name: recommendation.item.name,
    dimensions: recommendation.item.dimensions,
    materials: recommendation.item.materials,
    colorScheme: {
      primary: recommendation.item.colors.main,
      secondary: recommendation.item.colors.accent,
    },
    aiNotes: recommendation.reasoning,
    placement: recommendation.placement,
  } : null);

  if (!displayItem) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const quoteRequest: QuoteRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        notes: formData.notes.trim() || undefined,
        item: {
          name: displayItem.name,
          dimensions: {
            length: displayItem.dimensions.length,
            width: displayItem.dimensions.width,
            height: displayItem.dimensions.height,
          },
          materials: displayItem.materials,
          colorScheme: displayItem.colorScheme,
          aiNotes: displayItem.aiNotes,
          placement: 'placement' in displayItem && displayItem.placement ? {
            wall: displayItem.placement.wall,
            position: displayItem.placement.position,
            coordinates: displayItem.placement.coordinates,
            reasoning: displayItem.placement.reasoning,
          } : undefined,
        },
      };

      await onSubmit(quoteRequest);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quote request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2A2D28] rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="sticky top-0 bg-[#2A2D28] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Request Quote</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <p className="text-white/60 text-sm mb-4">
              Please provide your contact information and we'll send you a detailed quote for:
            </p>
            <p className="text-white font-medium">{displayItem.name}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Your name"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
              Phone <span className="text-white/40 text-xs">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
            />
          </div>

          {/* Notes Field */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
              Additional Notes <span className="text-white/40 text-xs">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none"
              placeholder="Any special requests or questions..."
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: websiteColors.primary,
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Quote Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
