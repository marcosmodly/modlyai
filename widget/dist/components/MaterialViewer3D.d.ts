import { CustomizedFurnitureItem } from '../types';
interface MaterialViewer3DProps {
    selectedMaterial?: string;
    onMaterialChange?: (material: string) => void;
    customizedItem?: CustomizedFurnitureItem;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    materials?: {
        primary?: string;
        legs?: string;
        upholstery?: string;
    };
}
export default function MaterialViewer3D({ selectedMaterial, onMaterialChange, customizedItem, dimensions, materials }: MaterialViewer3DProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MaterialViewer3D.d.ts.map