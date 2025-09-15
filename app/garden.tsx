import { View, StyleSheet } from "react-native";
import GardenBoard from "./components/GardenBoard";

export default function GardenScreen() {
  return (
    <View style={styles.container}>
      <GardenBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
