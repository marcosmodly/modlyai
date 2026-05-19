import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function resolvePaddleEnvironment() {
  const isProduction =
    process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ||
    process.env.PADDLE_ENVIRONMENT === 'production'

  return isProduction ? 'production' : 'sandbox'
}

export async function GET() {
  const clientToken =
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.trim() ||
    process.env.PADDLE_CLIENT_TOKEN?.trim() ||
    ''

  if (!clientToken) {
    return NextResponse.json({ error: 'Paddle client token is not configured' }, { status: 500 })
  }

  return NextResponse.json({
    clientToken,
    environment: resolvePaddleEnvironment(),
  })
}
