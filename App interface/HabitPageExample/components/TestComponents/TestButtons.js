import { View, Button, Text } from "react-native";
import { useState } from "react";
import Buttonmaker from "./Buttonmaker";
export default function TestButtons() {
  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
      <Buttonmaker></Buttonmaker>
    </View>
  );
}
