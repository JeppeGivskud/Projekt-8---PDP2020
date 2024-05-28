import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import RenderData from "./components/RenderData";
import { useState } from "react";
import * as DataHandler from './components/DataHandler';

export default function App() {
    const [habitData, setHabitData] = useState({
        habitName: "Defaultname",
        count: [0, 0, 0, 0, 0, 0, 0],
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "DefaultRutine",
        effort: 0,
    });
    const name = "Pushups";

    useEffect(() => {
        DataHandler.getAllData(name, setHabitData);
    }, []);

    return (
        <View style={styles.container}>
            <Text>{habitData.habitName}</Text>
            <RenderData {...{ habitData }}></RenderData>
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
