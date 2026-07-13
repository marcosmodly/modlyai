import React, { useState } from 'react';

interface RoomPhotoPreviewProps {
  photoUrl?: string;
  showFurniture?: boolean;
}

export default function RoomPhotoPreview({ photoUrl, showFurniture = false }: RoomPhotoPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement && photoUrl) {
      const element = document.getElementById('room-preview-image');
      if (element?.requestFullscreen) {
        element.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Room Preview</h3>
          <p className="text-sm text-gray-600 mt-1">
            {photoUrl ? 'Preview your room photo before analysis.' : 'Upload a photo to begin.'}
          </p>
        </div>
        {photoUrl && (
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-full bg-white border border-gray-200 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Full Screen"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="w-full aspect-video rounded-2xl bg-gray-100 border border-gray-200 relative overflow-hidden flex items-center justify-center">
        {photoUrl ? (
          <div id="room-preview-image" className="relative w-full h-full">
            <img
              src={photoUrl}
              alt="Room preview with AI furniture placement"
              className="w-full aspect-video object-cover rounded-2xl"
            />

            {/* Subtle scan/measurement-line overlay, ties the visual to what the AI is actually doing */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 400 225"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="0" y1="75" x2="400" y2="75" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="100" y2="225" stroke="white" strokeWidth="0.5" />
              <line x1="200" y1="0" x2="200" y2="225" stroke="white" strokeWidth="0.5" />
              <line x1="300" y1="0" x2="300" y2="225" stroke="white" strokeWidth="0.5" />
            </svg>

            {showFurniture && (
              <div className="absolute inset-0 pointer-events-none">
                {/* AI furniture overlay indicators */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center bg-blue-600/10 backdrop-blur-[1px]">
                  <svg className="w-9 h-9 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center bg-blue-600/10 backdrop-blur-[1px]">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l9-4 9 4M3 7v10l9 4m-9-14l9 4m0 10V11m0 10l9-4V7" />
              </svg>
            </div>
            <p className="text-gray-900 font-semibold mb-2">Your room photo will appear here</p>
            <p className="text-gray-600 text-sm">AI will place recommended furniture here after analysis</p>
          </div>
        )}
      </div>
      
      {photoUrl && (
        <div className="mt-3 text-xs text-gray-500 text-center">
          <p>Preview & placement visualization</p>
        </div>
      )}
    </div>
  );
}
