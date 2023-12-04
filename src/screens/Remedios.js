import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
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
    top: "345%",
    right: 8,
    padding: 8,
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
    await atualizarRemedio(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Remédios" />
      <Text style={TextStyle}>Remédios do dia</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 24,
        }}
      >
        {remediosFilter.length > 0 ? (
          <FlatList
            style={{ flex: 1, width: "tela" }}
            data={remediosFilter}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ExibirRemedios
                key={item.key}
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

      </View>
        <Button
          style={botaoStyle}
          onPress={() => navigation.navigate("RemediosCadastrar")}
        >
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
    </SafeAreaView>
  );
  
}
