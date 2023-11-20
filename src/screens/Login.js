import { useContext, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";
// TODO: #47 Implementar lógica para login de usuário @Kievv

const schema = yup.object().shape({
  email: yup
    .string()
    .required("O campo precisa ser preenchido")
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, "Email inválido"),
  senha: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(6, "A senha deve conter ao menos 6 caracteres"),
});

const Login = ({ navigation, logar }) => {
  const { handleLogin } = useContext(AuthContext);

  const Entrar = async (formData) => {
    try {
      await handleLogin(formData);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Login página", error);
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={styles.welcomeText} variant="headlineLarge">
        Bem vindo ao Remedie
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            outlineStyle={{ backgroundColor: "transparent" }}
            outlineColor="#005AFF"
            activeOutlineColor="#005AFF"
            style={styles.textSpacer}
            label="Email"
            value={value}
            onChangeText={onChange}
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            outlineStyle={{ backgroundColor: "transparent" }}
            outlineColor="#005AFF"
            activeOutlineColor="#005AFF"
            style={styles.textSpacer}
            value={value}
            onChangeText={onChange}
            label="Senha"
            secureTextEntry={true}
            placeholder="Senha"
          />
        )}
        name="senha"
      />
      {errors.senha && <Text>{errors.senha.message}</Text>}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text
          style={[styles.passResetColor, styles.textSpacer]}
          variant="titleSmall"
        >
          Esqueci minha senha
        </Text>
      </TouchableOpacity>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={handleSubmit(Entrar)}
      >
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
