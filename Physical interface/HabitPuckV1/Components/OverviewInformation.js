import { View, StyleSheet, Text, Image } from "react-native";

export default function OverviewInformation({
    streak,
    value,
    goal,
    habitName,
    width,
    height,
}) {
    return (
        <View style={styles.container}>
            <View style={[styles.smallContainer, { gap: 4 }]}>
                <Text style={[styles.upper, { fontSize: 23 }]}>{value}</Text>
                <Text style={[styles.upper]}>/</Text>
                <Text style={[styles.upper]}>{goal}</Text>
            </View>
            <View style={styles.smallContainer}>
                <Text style={styles.habitName}>{habitName}</Text>
            </View>
            <View style={styles.smallContainer}>
                <Text style={[styles.lower, { paddingLeft: 20 }]}>
                    {streak} days
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/StreakFlame.png")}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                        }}
                    />
                </View>
            </View>
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
    smallContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    imageContainer: {
        width: 25,
        height: 18,
        overflow: "visible",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: 250,
        height: 250,
        padding: 50,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});
