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
    <div className="bg-[#2D312C] rounded-xl border border-earth-border p-4 md:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-heading">Your Room Preview</h3>
        {photoUrl && (
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-lg bg-earth-card border border-earth-border hover:border-earth-sage transition-colors"
            title="Full Screen"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex-1 bg-earth-background rounded-lg border border-earth-border relative overflow-hidden min-h-[300px] flex items-center justify-center">
        {photoUrl ? (
          <div id="room-preview-image" className="relative w-full h-full">
            <img
              src={photoUrl}
              alt="Room preview with AI furniture placement"
              className="w-full h-full object-contain"
            />
            {showFurniture && (
              <div className="absolute inset-0 pointer-events-none">
                {/* AI furniture overlay indicators */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-earth-sage rounded-lg flex items-center justify-center bg-earth-sage/20">
                  <svg className="w-10 h-10 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-earth-sage rounded-lg flex items-center justify-center bg-earth-sage/20">
                  <svg className="w-8 h-8 text-earth-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-text-primary mb-2">Upload a room photo to see preview</p>
            <p className="text-text-muted text-sm">AI will place recommended furniture here</p>
          </div>
        )}
      </div>
      
      {photoUrl && (
        <div className="mt-3 text-xs text-text-muted text-center">
          <p>AI-recommended furniture placement visualization</p>
        </div>
      )}
    </div>
  );
}
