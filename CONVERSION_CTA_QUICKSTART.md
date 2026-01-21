# Conversion CTA Quick Start Guide

## Overview

This implementation adds conversion-focused call-to-action buttons throughout the ModlyAI widget to guide users toward requesting quotes for furniture items.

## New Components

### 1. FinalizeQuoteModal
**Path**: `widget/src/components/FinalizeQuoteModal.tsx`

Shows a comprehensive summary of the item before requesting a quote.

**Props**:
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
}
```

### 2. QuoteRequestForm
**Path**: `widget/src/components/QuoteRequestForm.tsx`

Collects customer information for quote requests.

**Props**:
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuoteRequest) => Promise<void>;
  item?: CustomizedFurnitureItem | null;
  recommendation?: Recommendation | null;
}
```

### 3. CatalogView
**Path**: `widget/src/components/CatalogView.tsx`

Displays the full furniture catalog with highlight functionality.

**Props**:
```typescript
{
  onCustomizeItem?: (item: FurnitureItem) => void;
  highlightItemId?: string | null;
}
```

## Updated Components

### RecommendationsList
- Added `onViewInCatalog` prop
- Two buttons per recommendation:
  - "Customize this" (primary)
  - "View in Catalog" (secondary)

### FurnitureCustomizerWidget
- Added "Finalize & Request Quote" button
- Integrated FinalizeQuoteModal
- Integrated QuoteRequestForm
- Success notification toast

### FurnitureRoomPlannerWidget
- Added "Request Quote for [Item]" buttons for top 3 recommendations
- Integrated FinalizeQuoteModal with placement info
- Integrated QuoteRequestForm
- Success notification toast
- Added `onViewInCatalog` prop

### FurnitureAIWidget
- Added 'catalog' view mode
- Added "Catalog" button in header
- Integrated CatalogView with highlight support
- Event handling for catalog navigation

## API Updates

### New Endpoint
**Path**: `src/app/api/quotes/request/route.ts`

**Method**: POST

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "notes": "Optional notes",
  "item": {
    "name": "Modern Sofa",
    "dimensions": {
      "length": 2.1,
      "width": 0.9,
      "height": 0.8
    },
    "materials": {
      "primary": "Leather",
      "legs": "Oak"
    },
    "colorScheme": {
      "primary": "Navy Blue",
      "accent": "Gold"
    },
    "aiNotes": "Perfect for modern living rooms",
    "placement": {
      "coordinates": { "x": 2.5, "y": 1.8 },
      "reasoning": "Optimal viewing angle"
    }
  }
}
```

**Response**:
```json
{
  "success": true,
  "quoteId": "QUOTE-1234567890-ABC123",
  "message": "Quote request received successfully. We will contact you soon!"
}
```

### ApiClient Method
**Path**: `widget/src/utils/apiClient.ts`

```typescript
async submitQuoteRequest(quoteRequest: QuoteRequest): Promise<QuoteRequestResponse>
```

## Usage Examples

### Example 1: Adding Finalize Button to Custom Component

```tsx
import { FinalizeQuoteModal } from './FinalizeQuoteModal';
import { QuoteRequestForm } from './QuoteRequestForm';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState<CustomizedFurnitureItem | null>(null);

  const handleFinalize = () => {
    setShowModal(true);
  };

  const handleProceed = () => {
    setShowModal(false);
    setShowForm(true);
  };

  const handleQuoteSubmit = async (quoteRequest: QuoteRequest) => {
    const response = await apiClient.submitQuoteRequest(quoteRequest);
    setShowForm(false);
    // Show success message
  };

  return (
    <>
      <button onClick={handleFinalize}>
        Finalize & Request Quote
      </button>

      <FinalizeQuoteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onProceed={handleProceed}
        item={item}
      />

      <QuoteRequestForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleQuoteSubmit}
        item={item}
      />
    </>
  );
}
```

### Example 2: Navigating to Catalog with Highlight

```tsx
// From any component
const handleViewInCatalog = (itemId: string) => {
  // Dispatch event for parent widget to handle
  window.dispatchEvent(
    new CustomEvent('modly:view-in-catalog', { detail: itemId })
  );
};

// Or use callback prop
<RecommendationsList
  recommendations={recommendations}
  onViewInCatalog={(itemId) => {
    setHighlightItemId(itemId);
    setViewMode('catalog');
  }}
/>
```

### Example 3: Customizing Button Styles

The buttons use the website's primary color via `useWebsiteColors()` hook:

```tsx
import { useWebsiteColors } from '../utils/useWebsiteColors';

function MyButton() {
  const websiteColors = useWebsiteColors();
  
  return (
    <button
      style={{
        backgroundColor: websiteColors.primary,
        color: '#FFFFFF',
      }}
    >
      Customize This
    </button>
  );
}
```

## Testing the Implementation

### Manual Testing Steps

1. **Test AI Recommendations CTAs**:
   - Navigate to Room Planner
   - Upload a room photo and get recommendations
   - Click "Customize this" → Should open Customizer with item
   - Click "View in Catalog" → Should show Catalog with highlighted item

2. **Test Customizer Finalize Flow**:
   - Navigate to Customizer
   - Customize an item (change colors, materials, etc.)
   - Click "Finalize & Request Quote"
   - Verify summary modal shows all customization details
   - Click "Proceed"
   - Fill out quote form
   - Submit and verify success message

3. **Test Room Planner Finalize Flow**:
   - Get room recommendations
   - Click "Request Quote for [Item]" button
   - Verify summary modal includes placement information
   - Complete quote form
   - Verify success message

4. **Test Catalog View**:
   - Navigate to Catalog from header button
   - Verify all items are displayed
   - Click "Customize This" on any item
   - From recommendations, click "View in Catalog"
   - Verify item is highlighted and scrolled into view
   - Verify highlight disappears after 3 seconds

5. **Test Form Validation**:
   - Try submitting empty form → Should show error
   - Try invalid email → Should show error
   - Fill all required fields → Should submit successfully

### Backend Testing

```bash
# Test quote request endpoint
curl -X POST http://localhost:3000/api/quotes/request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "notes": "Test quote request",
    "item": {
      "name": "Test Sofa",
      "dimensions": { "length": 2, "width": 1, "height": 0.8 },
      "materials": { "primary": "Fabric" },
      "colorScheme": { "primary": "Blue" }
    }
  }'

# Expected response:
# {
#   "success": true,
#   "quoteId": "QUOTE-...",
#   "message": "Quote request received successfully..."
# }
```

## Configuration

### API Endpoints (Optional)

You can customize the quote request endpoint in your widget config:

```typescript
const widgetConfig: WidgetConfig = {
  apiEndpoints: {
    quoteRequest: '/api/custom-quotes/submit',
    // ... other endpoints
  },
};
```

### Styling

The components use the existing design system:
- **Colors**: Derived from `useWebsiteColors()` hook
- **Dark theme**: Background `#1A1C19`, cards `#2A2D28`
- **Accent**: Emerald/green for success actions
- **Text**: White with various opacity levels

## Troubleshooting

### Issue: Buttons not showing
- **Check**: Make sure component is receiving proper props
- **Check**: Verify item data exists before rendering

### Issue: Catalog not highlighting item
- **Check**: Item ID matches exactly (case-sensitive)
- **Check**: `highlightItemId` is being passed to `CatalogView`
- **Check**: Item exists in catalog response

### Issue: Quote submission failing
- **Check**: Backend API endpoint is running
- **Check**: Request payload matches expected format
- **Check**: Email validation is passing

### Issue: Navigation not working
- **Check**: Event listeners are set up in `FurnitureAIWidget`
- **Check**: View mode state is being updated
- **Check**: All callbacks are properly wired

## Production Checklist

Before deploying to production:

- [ ] Update backend to save quotes to database
- [ ] Implement email notifications for customers
- [ ] Set up email notifications for sales team
- [ ] Add analytics tracking for conversions
- [ ] Test form validation edge cases
- [ ] Test on mobile devices
- [ ] Test with slow network connections
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Add rate limiting to quote endpoint
- [ ] Test with various item configurations
- [ ] Verify all navigation flows work correctly
- [ ] Test catalog with large number of items
- [ ] Verify highlight timing and animations
- [ ] Test success notifications on different screen sizes

## Future Enhancements

Consider implementing:
1. **Quote history** for returning customers
2. **Quote comparison** feature
3. **Save for later** functionality
4. **Social sharing** of customized items
5. **Wishlist** feature
6. **Multi-item quotes** (bulk requests)
7. **Quote status tracking** dashboard
8. **Live chat** integration from quote form
9. **A/B testing** for CTA copy and placement
10. **Abandoned cart** recovery emails

## Support

For questions or issues:
- Check implementation docs: `CONVERSION_CTA_IMPLEMENTATION.md`
- Review flow diagram: `CONVERSION_FLOW_DIAGRAM.md`
- Check component source code comments
- Review API endpoint logs for debugging
