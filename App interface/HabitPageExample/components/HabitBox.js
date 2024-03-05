import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ellipsis from "./ellipsis";

{/* 
TODO: onPress for ellipsis skal pege på actionSheet
TODO: Indsæt symbol før name
TODO: Count skal kun vises når habit er complete. 
*/ }

export default function HabitBox({ color, name, count, symbol }) {
    const [habitComplete, setHabitComplete] = useState(false);

    const markComplete = () => {
        if (habitComplete === false) {
            setHabitComplete(true);
        }
    }

    const markIncomplete = () => {
        if (habitComplete) {
            setHabitComplete(false)
        }
    }

    if (habitComplete) {
        return (
            <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={markIncomplete} >

                <View style={styles.streakEllipsisContainer}>
                    <View style={styles.streakContainer}>
                        <Text style={styles.habitName}>{Number(count) + 1}</Text>
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
        <TouchableOpacity style={[styles.container, { backgroundColor: "#222" }]} onPress={markComplete} activeOpacity={0.7} >

            <View style={styles.streakEllipsisContainer}>
                <View style={styles.streakContainer}>
                    <Text style={styles.habitName}>{Number(count)}</Text>
                    <Ionicons name="flame" size={30} color="#fff" />
                </View>
                <Ellipsis onPress={null} />
            </View>

            <View style={styles.habitNameContainer}>
                <Text style={[styles.habitName, { paddingRight: 2 }]}>{symbol}</Text>
                <Text style={styles.habitName}>{name}</Text>
            </View>

        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: Dimensions.get("window").width / 2 - 20, // width/2 - 20 fordi der skal være plads til 2x margin
        minWidth: 150,
        height: 130,
        borderRadius: 20,
        margin: 10, // Margin er plads omkring ydersiden
        padding: 12, // Padding er plads indad
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