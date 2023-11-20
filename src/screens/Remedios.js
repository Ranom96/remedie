import { SafeAreaView, Text, FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import Header from "../components/Header";
import ExibirConsultas from "../components/ExibirConsultas";
import { useContext } from "react";
import RemediosContext from "../state/RemediosProvider";
import { AuthContext } from "../state/AuthProvider";

export default function Remedios({ props, navigation }) {
  const { userId } = useContext(AuthContext);
  const { remedios, listRemedios } = useContext(RemediosContext);

  const remediosFilter = remedios.filter(
    (remedio) => remedio.userId === userId
  );

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

  return (
    <>
      <Header title="Remédios" />
      <Text style={TextStyle}>Remédios do dia</Text>
      <View style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        {remediosFilter.length > 0 ? (
          <FlatList
            data={remediosFilter}
            keyExtractor={(remedio) => remedio.id}
            renderItem={({ remedio }) => (
              <ExibirConsultas
                dado1={remedio.medicamento}
                dado2={remedio.horario}
                dado3={remedio.dosagem}
              />
            )}
          />
        ) : (
          <Text>Ainda não há nenhum remédio cadastrado</Text>
        )}

        <Button
          style={botaoStyle}
          onPress={() => navigation.navigate("RemediosCadastrar")}
        >
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
      </View>
    </>
  );
}
