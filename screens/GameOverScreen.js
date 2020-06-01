import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The game is over!</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          source={{ uri: "https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg" }}
          // source={require("../assets/success.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={DefaultStyles.bodyText}>
          Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> round to guess the number
          <Text style={styles.highlight}> {props.number}</Text>
        </Text>
      </View>
      <MainButton onPress={props.newGame}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    // justifyContent: "center",
    margin: 20,
  },
  highlight: {
    color: Colors.primary,
  },
});

export default GameOverScreen;
