import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Component } from "react";
import Socket from "./components/socketio";

const App = () => {
  const checkboxRef = useRef();

  const getCheckboxValue = () => {
    checkboxRef.current.parentChildFunction();
  };
  return (
    <View style={styles.container}>
      <Socket></Socket>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={getCheckboxValue}>Press me</Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
