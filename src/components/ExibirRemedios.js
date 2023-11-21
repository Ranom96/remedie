import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Modal,
  TouchableWithoutFeedback,
  View,
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

  const exibirStyle = {
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
  };

  const TextStyle = {
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
  };

  const checkboxStyle = {
    marginHorizontal: 16,
    marginLeft: 16,
  };

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
    <SafeAreaView style={exibirStyle}>
      <Checkbox
        style={checkboxStyle}
        label=""
        status={isChecked ? "checked" : "unchecked"}
        onPress={handleCheck}
      />

      <View style={{ flexDirection: "column" }}>
        <Text style={TextStyle}>{props.medicamento}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={TextStyle}>{props.horario}</Text>
          <Text style={TextStyle}>{props.dosagem}</Text>
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
        <Text style={TextStyle}>{props.dado4}</Text>
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
            <Button buttoncolor="#007AFF" onPress={() => {}}>
              Editar
            </Button>
            <TouchableWithoutFeedback onPress={hideModal}>
              <Text style={{ marginLeft: 16, fontSize: 24 }}>X</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
