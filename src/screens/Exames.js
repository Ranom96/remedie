import { SafeAreaView, Text, FlatList, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import Header from "../components/Header";
import ExibirExames from "../components/ExibirExames";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../state/AuthProvider";
import ExamesContext from "../state/ExamesProvider";

export default function Exames({ props, navigation }) {
  const { userId } = useContext(AuthContext);
  const { exames, listarExames, atualizarExame } = useContext(ExamesContext);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState();

  useEffect(() => {
    async function carregarExames() {
      setLoading(true);
      await listarExames();
      setLoading(false);
    }
    carregarExames();
  }, [exames.length]);

  const filtarExames = (exames) => {
    if (exames) {
      const examesFilter = exames.filter((exame) => exame.userId === userId);
      return examesFilter;
    } else {
      return <Text>Ainda não há nenhuma consulta cadastrada</Text>;
    }
  };

  const examesFilter = filtarExames(exames);

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
      compareceu: checado,
      id: id,
    };
    await atualizarExame(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Exames" />
      <Text style={TextStyle}>Seus Exames</Text>
      <View style={{ flex: 1, alignItems: "center", marginTop: 24 }}>
        {examesFilter.length > 0 ? (
          <FlatList
            data={exames}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ExibirExames
                key={item.key}
                exame={item.exame}
                data={item.data}
                horario={item.horario}
                local={item.local}
                compareceu={item.compareceu}
                id={item.key}
                handleCheck={handleCheck}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <Text>Ainda não há nenhum exame cadastrado</Text>
        )}
      </View>
        <Button
          style={botaoStyle}
          onPress={() => navigation.navigate("ExamesCadastrar")}
        >
          <Text style={{ color: "white", fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
    </SafeAreaView>
  );
}
