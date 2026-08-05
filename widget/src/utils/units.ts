// Shared length-unit conversion for the customizer, which works in inches
// (widthIn/depthIn/heightIn), and product/room data, which is stored in
// meters. Keep all inch<->meter conversion behind these named helpers so the
// two units never get combined inline (e.g. a meters value plus an
// inches-derived delta).
const INCHES_PER_METER = 39.3701;

export const metersToInches = (meters: number): number => meters * INCHES_PER_METER;

export const inchesToMeters = (inches: number): number => inches / INCHES_PER_METER;

// The unit the customizer's draft dimensions (widthIn/depthIn/heightIn) and
// selectedDimensions are always expressed in.
export const CUSTOMIZER_DIMENSION_UNIT = 'in';

// The unit selectedProduct.dimensions and CustomizedFurnitureItem.dimensions
// are always expressed in.
export const CANONICAL_DIMENSION_UNIT = 'm';
