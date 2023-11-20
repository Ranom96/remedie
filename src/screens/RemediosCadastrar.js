import { SafeAreaView, Text, ScrollView, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import RemediosContext from "../state/RemediosProvider";
import { AuthContext } from "../state/AuthProvider";
import * as yup from "yup";
import { addRemedio } from "../services/RemedioService";

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

export default function RemediosCadastrar({ props, navigation }) {
  const { remedios, listarRemedios } = useContext(RemediosContext);
  const { userId } = useContext(AuthContext);

  const CadastrarRemedio = async (formData) => {
    formData = {
      medicamento: formData.medicamento,
      dosagem: formData.dosagem,
      horario: formData.horario,
      tomado: false,
    };
    try {
      await addRemedio(formData, userId);
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
      medicamento: "",
      dosagem: "",
      horario: "",
    },
  });

  return (
    <SafeAreaView>
      <Header title="Remédios" />
      <ScrollView>
        <Text style={TextStyle}>Cadastre seus remédios</Text>

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
              placeholder="Medicamento"
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
              placeholder="Dosagem"
            />
          )}
          name="dosagem"
        />
        {errors.dosagem && <Text>{errors.dosagem.message}</Text>}
        {/* <TimeInput label="Horário do remédio" /> */}
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
              placeholder="Horario"
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
          <Button textColor="#007AFF" onPress={handleSubmit(CadastrarRemedio)}>
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
