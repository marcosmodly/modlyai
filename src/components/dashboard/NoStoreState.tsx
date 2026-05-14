export default function NoStoreState({
  title,
}: {
  title: string
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          {title}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950">
          ModlyAI store setup incomplete
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          You are signed in successfully, but this account does not have a ModlyAI
          merchant store yet. Once your ModlyAI store is available, this dashboard
          section will show your account data.
        </p>
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We couldn't find a ModlyAI store for this account. Refresh the page or contact support.
        </div>
      </section>
    </div>
  )
}
