import { View } from "react-native";
// if we want to use StyleSheet
// import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CustomText from "./components/CustomText";
// import { useRouter } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText>Color Block Garden Design Cards</CustomText>

      {/* Navigation button */}
      <Link style ={{ fontFamily: 'Cinzel' }} href="/garden">Go to Garden</Link>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });
