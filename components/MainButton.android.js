import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, TouchableNativeFeedback, Platform } from "react-native";
import Colors from "../constants/colors";
const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "open-sans",
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default MainButton;
