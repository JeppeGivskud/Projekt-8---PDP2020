import { View, Button, Text } from "react-native";
import { useState } from "react";

export default function Pushable() {
  const [color, setColor] = useState("rgb(255, 255, 255)");

  generateColor = () => {
    let r = generateRandomNumber();
    let g = generateRandomNumber();
    let b = generateRandomNumber();
    //"rgba(1, 2, 4, 0.5)"
    let string = "rgb(" + r + "," + g + "," + b + ")";
    setColor(string);
    console.log(color);
  };
  generateRandomNumber = () => {
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
      }}
    >
      <Text>hi</Text>
      <Button title="OST" onPress={() => console.log(color)}></Button>
    </View>
  );
}
