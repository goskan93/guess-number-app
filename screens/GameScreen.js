import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, FlatList } from "react-native";
import Number from "../components/Number";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min) + min);
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const renderListItem = /*(value, numOfRound)*/ (listLength, itemData) => (
  <View key={listLength} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
    <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
  </View>
);

const GameScreen = (props) => {
  const initGuess = generateRandomBetween(1, 100, props.userChoice);
  const { onGameOver, userChoice } = props;
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [passedGuesses, setPassedGuesses] = useState([initGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height);
  const currentLow = useRef(1);
  const currentHigh = useRef(99); // they are not regenerate when rerender so i can use them as store somthing that doesnt change when rerender

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(passedGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, [Dimensions]);

  const nextGuessHandler = (direction) => {
    if ((direction === "lower" && currentGuess < userChoice) || (direction === "greater" && currentGuess > userChoice)) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextRandom = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextRandom);
    // setRounds((prevRound) => prevRound + 1);
    setPassedGuesses((curPastGuesses) => [nextRandom.toString(), ...curPastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="#fff" />
          </MainButton>
          <Number>{currentGuess}</Number>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="#fff" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={passedGuesses}
            renderItem={renderListItem.bind(null, passedGuesses.length)}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <Number>{currentGuess}</Number>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="#fff" />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="#fff" />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
            {passedGuesses.map((guess, index) => renderListItem(guess, passedGuesses.length - index))}
          </ScrollView> */}
          <FlatList
            data={passedGuesses}
            renderItem={renderListItem.bind(null, passedGuesses.length)}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },
  list: {
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
});

export default GameScreen;
