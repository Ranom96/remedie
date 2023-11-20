import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const RegistrarUsuario = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passTwo, setPassTwo] = useState("");

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={styles.registerText} variant="headlineLarge">
        Cadastre sua conta Remedie
      </Text>

      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label="Senha"
        value={pass}
        onChangeText={(text) => setPass(text)}
      />
      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label="Senha"
        value={passTwo}
        onChangeText={(text) => setPassTwo(text)}
      />
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Cadastrar
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    margin: 24,
  },
  registerText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  textSpacer: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    marginStart: 30,
    marginEnd: 30,
    borderRadius: 10,
    backgroundColor: "#005AFF",
  },
  headerStyle: {
    margin: 0,
  },
});
export default RegistrarUsuario;
