import { SafeAreaView, Text, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import TimeInput from "../components/TimeInput";
import DateInput from "../components/DateInput";

export default function ConsultasCadastrar({ props, navigation }) {
  const TextStyle = {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 24,
    paddingTop: 16,
  };

  return (
    <SafeAreaView>
      <Header title="Consultas" />
      <ScrollView>
        <Text style={TextStyle}>Cadastre suas consultas</Text>
        <DateInput label="Data" descricao="Insira a data da consulta" />
        <TextInputComponent
          label="Local"
          descricao="Insira o nome do hospital/clínica"
          placeholder="Nome"
        />
        <TextInputComponent
          label="Médico"
          descricao="Insira o nome do seu médico"
          placeholder="Nome"
        />
        <TextInputComponent
          label="Especialidade"
          descricao="Insira a especialidade do exame"
          placeholder="Nome"
        />
        <TimeInput label="Horário da consulta" />
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button
            textColor="red"
            onPress={() => navigation.navigate("Consultas")}
          >
            cancelar
          </Button>
          <Button textColor="#007AFF" onPress={() => {}}>
            Salvar
          </Button>
        </SafeAreaView>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
