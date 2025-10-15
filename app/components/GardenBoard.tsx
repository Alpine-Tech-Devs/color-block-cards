import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PlantCard from "./PlantCard";

const CELL_SIZE = 80;
const GRID_COLS = 5;
const GRID_ROWS = 8;

type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  width: number; // in grid cells
};

export default function GardenBoard() {
  const [plants, setPlants] = useState<Plant[]>([
    { id: "1", name: "Lowbush Blueberry", row: 0, col: 0, width: 2 },
    { id: "2", name: "Little Henry Virginia Sweetspire", row: 1, col: 1, width: 1 },
  ]);

  return (
    <View style={styles.container}>
      {/* Grid */}
      {Array.from({ length: GRID_ROWS }).map((_, r) =>
        Array.from({ length: GRID_COLS }).map((_, c) => (
          <View
            key={`${r}-${c}`}
            style={[styles.cell, { top: r * CELL_SIZE, left: c * CELL_SIZE }]}
          />
        ))
      )}

      {/* Plants */}
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} plants={plants} setPlants={setPlants} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  cell: {
    position: "absolute",
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

