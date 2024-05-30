import { Text, StyleSheet, View } from "react-native";

export default function RenderData({ habitData }) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <View>
            <Text style={styles.title}>Habit data</Text>
            <View>
                <Text>habit name: {habitData.name}</Text>
                <Text>History:</Text>
                {Object.entries(habitData.count).map(([key, value]) => (
                    <View key={key} style={{ paddingLeft: 20, flexDirection: "row" }}>
                        <Text style={{ width: 40 }}>{days[key]}: </Text>
                        <Text> {value}</Text>
                    </View>
                ))}
                <Text>target: {habitData.target}</Text>
                <Text>streak: {habitData.streak.count}</Text>
                <Text>routine: {habitData.routine}</Text>
                <Text>effort: {habitData.effort}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
});