import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import PlantCard from "./PlantCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { 
  BASE_CELL_SIZE, 
  GRID_COLS, 
  GRID_ROWS, 
  calculateGridWidth 
} from '../constants';

type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  widthInInches: number;
  width: number; // calculated grid cells based on inches
};

export default function GardenBoard() {
  const [plants, setPlants] = useState<Plant[]>([
    { 
      id: "1", 
      name: "Lowbush Blueberry", 
      row: 0, 
      col: 0, 
      widthInInches: 13,
      width: calculateGridWidth(13)
    },
    { 
      id: "2", 
      name: "Little Henry Virginia Sweetspire", 
      row: 1, 
      col: 1, 
      widthInInches: 16,
      width: calculateGridWidth(16)
    },
    { 
      id: "3", 
      name: "Dwarf Fountain Grass", 
      row: 2, 
      col: 2, 
      widthInInches: 15,
      width: calculateGridWidth(15)
    }
  ]);

  console.log(plants)

  const gridWidth = GRID_COLS * BASE_CELL_SIZE;
  const gridHeight = GRID_ROWS * BASE_CELL_SIZE;

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.gestureRoot}>
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContent,
            { width: gridWidth, height: gridHeight }
          ]}
          scrollEnabled={false}
        >
          <View style={[styles.gridContainer, { width: gridWidth, height: gridHeight }]}>
            {/* Grid */}
            {Array.from({ length: GRID_ROWS }).map((_, r) =>
              Array.from({ length: GRID_COLS }).map((_, c) => (
                <View
                  key={`${r}-${c}`}
                  style={[styles.cell, { top: r * BASE_CELL_SIZE, left: c * BASE_CELL_SIZE }]}
                />
              ))
            )}

            {/* Plants */}
            {Array.isArray(plants) && plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} plants={plants} setPlants={setPlants} />
            ))}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  gestureRoot: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gridContainer: {
    position: 'relative',
    backgroundColor: "#f4f4f4",
  },
  cell: {
    position: "absolute",
    width: BASE_CELL_SIZE,
    height: BASE_CELL_SIZE,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

