import { StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text style={styles.headlineSpacer} variant="displayLarge">
        Remedie
      </Text>
      <Text variant="titleMedium" style={styles.headlineSpacer}>
        Sua agenda médica em um só lugar
      </Text>
      <Text variant="labelLarge" style={styles.textAlignment}>
        Remedie é um aplicativo que ajuda você a gerenciar sua saúde e
        bem-estar. Com ele, você pode:
      </Text>
      <List.Item
        titleStyle={styles.listItemSize}
        title="Registrar seus remédios, consultas e exames"
        titleNumberOfLines={2}
      />
      <List.Item
        titleStyle={styles.listItemSize}
        title="Receber notificações sobre seus compromissos"
        titleNumberOfLines={2}
      />
      <List.Item
        titleStyle={styles.listItemSize}
        title="Acessar informações sobre sua saúde"
        titleNumberOfLines={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
  },
  headlineSpacer: {
    marginBottom: 40,
    fontWeight: "bold",
  },
  subtitleSpacer: {
    marginBottom: 30,
    fontWeight: "bold",
  },
  listItemSize: {
    fontSize: 14,
  },
  textAlignment: {
    textAlign: "left",
    margin: 15,
  },
});

export default Home;
