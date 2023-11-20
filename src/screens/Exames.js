import { SafeAreaView, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import ExibirConsultas from "../components/ExibirConsultas";

export default function Exames({ props, navigation }) {
  const TextStyle = {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 24,
    paddingTop: 16,
  };

  const botaoStyle = {
    backgroundColor: "#007AFF",
    borderRadius: 24,
    position: "absolute",
    bottom: 16,
  };

  const data = [
    {
      id: "1",
      nomeExame: "Tomografia",
      data: "24/11/2023",
      local: "Laboratório X",
    },
    {
      id: "2",
      nomeExame: "Endoscopia",
      data: "27/11/2023",
      local: "Laboratório X",
    },
  ];

  return (
    <>
      <Header title="Remédios" />
      <Text style={TextStyle}>Remédios do dia</Text>
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExibirConsultas
              dado1={item.nomeExame}
              dado2={item.data}
              dado3={item.local}
            />
          )}
        />
        <Button
          style={botaoStyle}
          onPress={() => navigation.navigate("ExamesCadastrar")}
        >
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}
