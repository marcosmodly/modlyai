'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/request-pilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-surface">
      <style jsx>{`
        .request-pilot-form input,
        .request-pilot-form textarea {
          color: #f1f5f9 !important;
          caret-color: #f1f5f9 !important;
        }
        .request-pilot-form input::placeholder,
        .request-pilot-form textarea::placeholder {
          color: #94a3b8 !important;
        }
      `}</style>
      <section className="relative px-6 py-24 md:py-40 bg-dark-base overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ai-subtle opacity-50"></div>
        
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-8 text-center">
            Request a <span className="text-gradient-ai">Pilot</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
            Interested in bringing ModlyAI to your business? Get in touch to discuss a pilot program tailored to your needs.
          </p>
          
          <div className="bg-dark-card p-8 lg:p-12 rounded-lg shadow-soft border border-subtle max-w-2xl mx-auto request-pilot-form">
            {success && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400">
                Your request has been sent successfully! We will get back to you soon.
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-text-primary font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-subtle rounded-lg text-slate-100 placeholder:text-slate-400 caret-slate-100 focus:border-ai-primary focus:outline-none transition-colors"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-subtle rounded-lg text-slate-100 placeholder:text-slate-400 caret-slate-100 focus:border-ai-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-text-primary font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-subtle rounded-lg text-slate-100 placeholder:text-slate-400 caret-slate-100 focus:border-ai-primary focus:outline-none transition-colors"
                  placeholder="Your company name"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-text-primary font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-surface border border-subtle rounded-lg text-slate-100 placeholder:text-slate-400 caret-slate-100 focus:border-ai-primary focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your needs..."
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-ai text-white rounded-lg font-semibold text-lg hover:shadow-glow-hover transition-all duration-300 glow-soft-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
