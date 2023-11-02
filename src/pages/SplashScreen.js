import { StyleSheet, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <Image
        style={[styles.imageContainer, styles.spacer]}
        source={require("../../assets/pilula-preta.png")}
      />
      <Text style={[styles.spacer, styles.textColor]} variant="displayMedium">
        Remedie App
      </Text>
      <ActivityIndicator animating={true} color="white" size={100} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 10,
  },
  spacer: {
    margin: 10,
  },
  textColor: {
    color: "#FFF",
  },
});

export default SplashScreen;
