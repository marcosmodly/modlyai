// Single source of truth for the Analytics date-range control, shared by the
// server-rendered page (filtering/labeling) and the client range selector
// (building the ?range= URL). events.createdAt is `i.any().optional()` in
// instant.schema.ts - not indexed - so a $gte/$lte where clause wouldn't be
// reliable even though InstantDB's query types support those operators.
// Filtering happens in JS after the fetch instead, same as every other
// metric on this page already does.
export type AnalyticsRange = '7' | '30' | '90' | 'all'

export const RANGE_OPTIONS: { id: AnalyticsRange; label: string; days: number | null }[] = [
  { id: '7', label: 'Last 7 days', days: 7 },
  { id: '30', label: 'Last 30 days', days: 30 },
  { id: '90', label: 'Last 90 days', days: 90 },
  { id: 'all', label: 'All time', days: null },
]

export function isAnalyticsRange(value: string | null | undefined): value is AnalyticsRange {
  return RANGE_OPTIONS.some((option) => option.id === value)
}

export function getRangeLabel(range: AnalyticsRange): string {
  return RANGE_OPTIONS.find((option) => option.id === range)?.label ?? 'Last 30 days'
}

// null means "no lower bound" (All time). Can't use `?? 30` here - the
// found option's own `days` is legitimately null for "all", and `??`
// coalesces null same as undefined, which silently turned "All time" into
// a 30-day window. Only fall back to 30 when the id itself isn't found.
export function getRangeStartMs(range: AnalyticsRange, now: number = Date.now()): number | null {
  const option = RANGE_OPTIONS.find((candidate) => candidate.id === range)
  const days = option ? option.days : 30
  return days === null ? null : now - days * 24 * 60 * 60 * 1000
}
