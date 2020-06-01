import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return <View style={{ ...styles.cardContainer, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 6,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
