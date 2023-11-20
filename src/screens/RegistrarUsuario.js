import { useContext, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("O campo precisa ser preenchido")
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i, "Email inválido"),
  senha: yup
    .string()
    .required("O campo senha deve ser preenchido")
    .min(6, "A senha deve conter ao menos 6 caracteres"),
});

const RegistrarUsuario = ({ navigation }) => {
  const { handleRegister } = useContext(AuthContext);

  const cadastrar = async (formData) => {
    try {
      await handleRegister(formData);
      Alert.alert("Usuário cadastrado com sucesso");
      navigation.navigate("Login");
    } catch (error) {
      console.log("página registrar", error);
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
      <Text style={styles.registerText} variant="headlineLarge">
        Cadastre sua conta Remedie
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
            value={value}
            onChangeText={onChange}
            label="Email"
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
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={handleSubmit(cadastrar)}
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
