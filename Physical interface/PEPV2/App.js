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
    const [habitName, setHabitName] = useState("Pushups");
    const [nameTemp, setNameTemp] = useState("Pushups");
    const [habitDataTemp, setHabitDataTemp] = useState(habitData);
    const [loading, setLoading] = useState(true);

    // Loader data hver gang name ændres
    useEffect(() => {
        if (habitName === "") {
            console.log("name is empty!", habitName);
            return;
        }
        console.log("Activating fetchData");
        const fetchData = async () => {
            console.log("Fetching data");
            setLoading(true);
            await DataHandler.getAllData(habitName, tableName, dataBase, setHabitData);
            setLoading(false);
            console.log("Data fetched");
        };
        fetchData();
    }, [habitName]);

    if (loading) {
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
                    onSubmitEditing={() => setHabitName(nameTemp)}
                ></TextInput>
            </View>
        );
    }

    return (
        <View>
            <Button title="Go back" onPress={() => setLoading(true)}></Button>
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
