'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { Calendar, Clock, CheckCircle, TrendingDown, TrendingUp, Users } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    company: string;
    visitors: string;
    challenge: string;
  }>({
    name: '',
    email: '',
    company: '',
    visitors: 'Under 5,000',
    challenge: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const emailIsValid = useMemo(() => {
    if (!formData.email.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  }, [formData.email]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Work email is required';
    if (formData.email.trim() && !emailIsValid) next.email = 'Please enter a valid email';
    if (!formData.company.trim()) next.company = 'Company name is required';
    if (!formData.visitors.trim()) next.visitors = 'Please select a traffic range';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/request-pilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          visitors: formData.visitors,
          message: formData.challenge?.trim() || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        visitors: 'Under 5,000',
        challenge: '',
      });
      setFieldErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">See ModlyAI in Action</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join a personalized 15-minute demo and discover how leading furniture retailers are reducing returns
            by 40% with AI-powered room matching.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Free 14-day pilot program</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Setup in under 10 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT: FORM + BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT: Contact Form */}
            <div id="form" className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Demo</h2>
              <p className="text-gray-600 mb-6">Fill out the form and we&apos;ll be in touch within 24 hours</p>

              {success && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                  Thanks — your request has been received. We’ll reach out shortly to schedule your demo.
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{error}</div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    onBlur={() => validate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-invalid={!!fieldErrors.name}
                    disabled={loading}
                    required
                  />
                  {fieldErrors.name && <p className="mt-2 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@furniturestore.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    onBlur={() => validate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-invalid={!!fieldErrors.email}
                    disabled={loading}
                    required
                  />
                  {fieldErrors.email && <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="company">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Furniture Co."
                    value={formData.company}
                    onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                    onBlur={() => validate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-invalid={!!fieldErrors.company}
                    disabled={loading}
                    required
                  />
                  {fieldErrors.company && <p className="mt-2 text-sm text-red-600">{fieldErrors.company}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="visitors">
                    Monthly Website Visitors
                  </label>
                  <select
                    id="visitors"
                    value={formData.visitors}
                    onChange={(e) => setFormData((p) => ({ ...p, visitors: e.target.value }))}
                    onBlur={() => validate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-invalid={!!fieldErrors.visitors}
                    disabled={loading}
                    required
                  >
                    <option>Under 5,000</option>
                    <option>5,000 - 20,000</option>
                    <option>20,000 - 50,000</option>
                    <option>50,000 - 100,000</option>
                    <option>100,000+</option>
                  </select>
                  {fieldErrors.visitors && <p className="mt-2 text-sm text-red-600">{fieldErrors.visitors}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="challenge">
                    What&apos;s your biggest challenge? (Optional)
                  </label>
                  <textarea
                    id="challenge"
                    rows={3}
                    placeholder="e.g., High return rates, customers unsure about sizing..."
                    value={formData.challenge}
                    onChange={(e) => setFormData((p) => ({ ...p, challenge: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting…' : 'Request Demo'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{' '}
                  <Link href="/terms" className="text-gray-600 underline-offset-2 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-gray-600 underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* RIGHT: Why Book a Demo */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Get in Your Demo</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Personalized walkthrough</h4>
                      <p className="text-gray-600 text-sm">
                        See exactly how ModlyAI works with your furniture catalog and website
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">ROI calculation</h4>
                      <p className="text-gray-600 text-sm">
                        We&apos;ll estimate your potential savings based on your current return rate
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Integration options</h4>
                      <p className="text-gray-600 text-sm">
                        Learn how ModlyAI integrates with Shopify, WooCommerce, or your custom platform
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Q&A session</h4>
                      <p className="text-gray-600 text-sm">
                        Ask anything about pricing, implementation, or customization
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Results Our Clients Are Seeing
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">-40%</div>
                    <div className="text-xs text-gray-600">Return Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">+25%</div>
                    <div className="text-xs text-gray-600">Conversion</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">$12K</div>
                    <div className="text-xs text-gray-600">Saved/Month</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">5 min</div>
                    <div className="text-xs text-gray-600">Setup Time</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JS
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 italic mb-2">
                      &quot;We saw a 35% drop in returns within the first month. The ROI was immediate and our customers love
                      the confidence it gives them.&quot;
                    </p>
                    <p className="text-sm font-semibold text-gray-900">John Smith</p>
                    <p className="text-xs text-gray-600">Owner, Urban Furniture Co.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How long does the pilot program last?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                The free pilot program runs for 14 days. This gives you enough time to install ModlyAI, see real customer
                interactions, and measure the impact on your return rate.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do I need technical knowledge to set it up?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Not at all. For Shopify, WooCommerce, and BigCommerce, installation is just copying one line of code. We
                provide step-by-step instructions and support if needed.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What happens after the demo?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Zero pressure. After the demo, you&apos;ll receive a personalized ROI report and pilot program access. You
                decide if and when you want to move forward. No credit card required for the pilot.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How much does ModlyAI cost?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                Pricing starts at $299/month for up to 1,000 AI sessions. We&apos;ll discuss your specific needs and traffic
                volume during the demo to recommend the right plan.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">Book a quick 15-minute call to see if ModlyAI is right for your store</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#form"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Request Demo
            </a>
            <a
              href="mailto:hello@modlyai.tech"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Email Us Instead
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
