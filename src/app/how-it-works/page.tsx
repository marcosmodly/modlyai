import {
  Code,
  Smartphone,
  BarChart3,
  CheckCircle,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import WidgetOpenCta from "@/components/WidgetOpenCta";

export default function HowItWorksPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How ModlyAI Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From installation to increased sales in 3 simple steps
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 font-mono text-sm">
                <div className="text-green-400 mb-2">{'// Add to your website'}</div>
                <div className="text-gray-300">
                  {'<script src="modlyai.tech/widget.js"></script>'}
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                <Code className="w-4 h-4" />
                Step 1
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Install in 5 Minutes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Add one line of code to your website. Works with Shopify,
                WooCommerce, or any platform.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">No coding required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Automatic catalog sync</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Customizable branding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                <Smartphone className="w-4 h-4" />
                Step 2
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Customers Get AI Help
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Shoppers upload room photos and get instant recommendations for
                furniture that actually fits.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Mobile-optimized interface</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Room photo upload with user-provided room details
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Style matching algorithm</span>
                </li>
              </ul>
            </div>

            <div className="order-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                  <img
                    src="/images/2nd_day_photo.png"
                    alt="Customer visualizing furniture in their room"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <img
                    src="/images/step3-analytics.png"
                    alt="ModlyAI Analytics Dashboard"
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">-40%</div>
                    <div className="text-xs text-gray-600">Returns</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+25%</div>
                    <div className="text-xs text-gray-600">Conversion</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">$12K</div>
                    <div className="text-xs text-gray-600">Saved/mo</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                <BarChart3 className="w-4 h-4" />
                Step 3
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Track Your ROI
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                See exactly how ModlyAI impacts your bottom line with detailed
                analytics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Real-time conversion tracking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Return rate monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Customer behavior insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
          <p className="text-lg text-gray-600 mb-8">
            Watch a 2-minute walkthrough of the complete experience
          </p>

          <div className="aspect-video bg-white rounded-2xl shadow-2xl border border-gray-200 flex items-center justify-center">
            <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
              <PlayCircle className="w-6 h-6" />
              Play Demo Video
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Works With Your Platform
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Shopify", "WooCommerce", "BigCommerce", "Custom"].map(
              (platform) => (
                <div
                  key={platform}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center hover:shadow-lg transition"
                >
                  <span className="font-semibold text-gray-700">{platform}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Reduce Returns?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join furniture retailers saving thousands monthly with ModlyAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            <WidgetOpenCta
              ctaId="how-it-works-try-demo-widget"
              ctaText="Try Demo Widget"
              location="how-it-works"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Try Demo Widget
            </WidgetOpenCta>
          </div>
        </div>
      </section>
    </main>
  );
}

