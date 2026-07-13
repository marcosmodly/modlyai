import React, { useState, useRef, useEffect } from 'react';
import { RoomDimensions, RoomPreferences } from '../types';

interface RoomUploadFormProps {
  onUpload: (photos: File[], dimensions: RoomDimensions, preferences?: RoomPreferences) => void;
  isLoading?: boolean;
  onPhotosChange?: (photos: File[]) => void;
  formRef?: (form: HTMLFormElement | null) => void;
  initialDimensions?: RoomDimensions;
  initialPreferences?: RoomPreferences;
  onDimensionsChange?: (dimensions: RoomDimensions) => void;
  onPreferencesChange?: (preferences: RoomPreferences) => void;
}

type UnitSystem = 'meters' | 'feet';

// Conversion functions
const metersToFeet = (meters: number): number => meters * 3.28084;
const feetToMeters = (feet: number): number => feet / 3.28084;
const metersToInches = (meters: number): number => meters * 39.3701;
const inchesToMeters = (inches: number): number => inches / 39.3701;

// Convert feet and inches to meters
const feetInchesToMeters = (feet: number, inches: number): number => {
  return feetToMeters(feet) + inchesToMeters(inches);
};

// Convert meters to feet and inches
const metersToFeetInches = (meters: number): { feet: number; inches: number } => {
  const totalInches = metersToInches(meters);
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
};

export default function RoomUploadForm({ 
  onUpload, 
  isLoading, 
  onPhotosChange, 
  formRef,
  initialDimensions,
  initialPreferences,
  onDimensionsChange,
  onPreferencesChange,
}: RoomUploadFormProps) {
  const formElementRef = useRef<HTMLFormElement>(null);
  
  // Expose form ref to parent
  useEffect(() => {
    if (formRef && formElementRef.current) {
      formRef(formElementRef.current);
    }
  }, [formRef]);

  // Initialize dimensions from props or defaults
  const getInitialDimensions = (): RoomDimensions => {
    if (initialDimensions) {
      return initialDimensions;
    }
    return {
      length: 0,
      width: 0,
      height: 2.4,
      roomType: 'living',
    };
  };

  const [photos, setPhotos] = useState<File[]>([]);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('meters');
  const [dimensions, setDimensions] = useState<RoomDimensions>(getInitialDimensions());
  
  // Initialize feet/inches from initial dimensions
  const initFeetInches = () => {
    const initDims = getInitialDimensions();
    if (initDims.length > 0 || initDims.width > 0 || initDims.height > 0) {
      const lengthFI = metersToFeetInches(initDims.length);
      const widthFI = metersToFeetInches(initDims.width);
      const heightFI = metersToFeetInches(initDims.height);
      return { lengthFI, widthFI, heightFI };
    }
    return {
      lengthFI: { feet: 0, inches: 0 },
      widthFI: { feet: 0, inches: 0 },
      heightFI: { feet: 8, inches: 0 },
    };
  };

  const initialFeetInches = initFeetInches();
  const [lengthFeet, setLengthFeet] = useState<number>(initialFeetInches.lengthFI.feet);
  const [lengthInches, setLengthInches] = useState<number>(initialFeetInches.lengthFI.inches);
  const [widthFeet, setWidthFeet] = useState<number>(initialFeetInches.widthFI.feet);
  const [widthInches, setWidthInches] = useState<number>(initialFeetInches.widthFI.inches);
  const [heightFeet, setHeightFeet] = useState<number>(initialFeetInches.heightFI.feet);
  const [heightInches, setHeightInches] = useState<number>(initialFeetInches.heightFI.inches);
  
  const [preferences, setPreferences] = useState<RoomPreferences>(initialPreferences || {});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update dimensions when initialDimensions prop changes
  useEffect(() => {
    if (initialDimensions) {
      setDimensions(initialDimensions);
      const lengthFI = metersToFeetInches(initialDimensions.length);
      const widthFI = metersToFeetInches(initialDimensions.width);
      const heightFI = metersToFeetInches(initialDimensions.height);
      setLengthFeet(lengthFI.feet);
      setLengthInches(lengthFI.inches);
      setWidthFeet(widthFI.feet);
      setWidthInches(widthFI.inches);
      setHeightFeet(heightFI.feet);
      setHeightInches(heightFI.inches);
    }
  }, [initialDimensions]);

  // Update preferences when initialPreferences prop changes
  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  // Note: Dimension and preference changes are handled directly in updateDimensions and setPreferences
  // to avoid infinite loops from useEffect dependencies

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos(newPhotos);
      onPhotosChange?.(newPhotos);
    }
  };

  const updateDimensions = (newDimensions: RoomDimensions) => {
    setDimensions(newDimensions);
    if (onDimensionsChange) {
      onDimensionsChange(newDimensions);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const newPhotos = Array.from(e.dataTransfer.files);
      setPhotos(newPhotos);
      onPhotosChange?.(newPhotos);
    }
  };

  const handleUnitToggle = () => {
    const newUnit = unitSystem === 'meters' ? 'feet' : 'meters';
    
    if (newUnit === 'feet') {
      // Convert from meters to feet/inches
      const lengthFI = metersToFeetInches(dimensions.length);
      const widthFI = metersToFeetInches(dimensions.width);
      const heightFI = metersToFeetInches(dimensions.height);
      
      setLengthFeet(lengthFI.feet);
      setLengthInches(lengthFI.inches);
      setWidthFeet(widthFI.feet);
      setWidthInches(widthFI.inches);
      setHeightFeet(heightFI.feet);
      setHeightInches(heightFI.inches);
    } else {
      // Convert from feet/inches to meters
      updateDimensions({
        ...dimensions,
        length: feetInchesToMeters(lengthFeet, lengthInches),
        width: feetInchesToMeters(widthFeet, widthInches),
        height: feetInchesToMeters(heightFeet, heightInches),
      });
    }
    
    setUnitSystem(newUnit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      alert('Please upload a room photo first.');
      return;
    }
    
    // Convert to meters if in feet/inches
    let finalDimensions = dimensions;
    if (unitSystem === 'feet') {
      finalDimensions = {
        ...dimensions,
        length: feetInchesToMeters(lengthFeet, lengthInches),
        width: feetInchesToMeters(widthFeet, widthInches),
        height: feetInchesToMeters(heightFeet, heightInches),
      };
    }
    
    if (finalDimensions.length <= 0 || finalDimensions.width <= 0) {
      alert('Please provide valid room dimensions');
      return;
    }
    onUpload(photos, finalDimensions, preferences);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const toggleStyle = (style: string) => {
    const currentStyles = preferences.style || [];
    const newPreferences = currentStyles.includes(style)
      ? { ...preferences, style: currentStyles.filter(s => s !== style) }
      : { ...preferences, style: [...currentStyles, style] };
    setPreferences(newPreferences);
    if (onPreferencesChange) {
      onPreferencesChange(newPreferences);
    }
  };

  const styleOptions = [
    { id: 'modern', label: 'Modern', icon: '⚡' },
    { id: 'scandi', label: 'Scandi', icon: '🌲' },
    { id: 'industrial', label: 'Industrial', icon: '🏭' },
    { id: 'boho', label: 'Boho', icon: '🌿' },
  ];

  return (
    <form ref={formElementRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Photo Upload */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <label className="block text-base font-bold text-gray-900 mb-3">
          Upload Room Photos
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors bg-white relative min-h-[200px] flex flex-col items-center justify-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          
          {photos.length === 0 ? (
            <>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 8a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8a2 2 0 00-2-2M4 8V6a2 2 0 012-2h4" />
                </svg>
              </div>
              <p className="text-gray-900 font-semibold mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-600">Multiple photos recommended for better analysis</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Choose Files
                </button>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex flex-wrap gap-3 justify-center items-center">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Room photo ${index + 1}`}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-200 group-hover:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 md:w-24 md:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-gray-900 transition-colors"
                >
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Room Type */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <label className="block text-base font-bold text-gray-900 mb-3">
          Room Type
        </label>
        <select
          value={dimensions.roomType}
          onChange={(e) => updateDimensions({ ...dimensions, roomType: e.target.value as RoomDimensions['roomType'] })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="living">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="office">Office</option>
          <option value="dining">Dining Room</option>
          <option value="kitchen">Kitchen</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Room Dimensions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-base font-bold text-gray-900">
            Room Dimensions
          </label>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${unitSystem === 'meters' ? 'text-gray-900' : 'text-gray-500'}`}>
              Meters
            </span>
            <button
              type="button"
              onClick={handleUnitToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                unitSystem === 'feet' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-md ${
                  unitSystem === 'feet' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${unitSystem === 'feet' ? 'text-gray-900' : 'text-gray-500'}`}>
              Feet/Inches
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unitSystem === 'meters' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Length
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={dimensions.length || ''}
                  onChange={(e) => updateDimensions({ ...dimensions, length: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Width
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={dimensions.width || ''}
                  onChange={(e) => updateDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    Ceiling Height
                    <div className="group relative flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-500 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                        Helps AI recommend furniture that fits your vertical space and proportions
                      </div>
                    </div>
                  </span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={dimensions.height || ''}
                  onChange={(e) => updateDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Length
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={lengthFeet || ''}
                    onChange={(e) => {
                      const feet = parseInt(e.target.value) || 0;
                      setLengthFeet(feet);
                      updateDimensions({ ...dimensions, length: feetInchesToMeters(feet, lengthInches) });
                    }}
                    placeholder="ft"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={lengthInches || ''}
                    onChange={(e) => {
                      const inches = Math.min(11, parseInt(e.target.value) || 0);
                      setLengthInches(inches);
                      updateDimensions({ ...dimensions, length: feetInchesToMeters(lengthFeet, inches) });
                    }}
                    placeholder="in"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Width
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={widthFeet || ''}
                    onChange={(e) => {
                      const feet = parseInt(e.target.value) || 0;
                      setWidthFeet(feet);
                      updateDimensions({ ...dimensions, width: feetInchesToMeters(feet, widthInches) });
                    }}
                    placeholder="ft"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={widthInches || ''}
                    onChange={(e) => {
                      const inches = Math.min(11, parseInt(e.target.value) || 0);
                      setWidthInches(inches);
                      updateDimensions({ ...dimensions, width: feetInchesToMeters(widthFeet, inches) });
                    }}
                    placeholder="in"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    Ceiling Height
                    <div className="group relative flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-500 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                        Helps AI recommend furniture that fits your vertical space and proportions
                      </div>
                    </div>
                  </span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    value={heightFeet || ''}
                    onChange={(e) => {
                      const feet = parseInt(e.target.value) || 0;
                      setHeightFeet(feet);
                      updateDimensions({ ...dimensions, height: feetInchesToMeters(feet, heightInches) });
                    }}
                    placeholder="ft"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches || ''}
                    onChange={(e) => {
                      const inches = Math.min(11, parseInt(e.target.value) || 0);
                      setHeightInches(inches);
                      updateDimensions({ ...dimensions, height: feetInchesToMeters(heightFeet, inches) });
                    }}
                    placeholder="in"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Advanced Preferences */}
      <div className="bg-white border border-gray-200 rounded-xl">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all duration-300 rounded-t-xl"
        >
          <span className="text-base font-bold text-gray-900">
            Advanced Preferences (Optional)
          </span>
          <svg
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
              showAdvanced ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showAdvanced && (
          <div className="px-6 pb-6 pt-4 space-y-6 border-t border-gray-200">
            {/* Style Preferences */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-4">
                Preferred Styles
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styleOptions.map((style) => {
                  const isSelected = preferences.style?.includes(style.id);
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => toggleStyle(style.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-gray-900'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.icon}</div>
                      <div className="text-sm font-medium">{style.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Colors */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Preferred Colors (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., Beige, Forest Green, Terracotta"
                value={preferences.colors?.join(', ') || ''}
                onChange={(e) => {
                  const newPreferences = { ...preferences, colors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                  setPreferences(newPreferences);
                  if (onPreferencesChange) {
                    onPreferencesChange(newPreferences);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            {/* Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Budget Min ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={preferences.budget?.min || ''}
                  onChange={(e) => {
                    const newPreferences = { ...preferences, budget: { ...preferences.budget, min: parseInt(e.target.value) || undefined } };
                    setPreferences(newPreferences);
                    if (onPreferencesChange) {
                      onPreferencesChange(newPreferences);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Budget Max ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={preferences.budget?.max || ''}
                  onChange={(e) => {
                    const newPreferences = { ...preferences, budget: { ...preferences.budget, max: parseInt(e.target.value) || undefined } };
                    setPreferences(newPreferences);
                    if (onPreferencesChange) {
                      onPreferencesChange(newPreferences);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button removed - now handled by parent component */}
    </form>
  );
}
