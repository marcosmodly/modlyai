import { NextRequest, NextResponse } from 'next/server';
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors';

// Dummy endpoint for the public /demo page's widget. Mirrors the response
// shape of /api/quotes/request (a `quoteId` string) but never touches
// InstantDB or sends a real email — the demo has no store to attach a quote
// to and must not require signup.
async function handlePOST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: 'Quote request failed', message: 'Request body must be valid JSON.' },
      { status: 400 }
    );
  }

  // The widget's real submission paths (FurnitureCustomizerWidget,
  // FurnitureRoomPlannerWidget) nest these under `customer`; only some older
  // callers send them flat. Accept both, same as /api/quotes/request does.
  const name = typeof body?.customer?.name === 'string'
    ? body.customer.name.trim()
    : typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.customer?.email === 'string'
    ? body.customer.email.trim()
    : typeof body?.email === 'string' ? body.email.trim() : '';

  if (!name || !email || !body?.item) {
    return NextResponse.json(
      { error: 'Quote request failed', message: 'Name, email, and item are required.' },
      { status: 400 }
    );
  }

  const quoteId = `DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  return NextResponse.json({
    success: true,
    quoteId,
    message: 'Demo quote request received. Nothing was saved or emailed.',
  });
}

export async function POST(request: NextRequest) {
  return withPublicWidgetCors(await handlePOST(request));
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse();
}
