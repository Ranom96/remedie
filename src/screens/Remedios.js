import { SafeAreaView, Text, View, FlatList, ScrollView } from "react-native";
import { ActivityIndicator, Button, List } from "react-native-paper";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import RemediosContext from "../state/RemediosProvider";
import { AuthContext } from "../state/AuthProvider";
import ExibirRemedios from "../components/ExibirRemedios";

export default function Remedios({ navigation }) {
  const { userId } = useContext(AuthContext);
  const { remedios, listarRemedios, atualizarRemedio } =
    useContext(RemediosContext);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState();

  useEffect(() => {
    async function carregarRemedios() {
      setLoading(true);
      await listarRemedios();
      setLoading(false);
    }
    carregarRemedios();
  }, [remedios.length]);

  const filtrarRemedios = (remedios) => {
    if (remedios) {
      const remediosFilter = remedios.filter(
        (remedio) => remedio.userId === userId
      );
      return remediosFilter;
    } else {
      return <Text>Ainda não há nenhum remédio cadastrado</Text>;
    }
  };

  const remediosFilter = filtrarRemedios(remedios);

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
  if (loading) {
    return <ActivityIndicator />;
  }

  const handleCheck = async (checado, id) => {
    setCheck(checado);
    const data = {
      tomado: checado,
      id: id,
    };
    console.log(data);
    await atualizarRemedio(data);
  };

  return (
    <SafeAreaView>
      <Header title="Remédios" />
      <Text style={TextStyle}>Remédios do dia</Text>
      <View style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        {remediosFilter.length > 0 ? (
          <FlatList
            data={remedios}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ExibirRemedios
                medicamento={item.medicamento}
                horario={item.horario}
                dosagem={item.dosagem}
                tomado={item.tomado}
                handleCheck={handleCheck}
                id={item.key}
                navigation={navigation}
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
    </SafeAreaView>
  );
}
