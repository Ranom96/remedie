import { SafeAreaView, Text, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import ConsultasContext from "../state/ConsultasProvider";

const schema = yup.object().shape({
  data: yup.string().required("O campo precisa ser preenchido"),
  horario: yup
    .string()
    .required("O campo precisa ser preenchido")
    .matches(/(\d){2}:(\d){2}/, 'O horário precisa estar no padrão "00:00"'),
  local: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(3, "O campo precisa ter no mínimo 3 caracteres"),
  medico: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(3, "O campo precisa ter no mínimo 3 caracteres"),
  especialidade: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(3, "O campo precisa ter no mínimo 3 caracteres"),
});

export default function ConsultasCadastrar({ navigation }) {
  const { addConsulta } = useContext(ConsultasContext);
  const { userId } = useContext(AuthContext);

  const CadastrarConsulta = async (formData) => {
    formData = {
      data: formData.data,
      horario: formData.horario,
      local: formData.local,
      medico: formData.medico,
      especialidade: formData.especialidade,
      compareceu: false,
      userId: userId,
    };
    console.log(formData);
    try {
      await addConsulta(formData);
      navigation.navigate("Consultas");
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
      data: "",
      horario: "",
      local: "",
      medico: "",
      especialidade: "",
    },
  });

  return (
    <SafeAreaView>
      <Header title="Consultas" />
      <ScrollView>
        <Text style={TextStyle}>Cadastre suas consultas</Text>

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
              label="Local"
              descricao="Endereço do consultório"
              placeholder="Escreva o endereço"
            />
          )}
          name="local"
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
              label="Médico"
              descricao="Nome do médico"
              placeholder="Escreva o nome do médico que irá te atender"
            />
          )}
          name="medico"
        />
        {errors.medico && <Text>{errors.medico.message}</Text>}
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
              label="Especialidade"
              descricao="Especialidade do médico"
              placeholder="Escreva qual é a especialidade da sua consulta"
            />
          )}
          name="especialidade"
        />
        {errors.especialidade && <Text>{errors.especialidade.message}</Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            textColor="red"
            onPress={() => navigation.navigate("Consultas")}
          >
            cancelar
          </Button>
          <Button textColor="#007AFF" onPress={handleSubmit(CadastrarConsulta)}>
            Salvar
          </Button>
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
