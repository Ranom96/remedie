import { SafeAreaView, Text, ScrollView, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import RemediosContext from "../state/RemediosProvider";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";

const schema = yup.object().shape({
  medicamento: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(6, "No mínimo 6 caracteres"),
  dosagem: yup
    .string()
    .required("O campo precisa ser preenchido")
    .min(6, "No mínimo 6 caracteres"),
  horario: yup
    .string()
    .required("O campo precisa ser preenchido")
    .matches(/(\d){2}:(\d){2}/, 'O horário precisa estar no padrão "00:00"'),
});

export default function RemediosEditar({ route, navigation }) {
  const { atualizarRemedio } = useContext(RemediosContext);
  const { medicamento, dosagem, horario, id } = route.params;

  const AtualizarRemedio = async (formData) => {
    formData = {
      medicamento: formData.medicamento,
      dosagem: formData.dosagem,
      horario: formData.horario,
      id: id,
    };
    try {
      await atualizarRemedio(formData);
      navigation.navigate("Remédios");
    } catch (error) {
      console.log(error);
    }
  };

  const TextStyle = {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "400",
    marginHorizontal: 24,
    paddingTop: 16,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      medicamento: medicamento,
      dosagem: dosagem,
      horario: horario,
    },
  });

  return (
    <SafeAreaView>
      <Header title="Remédios" />
      <ScrollView>
        <Text style={TextStyle}>Atualize seu remédio</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              style={styles.textSpacer}
              value={value}
              onChangeText={onChange}
              label="medicamento"
            />
          )}
          name="medicamento"
        />
        {errors.medicamento && <Text>{errors.medicamento.message}</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              style={styles.textSpacer}
              value={value}
              onChangeText={onChange}
              label="dosagem"
            />
          )}
          name="dosagem"
        />
        {errors.dosagem && <Text>{errors.dosagem.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              outlineStyle={{ backgroundColor: "transparent" }}
              outlineColor="#005AFF"
              activeOutlineColor="#005AFF"
              style={styles.textSpacer}
              value={value}
              onChangeText={onChange}
              label="horario"
            />
          )}
          name="horario"
        />
        {errors.horario && <Text>{errors.horario.message}</Text>}

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            textColor="red"
            onPress={() => navigation.navigate("Remédios")}
          >
            cancelar
          </Button>
          <Button textColor="#007AFF" onPress={handleSubmit(AtualizarRemedio)}>
            Salvar
          </Button>
        </View>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    margin: 24,
  },
  registerText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  textSpacer: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    marginStart: 30,
    marginEnd: 30,
    borderRadius: 10,
    backgroundColor: "#005AFF",
  },
  headerStyle: {
    margin: 0,
  },
});
