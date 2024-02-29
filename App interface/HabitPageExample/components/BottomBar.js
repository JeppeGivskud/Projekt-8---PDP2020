import { View, Dimensions } from "react-native";

export default function BottomBar({ safeAreaDimensions, color, opacity }) {
  return (
    <View
      style={{
        position: "absolute",
        width: safeAreaDimensions.width,
        height: safeAreaDimensions.height,
        top: Dimensions.get("window").height - safeAreaDimensions.y,

        backgroundColor: color,
        opacity: opacity,
      }}
    ></View>
  );
}
