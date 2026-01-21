'use client';

import Link from 'next/link';

export default function RoomPlannerPage() {
  return (
    <main className="min-h-screen bg-[#1A1C19] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#F0EFEA] mb-6">
            AI-Powered Room Planner
          </h1>
          <p className="text-lg md:text-xl text-[#F0EFEA] max-w-2xl mx-auto mb-8">
            Upload photos of your room and get AI-powered furniture recommendations 
            with detailed measurements and placement suggestions.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              AI Image Analysis
            </h3>
            <p className="text-text-primary">
              Our AI analyzes your room photos to detect style, colors, and existing furniture to make personalized recommendations.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Precise Measurements
            </h3>
            <p className="text-text-primary">
              Get furniture recommendations with exact dimensions, ensuring perfect fit for your space.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Placement Suggestions
            </h3>
            <p className="text-text-primary">
              Receive intelligent placement recommendations optimized for flow, functionality, and aesthetics.
            </p>
          </div>

          <div className="bg-earth-card p-6 rounded-xl border border-earth-border">
            <div className="w-12 h-12 bg-earth-sage/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              Style Matching
            </h3>
            <p className="text-text-primary">
              Our AI matches furniture to your room&apos;s existing style, colors, and aesthetic preferences.
            </p>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-[#242723] p-6 md:p-8 rounded-xl border border-[#3A3F38]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-earth-sage/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-text-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#F0EFEA]">
              Pro Tips for Best Results
            </h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-4 text-[#F0EFEA]">
            <li className="flex items-start gap-3">
              <span className="text-[#8DA38E] mt-0.5 flex-shrink-0">✓</span>
              <span>Take photos from multiple angles to show the full room layout</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8DA38E] mt-0.5 flex-shrink-0">✓</span>
              <span>Ensure good lighting so AI can detect colors and textures</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8DA38E] mt-0.5 flex-shrink-0">✓</span>
              <span>Measure your room dimensions accurately for precise recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8DA38E] mt-0.5 flex-shrink-0">✓</span>
              <span>Specify your style preferences for more personalized suggestions</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/widget-demo"
            className="inline-block px-8 py-4 bg-earth-forest text-white rounded-xl font-semibold text-lg hover:bg-earth-forest/90 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Try the Demo Now
          </Link>
          <p className="text-text-muted text-sm mt-4">
            Experience the full AI-powered room planning in our interactive demo
          </p>
        </div>
      </div>
    </main>
  );
}
