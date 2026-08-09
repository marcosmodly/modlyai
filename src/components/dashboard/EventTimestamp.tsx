'use client'

import { formatRelativeTime } from '@/lib/format-session'

// Formatting a date is locale/timezone-sensitive, so it has to happen in the
// visitor's browser, not on the server - a Server Component would format in
// the server's timezone regardless of where the merchant actually is.
export default function EventTimestamp({ createdAt }: { createdAt?: string }) {
  if (!createdAt) return <>No timestamp</>

  const timestamp = new Date(createdAt).getTime()
  if (Number.isNaN(timestamp)) return <>No timestamp</>

  return <>{formatRelativeTime(timestamp)}</>
}
