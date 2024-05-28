import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import RenderData from "./components/RenderData";
import * as DataHandler from "./components/DataHandler";
import { ActivityIndicator } from "react-native";

export default function App() {
    const [habitData, setHabitData] = useState({
        name: "Defaultname",
        count: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "DefaultRutine",
        effort: 0,
    });
    const name = "Pushups";
    const [habitDataTemp, setHabitDataTemp] = useState(habitData);

    useEffect(() => {
        console.log("Fetching data...");
        DataHandler.getAllData(name, setHabitData);
    }, []);

    console.log("habitData: ", habitData);

    if ((habitData.name = "Defaultname")) {
        return (
            <View style={{ justifyContent: "center", flex: 1 }}>
                <ActivityIndicator size={100} color="tomato" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text>Raw habit data</Text>

                <View style={{ borderColor: "tomato", borderWidth: 2, padding: 10 }}>
                    <Text>habit name: {habitData.name}</Text>
                    <Text>History:</Text>
                    {Object.entries(habitData.count).map(([key, value]) => (
                        <View key={key} style={{ paddingLeft: 20, flexDirection: "row" }}>
                            <Text style={{ width: 40 }}>Day {key}</Text>
                            <Text>:</Text>
                            <Text> {value}</Text>
                        </View>
                    ))}
                    <Text>target: {habitData.target}</Text>
                    <Text>streak: {habitData.streak.count}</Text>
                    <Text>routine: {habitData.routine}</Text>
                    <Text>effort: {habitData.effort}</Text>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={{ paddingTop: 10 }}>Edit habit data</Text>
                <RenderData habitData={habitDataTemp} setHabitData={setHabitDataTemp}></RenderData>
            </View>
            <Button
                title={"Save changes"}
                onPress={() => {
                    setHabitData(habitDataTemp);
                    DataHandler.postCount(name, habitData.count);
                }}
            ></Button>

            {/* <Button>
                title={"Post count"}
                onPress={() => {
                    DataHandler.postCount(name, habitData.count);
                }}
            </Button> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
