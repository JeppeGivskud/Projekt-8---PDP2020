import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import EditData from "./components/EditData";
import * as DataHandler from "./components/DataHandler";
import { ActivityIndicator } from "react-native";

export default function App() {
    const [habitData, setHabitData] = useState({
        name: "",
        count: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "DefaultRoutine",
        effort: 0,
    });
    const [name, setName] = useState("");
    const [nameTemp, setNameTemp] = useState("");
    const [loading, setLoading] = useState(true);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayIndex = (new Date().getDay() + 6) % 7

    // Loader data hver gang name ændres
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            console.log("name: ", name);
            await DataHandler.getAllData(name, setHabitData);
            setLoading(false);
        };
        fetchData();
    }, [name]);

    // TextInput til at vælge hvilken vane skal vises.
    if (loading) {
        return (
            <View style={styles.nameInputFieldContainer}>
                <Text style={styles.title}>Enter habit name</Text>
                <TextInput
                    style={{ borderWidth: 2, borderRadius: 8, padding: 10 }}
                    Value={name}
                    placeholder="Habit name"
                    placeholderTextColor={"#aaa"}
                    onChangeText={setNameTemp}
                    onSubmitEditing={() => setName(nameTemp)}
                ></TextInput>
            </View>
        );
    };

    console.log("app.js habitData: ", habitData);
    console.log("app.js habitData.count[date]: ", habitData.count[todayIndex]);

    return (
        <View style={styles.container}>

            {/* Raw data preview TODO: skal flyttes til component tænker jeg*/}
            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Habit data</Text>
                <View style={{}}>
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

            {/* EditData text fields*/}
            <View style={{ alignItems: "center" }}>
                <EditData habitData={habitData} setHabitData={setHabitData}></EditData>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 100,
        flexDirection: "row",
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
    },

    nameInputFieldContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#eee",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
});
