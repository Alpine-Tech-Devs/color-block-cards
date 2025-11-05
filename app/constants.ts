const BASE_CELL_SIZE = 80;
const GRID_COLS = 5;
const GRID_ROWS = 8;
const INCHES_PER_UNIT = 2; // Each unit represents 2 inches

// Convert plant width in inches to proportional grid units
const calculateGridWidth = (widthInInches: number): number => {
  // Convert to units (1 unit = 2 inches)
  const units = widthInInches / INCHES_PER_UNIT;
  return Math.max(0.5, units);
};

// Convert grid units to pixels for display
const getPixelWidth = (gridUnits: number): number => {
  return gridUnits * BASE_CELL_SIZE / 3; // 3 units = 1 full cell width (6 inches)
};

const constants = {
  BASE_CELL_SIZE,
  GRID_COLS,
  GRID_ROWS,
  INCHES_PER_UNIT,
  calculateGridWidth,
  getPixelWidth,
};

export {
  BASE_CELL_SIZE,
  GRID_COLS,
  GRID_ROWS,
  INCHES_PER_UNIT,
  calculateGridWidth,
  getPixelWidth,
};

export default constants;