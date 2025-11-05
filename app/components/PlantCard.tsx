import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from "react-native-reanimated";
import { 
  BASE_CELL_SIZE, 
  GRID_COLS, 
  GRID_ROWS, 
  getPixelWidth 
} from '../constants';

type Plant = {
  id: string;
  name: string;
  row: number;
  col: number;
  widthInInches: number;
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
  const startX = useSharedValue(plant.col * BASE_CELL_SIZE);
  const startY = useSharedValue(plant.row * BASE_CELL_SIZE);
  const x = useSharedValue(plant.col * BASE_CELL_SIZE);
  const y = useSharedValue(plant.row * BASE_CELL_SIZE);
  const scale = useSharedValue(1);
  
  const updatePlantPosition = React.useCallback((newRow: number, newCol: number) => {
    setPlants(prev =>
      prev.map(p =>
        p.id === plant.id ? { ...p, row: newRow, col: newCol } : p
      )
    );
  }, [plant.id, setPlants]);
  
  const drag = Gesture.Pan()
    .minDistance(2)
    .maxPointers(1)
    .onBegin(() => {
      'worklet';
      startX.value = x.value;
      startY.value = y.value;
    })
    .onTouchesDown(() => {
      'worklet';
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      'worklet';
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
    })
    .onFinalize(() => {
      'worklet';
      scale.value = withSpring(1);
    })
    .onEnd(() => {
      'worklet';
      scale.value = 1.0;
      
      // Snap to grid
      const newCol = Math.round(x.value / BASE_CELL_SIZE);
      const newRow = Math.round(y.value / BASE_CELL_SIZE);
      
      // Check grid bounds
      // const isValidPosition = newCol >= 0 && 
      //   newCol + plant.width <= GRID_COLS && 
      //   newRow >= 0 && 
      //   newRow < GRID_ROWS;
      const isValidPosition = true;

      // Check for collisions
      const hasCollision = plants.some((p) => {
        if (p.id === plant.id) return false;
        
        const thisLeft = newCol;
        const thisRight = newCol + plant.width;
        const thisTop = newRow;
        const thisBottom = newRow + 1;
        
        const otherLeft = p.col;
        const otherRight = p.col + p.width;
        const otherTop = p.row;
        const otherBottom = p.row + 1;
        
        return !(thisRight <= otherLeft || 
                thisLeft >= otherRight || 
                thisBottom <= otherTop || 
                thisTop >= otherBottom);
      });

      // Update position if valid and no collision
      if (isValidPosition && !hasCollision) {
        runOnJS(updatePlantPosition)(newRow, newCol);
        x.value = withSpring(newCol * BASE_CELL_SIZE);
        y.value = withSpring(newRow * BASE_CELL_SIZE);
      } else {
        x.value = withSpring(startX.value);
        y.value = withSpring(startY.value);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value }, 
      { translateY: y.value },
      { scale: scale.value }
    ],
    width: getPixelWidth(plant.width),
    height: BASE_CELL_SIZE,
  }));

  const pixelWidth = getPixelWidth(plant.width);
  
  const [imageError, setImageError] = React.useState(false);
  {console.log("PlantCard")}

  return (
    <View style={{ position: 'absolute' }}>
      <GestureDetector gesture={drag}>
        <Animated.View style={[styles.container, style]}>
          <View style={[styles.cardContainer, { width: getPixelWidth(plant.width) }]}>
            <Image
              source={!imageError ? plantImages[plant.name] : require("../../assets/images/Lowbush_Blueberry.png")}
              style={styles.image}
              resizeMode="cover"
              onError={() => setImageError(true)}
              defaultSource={require("../../assets/images/Lowbush_Blueberry.png")}
            />
            <Text style={styles.title} numberOfLines={2}>
              {plant.name} ({plant.widthInInches}")
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  cardContainer: {
    backgroundColor: "#e2f0ff",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    elevation: 3, // Keep elevation for Android
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', // For web
  },
  image: {
    width: "100%",
    height: BASE_CELL_SIZE,
  },
  title: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default PlantCard;
