import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-surface">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-40 bg-dark-base overflow-hidden">
        {/* Subtle gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-ai-subtle opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-8 leading-tight">
            Transform Your Space
            <br />
            <span className="text-gradient-ai">with AI</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience AI-powered furniture design and planning. Upload room photos, 
            chat with our AI assistant, and get intelligent recommendations tailored to your space.
          </p>
          <div className="flex justify-center">
            <Link
              href="/widget-demo"
              className="px-10 py-5 bg-gradient-ai text-white rounded-lg font-semibold text-lg hover:shadow-glow-hover transition-all duration-300 glow-soft-hover"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 md:py-32 bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-dark-card p-8 lg:p-10 rounded-lg shadow-soft border border-subtle hover:border-ai-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-ai rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4 text-center">
                Upload Your Room
              </h3>
              <p className="text-text-secondary text-center leading-relaxed">
                Take photos of your space and provide room dimensions. Our AI analyzes 
                your room&apos;s layout, style, and available space.
              </p>
            </div>

            <div className="bg-dark-card p-8 lg:p-10 rounded-lg shadow-soft border border-subtle hover:border-ai-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-ai rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4 text-center">
                AI Recommendations
              </h3>
              <p className="text-text-secondary text-center leading-relaxed">
                Get personalized furniture recommendations with detailed dimensions, 
                materials, colors, and placement suggestions tailored to your space.
              </p>
            </div>

            <div className="bg-dark-card p-8 lg:p-10 rounded-lg shadow-soft border border-subtle hover:border-ai-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-ai rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4 text-center">
                Customize & Design
              </h3>
              <p className="text-text-secondary text-center leading-relaxed">
                Customize furniture with AI assistance - change colors, materials, 
                add ornaments, and see how dimensions adjust to your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 md:py-32 bg-dark-base overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-ai opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of users who have found their perfect furniture match with AI assistance.
          </p>
          <Link
            href="/widget-demo"
            className="inline-block px-10 py-5 bg-gradient-ai text-white rounded-lg font-semibold text-lg hover:shadow-glow-hover transition-all duration-300 glow-soft-hover"
          >
            Try Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
