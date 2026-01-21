# ModlyAI Furniture Widget

A React component library for AI-powered furniture recommendation and customization. This widget can be embedded in any React application.

## Features

- **Room Planner**: Upload room photos and get AI-powered furniture recommendations
- **Furniture Customizer**: Customize furniture with AI assistance (colors, materials, dimensions)

## Installation

```bash
npm install @modlyai/furniture-widget
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { FurnitureAIWidget } from '@modlyai/furniture-widget';
import '@modlyai/furniture-widget/styles.css';

function App() {
  return (
    <FurnitureAIWidget 
      config={{
        apiBaseUrl: 'https://api.example.com',
        features: {
          roomPlanner: true,
          customizer: true,
        }
      }}
    />
  );
}
```

### Individual Widgets

#### Room Planner Only

```tsx
import { FurnitureRoomPlannerWidget } from '@modlyai/furniture-widget';
import '@modlyai/furniture-widget/styles.css';

function App() {
  return (
    <FurnitureRoomPlannerWidget 
      config={{
        apiBaseUrl: 'https://api.example.com',
        onRoomAnalyzed: (data) => {
          console.log('Room analyzed:', data);
        }
      }}
    />
  );
}
```

#### Customizer Only

```tsx
import { FurnitureCustomizerWidget } from '@modlyai/furniture-widget';
import '@modlyai/furniture-widget/styles.css';

function App() {
  return (
    <FurnitureCustomizerWidget 
      config={{
        apiBaseUrl: 'https://api.example.com',
        onFurnitureCustomized: (data) => {
          console.log('Furniture customized:', data);
        }
      }}
    />
  );
}
```

## Configuration

The widget accepts a `config` prop with the following options:

```typescript
interface WidgetConfig {
  apiBaseUrl?: string; // Base URL for API requests (default: current origin)
  apiEndpoints?: {
    roomAnalyze?: string; // Default: '/api/rooms/analyze'
    furnitureCustomize?: string; // Default: '/api/furniture/customize'
  };
  features?: {
    roomPlanner?: boolean; // Default: true
    customizer?: boolean; // Default: true
  };
  onError?: (error: Error) => void;
  onRoomAnalyzed?: (data: RoomAnalysisResponse) => void;
  onFurnitureCustomized?: (data: any) => void;
  storageKey?: string; // localStorage key for customized furniture (default: 'modly-customized-furniture')
}
```

## API Requirements

The widget expects your backend to provide the following API endpoints:

### POST /api/rooms/analyze

Accepts FormData with:
- `photos`: File[] (room photos)
- `dimensions`: JSON string (RoomDimensions)
- `preferences`: JSON string (RoomPreferences, optional)

Returns: `RoomAnalysisResponse`

### POST /api/furniture/customize

Accepts JSON body: `CustomizationConfig`

Returns: Customized furniture data

## Styling

The widget includes its own styles. Make sure to import the CSS file:

```tsx
import '@modlyai/furniture-widget/styles.css';
```

The widget uses Tailwind CSS classes. If your project uses Tailwind, you may need to configure it to include the widget's classes, or use the bundled CSS.

## Types

All TypeScript types are exported from the package:

```typescript
import type { 
  RoomDimensions,
  RoomPreferences,
  RoomAnalysisResponse,
  CustomizationConfig,
  FurnitureItem,
  Recommendation
} from '@modlyai/furniture-widget';
```

## Development

```bash
# Build the widget
cd widget
npm install
npm run build

# Development mode with watch
npm run dev
```

## License

MIT
