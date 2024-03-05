import { View, Button, Dimensions } from "react-native";

export default function LogButton({ log }) {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        top: Dimensions.get("window").height / 2,
        left: Dimensions.get("window").width / 2 - 80,
        zIndex: 100,
        backgroundColor: "rgb(1,1,1)",
      }}
    >
      <Button title={"Log something"} onPress={() => console.log(log)}></Button>
    </View>
  );
}
