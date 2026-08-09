// Rendered instead of throwing redirect('/auth/signin') for the rare case
// where a request passes middleware's lightweight token check but
// getServerSession's deeper, DB-backed validation then invalidates it
// (tokenVersion mismatch from a password change elsewhere, a session
// individually revoked from Active Sessions, or a deleted user). A thrown
// redirect() here would recreate the exact bug middleware was added to fix:
// an uncaught exception during SSR under DashboardShell's 'use client'
// boundary, which has no error boundary. A plain link is a normal render.
export default function SessionExpiredState({ title }: { title: string }) {
  return (
    <section className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{title}</p>
      <div role="status" aria-live="polite" className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Your session has expired or was signed out elsewhere.
      </div>
      <div className="mt-4">
        <a
          href="/auth/signin"
          className="inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Sign in again
        </a>
      </div>
    </section>
  )
}
