import React, { useContext, useState } from "react";
import {
  SafeAreaView,
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
import ExamesContext from "../state/ExamesProvider";

export default function ExibirExames(props) {
  const [isChecked, setIsChecked] = useState(props.compareceu ? true : false);
  const [isVisible, setIsVisible] = useState(false);
  const { removerExame } = useContext(ExamesContext);

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
    await removerExame(id);
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
        <Text style={styles.TextStyle}>{props.exame}</Text>
        <Text style={styles.TextStyle}>{props.local}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TextStyle}>{props.data}</Text>
          <Text style={styles.TextStyle}>{props.horario}</Text>
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
                props.navigation.navigate("ExamesEditar", {
                  exame: props.exame,
                  data: props.data,
                  horario: props.horario,
                  local: props.local,
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
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 10,
    maxHeight: 120,
    maxWidth: 300,
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
