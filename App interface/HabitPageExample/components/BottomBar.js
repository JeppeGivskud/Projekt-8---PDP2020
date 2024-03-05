import { View, Dimensions } from "react-native";

export default function BottomBar({ safeAreaDimensions, color, opacity }) {
  let Height;
  return (
    <View
      style={{
        position: "absolute",

        width: "100%",
        top: "100%",
        height: 40,

        backgroundColor: color,
        opacity: opacity,
      }}
    ></View>
  );
}
