import { NextRequest, NextResponse } from 'next/server';

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
    const timestamp = new Date().toISOString();
    
    // Log the quote request with detailed information
    console.log('========================================');
    console.log('NEW QUOTE REQUEST RECEIVED');
    console.log('========================================');
    console.log('Quote ID:', quoteId);
    console.log('Timestamp:', timestamp);
    console.log('\nCustomer Information:');
    console.log('  Name:', body.name);
    console.log('  Email:', body.email);
    console.log('  Phone:', body.phone || 'Not provided');
    console.log('\nProduct Configuration:');
    console.log('  Name:', body.item.name);
    if (body.item.dimensions) {
      console.log('  Dimensions:');
      if (body.item.dimensions.length) {
        console.log(`    - Length: ${body.item.dimensions.length}m`);
      }
      if (body.item.dimensions.width) {
        console.log(`    - Width: ${body.item.dimensions.width}m`);
      }
      if (body.item.dimensions.height) {
        console.log(`    - Height: ${body.item.dimensions.height}m`);
      }
    }
    if (body.item.materials) {
      console.log('  Materials:');
      Object.entries(body.item.materials).forEach(([key, value]) => {
        if (value) {
          console.log(`    - ${key}: ${value}`);
        }
      });
    }
    if (body.item.colorScheme) {
      console.log('  Color Scheme:');
      console.log('    - Primary:', body.item.colorScheme.primary);
      if (body.item.colorScheme.secondary) {
        console.log('    - Secondary:', body.item.colorScheme.secondary);
      }
      if (body.item.colorScheme.accent) {
        console.log('    - Accent:', body.item.colorScheme.accent);
      }
    }
    if (body.item.aiNotes) {
      console.log('  AI Notes:', body.item.aiNotes);
    }
    if (body.item.placement) {
      console.log('  Placement:');
      if (body.item.placement.wall) {
        console.log('    - Wall:', body.item.placement.wall);
      }
      if (body.item.placement.position) {
        console.log('    - Position:', body.item.placement.position);
      }
      if (body.item.placement.reasoning) {
        console.log('    - Reasoning:', body.item.placement.reasoning);
      }
    }
    if (body.notes) {
      console.log('\nCustomer Notes:', body.notes);
    }
    
    // Log spec sheet if provided
    if (body.specSheet) {
      console.log('\nSpec Sheet Details:');
      console.log('  Spec ID:', body.specSheet.specId);
      console.log('  Generated At:', body.specSheet.generatedAt);
      if (body.specSheet.pricing) {
        console.log('  Requires Quote:', body.specSheet.pricing.requiresQuote);
        if (body.specSheet.pricing.estimatedCost) {
          console.log('  Estimated Cost: $' + body.specSheet.pricing.estimatedCost.toLocaleString());
        }
      }
    }
    console.log('========================================\n');

    // Send owner notification
    sendOwnerNotification({
      quoteId,
      timestamp,
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
      item: body.item,
      notes: body.notes,
      specSheet: body.specSheet,
    });

    // In production, you would:
    // 1. Save to database with full configuration details
    // 2. Send confirmation email to customer with spec sheet PDF attached
    // 3. Send notification to sales team with all details
    // 4. Trigger any CRM integrations
    // 5. Store spec sheet for future reference
    
    // Simulate a small delay as if saving to database
    await new Promise(resolve => setTimeout(resolve, 500));

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

/**
 * Sends notification to store owner about new quote request
 * In production, this would send an email or trigger a webhook
 */
function sendOwnerNotification(data: {
  quoteId: string;
  timestamp: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  item: any;
  notes?: string;
  specSheet?: any;
}): void {
  // Mock notification - in production, send email/webhook
  console.log('[OWNER NOTIFICATION]');
  console.log('Type: New Quote Request');
  console.log('Quote ID:', data.quoteId);
  console.log('Customer:', data.customer.name, `(${data.customer.email})`);
  console.log('Product:', data.item.name);
  if (data.specSheet) {
    console.log('Spec Sheet:', data.specSheet.specId);
  }
  console.log('Time:', new Date(data.timestamp).toLocaleString());
  console.log('[END NOTIFICATION]\n');
  
  // In production, you would call an email service or webhook:
  // await emailService.send({
  //   to: process.env.OWNER_EMAIL,
  //   subject: `New Quote Request - ${data.quoteId}`,
  //   body: formatQuoteNotificationEmail(data),
  //   attachments: data.specSheet ? [generateSpecSheetPDF(data.specSheet)] : [],
  // });
  //
  // Or trigger a webhook:
  // await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
}
