import { NextRequest, NextResponse } from 'next/server';
import { CustomizationConfig } from '@/types';

interface CartItem {
  productId: string;
  configuration: CustomizationConfig;
  specSheet?: any;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CartItem = await request.json();

    // Validate required fields
    if (!body.productId || !body.configuration || !body.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, configuration, and quantity are required' },
        { status: 400 }
      );
    }

    // Validate quantity
    if (body.quantity < 1 || body.quantity > 100) {
      return NextResponse.json(
        { error: 'Quantity must be between 1 and 100' },
        { status: 400 }
      );
    }

    // Generate a cart item ID
    const cartItemId = `CART-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Log the cart addition (in production, this would be saved to a database)
    console.log('========================================');
    console.log('NEW CART ITEM ADDED');
    console.log('========================================');
    console.log('Cart Item ID:', cartItemId);
    console.log('Timestamp:', timestamp);
    console.log('Product ID:', body.productId);
    console.log('Quantity:', body.quantity);
    console.log('\nConfiguration:');
    console.log('  Base Item:', body.configuration.baseItemName || body.configuration.baseItemType);
    console.log('  Colors:');
    console.log('    - Primary:', body.configuration.colorScheme.primary);
    if (body.configuration.colorScheme.secondary) {
      console.log('    - Secondary:', body.configuration.colorScheme.secondary);
    }
    if (body.configuration.colorScheme.accent) {
      console.log('    - Accent:', body.configuration.colorScheme.accent);
    }
    console.log('  Materials:');
    Object.entries(body.configuration.materialOverrides).forEach(([key, value]) => {
      if (value) {
        console.log(`    - ${key}: ${value}`);
      }
    });
    if (body.configuration.dimensionAdjustments && Object.keys(body.configuration.dimensionAdjustments).length > 0) {
      console.log('  Dimension Adjustments:');
      if (body.configuration.dimensionAdjustments.length) {
        console.log(`    - Length: ${body.configuration.dimensionAdjustments.length > 0 ? '+' : ''}${body.configuration.dimensionAdjustments.length}m`);
      }
      if (body.configuration.dimensionAdjustments.width) {
        console.log(`    - Width: ${body.configuration.dimensionAdjustments.width > 0 ? '+' : ''}${body.configuration.dimensionAdjustments.width}m`);
      }
      if (body.configuration.dimensionAdjustments.height) {
        console.log(`    - Height: ${body.configuration.dimensionAdjustments.height > 0 ? '+' : ''}${body.configuration.dimensionAdjustments.height}m`);
      }
    }
    if (body.configuration.ornamentDetails && body.configuration.ornamentDetails.length > 0) {
      console.log('  Ornaments:');
      body.configuration.ornamentDetails.forEach((ornament, index) => {
        console.log(`    ${index + 1}. ${ornament}`);
      });
    }
    if (body.configuration.aiNotes) {
      console.log('  AI Notes:', body.configuration.aiNotes);
    }
    if (body.specSheet) {
      console.log('\nSpec Sheet ID:', body.specSheet.specId);
    }
    console.log('========================================\n');

    // In production, you would:
    // 1. Save to database/cart system
    // 2. Send notification to store owner via email/webhook
    // 3. Update inventory if needed
    // 4. Trigger analytics events
    // 5. Send confirmation email to customer (if logged in)

    // Send owner notification (mock)
    sendOwnerNotification({
      type: 'cart_addition',
      cartItemId,
      productId: body.productId,
      configuration: body.configuration,
      quantity: body.quantity,
      timestamp,
    });

    // Simulate a small delay as if saving to database
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      cartItemId,
      message: 'Item added to cart successfully',
    });

  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

/**
 * Sends notification to store owner about new cart addition
 * In production, this would send an email or trigger a webhook
 */
function sendOwnerNotification(data: {
  type: 'cart_addition';
  cartItemId: string;
  productId: string;
  configuration: CustomizationConfig;
  quantity: number;
  timestamp: string;
}): void {
  // Mock notification - in production, send email/webhook
  console.log('[OWNER NOTIFICATION]');
  console.log('Type: Custom Product Added to Cart');
  console.log('Cart Item ID:', data.cartItemId);
  console.log('Product ID:', data.productId);
  console.log('Quantity:', data.quantity);
  console.log('Configuration:', data.configuration.baseItemName || data.configuration.baseItemType);
  console.log('Time:', new Date(data.timestamp).toLocaleString());
  console.log('[END NOTIFICATION]\n');
  
  // In production, you would call an email service or webhook:
  // await emailService.send({
  //   to: process.env.OWNER_EMAIL,
  //   subject: `New Custom Product Added to Cart - ${data.cartItemId}`,
  //   body: formatNotificationEmail(data),
  // });
  //
  // Or trigger a webhook:
  // await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
}
