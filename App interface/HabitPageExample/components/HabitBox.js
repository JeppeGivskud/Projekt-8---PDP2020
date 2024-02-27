import { Text, StyleSheet, View, Pressable } from "react-native";

export default function HabitBox({ color, name, count }) {
    return (
        <View style={[StyleSheet.container, { backgroundColor: color }]}>
            <Pressable>

            </Pressable>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "40%",
        height: 150,
        borderRadius: 20,
    }

});