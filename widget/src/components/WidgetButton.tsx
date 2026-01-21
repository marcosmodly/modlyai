'use client';

import { FurnitureAIWidgetButton } from './FurnitureAIWidgetButton';
import type { WidgetConfig } from '../utils/config';

interface WidgetButtonProps {
  config?: WidgetConfig;
}

export default function WidgetButton({ config }: WidgetButtonProps) {
  return (
    <FurnitureAIWidgetButton 
      config={config}
      buttonText="ModlyAI"
      buttonPosition="bottom-right"
    />
  );
}