// Main widget exports
export { FurnitureRoomPlannerWidget } from './components/FurnitureRoomPlannerWidget';
export { FurnitureCustomizerWidget } from './components/FurnitureCustomizerWidget';
export { FurnitureAIWidget } from './components/FurnitureAIWidget';
export { FurnitureAIWidgetButton } from './components/FurnitureAIWidgetButton'; // Fixed typo
// Type exports
export * from './types';

// Config exports
export type { WidgetConfig } from './utils/config';

// Styles (users should import this CSS file)
import './styles/widget.css';