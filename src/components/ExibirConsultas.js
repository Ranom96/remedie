import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Modal,
  TouchableWithoutFeedback,
  View,
  onPress,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ExibirConsultas(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dado1 = props.dado1;
  const dado2 = props.dado2;
  const dado3 = props.dado3;
  const dado4 = props.dado4;

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

  return (
    <SafeAreaView style={exibirStyle}>
      <Checkbox
        style={checkboxStyle}
        label=""
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <SafeAreaView style={{ flexDirection: "column" }}>
        <Text style={TextStyle}>{props.dado1}</Text>
        <SafeAreaView style={{ flexDirection: "row" }}>
          <Text style={TextStyle}>{props.dado2}</Text>
          <Text style={TextStyle}>{props.dado3}</Text>
          <TouchableWithoutFeedback onPress={showModal}>
            <View>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ marginLeft: 24, color: "#545454" }}
                size={24}
              />
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
        <Text style={TextStyle}>{props.dado4}</Text>
      </SafeAreaView>

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
            <Button buttoncolor="red" onPress={() => {}}>
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