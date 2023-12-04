import React, { useState } from "react";
import {
  Text,
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import RemediosContext from "../state/RemediosProvider";

export default function ExibirRemedios(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(props.tomado ? true : false);
  const { removerRemedio } = useContext(RemediosContext);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
    console.log(props.id);
    props.handleCheck(!isChecked, props.id);
  };

  const handleRemover = async (id) => {
    await removerRemedio(id);
    hideModal();
  };
  return (
    <View style={styles.exibirStyle}>
      <Checkbox
        style={styles.checkboxStyle}
        label=""
        status={isChecked ? "checked" : "unchecked"}
        onPress={handleCheck}
      />

      <View style={{ flexDirection: "column" }}>
        <Text style={styles.TextStyle}>{props.medicamento}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TextStyle}>{props.horario}</Text>
          <Text style={styles.TextStyle}>{props.dosagem}</Text>
          <TouchableWithoutFeedback onPress={showModal}>
            <View>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ marginLeft: 24, color: "#545454" }}
                size={24}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              paddingRight: 40,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Button buttoncolor="red" onPress={() => handleRemover(props.id)}>
              Remover
            </Button>
            <Button
              buttoncolor="#007AFF"
              onPress={() => {
                props.navigation.navigate("RemediosEditar", {
                  medicamento: props.medicamento,
                  dosagem: props.dosagem,
                  horario: props.horario,
                  id: props.id,
                });
                hideModal();
              }}
            >
              Editar
            </Button>
            <TouchableWithoutFeedback onPress={hideModal}>
              <Text style={{ marginLeft: 16, fontSize: 24 }}>X</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  exibirStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 16,
    marginTop: 16,
  },

  TextStyle: {
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  checkboxStyle: {
    marginHorizontal: 16,
    marginLeft: 16,
  },
});
