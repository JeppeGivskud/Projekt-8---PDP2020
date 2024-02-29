import { View, Dimensions } from "react-native";

export default function BottomBar({ safeAreaDimensions, color, opacity }) {
  return (
    <View
      style={{
        position: "absolute",
        width: safeAreaDimensions.width,

        //This was not planned but this configuration should hide the bar if the OS doesnt have it.
        //It'l still render though ¯\_(ツ)_/¯
        //TODO:
        height: Dimensions.get("window").height - safeAreaDimensions.height,
        top: Dimensions.get("window").height - safeAreaDimensions.y,

        backgroundColor: color,

        opacity: opacity,
      }}
    ></View>
  );
}
