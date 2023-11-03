import { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation, logar }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    logar;
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={styles.welcomeText} variant="headlineLarge">
        Bem vindo ao Remedie
      </Text>
      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label={"Login"}
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        mode="outlined"
        outlineStyle={{ backgroundColor: "transparent" }}
        outlineColor="#005AFF"
        activeOutlineColor="#005AFF"
        style={styles.textSpacer}
        label={"Senha"}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text
          style={[styles.passResetColor, styles.textSpacer]}
          variant="titleSmall"
        >
          Esqueci minha senha
        </Text>
      </TouchableOpacity>
      <Button style={styles.buttonStyle} mode="contained" onPress={handleLogin}>
        Entrar
      </Button>
      <Text
        style={[styles.createAccount, styles.textSpacer]}
        variant="titleSmall"
      >
        Ainda não tem uma conta?
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text
          style={[styles.createAccount, styles.actionText]}
          variant="titleSmall"
        >
          Criar conta
        </Text>
      </TouchableOpacity>
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

  passResetColor: {
    color: "rgba(0, 0, 0, 0.61)",
  },
  createAccount: {
    textAlign: "center",
  },
  actionText: {
    color: "#005AFF",
  },
  welcomeText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Login;
