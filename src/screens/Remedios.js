import { SafeAreaView, Text, View, FlatList, ScrollView } from "react-native";
import { Button, List } from "react-native-paper";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import RemediosContext from "../state/RemediosProvider";
import { AuthContext } from "../state/AuthProvider";
import ExibirRemedios from "../components/ExibirRemedios";

export default function Remedios({ props, navigation }) {
  const { userId } = useContext(AuthContext);
  const { remedios, listRemedios } = useContext(RemediosContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carrega() {
      setLoading(true);
      await listRemedios();
      setLoading(false);
    }
    carrega();
  }, []);

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
          <ScrollView>
            {remediosFilter.map((remedio, key) => (
              <ExibirRemedios
                medicamento={remedio.medicamento}
                horario={remedio.horario}
                dosagem={remedio.dosagem}
              />
            ))}
          </ScrollView>
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
