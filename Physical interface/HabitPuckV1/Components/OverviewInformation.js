import { View, StyleSheet, Text } from "react-native";

export default function OverviewInformation({ streak, value, goal, habitName, width, height }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.upper]}>
                {value} / {goal}
            </Text>
            <Text style={styles.habitName}>{habitName}</Text>
            <Text style={styles.lower}>{streak} days</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    upper: {
        fontWeight: "light",
        fontSize: 20,
        Color: "black",
    },
    habitName: {
        fontWeight: "bold",
        fontSize: 30,
        Color: "black",
    },
    lower: {
        fontWeight: "regular",
        fontSize: 20,
        Color: "black",
    },
    container: {
        width: 250,
        height: 250,
        padding: 50,
        position: "absolute",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 2,
        elevation: 2,
    },
});