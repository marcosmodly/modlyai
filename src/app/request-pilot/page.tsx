"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const offerPoints = [
  {
    title: "Free for three months",
    body: "No plan fee for the first three months on ModlyAI, full stop.",
  },
  {
    title: "We do the setup",
    body: "Catalog connection, widget install, and configuration handled by us, not your team.",
  },
] as const;

const inReturnPoints = [
  "A 30-minute feedback call at day 30, on what's working and what isn't.",
  "Permission to publish the results as a case study.",
  "A testimonial, if you'd recommend it to another retailer.",
] as const;

export default function RequestPilotPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    visitors: "Under 5,000",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const emailIsValid = useMemo(() => {
    if (!formData.email.trim()) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  }, [formData.email]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Work email is required";
    if (formData.email.trim() && !emailIsValid) next.email = "Please enter a valid email";
    if (!formData.company.trim()) next.company = "Store or company name is required";
    if (!formData.visitors.trim()) next.visitors = "Please select a traffic range";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/request-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          visitors: formData.visitors,
          message: formData.message.trim() || "Applying for the 5-store design-partner pilot.",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", company: "", visitors: "Under 5,000", message: "" });
      setFieldErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] px-6 py-14 text-[#171411] md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a714f]">Design-partner pilot</div>
          <h1 className="font-heading mt-3 text-4xl font-semibold tracking-[-0.01em] text-[#171411] md:text-5xl">
            Free for three months. Capped at five stores.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#665c52]">
            We&apos;re looking for a small number of furniture retailers to run ModlyAI on their live catalog, in
            exchange for honest feedback. We do the setup, you tell us what actually moved.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {offerPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-[#e1d7ca] bg-white p-6">
                  <div className="text-base font-semibold text-[#171411]">{point.title}</div>
                  <p className="mt-2 text-sm leading-6 text-[#665c52]">{point.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#ded1c2] bg-[#fbf7f0] p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a714f]">In return, we ask for</div>
              <ul className="mt-4 space-y-3">
                {inReturnPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#3c342b]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8eef8] text-[10px] font-bold text-[#244f85]">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#d7cab9] bg-[#171411] p-6 text-[#fffaf2]">
              <p className="text-sm leading-6 text-[#d8cfc4]">
                We&apos;re capping this at five stores so we can actually do the setup ourselves and get on a real
                call with each one. Once five are running, this offer closes until the next round.
              </p>
            </div>

            <p className="text-xs leading-5 text-[#a0937f]">
              Prefer to just watch it work first? Try the{" "}
              <Link href="/demo" className="underline hover:text-[#8a714f]">
                no-signup demo
              </Link>
              , or{" "}
              <Link href="/contact" className="underline hover:text-[#8a714f]">
                book a call
              </Link>{" "}
              instead.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e1d7ca] bg-white p-7 shadow-[0_18px_45px_rgba(75,61,47,0.07)]">
            <h2 className="text-xl font-semibold text-[#171411]">Apply for the pilot</h2>
            <p className="mt-1 text-sm text-[#665c52]">We&apos;ll follow up within a couple of days.</p>

            {success && (
              <div className="mt-5 rounded-xl border border-[#bcd9c1] bg-[#eef7f0] p-4 text-sm text-[#2f6b3f]">
                Thanks — your application has been received. We&apos;ll be in touch shortly.
              </div>
            )}
            {error && (
              <div className="mt-5 rounded-xl border border-[#e2b9a8] bg-[#fbeee9] p-4 text-sm text-[#8a3f28]">{error}</div>
            )}

            <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#2b2621]" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  onBlur={() => validate()}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
                />
                {fieldErrors.name && <p className="mt-1.5 text-xs text-[#a8402a]">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#2b2621]" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  onBlur={() => validate()}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
                />
                {fieldErrors.email && <p className="mt-1.5 text-xs text-[#a8402a]">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#2b2621]" htmlFor="company">
                  Store / company name
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                  onBlur={() => validate()}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
                />
                {fieldErrors.company && <p className="mt-1.5 text-xs text-[#a8402a]">{fieldErrors.company}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#2b2621]" htmlFor="visitors">
                  Monthly website visitors
                </label>
                <select
                  id="visitors"
                  value={formData.visitors}
                  onChange={(e) => setFormData((p) => ({ ...p, visitors: e.target.value }))}
                  onBlur={() => validate()}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
                >
                  <option>Under 5,000</option>
                  <option>5,000 - 20,000</option>
                  <option>20,000 - 50,000</option>
                  <option>50,000 - 100,000</option>
                  <option>100,000+</option>
                </select>
                {fieldErrors.visitors && <p className="mt-1.5 text-xs text-[#a8402a]">{fieldErrors.visitors}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#2b2621]" htmlFor="message">
                  Anything we should know? (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#d7cab9] bg-[#fffdf9] px-4 py-3 text-sm text-[#1f1a16] outline-none transition focus:border-[#244f85] focus:ring-2 focus:ring-[#244f85]/15"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#171411] px-6 py-3.5 text-sm font-semibold text-[#fffaf2] transition hover:bg-black disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Apply for the pilot"}
              </button>

              <p className="text-center text-xs text-[#a0937f]">
                By submitting, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-[#8a714f]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-[#8a714f]">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
