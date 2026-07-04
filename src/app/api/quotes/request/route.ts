import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { publicWidgetOptionsResponse, withPublicWidgetCors } from '@/lib/public-widget-cors';

type QuoteFailureReason =
  | 'instantdb_save_failed'
  | 'email_send_failed'
  | 'missing_destination'
  | 'validation_failed';

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function readText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error ?? 'Unknown error');
}

async function getInstantAdmin() {
  return import('@/lib/instant-admin');
}

function logQuoteFailure(
  operation: 'validation' | 'InstantDB save' | 'Resend email',
  error: unknown,
  context?: { quoteId?: string; storeId?: string; reason?: QuoteFailureReason }
) {
  console.error('Quote request failed', {
    operation,
    reason: context?.reason,
    quoteId: context?.quoteId,
    storeId: context?.storeId,
    message: errorMessage(error),
  });
}

function readNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function formatCurrency(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  return undefined;
}

function formatPrice(value: unknown) {
  const currency = formatCurrency(value);
  if (currency) return currency;
  if (typeof value === 'string' && value.trim()) return value.trim();
  return 'Not provided';
}

function formatPriceModifier(value: unknown) {
  const amount = readNumber(value);
  if (amount === undefined) return undefined;
  const formatted = formatCurrency(Math.abs(amount));
  if (!formatted) return undefined;
  return amount >= 0 ? `+${formatted}` : `-${formatted}`;
}

function readChoiceName(value: unknown) {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (value && typeof value === 'object') {
    const name = (value as { name?: unknown }).name;
    return typeof name === 'string' && name.trim() ? name.trim() : undefined;
  }
  return undefined;
}

function readChoicePrice(value: unknown) {
  if (value && typeof value === 'object') {
    const price = (value as { price?: unknown }).price;
    return typeof price === 'number' && Number.isFinite(price) ? price : undefined;
  }
  return undefined;
}

function formatChoice(value: unknown, fallbackPrice: unknown) {
  const name = readChoiceName(value);
  if (!name) return undefined;
  const price = readChoicePrice(value) ?? fallbackPrice;
  const modifier = formatPriceModifier(price);
  return modifier
    ? `${name} (${modifier})`
    : name;
}

function formatDimensionRows(value: unknown) {
  if (!value || typeof value !== 'object') return [];
  const dimensions = value as { length?: unknown; width?: unknown; height?: unknown; unit?: unknown };
  const unit = typeof dimensions.unit === 'string' && dimensions.unit.trim() ? dimensions.unit : 'm';
  return [
    typeof dimensions.length === 'number' ? `Length: ${dimensions.length} ${unit}` : undefined,
    typeof dimensions.width === 'number' ? `Width: ${dimensions.width} ${unit}` : undefined,
    typeof dimensions.height === 'number' ? `Height: ${dimensions.height} ${unit}` : undefined,
  ].filter((row): row is string => Boolean(row));
}

function formatNamedList(value: unknown) {
  if (!Array.isArray(value) || value.length === 0) return [];

  return value
    .map((entry) => {
      if (typeof entry === 'string') return entry;
      if (!entry || typeof entry !== 'object') return null;
      const item = entry as { name?: unknown; value?: unknown; price?: unknown };
      const name = typeof item.name === 'string' ? item.name : undefined;
      const optionValue = typeof item.value === 'string' ? item.value : undefined;
      const modifier = formatPriceModifier(item.price);
      const price = modifier ? ` (${modifier})` : '';
      if (name && optionValue) return `${name}: ${optionValue}${price}`;
      if (name) return `${name}${price}`;
      return null;
    })
    .filter((entry): entry is string => Boolean(entry));
}

function formatDimensionAdjustments(value: unknown) {
  if (!value || typeof value !== 'object') return [];
  const adjustments = value as { width?: unknown; length?: unknown; height?: unknown };
  const rows = [
    { label: 'Width adjustment', value: adjustments.width },
    { label: 'Length adjustment', value: adjustments.length },
    { label: 'Height adjustment', value: adjustments.height },
  ]
    .map(({ label, value }) => {
      const amount = readNumber(value);
      if (amount === undefined || amount === 0) return null;
      const modifier = formatPriceModifier(amount);
      return modifier ? `${label}: ${modifier}` : null;
    })
    .filter((row): row is string => Boolean(row));

  return rows;
}

function formatPricingMode(value: unknown) {
  const text = readText(value);
  if (!text) return undefined;
  const normalized = text.replace(/_/g, ' ').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatSource(value: unknown) {
  const text = readText(value);
  if (!text) return 'Customized furniture';
  const normalized = text.replace(/_/g, ' ').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function isRoomRecommendationQuote(body: any) {
  return readText(body?.source) === 'room_analysis_recommendation';
}

function formatRoomType(value: unknown) {
  const text = readText(value);
  if (!text) return undefined;
  const normalized = text.replace(/_/g, ' ').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatFitScore(value: unknown) {
  const number = readNumber(value);
  if (number !== undefined) {
    return `${Math.round(number <= 1 ? number * 100 : number)}%`;
  }
  return readText(value);
}

function formatRoomDimensions(value: unknown) {
  if (!value || typeof value !== 'object') return undefined;
  const dimensions = value as { length?: unknown; width?: unknown; height?: unknown };
  const rows = [
    readNumber(dimensions.length) !== undefined ? `Length: ${readNumber(dimensions.length)}m` : undefined,
    readNumber(dimensions.width) !== undefined ? `Width: ${readNumber(dimensions.width)}m` : undefined,
    readNumber(dimensions.height) !== undefined ? `Height: ${readNumber(dimensions.height)}m` : undefined,
  ].filter(Boolean);
  return rows.length > 0 ? rows.join(' / ') : undefined;
}

function formatStringList(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  const rows = value.map((entry) => readText(entry)).filter((entry): entry is string => Boolean(entry));
  return rows.length > 0 ? rows.join(', ') : undefined;
}

function normalizeNote(value: unknown) {
  return readText(value)?.replace(/\s+/g, ' ').toLowerCase();
}

function dedupeNotes(customerRequestText: unknown, message: unknown) {
  const request = readText(customerRequestText);
  const notes = readText(message);

  if (request && notes && normalizeNote(request) !== normalizeNote(notes)) {
    return {
      customizationRequest: request,
      additionalNotes: notes,
    };
  }

  return {
    customerNotes: request || notes,
  };
}

function htmlParagraph(label: string, value: string) {
  return `<p style="margin: 6px 0;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`;
}

function htmlList(items: string[]) {
  if (items.length === 0) return '';
  return `<ul style="margin: 8px 0 0; padding-left: 20px;">${items
    .map((item) => `<li style="margin: 4px 0;">${escapeHtml(item)}</li>`)
    .join('')}</ul>`;
}

function textSection(title: string, lines: string[]) {
  return [title, ...lines].filter(Boolean).join('\n');
}

function normalizeCustomer(body: any) {
  const customer = body?.customer && typeof body.customer === 'object' ? body.customer : {};

  return {
    name: readText(customer.name) || readText(body?.name),
    email: readText(customer.email) || readText(body?.email),
    phone: readText(customer.phone) || readText(body?.phone),
    message: readText(customer.message) || readText(body?.message) || readText(body?.notes),
  };
}

function normalizeQuoteBody(body: any) {
  const item = body?.item && typeof body.item === 'object' ? body.item : null;
  const customer = normalizeCustomer(body);
  const storeId = readText(body?.storeId) || readText(item?.storeId);
  const widgetId = readText(body?.widgetId);
  const sessionId = readText(body?.sessionId);

  return {
    raw: body,
    customer,
    item,
    storeId,
    widgetId,
    sessionId,
    source: readText(body?.source) || readText(item?.source) || null,
    quoteEmail: readText(body?.quoteEmail),
    supportEmail: readText(body?.supportEmail),
  };
}

function buildCustomizationPayload(body: any) {
  const item = body.item || {};
  const customization = body.customization || {};
  const customer = normalizeCustomer(body);

  return {
    selectedColor: customization.selectedColor ?? item.selectedColor ?? null,
    selectedMaterial: customization.selectedMaterial ?? item.selectedMaterial ?? null,
    selectedShopifyOptions: customization.selectedShopifyOptions ?? item.selectedShopifyOptions ?? [],
    selectedDimensions: customization.selectedDimensions ?? item.selectedDimensions ?? null,
    dimensionPriceAdjustments:
      customization.dimensionPriceAdjustments ?? item.dimensionPriceAdjustments ?? null,
    selectedAddOns: customization.selectedAddOns ?? item.selectedAddOns ?? [],
    customizationPrice: customization.customizationPrice ?? item.customizationPrice ?? null,
    estimatedTotal: customization.estimatedTotal ?? item.estimatedTotal ?? null,
    pricingMode: customization.pricingMode ?? item.pricingMode ?? null,
    customerRequestText:
      customization.customerRequestText ?? item.customerRequestText ?? customer.message ?? null,
  };
}

async function getStoreEmailDestination({
  storeId,
  quoteEmail,
  supportEmail,
}: {
  storeId?: string;
  quoteEmail?: string;
  supportEmail?: string;
}) {
  let store: any = null;

  if (storeId) {
    const { adminDb } = await getInstantAdmin();
    const result = await adminDb.query({
      stores: {
        users: {},
      },
    });
    store = result.stores?.find((candidate) => readText(candidate?.id) === storeId) ?? null;
  }

  const owner = Array.isArray(store?.users) ? store.users[0] : store?.users;

  return (
    quoteEmail ||
    readText(store?.quoteEmail) ||
    supportEmail ||
    readText(store?.supportEmail) ||
    readText(owner?.email)
  );
}

async function sendQuoteEmail({
  to,
  quoteId,
  body,
}: {
  to: string;
  quoteId: string;
  body: any;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured for quote email delivery.');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const customer = normalizeCustomer(body);
  const item = body.item || {};
  const productUrl = readText(item.productUrl);
  const customization = buildCustomizationPayload(body);
  const productName = readText(item.productName) || readText(item.name) || 'Customized furniture';
  const productCategory = readText(item.category);
  const basePrice = readNumber(item.basePrice) ?? readNumber(item.price);
  const estimatedTotal = readNumber(customization.estimatedTotal);
  const customizationPrice =
    readNumber(customization.customizationPrice) ??
    (basePrice !== undefined && estimatedTotal !== undefined ? estimatedTotal - basePrice : undefined);
  const customizationTotal = formatPriceModifier(customizationPrice);
  const selectedColor = formatChoice(customization.selectedColor, item.selectedColorPrice);
  const selectedMaterial = formatChoice(customization.selectedMaterial, item.selectedMaterialPrice);
  const selectedOptions = formatNamedList(customization.selectedShopifyOptions);
  const dimensionRows = formatDimensionRows(customization.selectedDimensions);
  const dimensionPricingRows = formatDimensionAdjustments(customization.dimensionPriceAdjustments);
  const addOnRows = formatNamedList(customization.selectedAddOns);
  const pricingMode = formatPricingMode(customization.pricingMode ?? item.pricingMode);
  const storeId = readText(body.storeId) || readText(item.storeId);
  const widgetId = readText(body.widgetId);
  const notes = dedupeNotes(customization.customerRequestText, customer.message);
  const source = formatSource(body.source || item.source);
  const isRoomQuote = isRoomRecommendationQuote(body);
  const roomAnalysis = item.roomAnalysis && typeof item.roomAnalysis === 'object' ? item.roomAnalysis : {};
  const roomDetails = item.roomDetails && typeof item.roomDetails === 'object' ? item.roomDetails : {};
  const roomType =
    formatRoomType((roomDetails as { roomType?: unknown }).roomType) ||
    formatRoomType((roomAnalysis as { roomType?: unknown }).roomType);
  const fitScore = formatFitScore(item.fitScore);
  const whyItFits = readText((roomAnalysis as { whyItFits?: unknown }).whyItFits) || readText(item.aiNotes);
  const placementNote =
    readText(item.placementNote) ||
    readText(item.placement?.reasoning) ||
    readText(item.placement?.position);
  const roomStyle = readText((roomAnalysis as { detectedStyle?: unknown }).detectedStyle);
  const dominantColors = formatStringList((roomAnalysis as { dominantColors?: unknown }).dominantColors);
  const roomSpace = readText((roomAnalysis as { freeSpaceDescription?: unknown }).freeSpaceDescription);
  const roomDimensions = formatRoomDimensions(roomDetails);

  const customerLines = [
    htmlParagraph('Name', customer.name || 'Not provided'),
    htmlParagraph('Email', customer.email || 'Not provided'),
    htmlParagraph('Phone', customer.phone || 'Not provided'),
  ].join('');
  const productLines = [
    `<p style="margin: 6px 0; font-weight: 700;">${escapeHtml(productName)}</p>`,
    productCategory ? htmlParagraph('Category', productCategory) : '',
    productUrl
      ? `<p style="margin: 6px 0;"><strong>Product URL:</strong> <a href="${escapeHtml(productUrl)}" style="color: #2563eb;">${escapeHtml(productUrl)}</a></p>`
      : '',
  ].join('');
  const pricingLines = [
    basePrice !== undefined ? htmlParagraph('Base price', formatPrice(basePrice)) : '',
    customizationTotal ? htmlParagraph('Customization total', customizationTotal) : '',
    estimatedTotal !== undefined ? htmlParagraph('Estimated total', formatPrice(estimatedTotal)) : '',
    pricingMode ? htmlParagraph('Pricing mode', pricingMode) : '',
  ].join('');
  const customizationLines = [
    selectedColor ? htmlParagraph('Color', selectedColor) : '',
    selectedMaterial ? htmlParagraph('Material', selectedMaterial) : '',
    selectedOptions.length > 0
      ? `<p style="margin: 12px 0 4px;"><strong>Options:</strong></p>${htmlList(selectedOptions)}`
      : '',
    dimensionRows.length > 0
      ? `<p style="margin: 12px 0 4px;"><strong>Dimensions:</strong></p>${htmlList(dimensionRows)}`
      : '',
    dimensionPricingRows.length > 0
      ? `<p style="margin: 12px 0 4px;"><strong>Dimension pricing:</strong></p>${htmlList(dimensionPricingRows)}`
      : '',
    addOnRows.length > 0
      ? `<p style="margin: 12px 0 4px;"><strong>Add-ons:</strong></p>${htmlList(addOnRows)}`
      : '',
  ].join('');
  const roomRecommendationLines = [
    roomType ? htmlParagraph('Room type', roomType) : '',
    fitScore ? htmlParagraph('Fit score', fitScore) : '',
    whyItFits ? htmlParagraph('Why it fits', whyItFits) : '',
    placementNote ? htmlParagraph('Placement notes', placementNote) : '',
    roomStyle ? htmlParagraph('Detected style', roomStyle) : '',
    dominantColors ? htmlParagraph('Color cues', dominantColors) : '',
    roomSpace ? htmlParagraph('Room layout notes', roomSpace) : '',
    roomDimensions ? htmlParagraph('Customer room dimensions', roomDimensions) : '',
  ].join('');
  const notesHtml = notes.customerNotes
    ? `<h3 style="margin: 24px 0 8px;">Customer notes</h3><p style="margin: 6px 0; white-space: pre-line;">${escapeHtml(notes.customerNotes)}</p>`
    : [
        notes.customizationRequest
          ? `<h3 style="margin: 24px 0 8px;">Customization request</h3><p style="margin: 6px 0; white-space: pre-line;">${escapeHtml(notes.customizationRequest)}</p>`
          : '',
        notes.additionalNotes
          ? `<h3 style="margin: 24px 0 8px;">Additional notes</h3><p style="margin: 6px 0; white-space: pre-line;">${escapeHtml(notes.additionalNotes)}</p>`
          : '',
      ].join('');
  const technicalLines = [
    storeId ? htmlParagraph('Store ID', storeId) : '',
    widgetId ? htmlParagraph('Widget ID', widgetId) : '',
    htmlParagraph('Source', source),
  ].join('');

  const textCustomerLines = [
    `Name: ${customer.name || 'Not provided'}`,
    `Email: ${customer.email || 'Not provided'}`,
    `Phone: ${customer.phone || 'Not provided'}`,
  ];
  const textProductLines = [
    productName,
    productCategory ? `Category: ${productCategory}` : '',
    productUrl ? `Product URL: ${productUrl}` : '',
  ].filter(Boolean);
  const textPricingLines = [
    basePrice !== undefined ? `Base price: ${formatPrice(basePrice)}` : '',
    customizationTotal ? `Customization total: ${customizationTotal}` : '',
    estimatedTotal !== undefined ? `Estimated total: ${formatPrice(estimatedTotal)}` : '',
    pricingMode ? `Pricing mode: ${pricingMode}` : '',
  ].filter(Boolean);
  const textCustomizationLines = [
    selectedColor ? `Color: ${selectedColor}` : '',
    selectedMaterial ? `Material: ${selectedMaterial}` : '',
    selectedOptions.length > 0 ? `Options:\n${selectedOptions.map((row) => `- ${row}`).join('\n')}` : '',
    dimensionRows.length > 0 ? `Dimensions:\n${dimensionRows.map((row) => `- ${row}`).join('\n')}` : '',
    dimensionPricingRows.length > 0
      ? `Dimension pricing:\n${dimensionPricingRows.map((row) => `- ${row}`).join('\n')}`
      : '',
    addOnRows.length > 0 ? `Add-ons:\n${addOnRows.map((row) => `- ${row}`).join('\n')}` : '',
  ].filter(Boolean);
  const textRoomRecommendationLines = [
    roomType ? `Room type: ${roomType}` : '',
    fitScore ? `Fit score: ${fitScore}` : '',
    whyItFits ? `Why it fits: ${whyItFits}` : '',
    placementNote ? `Placement notes: ${placementNote}` : '',
    roomStyle ? `Detected style: ${roomStyle}` : '',
    dominantColors ? `Color cues: ${dominantColors}` : '',
    roomSpace ? `Room layout notes: ${roomSpace}` : '',
    roomDimensions ? `Customer room dimensions: ${roomDimensions}` : '',
  ].filter(Boolean);
  const textNotesSections = notes.customerNotes
    ? [textSection('Customer notes', [notes.customerNotes])]
    : [
        notes.customizationRequest ? textSection('Customization request', [notes.customizationRequest]) : '',
        notes.additionalNotes ? textSection('Additional notes', [notes.additionalNotes]) : '',
      ].filter(Boolean);
  const textTechnicalLines = [
    storeId ? `Store ID: ${storeId}` : '',
    widgetId ? `Widget ID: ${widgetId}` : '',
    `Source: ${source}`,
  ].filter(Boolean);
  const text = [
    isRoomQuote ? 'New Room Recommendation Quote Request' : 'New Customization Quote Request',
    '',
    `Quote ID: ${quoteId}`,
    '',
    textSection('Customer', textCustomerLines),
    '',
    textSection('Product', textProductLines),
    '',
    textSection('Pricing', textPricingLines),
    '',
    isRoomQuote
      ? textSection('Room Recommendation Details', textRoomRecommendationLines)
      : textSection('Selected Customizations', textCustomizationLines),
    '',
    ...textNotesSections.flatMap((section) => [section, '']),
    textSection('Technical Details', textTechnicalLines),
  ].join('\n');

  const { error } = await resend.emails.send({
    from: 'ModlyAI <onboarding@resend.dev>',
    replyTo: customer.email,
    to,
    subject: isRoomQuote
      ? `New room recommendation quote request: ${productName}`
      : `New customization quote request: ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5; max-width: 680px;">
        <h2 style="margin: 0 0 12px;">${isRoomQuote ? 'New Room Recommendation Quote Request' : 'New Customization Quote Request'}</h2>
        <p style="margin: 6px 0 20px;"><strong>Quote ID:</strong> ${escapeHtml(quoteId)}</p>

        <h3 style="margin: 24px 0 8px;">Customer</h3>
        ${customerLines}

        <h3 style="margin: 24px 0 8px;">Product</h3>
        ${productLines}

        <h3 style="margin: 24px 0 8px;">Pricing</h3>
        ${pricingLines}

        <h3 style="margin: 24px 0 8px;">${isRoomQuote ? 'Room Recommendation Details' : 'Selected Customizations'}</h3>
        ${
          isRoomQuote
            ? roomRecommendationLines || '<p style="margin: 6px 0;">No room recommendation details provided.</p>'
            : customizationLines || '<p style="margin: 6px 0;">No selected customizations provided.</p>'
        }

        ${notesHtml}

        <h3 style="margin: 24px 0 8px;">Technical Details</h3>
        ${technicalLines}
      </div>
    `,
    text,
  });

  if (error) {
    throw new Error(error.message || 'Failed to send quote email.');
  }
}

async function handlePOST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      logQuoteFailure('validation', error, { reason: 'validation_failed' });
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: 'validation_failed',
          message: 'Request body must be valid JSON.',
        },
        { status: 400 }
      );
    }

    const normalized = normalizeQuoteBody(body);
    
    // Validate required fields
    if (!normalized.customer.name || !normalized.customer.email || !normalized.item) {
      logQuoteFailure('validation', 'Missing required quote fields', {
        storeId: normalized.storeId,
        reason: 'validation_failed',
      });
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: 'validation_failed',
          message: 'Name, email, and item are required.',
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized.customer.email)) {
      logQuoteFailure('validation', 'Invalid customer email format', {
        storeId: normalized.storeId,
        reason: 'validation_failed',
      });
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: 'validation_failed',
          message: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    // Generate a quote ID (in production, this would be from a database)
    const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const { storeId, widgetId, sessionId } = normalized;
    const customization = buildCustomizationPayload(body);
    const delivery: string[] = [];
    const warnings: string[] = [];
    let saveSucceeded = false;
    let saveError: unknown = null;

    if (storeId) {
      try {
        const { adminDb, id } = await getInstantAdmin();
        const eventId = id();
        const createdAt = new Date().toISOString();
        await adminDb.transact([
          adminDb.tx.events[eventId].update({
            storeId,
            type: 'quote_requested',
            metadata: {
              quoteId,
              widgetId: widgetId || null,
              sessionId: sessionId || null,
              customer: {
                name: normalized.customer.name,
                email: normalized.customer.email,
                phone: normalized.customer.phone || null,
                message: normalized.customer.message || null,
              },
              item: {
                ...body.item,
                productId: body.item?.productId || null,
                productName: body.item?.productName || body.item?.name || null,
                category: body.item?.category || null,
                productUrl: body.item?.productUrl || null,
                imageUrl: body.item?.imageUrl || null,
                basePrice: body.item?.basePrice ?? body.item?.price ?? null,
                customizationPrice: customization.customizationPrice,
                estimatedTotal: customization.estimatedTotal,
                pricingMode: customization.pricingMode,
                savedAt: body.item?.savedAt || null,
              },
              customization,
              source: normalized.source,
              quoteType: normalized.source || 'customized_furniture',
              status: 'new',
              specSheet: body.specSheet || null,
              createdAt,
            },
            createdAt,
          }),
          adminDb.tx.stores[storeId].link({ events: eventId }),
        ]);
        saveSucceeded = true;
        delivery.push('instantdb');
      } catch (error) {
        saveError = error;
        logQuoteFailure('InstantDB save', error, {
          quoteId,
          storeId,
          reason: 'instantdb_save_failed',
        });
      }
    }

    let destinationEmail: string | undefined;
    try {
      destinationEmail = await getStoreEmailDestination({
        storeId,
        quoteEmail: normalized.quoteEmail,
        supportEmail: normalized.supportEmail,
      });
    } catch (error) {
      logQuoteFailure('InstantDB save', error, { quoteId, storeId });
    }

    if (!destinationEmail) {
      if (saveSucceeded) {
        return NextResponse.json({
          success: true,
          quoteId,
          delivery,
          emailSkipped: true,
          message: 'Quote request saved. Email delivery is not configured.',
        });
      }

      logQuoteFailure('validation', 'No quote destination configured', {
        quoteId,
        storeId,
        reason: saveError ? 'instantdb_save_failed' : 'missing_destination',
      });
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: saveError ? 'instantdb_save_failed' : 'missing_destination',
          message: saveError
            ? 'Quote request could not be saved and no email destination is configured.'
            : 'Quote request destination is not configured.',
        },
        { status: saveError ? 500 : 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      if (saveSucceeded) {
        return NextResponse.json({
          success: true,
          quoteId,
          delivery,
          emailSkipped: true,
          message: 'Quote request saved. Email delivery is not configured.',
        });
      }

      const error = new Error('RESEND_API_KEY is not configured for quote email delivery.');
      logQuoteFailure('Resend email', error, {
        quoteId,
        storeId,
        reason: 'email_send_failed',
      });
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: 'email_send_failed',
          message: 'Quote request could not be saved or emailed.',
        },
        { status: 500 }
      );
    }

    if (destinationEmail) {
      try {
        await sendQuoteEmail({ to: destinationEmail, quoteId, body: { ...body, storeId, widgetId } });
        delivery.push('email');
      } catch (emailError) {
        logQuoteFailure('Resend email', emailError, {
          quoteId,
          storeId,
          reason: 'email_send_failed',
        });
        if (!saveSucceeded) {
          return NextResponse.json(
            {
              error: 'Quote request failed',
              reason: 'email_send_failed',
              message: 'Quote request could not be saved or emailed.',
            },
            { status: 500 }
          );
        }
        warnings.push('Quote request was saved, but email delivery failed.');
      }
    }

    if (!saveSucceeded && !delivery.includes('email')) {
      return NextResponse.json(
        {
          error: 'Quote request failed',
          reason: 'instantdb_save_failed',
          message: 'Quote request could not be saved or emailed.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      quoteId,
      delivery,
      warnings,
      emailWarning: warnings[0],
      message: 'Quote request sent. The store will follow up with pricing and next steps.',
    });

  } catch (error) {
    logQuoteFailure('validation', error, { reason: 'validation_failed' });
    return NextResponse.json(
      {
        error: 'Quote request failed',
        reason: 'validation_failed',
        message: 'Quote request could not be processed.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return withPublicWidgetCors(await handlePOST(request));
}

export async function OPTIONS() {
  return publicWidgetOptionsResponse();
}

