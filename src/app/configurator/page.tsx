'use client';

import Link from 'next/link';

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-earth-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
            Product Configurator
          </h1>
          <p className="text-lg md:text-xl text-text-primary max-w-2xl mx-auto mb-8">
            Configure products using AI-guided customization or rule-based manual configuration. 
            Perfect for creating custom furniture pieces tailored to your exact specifications.
          </p>
          
          <Link
            href="/widget-demo"
            className="inline-block px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Try the Demo
          </Link>
        </div>

        {/* Configuration Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-earth-card p-8 rounded-xl border border-earth-border hover:border-earth-sage transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">
              AI Guided Customizer
            </h2>
            <p className="text-text-primary mb-4">
              Use AI to customize furniture with natural language. Describe your vision and let AI handle the details.
            </p>
            <ul className="space-y-2 text-sm text-text-muted mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Natural language input
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AI-powered suggestions
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Creative freedom
              </li>
            </ul>
          </div>

          <div className="bg-earth-card p-8 rounded-xl border border-earth-border hover:border-earth-sage transition-all">
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-2xl font-semibold text-text-heading mb-3">
              Manual Configuration
            </h2>
            <p className="text-text-primary mb-4">
              Configure products using predefined options with rule-based validation. Perfect for factory-approved configurations.
            </p>
            <ul className="space-y-2 text-sm text-text-muted mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Predefined options
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Rule-based validation
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Spec sheet generation
              </li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="bg-earth-card p-6 md:p-8 rounded-xl border border-earth-border mb-12">
          <h2 className="text-2xl font-semibold text-text-heading mb-6 text-center">
            Configuration Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Configuration Validation</h3>
              <p className="text-sm text-text-primary">
                Real-time validation ensures your configuration is manufacturable and meets all requirements.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Spec Sheet Generation</h3>
              <p className="text-sm text-text-primary">
                Automatically generate detailed specification sheets for manufacturing and quotes.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Cart & Quote Flows</h3>
              <p className="text-sm text-text-primary">
                Seamlessly add to cart for standard items or request quotes for custom configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-earth-card p-6 md:p-8 rounded-xl border border-earth-border mb-12">
          <h2 className="text-2xl font-semibold text-text-heading mb-6 text-center">
            Configuration Workflow
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-earth-sage text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-heading mb-1">Select Product</h3>
                <p className="text-sm text-text-primary">
                  Browse our catalog or get AI recommendations based on your preferences
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-earth-sage text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-heading mb-1">Configure Options</h3>
                <p className="text-sm text-text-primary">
                  Choose materials, colors, dimensions, and additional features
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-earth-sage text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-heading mb-1">Validate Configuration</h3>
                <p className="text-sm text-text-primary">
                  System validates your choices against manufacturing constraints
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-earth-sage text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-text-heading mb-1">Review & Submit</h3>
                <p className="text-sm text-text-primary">
                  Review your spec sheet and either add to cart or request a custom quote
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/widget-demo"
            className="inline-block px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Try the Configurator Demo
          </Link>
          <p className="text-text-muted text-sm mt-4">
            Experience both AI-guided and manual configuration methods in our interactive demo
          </p>
        </div>
      </div>
    </main>
  );
}
