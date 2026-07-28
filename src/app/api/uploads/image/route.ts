import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { checkRateLimit } from '@/lib/rate-limit'

const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2MB - logos/avatars should be small; this is
// generous headroom above the 512x512px we already recommend elsewhere.
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

// Converts an uploaded image to a base64 data URL and hands it back - it does
// NOT save it anywhere itself. The caller (account profile photo, store logo)
// is responsible for persisting the returned url through its own existing
// save endpoint. This app has no prior use of InstantDB's separate file
// storage feature, so rather than bet on an unverified admin-SDK storage API,
// this reuses the same base64-conversion technique already proven working in
// api/rooms/analyze/route.ts, just returned to the client instead of sent to
// OpenAI.
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ip = getClientIp(req)
    const userLimit = checkRateLimit(`upload-image:${session.user.id}`, { limit: 20, windowMs: 60 * 60 * 1000 })
    const ipLimit = checkRateLimit(`upload-image-ip:${ip}`, { limit: 40, windowMs: 60 * 60 * 1000 })

    if (!userLimit.allowed || !ipLimit.allowed) {
      return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Please upload a PNG, JPEG, WEBP, or GIF image.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Image is too large. Please upload something under 2MB.' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const url = `data:${file.type};base64,${base64}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error('[Upload image] Failed:', error)
    return NextResponse.json({ error: 'Unable to process image. Please try again.' }, { status: 500 })
  }
}
