import { View, StyleSheet, Pressable } from "react-native";

export default function Ellipsis({ onPress }) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.circle} />
            <View style={styles.circle} />
            <View style={styles.circle} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
        width: 40,
        backgroundColor: "rgba(255,255,255,0.3)",
        opacity: 50,
        borderRadius: 42,
        paddingHorizontal: 6,
    },

    circle: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255,0.9)",
    },

});