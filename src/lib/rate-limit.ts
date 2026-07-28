// Minimal in-memory rate limiter.
//
// IMPORTANT CAVEAT: this only works within a single running server process/instance.
// On serverless platforms (Vercel, etc.) with multiple concurrent instances or cold
// starts, each instance has its own independent counters, so the *effective* limit
// is roughly (your configured limit) x (number of concurrent instances) - it is a
// meaningful improvement over having no rate limiting at all, but it is not a strong
// guarantee under heavy/distributed attack traffic. For production-grade protection
// across multiple instances, replace this with a shared store (e.g. Upstash Redis's
// @upstash/ratelimit package) using the same checkRateLimit(key, options) signature
// so callers don't need to change.

type RateLimitOptions = {
  limit: number
  windowMs: number
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

// Periodically clear out expired buckets so this Map doesn't grow unbounded
// over the lifetime of a long-running process.
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000
let lastCleanup = Date.now()

function cleanupIfNeeded() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key)
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  cleanupIfNeeded()

  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs
    buckets.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: options.limit - 1, resetAt }
  }

  if (existing.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { allowed: true, remaining: options.limit - existing.count, resetAt: existing.resetAt }
}
