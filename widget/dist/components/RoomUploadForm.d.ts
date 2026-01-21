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
export default function RoomUploadForm({ onUpload, isLoading, onPhotosChange, formRef, initialDimensions, initialPreferences, onDimensionsChange, onPreferencesChange, }: RoomUploadFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RoomUploadForm.d.ts.map