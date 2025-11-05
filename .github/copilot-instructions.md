# AI Agent Instructions for Color Block Garden Design Cards

This is an Expo-based React Native app for garden design using draggable plant cards on a grid layout.

## Project Architecture

### Core Components
- `app/_layout.tsx`: Entry point and navigation setup using Expo Router
- `app/garden.tsx`: Main garden design screen
- `app/components/`:
  - `GardenBoard.tsx`: Grid layout (5x8) with draggable plant cards
  - `PlantCard.tsx`: Draggable cards using react-native-gesture-handler and reanimated

### Key Patterns

1. **Grid System**
   - Fixed cell size: 80x80 pixels
   - Plants can span multiple grid cells horizontally (width property)
   - Grid bounds: 5 columns × 8 rows

2. **Plant Data Structure**
```typescript
type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  width: number; // in grid cells
};
```

3. **Gesture Handling**
   - Uses `react-native-gesture-handler` for drag operations
   - Collision detection prevents overlapping plants
   - Spring animations for snap-to-grid and invalid position resets

## Development Workflow

1. **Setup**
```bash
npm install
```

2. **Running the App**
```bash
npx expo start
```

3. **Adding New Plants**
- Add plant image to `assets/images/`
- Update `plantImages` record in `PlantCard.tsx`
- Add plant data to initial state in `GardenBoard.tsx`

## Tech Stack
- Expo SDK 54
- React Native 0.81
- TypeScript
- react-native-reanimated
- react-native-gesture-handler
- expo-router for file-based routing

## File Locations for Common Tasks
- Plant images: `assets/images/`
- New components: `app/components/`
- Screen components: `app/` root
- Navigation changes: `app/_layout.tsx`

## Project Conventions
- Use `.tsx` extension for all React components
- Follow component structure: Props type → Component → Styles
- Keep gesture logic within individual card components
- Maintain grid-based positioning using multiples of CELL_SIZE (80)