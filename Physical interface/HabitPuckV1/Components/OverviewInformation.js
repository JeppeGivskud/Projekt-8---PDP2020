import { View, StyleSheet, Text } from "react-native";

export default function OverviewInformation({ habitName, width, height }) {
    return (
        <View style={styles.container}>
            <View style={[styles.Absolute, { width: { width }, height: { height } }]}>
                <Text style={{ fontSize: 30, Color: "black" }}>{habitName}</Text>
                <Text style={{ Color: "black" }}>{habitName}</Text>
                <Text style={{ Color: "black" }}>{habitName}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    Absolute: {
        position: "absolute",
    },
});
