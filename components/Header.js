import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
const Header = (props) => {
  return (
    <View style={{ ...styles.header, ...Platform.select({ ios: styles.headerIos, android: styles.headerAndroid }) }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  headerIos: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === "ios" ? Colors.primary : "#fff",
    fontSize: 18,
  },
});

export default Header;
