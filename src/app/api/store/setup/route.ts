import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Store setup has moved to the dashboard.' },
    { status: 410 }
  )
}
