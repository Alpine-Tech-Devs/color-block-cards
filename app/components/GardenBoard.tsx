import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CELL_SIZE = 80;
const GRID_COLS = Math.floor(width / CELL_SIZE);
const GRID_ROWS = 8;

type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  width: number; // width in grid cells / feet
};

function PlantCard({
  plant,
  plants,
  setPlants,
}: {
  plant: Plant;
  plants: Plant[];
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}) {
  const startX = plant.col * CELL_SIZE;
  const startY = plant.row * CELL_SIZE;

  const x = useSharedValue(startX);
  const y = useSharedValue(startY);

  const drag = Gesture.Pan()
    .onUpdate((event) => {
      x.value = startX + event.translationX;
      y.value = startY + event.translationY;
    })
    .onEnd(() => {
      const newCol = Math.round(x.value / CELL_SIZE);
      const newRow = Math.round(y.value / CELL_SIZE);

      // horizontal bounds check
      if (newCol < 0 || newCol + plant.width - 1 >= GRID_COLS) {
        x.value = withSpring(startX);
        return;
      }
      // vertical bounds check
      if (newRow < 0 || newRow >= GRID_ROWS) {
        y.value = withSpring(startY);
        return;
      }

      // collision check for multi-cell width
      const occupied = plants.some((p) => {
        if (p.id === plant.id) return false;
        const pStart = p.col;
        const pEnd = p.col + p.width - 1;
        const newStart = newCol;
        const newEnd = newCol + plant.width - 1;
        return newRow === p.row && newEnd >= pStart && newStart <= pEnd;
      });

      if (occupied) {
        // revert if overlapping
        x.value = withSpring(startX);
        y.value = withSpring(startY);
      } else {
        // update plant position
        runOnJS(setPlants)((prev) =>
          prev.map((p) =>
            p.id === plant.id ? { ...p, row: newRow, col: newCol } : p
          )
        );
        // snap visually
        x.value = withSpring(newCol * CELL_SIZE);
        y.value = withSpring(newRow * CELL_SIZE);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    width: CELL_SIZE * plant.width, // dynamic width
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[styles.card, style]}>
        <Text style={styles.text}>{plant.name}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function GardenBoard() {
  const [plants, setPlants] = useState<Plant[]>([
    { id: "1", name: "🌱 Basil", row: 0, col: 0, width: 2 },
    { id: "2", name: "🌸 Rose", row: 1, col: 1, width: 1 },
    { id: "3", name: "🍅 Tomato", row: 2, col: 0, width: 3 },
  ]);

  return (
    <View style={styles.container}>
      {/* Draw grid */}
      {Array.from({ length: GRID_ROWS }).map((_, r) =>
        Array.from({ length: GRID_COLS }).map((_, c) => (
          <View
            key={`${r}-${c}`}
            style={[
              styles.cell,
              { top: r * CELL_SIZE, left: c * CELL_SIZE },
            ]}
          />
        ))
      )}

      {/* Render plants */}
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          plants={plants}
          setPlants={setPlants}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  cell: {
    position: "absolute",
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    position: "absolute",
    height: CELL_SIZE,
    backgroundColor: "#a3d9a5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
