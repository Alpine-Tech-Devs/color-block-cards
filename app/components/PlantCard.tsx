import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";

type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  width: number;
};

type PlantCardProps = {
  plant: Plant;
  plants: Plant[];
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
};

const plantImages: Record<string, any> = {
  "Lowbush Blueberry": require("../../assets/images/Lowbush_Blueberry.png"),
  "Little Henry Virginia Sweetspire": require("../../assets/images/Little_Henry.png"),
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, plants, setPlants }) => {
  const startX = plant.col * 80;
  const startY = plant.row * 80;

  const x = useSharedValue(startX);
  const y = useSharedValue(startY);

  const drag = Gesture.Pan()
    .onUpdate((event) => {
      x.value = startX + event.translationX;
      y.value = startY + event.translationY;
    })
    .onEnd(() => {
      const newCol = Math.round(x.value / 80);
      const newRow = Math.round(y.value / 80);

      if (newCol < 0 || newCol + plant.width - 1 >= 5) {
        x.value = withSpring(startX);
        return;
      }
      if (newRow < 0 || newRow >= 8) {
        y.value = withSpring(startY);
        return;
      }

      const occupied = plants.some((p) => {
        if (p.id === plant.id) return false;
        const pStart = p.col;
        const pEnd = p.col + p.width - 1;
        const newStart = newCol;
        const newEnd = newCol + plant.width - 1;
        return newRow === p.row && newEnd >= pStart && newStart <= pEnd;
      });

      if (occupied) {
        x.value = withSpring(startX);
        y.value = withSpring(startY);
      } else {
        runOnJS(setPlants)((prev) =>
          prev.map((p) =>
            p.id === plant.id ? { ...p, row: newRow, col: newCol } : p
          )
        );
        x.value = withSpring(newCol * 80);
        y.value = withSpring(newRow * 80);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    width: 80 * plant.width,
    height: 80,
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[{ position: "absolute" }, style]}>
        <View style={[styles.cardContainer, { width: 80 * plant.width }]}>
          <Image
            source={plantImages[plant.name]}
            style={{ width: "100%", height: 80 }}
            resizeMode="cover"
          />
          <Text style={styles.title}>{plant.name}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default PlantCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#e2f0ff",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 2,
  },
});
