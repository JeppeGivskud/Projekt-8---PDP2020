import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    const [habitData, setHabitData] = useState({
        habitName: "",
        count: { 0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "DefaultRutine",
        effort: 0,
    });
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
