import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CustomText from "./components/CustomText";
// import { useRouter } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Color Block Garden Design Cards</CustomText>

      <Link 
        href="/garden" 
        style={styles.link}
      >
        Go to Garden
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  link: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
