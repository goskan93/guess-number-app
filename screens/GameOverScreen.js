import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
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
          <Text style={{ ...DefaultStyles.bodyText, textAlign: "center" }}>
            Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> round to guess the number
            <Text style={styles.highlight}> {props.number}</Text>
          </Text>
        </View>
        <MainButton onPress={props.newGame}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    // justifyContent: "center",
    margin: Dimensions.get("window").height / 40,
  },
  highlight: {
    color: Colors.primary,
  },
});

export default GameOverScreen;
