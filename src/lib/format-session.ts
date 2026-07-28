// Small heuristic parser for the common cases - not exhaustive, just enough
// to show something friendlier than a raw user-agent string in the Active
// Sessions list.
export function describeUserAgent(userAgent: string) {
  const ua = userAgent || ''

  let browser = 'Unknown browser'
  if (/edg\//i.test(ua)) browser = 'Edge'
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua)) browser = 'Safari'

  let os = 'Unknown device'
  if (/iphone/i.test(ua)) os = 'iPhone'
  else if (/ipad/i.test(ua)) os = 'iPad'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/mac os x/i.test(ua)) os = 'Mac'
  else if (/windows/i.test(ua)) os = 'Windows'
  else if (/linux/i.test(ua)) os = 'Linux'

  if (ua === 'unknown' || !ua) {
    return 'Unknown device'
  }

  return `${browser} on ${os}`
}

export function formatRelativeTime(timestamp: number) {
  const diffMs = Date.now() - timestamp
  const diffMin = Math.round(diffMs / 60000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`

  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`

  const diffDay = Math.round(diffHr / 24)
  if (diffDay < 30) return `${diffDay}d ago`

  return new Date(timestamp).toLocaleDateString()
}
