import { StyleSheet, View } from "react-native";

import HabitPage from "./components/HabitPage";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
        alignContent: "space-around",
      }}
    >
      <HabitPage></HabitPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
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
  overlayBottom: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(255,100,200,0.8)", // semi-transparent red
    zIndex: 10, // ensure it's above other components
  },
});
