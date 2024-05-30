import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import RenderData from "./components/RenderData";
import * as DataHandler from "./components/DataHandler";
import { ActivityIndicator } from "react-native";

export default function App() {
    const [habitData, setHabitData] = useState({
        name: "Undefined",
        count: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "DefaultRutine",
        effort: 0,
    });
    const [dataBase, setDatabase] = useState("habitdb"); //must be lowercase
    const [tableName, setTableName] = useState("user1");
    const [habitName, setHabitName] = useState("Exercise");
    const [nameTemp, setNameTemp] = useState("Exercise");
    const [habitDataTemp, setHabitDataTemp] = useState(habitData);
    const [loadingScreen, setLoadingScreen] = useState(true);
    useEffect(() => {
        setHabitDataTemp(habitData);
    }, [habitData]);
    // Loader data hver gang name ændres
    useEffect(() => {
        if (!loadingScreen) {
            if (habitName === "") {
                console.log("name is empty!", habitName);
                return;
            }
            // console.log("Activating fetchData");
            // const fetchData = async () => {
            //     console.log("Fetching data");
            //     await DataHandler.getAllData(habitName, tableName, dataBase, setHabitData, "http://hvejsel.dk:5000");
            //     console.log("Data fetched");
            // };
            // fetchData();
            DataHandler.getAllData(habitName, tableName, dataBase, setHabitData /*"http://hvejsel.dk:5000"*/);
        }
    }, [loadingScreen]);

    if (loadingScreen) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{[dataBase, " ,", tableName, " ,", habitName]}</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    Value={dataBase}
                    placeholder={dataBase}
                    placeholderTextColor={"#aaa"}
                    onChangeText={setDatabase}
                    onSubmitEditing={() => setDatabase(dataBase)}
                ></TextInput>
                <TextInput
                    style={{ borderWidth: 1 }}
                    Value={tableName}
                    placeholder={tableName}
                    placeholderTextColor={"#aaa"}
                    onChangeText={setTableName}
                    onSubmitEditing={() => setTableName(tableName)}
                ></TextInput>
                <TextInput
                    style={{ borderWidth: 1 }}
                    Value={nameTemp}
                    placeholder={nameTemp}
                    placeholderTextColor={"#aaa"}
                    onChangeText={setNameTemp}
                    onSubmitEditing={() => {
                        setHabitName(nameTemp);
                    }}
                ></TextInput>
                <Button
                    title="Load data"
                    onPress={() => {
                        setLoadingScreen(false);
                    }}
                ></Button>
            </View>
        );
    }

    return (
        <View>
            <Button title="Go back" onPress={() => setLoadingScreen(true)}></Button>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <Text>Habit data</Text>

                    <View style={{ borderColor: "tomato", borderWidth: 2, padding: 10 }}>
                        <Text>Habit name: {habitData.name}</Text>
                        <Text>Week:</Text>
                        {Object.entries(habitData.count).map(([key, value]) => (
                            <View key={key} style={{ paddingLeft: 20, flexDirection: "row" }}>
                                <Text style={{ width: 40 }}>Day {key}</Text>
                                <Text>:</Text>
                                <Text> {value}</Text>
                            </View>
                        ))}
                        <Text>Target: {habitData.target}</Text>
                        <Text>Streak: {habitData.streak.count}</Text>
                        <Text>Routine: {habitData.routine}</Text>
                        <Text>Effort: {habitData.effort}</Text>
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
                        setHabitDataTemp(habitDataTemp);
                        DataHandler.setRow(habitDataTemp);
                    }}
                ></Button>
            </View>
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
