export interface CustomizationPdfRow {
  label: string;
  value: string;
}

export interface CustomizationPdfChoice {
  label: string;
  value: string;
  price?: number;
}

export interface CustomizationPdfLineItem {
  label: string;
  amount: number;
}

export interface CustomizationPdfInput {
  brandName: string;
  generatedAt: Date;
  referenceId?: string;
  storeId?: string;
  widgetId?: string;
  product: {
    name: string;
    category?: string;
    productUrl?: string;
    imageUrl?: string;
    basePrice?: number;
    pricingMode?: 'estimated' | 'quote_required';
    estimatedTotal?: number;
  };
  selectedCustomizations: {
    color?: CustomizationPdfChoice;
    material?: CustomizationPdfChoice;
    shopifyOptions?: CustomizationPdfChoice[];
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      unit?: string;
    };
    dimensionPriceAdjustments?: {
      width?: number;
      length?: number;
      height?: number;
      total?: number;
    };
    addOns?: CustomizationPdfChoice[];
    customerRequestText?: string;
  };
  pricing: {
    basePrice?: number;
    lineItems: CustomizationPdfLineItem[];
    customizationTotal?: number;
    estimatedTotal?: number;
    quoteRequired?: boolean;
  };
}

type Rgb = [number, number, number];

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 42;
const FOOTER_TOP = 58;
const CONTENT_BOTTOM = 86;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BLUE: Rgb = [38 / 255, 99 / 255, 235 / 255];
const PURPLE: Rgb = [124 / 255, 58 / 255, 237 / 255];
const DARK: Rgb = [17 / 255, 24 / 255, 39 / 255];
const MUTED: Rgb = [107 / 255, 114 / 255, 128 / 255];
const BORDER: Rgb = [229 / 255, 231 / 255, 235 / 255];
const SOFT: Rgb = [249 / 255, 250 / 255, 251 / 255];

export const formatCurrency = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value)
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    : undefined;

export const formatPriceModifier = (value: number | undefined) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  const formatted = formatCurrency(Math.abs(value));
  if (!formatted) return undefined;
  return value < 0 ? `-${formatted}` : `+${formatted}`;
};

export const formatDimensions = (
  dimensions: CustomizationPdfInput['selectedCustomizations']['dimensions']
): CustomizationPdfRow[] => {
  if (!dimensions) return [];
  const unit = dimensions.unit || 'in';
  return [
    dimensions.length !== undefined ? { label: 'Length', value: `${dimensions.length} ${unit}` } : undefined,
    dimensions.width !== undefined ? { label: 'Width', value: `${dimensions.width} ${unit}` } : undefined,
    dimensions.height !== undefined ? { label: 'Height', value: `${dimensions.height} ${unit}` } : undefined,
  ].filter((row): row is CustomizationPdfRow => Boolean(row));
};

export const formatDimensionPricing = (
  adjustments: CustomizationPdfInput['selectedCustomizations']['dimensionPriceAdjustments']
): CustomizationPdfRow[] => {
  if (!adjustments) return [];
  return ([
    ['Width adjustment', adjustments.width],
    ['Length adjustment', adjustments.length],
    ['Height adjustment', adjustments.height],
  ] as Array<[string, number | undefined]>)
    .map(([label, amount]) => {
      const value = formatPriceModifier(amount);
      return value && amount !== 0 ? { label, value } : undefined;
    })
    .filter((row): row is CustomizationPdfRow => Boolean(row));
};

export const calculateCustomizationTotal = (lineItems: CustomizationPdfLineItem[]) =>
  lineItems.reduce((sum, lineItem) => sum + (Number.isFinite(lineItem.amount) ? lineItem.amount : 0), 0);

const sanitizePdfText = (value: unknown) =>
  String(value ?? '')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const escapePdfText = (value: unknown) =>
  sanitizePdfText(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');

const rgb = ([r, g, b]: Rgb) => `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;

const drawRect = (x: number, y: number, width: number, height: number, fill?: Rgb, stroke?: Rgb) => {
  if (fill && stroke) return `q ${rgb(fill)} rg ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re B Q`;
  if (fill) return `q ${rgb(fill)} rg ${x} ${y} ${width} ${height} re f Q`;
  if (stroke) return `q ${rgb(stroke)} RG ${x} ${y} ${width} ${height} re S Q`;
  return '';
};

const drawLine = (x1: number, y1: number, x2: number, y2: number, color: Rgb) =>
  `q ${rgb(color)} RG 0.8 w ${x1} ${y1} m ${x2} ${y2} l S Q`;

const textWidth = (text: string, size: number) => sanitizePdfText(text).length * size * 0.52;

const wrapText = (text: string, width: number, size: number) => {
  const words = sanitizePdfText(text).split(' ').filter(Boolean);
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (textWidth(next, size) <= width) {
      current = next;
      return;
    }
    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
};

class PdfLayout {
  private pages: string[][] = [[]];
  private y = PAGE_HEIGHT - MARGIN;

  constructor(private footerMeta: string | undefined) {}

  private get page() {
    return this.pages[this.pages.length - 1]!;
  }

  add(command: string) {
    if (command) this.page.push(command);
  }

  addPage() {
    this.pages.push([]);
    this.y = PAGE_HEIGHT - 86;
    this.addText('Customized Furniture Quote', MARGIN, PAGE_HEIGHT - 48, 14, 'F2', DARK);
    this.add(drawLine(MARGIN, PAGE_HEIGHT - 62, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 62, BORDER));
  }

  ensureSpace(height: number) {
    if (this.y - height < CONTENT_BOTTOM) {
      this.addPage();
    }
  }

  addText(text: string, x: number, y: number, size = 10, font = 'F1', color: Rgb = DARK) {
    this.add(`BT /${font} ${size} Tf ${rgb(color)} rg ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
  }

  addRightText(text: string, rightX: number, y: number, size = 10, font = 'F1', color: Rgb = DARK) {
    this.addText(text, rightX - textWidth(text, size), y, size, font, color);
  }

  addWrappedText(text: string, x: number, y: number, width: number, size = 10, font = 'F1', color: Rgb = DARK) {
    const lines = wrapText(text, width, size);
    lines.forEach((line, index) => this.addText(line, x, y - index * (size + 4), size, font, color));
    return y - lines.length * (size + 4);
  }

  drawHeader(brandName: string, generatedAt: Date, referenceId?: string) {
    this.add(drawRect(0, PAGE_HEIGHT - 82, PAGE_WIDTH, 82, [0.98, 0.98, 1]));
    this.add(drawRect(0, PAGE_HEIGHT - 82, 8, 82, BLUE));
    this.add(drawRect(8, PAGE_HEIGHT - 82, 4, 82, PURPLE));
    this.addText(brandName || 'ModlyAI', MARGIN, PAGE_HEIGHT - 42, 18, 'F2', DARK);
    this.addText('Generated by ModlyAI', MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
    this.addRightText('Customized Furniture Quote', PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 42, 16, 'F2', DARK);
    this.addRightText(`Generated: ${generatedAt.toLocaleString()}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 60, 9, 'F1', MUTED);
    if (referenceId) {
      this.addRightText(`Reference: ${referenceId}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 74, 8, 'F1', MUTED);
    }
    this.add(drawLine(MARGIN, PAGE_HEIGHT - 92, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 92, BORDER));
    this.y = PAGE_HEIGHT - 118;
  }

  drawCard(title: string, height: number, drawContent: (topY: number) => void) {
    this.ensureSpace(height + 14);
    const top = this.y;
    this.add(drawRect(MARGIN, top - height, CONTENT_WIDTH, height, [1, 1, 1], BORDER));
    this.addText(title, MARGIN + 16, top - 24, 12, 'F2', DARK);
    this.add(drawLine(MARGIN + 16, top - 34, PAGE_WIDTH - MARGIN - 16, top - 34, BORDER));
    drawContent(top - 52);
    this.y = top - height - 14;
  }

  drawRows(rows: CustomizationPdfRow[], x: number, y: number, labelWidth = 122, valueWidth = 310) {
    let cursor = y;
    rows.forEach((row) => {
      this.addText(row.label, x, cursor, 9, 'F1', MUTED);
      cursor = this.addWrappedText(row.value, x + labelWidth, cursor, valueWidth, 9, 'F1', DARK) - 4;
    });
    return cursor;
  }

  drawFooter() {
    this.pages.forEach((page) => {
      page.push(drawLine(MARGIN, FOOTER_TOP, PAGE_WIDTH - MARGIN, FOOTER_TOP, BORDER));
      page.push(`BT /F2 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 16} Td (Generated by ModlyAI) Tj ET`);
      page.push(
        `BT /F1 8 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 29} Td (Final pricing, availability, and delivery are subject to merchant confirmation.) Tj ET`
      );
      if (this.footerMeta) {
        page.push(`BT /F1 7 Tf ${rgb(MUTED)} rg ${MARGIN} ${FOOTER_TOP - 42} Td (${escapePdfText(this.footerMeta)}) Tj ET`);
      }
    });
  }

  toBlob() {
    this.drawFooter();
    const pageObjects: string[] = [];
    const contentObjects: string[] = [];
    const firstPageObject = 3;
    const firstContentObject = firstPageObject + this.pages.length;

    this.pages.forEach((commands, index) => {
      const pageObjectId = firstPageObject + index;
      const contentObjectId = firstContentObject + index;
      pageObjects.push(
        `${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${firstContentObject + this.pages.length} 0 R /F2 ${firstContentObject + this.pages.length + 1} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`
      );
      const content = `${commands.join('\n')}\n`;
      contentObjects.push(`${contentObjectId} 0 obj\n<< /Length ${content.length} >>\nstream\n${content}endstream\nendobj\n`);
    });

    const fontStart = firstContentObject + this.pages.length;
    const objects = [
      `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
      `2 0 obj\n<< /Type /Pages /Kids [${this.pages.map((_, index) => `${firstPageObject + index} 0 R`).join(' ')}] /Count ${this.pages.length} >>\nendobj\n`,
      ...pageObjects,
      ...contentObjects,
      `${fontStart} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
      `${fontStart + 1} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`,
    ];
    let pdf = '%PDF-1.4\n';
    const offsets = [0];

    objects.forEach((object) => {
      offsets.push(pdf.length);
      pdf += object;
    });

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return new Blob([pdf], { type: 'application/pdf' });
  }
}

const choiceValue = (choice: CustomizationPdfChoice) => {
  const price = formatPriceModifier(choice.price);
  return price ? `${choice.value} (${price})` : choice.value;
};

const estimateRowsHeight = (rows: CustomizationPdfRow[], width = 310, size = 9) =>
  rows.reduce((total, row) => total + wrapText(row.value, width, size).length * (size + 4) + 4, 0);

export function generateCustomizationPdf(input: CustomizationPdfInput): Blob {
  const technicalMeta = [input.storeId ? `Store: ${input.storeId}` : '', input.widgetId ? `Widget: ${input.widgetId}` : '']
    .filter(Boolean)
    .join(' / ');
  const pdf = new PdfLayout(technicalMeta || undefined);
  const referenceId = input.referenceId ?? `MOD-${input.generatedAt.getTime().toString(36).toUpperCase()}`;
  const basePrice = formatCurrency(input.product.basePrice ?? input.pricing.basePrice);
  const estimatedTotal = input.pricing.quoteRequired
    ? 'Quote required'
    : formatCurrency(input.product.estimatedTotal ?? input.pricing.estimatedTotal);
  const productRows: CustomizationPdfRow[] = [
    { label: 'Product', value: input.product.name },
    input.product.category ? { label: 'Category', value: input.product.category } : undefined,
    input.product.productUrl ? { label: 'Product URL', value: input.product.productUrl } : undefined,
    basePrice ? { label: 'Base price', value: basePrice } : undefined,
    { label: 'Pricing mode', value: input.product.pricingMode === 'quote_required' ? 'Quote required' : 'Estimated' },
    estimatedTotal ? { label: 'Estimated total', value: estimatedTotal } : undefined,
  ].filter((row): row is CustomizationPdfRow => Boolean(row));
  const dimensionRows = formatDimensions(input.selectedCustomizations.dimensions);
  const dimensionPricingRows = formatDimensionPricing(input.selectedCustomizations.dimensionPriceAdjustments);
  const selectedRows: CustomizationPdfRow[] = [
    input.selectedCustomizations.color
      ? { label: 'Color', value: choiceValue(input.selectedCustomizations.color) }
      : undefined,
    input.selectedCustomizations.material
      ? { label: 'Material', value: choiceValue(input.selectedCustomizations.material) }
      : undefined,
    ...(input.selectedCustomizations.shopifyOptions ?? []).map((option) => ({
      label: option.label,
      value: choiceValue(option),
    })),
    ...dimensionRows,
    ...dimensionPricingRows,
    ...(input.selectedCustomizations.addOns ?? []).map((addOn) => ({
      label: 'Add-on',
      value: choiceValue(addOn),
    })),
  ].filter((row): row is CustomizationPdfRow => Boolean(row));
  const pricingRows: CustomizationPdfRow[] = [
    basePrice ? { label: 'Base price', value: basePrice } : undefined,
    ...input.pricing.lineItems
      .filter((lineItem) => lineItem.amount !== 0)
      .map((lineItem) => ({ label: lineItem.label, value: formatPriceModifier(lineItem.amount) ?? '' })),
    {
      label: 'Customization total',
      value: formatPriceModifier(input.pricing.customizationTotal ?? calculateCustomizationTotal(input.pricing.lineItems)) ?? '+$0.00',
    },
    {
      label: 'Estimated total',
      value: input.pricing.quoteRequired ? 'Quote required' : estimatedTotal ?? 'Quote required',
    },
  ].filter((row): row is CustomizationPdfRow => Boolean(row));

  pdf.drawHeader(input.brandName, input.generatedAt, referenceId);
  pdf.drawCard('Product Summary', Math.max(150, 58 + estimateRowsHeight(productRows, 230)), (topY) => {
    pdf.drawRows(productRows, MARGIN + 16, topY, 104, 238);
    if (input.product.imageUrl) {
      const imageX = PAGE_WIDTH - MARGIN - 154;
      pdf.add(drawRect(imageX, topY - 86, 138, 86, SOFT, BORDER));
      pdf.addText('Product image available', imageX + 16, topY - 36, 10, 'F2', DARK);
      pdf.addWrappedText('See product URL or catalog for the original image.', imageX + 16, topY - 54, 106, 8, 'F1', MUTED);
    }
  });

  if (selectedRows.length > 0) {
    pdf.drawCard('Selected Customizations', Math.max(112, 58 + estimateRowsHeight(selectedRows, 340)), (topY) => {
      pdf.drawRows(selectedRows, MARGIN + 16, topY, 130, 340);
    });
  }

  pdf.drawCard('Pricing Breakdown', Math.max(128, 62 + estimateRowsHeight(pricingRows, 220)), (topY) => {
    let cursor = topY;
    pricingRows.forEach((row, index) => {
      const isTotal = row.label === 'Estimated total';
      if (isTotal) {
        pdf.add(drawLine(MARGIN + 16, cursor + 9, PAGE_WIDTH - MARGIN - 16, cursor + 9, BORDER));
      }
      pdf.addText(row.label, MARGIN + 16, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : MUTED);
      pdf.addRightText(row.value, PAGE_WIDTH - MARGIN - 18, cursor, 10, isTotal ? 'F2' : 'F1', isTotal ? DARK : DARK);
      cursor -= index === pricingRows.length - 2 ? 22 : 17;
    });
  });

  const notes = input.selectedCustomizations.customerRequestText?.trim();
  if (notes) {
    const noteLines = wrapText(notes, CONTENT_WIDTH - 32, 10);
    pdf.drawCard('Customer Request', Math.max(92, 58 + noteLines.length * 15), (topY) => {
      pdf.addWrappedText(notes, MARGIN + 16, topY, CONTENT_WIDTH - 32, 10, 'F1', DARK);
    });
  }

  return pdf.toBlob();
}

export const createCustomizationPdfFilename = (productName: string, generatedAt = new Date()) => {
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  const date = generatedAt.toISOString().slice(0, 10);
  return `modlyai-customized-furniture-${slug || date}.pdf`;
};
