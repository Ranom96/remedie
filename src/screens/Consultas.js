import { SafeAreaView, Text, FlatList, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import Header from "../components/Header";
import ExibirConsultas from "../components/ExibirConsultas";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../state/AuthProvider";
import ConsultasContext from "../state/ConsultasProvider";

export default function Consultas({ navigation }) {
  const { userId } = useContext(AuthContext);
  const { consultas, listarConsultas, atualizarConsulta } =
    useContext(ConsultasContext);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState();

  useEffect(() => {
    async function carregarConsultas() {
      setLoading(true);
      await listarConsultas();
      setLoading(false);
    }
    carregarConsultas();
  }, [consultas.length]);

  const filtrarConsultas = (consultas) => {
    if (consultas) {
      const consultasFilter = consultas.filter(
        (consulta) => consulta.userId === userId
      );
      return consultasFilter;
    } else {
      return <Text>Ainda não há nenhuma consulta cadastrada</Text>;
    }
  };

  const consultasFilter = filtrarConsultas(consultas);

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
      compareceu: checado,
      id: id,
    };
    await atualizarConsulta(data);
  };

  console.log(consultasFilter);
  return (
    <SafeAreaView>
      <Header title="Consultas" />
      <Text style={TextStyle}>Suas Consultas</Text>
      <View style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        {consultasFilter.length > 0 ? (
          <FlatList
            data={consultas}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ExibirConsultas
                especialidade={item.especialidade}
                data={item.data}
                local={item.local}
                medico={item.medico}
                horario={item.horario}
                id={item.key}
                handleCheck={handleCheck}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <Text>Ainda não há nenhuma consulta cadastrada</Text>
        )}
        <Button
          style={botaoStyle}
          onPress={() => navigation.navigate("ConsultasCadastrar")}
        >
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
