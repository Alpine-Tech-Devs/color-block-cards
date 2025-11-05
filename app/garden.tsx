import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GardenBoard from "./components/GardenBoard";

export default function GardenScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.container}>
        <GardenBoard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
