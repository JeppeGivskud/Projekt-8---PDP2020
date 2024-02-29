import { View, Button, Text } from "react-native";
import { useState } from "react";
import Buttonmaker from "./TestComponents/Buttonmaker";
export default function TestButtons() {
  return (
    <View style={{ flex: 1 }}>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
    </View>
  );
}
