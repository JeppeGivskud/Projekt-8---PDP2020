import { View, Button } from "react-native";
export default function LogButton({ log }) {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Button title={"Log something"} onPress={() => console.log(log)}></Button>
    </View>
  );
}
