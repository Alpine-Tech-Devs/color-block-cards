import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
              contentStyle: {
                backgroundColor: '#fff',
              }
            }}
            initialRouteName="index"
          />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
