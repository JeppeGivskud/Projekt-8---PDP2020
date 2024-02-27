import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import Ellipsis from "./components/ellipsis";

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.column}>
          <Button style={styles.box} title={"1"}></Button>
          <Button style={styles.box} title={"2"}></Button>
          <Button style={styles.box} title={"3"}></Button>
          <Button style={styles.box} title={"4"}></Button>
        </View>
        <View style={styles.column}>
          <Button style={styles.box} title={"5"}></Button>
          <Button style={styles.box} title={"6"}></Button>
          <Button style={styles.box} title={"7"}></Button>
          <Button style={styles.box} title={"8"}></Button>
          <Text>
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo Looooooooooooo
            Looooooooooooo Looooooooooooo Looooooooooooo
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  box: {
    color: "white",
    width: "100%",
    height: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "pink",
  },
});
