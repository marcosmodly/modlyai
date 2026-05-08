import { NextRequest, NextResponse } from 'next/server';
import { adminDb, id } from '@/lib/instant-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.item) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and item are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate a quote ID (in production, this would be from a database)
    const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const storeId = typeof body.storeId === 'string' ? body.storeId : body.item?.storeId;

    if (storeId) {
      const eventId = id();
      await adminDb.transact([
        adminDb.tx.events[eventId].update({
          storeId,
          type: 'quote_request',
          metadata: {
            quoteId,
            customer: {
              name: body.name,
              email: body.email,
              phone: body.phone || null,
            },
            notes: body.notes || null,
            quoteEmail: body.quoteEmail || null,
            item: body.item,
            specSheet: body.specSheet || null,
            source: body.item?.source || null,
            productUrl: body.item?.productUrl || null,
            externalId: body.item?.externalId || null,
            shopifyProductId: body.item?.shopifyProductId || null,
            createdAt: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
        }),
        adminDb.tx.stores[storeId].link({ events: eventId }),
      ]);
    }

    return NextResponse.json({
      success: true,
      quoteId,
      message: 'Quote request received successfully. We will contact you soon!',
    });

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}

