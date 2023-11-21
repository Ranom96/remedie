import { SafeAreaView, Text, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import ExamesContext from "../state/ExamesProvider";

const schema = yup.object().shape({
  exame: yup.string().required("O campo precisa ser preenchido"),
  data: yup.string().required("O campo precisa ser preenchido"),
  horario: yup
    .string()
    .required("O campo precisa ser preenchido")
    .matches(/(\d){2}:(\d){2}/, 'O horário precisa estar no padrão "00:00"'),
  local: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(3, "O campo precisa ter no mínimo 3 caracteres"),
});

export default function ExamesEditar({ route, navigation }) {
  const { atualizarExame } = useContext(ExamesContext);
  const { exame, data, horario, local, id } = route.params;

  const AtualizarExame = async (formData) => {
    formData = {
      exame: formData.exame,
      data: formData.data,
      horario: formData.horario,
      local: formData.local,
      id: id,
    };
    try {
      await atualizarExame(formData);
      navigation.navigate("Exames");
    } catch (error) {
      console.log(error);
    }
  };

  const TextStyle = {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 24,
    paddingTop: 16,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      exame: exame,
      data: data,
      horario: horario,
      local: local,
    },
  });

  return (
    <SafeAreaView>
      <Header title="Exames" />
      <ScrollView>
        <Text style={TextStyle}>Cadastre seus exames</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              value={value}
              onChangeText={onChange}
              label="Exame"
              descricao="Nome do exame"
              placeholder="Escreva o nome do exame"
            />
          )}
          name="exame"
        />
        {errors.local && <Text>{errors.local.message}</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              value={value}
              onChangeText={onChange}
              label="data"
              descricao="Data da consulta"
              placeholder="Escreva a data no padrão dd-mm-aaaa"
            />
          )}
          name="data"
        />
        {errors.data && <Text>{errors.data.message}</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              value={value}
              onChangeText={onChange}
              label="horário"
              descricao="Horário da consulta"
              placeholder="Escreva o horário no padrão 00:00"
            />
          )}
          name="horario"
        />
        {errors.horario && <Text>{errors.horario.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              value={value}
              onChangeText={onChange}
              label="local"
              descricao="Local onde será realizado o exame"
              placeholder="Escreva o endereço de onde fará o exame"
            />
          )}
          name="local"
        />
        {errors.local && <Text>{errors.local.message}</Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button textColor="red" onPress={() => navigation.navigate("Exames")}>
            cancelar
          </Button>
          <Button textColor="#007AFF" onPress={handleSubmit(AtualizarExame)}>
            Salvar
          </Button>
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
