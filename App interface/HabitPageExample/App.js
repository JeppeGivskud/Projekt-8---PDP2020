import { Button, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import HabitPage from "./components/HabitPage";
import LogButton from "./components/LogButton";
import BottomBar from "./components/BottomBar";

export default function App() {
  const [safeAreaDimensions, setSafeAreaDimensions] = useState({
    x: 1,
    y: 1,
    width: 1,
    height: 1,
  });
  const handleSafeAreaLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSafeAreaDimensions({ x, y, width, height });
    console.log("Height", height, "StartY", y);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1 }}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          console.log("LAYOUT", height);
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: "tomato" }}
          onLayout={handleSafeAreaLayout}
        >
          <Text>hi</Text>
        </View>
      </SafeAreaView>

      <BottomBar
        safeAreaDimensions={safeAreaDimensions}
        color={"blue"}
        opacity={0.8}
      ></BottomBar>
      {/*This button can log whatever */}
      <LogButton log={"hello world"}></LogButton>
    </View>
  );
}

const styles = StyleSheet.create({});
