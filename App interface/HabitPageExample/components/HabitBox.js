import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ellipsis from "./ellipsis";

{/* 
TODO: onPress for ellipsis skal pege på actionSheet
TODO: logik for at man kan complete habit igen når det er en ny dag og at streak dermed skal stige
TODO: HabitBox bliver for smal når man sætter to ved siden af hinanden. Den bruger ikke pladsen
*/ }

export default function HabitBox({ color, name, symbol }) {
    const [habitComplete, setHabitComplete] = useState(false);
    const [streak, setStreak] = useState(0);
    const [streakActive, setStreakActive] = useState(false);

    const markComplete = () => {
        if (habitComplete === false) {
            setHabitComplete(true);
            setStreak(streak => streak + 1)
            setStreakActive(true)
        }
    }

    const markIncomplete = () => {
        if (habitComplete) {
            setHabitComplete(false)
            setStreak(streak => streak - 1)
            if (streak > 0) {
                setStreakActive(false)
            }
        }
    }

    if (habitComplete) {
        return (
            <TouchableOpacity
                style={[styles.container, { backgroundColor: color }]}
                onPress={markIncomplete}
                activeOpacity={0.8} >

                <View style={styles.streakEllipsisContainer}>
                    <View style={styles.streakContainer}>
                        <Text style={styles.habitName}>{Number(streak)}</Text>
                        <Ionicons name="flame" size={30} color="#fff" />
                    </View>
                    <Ellipsis onPress={null} />
                </View>

                <View style={styles.habitNameContainer}>
                    <Text style={[styles.habitName, { paddingRight: 2 }]}>{symbol}</Text>
                    <Text style={styles.habitName}>{name}</Text>
                </View>

            </TouchableOpacity >

        );
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: "#222" }]} onPress={markComplete} activeOpacity={0.8} >
            {streakActive ? (
                <View style={styles.streakEllipsisContainer}>
                    <View style={styles.streakContainer}>
                        <Text style={styles.habitName}>{Number(streak)}</Text>
                        <Ionicons name="flame" size={30} color="#fff" />
                    </View>
                    <Ellipsis onPress={null} />
                </View>
            ) : (
                <View style={styles.streakEllipsisContainer}>
                    <View style={styles.streakContainer}>
                        <Text style={styles.habitName}>{Number(streak)}</Text>
                        <Ionicons name="flame" size={30} color="rgba(1,1,1,0)" />
                    </View>
                    <Ellipsis onPress={null} />
                </View>
            )}

            <View style={styles.habitNameContainer}>
                <Text style={[styles.habitName, { paddingRight: 2 }]}>{symbol}</Text>
                <Text style={styles.habitName}>{name}</Text>
            </View>

        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: Dimensions.get("window").width / 2 - 20, // width/2 - 20 fordi der skal være plads til 2x margin
        minWidth: 150,
        height: 130,
        borderRadius: 20,
        margin: 10, // Margin er plads omkring ydersiden
        padding: 12, // Padding er plads indad
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },

    streakContainer: {
        flexDirection: "row",
        paddingTop: 2,
    },

    streakEllipsisContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },

    habitNameContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
    },

    habitName: {
        color: "#fff",
        fontSize: 25,
    },
});