import { StyleSheet, Pressable } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";

export default function Ellipsis({ onPress }) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <SFSymbol name="ellipsis.circle" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#fff",
        height: 20,
        width: 20,
    },
});