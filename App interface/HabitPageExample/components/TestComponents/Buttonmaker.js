import { View, Button, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Pushable() {
  const [color, setColor] = useState("rgb(0, 0, 0)");

  const generateColor = () => {
    let r = generateRandomNumber();
    let g = generateRandomNumber();
    let b = generateRandomNumber();
    //"rgba(1, 2, 4, 0.5)"
    let colorvalue = "rgb(" + r + "," + g + "," + b + ")";
    setColor(colorvalue);
  };

  const generateRandomNumber = () => {
    const min = 1;
    const max = 255;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number;
  };

  return (
    <View
      onLayout={() => generateColor()}
      style={{
        backgroundColor: color,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: color,
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => (generateColor(), console.log(color))}
      >
        <Text>I am a button</Text>
      </TouchableOpacity>
    </View>
  );
}
