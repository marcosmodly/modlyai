import { NextRequest, NextResponse } from 'next/server';

// Example: Get config based on domain or widget ID
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const widgetId = searchParams.get('widgetId');
  const domain = request.headers.get('host') || request.headers.get('referer');

  // In production, fetch from your database
  // This is just an example
  const config = {
    theme: {
      primaryColor: '#667eea', // Change this in your DB to update all widgets
      buttonText: 'ModlyAI',
      buttonPosition: 'bottom-right' as const,
    },
    features: {
      roomPlanner: true,
      customizer: true,
    },
    apiBaseUrl: process.env.API_BASE_URL || '',
  };

  return NextResponse.json(config);
}