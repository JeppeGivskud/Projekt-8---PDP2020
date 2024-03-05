import { Text, StyleSheet, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ellipsis from "./ellipsis";

{/* 
TODO: brug ActionSheet pakke til at render en menu når man trykker på ellipsis
TODO: Indsæt symbol før name
*/ }

export default function HabitBox({ color, name, count, symbol }) {
    return (
        <Pressable style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.ellipsisContainer}>
                <View style={[styles.ellipsisContainer, { paddingTop: 10 }]}>
                    <Text style={[styles.habitName, { fontSize: 25 }]}>{count}</Text>
                    <Ionicons name="flame" size={30} color="#fff" />
                </View>
                <Ellipsis onPress={null} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.habitName}>{name}</Text>
            </View>
        </Pressable >
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 150,
        borderRadius: 20,
    },

    ellipsisContainer: {
        paddingTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
    },

    textContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "flex-end",
        padding: 10,
    },

    habitName: {
        color: "#fff",
        fontSize: 25,


    },



});