'use client';

import Link from 'next/link';

export default function CustomizerPage() {
  return (
    <main className="min-h-screen bg-earth-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
            AI Furniture Customizer
          </h1>
          <p className="text-lg md:text-xl text-text-primary max-w-2xl mx-auto mb-8">
            Use AI to customize furniture designs with natural language. Change colors, materials, 
            add ornaments, and adjust dimensions to match your vision.
          </p>
          
          <Link
            href="/widget-demo"
            className="inline-block px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Try the Demo
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Natural Language Input
            </h3>
            <p className="text-text-primary">
              Describe your vision in plain English. &quot;Make it darker with walnut legs&quot; - and watch AI transform your design.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Material Selection
            </h3>
            <p className="text-text-primary">
              Choose from a wide range of materials including solid wood, metal, fabric, and more for different components.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Color Customization
            </h3>
            <p className="text-text-primary">
              Select from earthy tones, modern palettes, or custom colors to perfectly match your space.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Dimension Adjustments
            </h3>
            <p className="text-text-primary">
              Modify length, width, and height to fit your exact space requirements and preferences.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Ornamental Details
            </h3>
            <p className="text-text-primary">
              Add decorative elements, carvings, hardware, and finishing touches to make your piece unique.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Instant Preview
            </h3>
            <p className="text-text-primary">
              See your changes reflected immediately with detailed specification sheets and visual previews.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-earth-card p-6 md:p-8 rounded-xl border border-earth-border mb-12">
          <h2 className="text-2xl font-semibold text-text-heading mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-earth-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Select a Product</h3>
              <p className="text-sm text-text-primary">
                Choose from our catalog or get AI recommendations based on your room
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-earth-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Customize with AI</h3>
              <p className="text-sm text-text-primary">
                Use natural language or manual controls to adjust colors, materials, and dimensions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-earth-sage text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-text-heading mb-2">Request a Quote</h3>
              <p className="text-sm text-text-primary">
                Get a detailed spec sheet and request a custom quote for your design
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/widget-demo"
            className="inline-block px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Start Customizing Now
          </Link>
          <p className="text-text-muted text-sm mt-4">
            Experience the power of AI-driven furniture customization in our demo
          </p>
        </div>
      </div>
    </main>
  );
}
