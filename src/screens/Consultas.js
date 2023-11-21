import { SafeAreaView, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import ExibirConsultas from "../components/ExibirConsultas";

export default function Consultas({ props, navigation }) {
  const TextStyle = {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 24,
    paddingTop: 16,
  };

  const botaoStyle = {
    backgroundColor: "#007AFF",
    borderRadius: 50,
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: 15,
  };

  const data = [
    {
      id: "1",
      tipoConsulta: "Ortopedia",
      horario: "10h15",
      local: "Hospital Ortopédico",
    },
    {
      id: "2",
      tipoConsulta: "Cardiologia",
      horario: "17h00",
      local: "Cardio+",
    },
  ];

  return (
    <>
      <Header title="Consultas" />
      <Text style={TextStyle}>Suas Consultas</Text>
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExibirConsultas
              dado1={item.tipoConsulta}
              dado2={item.horario}
              dado3={item.local}
            />
          )}
        />
        <Button style={botaoStyle} onPress={() => navigation.navigate("")}>
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8  }}>+</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}
