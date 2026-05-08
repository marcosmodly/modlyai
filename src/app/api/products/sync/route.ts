import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { syncStoreCatalog } from '@/lib/store-catalog'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json();
    const { apiKey, csvText, customProducts } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'apiKey is required' }, { status: 400 });
    }

    if (apiKey !== session.user.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await syncStoreCatalog({ apiKey, csvText, customProducts });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to sync products';
    const status = message === 'Invalid API key' ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
