import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.containerStyle}>
      <View>
        <Text
          style={[styles.textSpacer, styles.titleStyle]}
          variant="headlineMedium"
        >
          Esqueceu sua senha?
        </Text>
        <Text
          style={[styles.textSpacer, styles.paragraphSpacer]}
          variant="titleSmall"
        >
          Imagine os remédios
        </Text>

        <TextInput
          mode="outlined"
          outlineStyle={{ backgroundColor: "transparent" }}
          outlineColor="#005AFF"
          activeOutlineColor="#005AFF"
          label={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.textSpacer} variant="titleSmall">
          Você receberá um email com as instruções para recuperar sua senha
        </Text>
      </View>
      <View style={[styles.buttonContainer, styles.containerSpacer]}>
        <Button mode="contained" style={styles.buttonStyles} onPress={() => {}}>
          Enviar
        </Button>
        <Button
          mode="contained"
          style={styles.buttonStyles}
          onPress={() => navigation.navigate("Login")}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    margin: 24,
  },
  textSpacer: {
    marginTop: 20,
    textAlign: "center",
  },
  paragraphSpacer: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    margin: 0,
  },
  containerSpacer: {
    marginTop: 50,
  },
  buttonStyles: {
    width: 150,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#005AFF",
  },
  titleStyle: {
    fontWeight: "bold",
  },
});

export default ForgotPassword;
