'use client';

import { FurnitureAIWidget } from '@widget/index';
import DemoDisclaimer from '@/components/DemoDisclaimer';

export default function WidgetDemoPage() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <div className="relative min-h-screen">
      <FurnitureAIWidget 
        config={{
          apiBaseUrl: '', // Uses same origin (your Next.js API routes)
          apiEndpoints: {
            roomAnalyze: '/api/rooms/analyze',
            furnitureCustomize: '/api/furniture/customize',
          },
          onError: (error) => {
            console.error('Widget error:', error);
          },
        }}
      />
      {isDemoMode && (
        <div className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
          <div className="mx-auto max-w-2xl rounded-xl border border-black/10 bg-white/90 px-4 py-3 text-center text-xs text-gray-700 shadow-lg backdrop-blur">
            <DemoDisclaimer />
          </div>
        </div>
      )}
    </div>
  );
}
