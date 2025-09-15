import { View } from "react-native";
import CustomText from "./components/CustomText";

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
    </View>
  );
}
