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
    const [name, setName] = useState("");
    const [nameTemp, setNameTemp] = useState("");
    const [habitDataTemp, setHabitDataTemp] = useState(habitData);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    style={{ borderWidth: 1 }}
                    Value={name}
                    placeholder="Habit name"
                    placeholderTextColor={"#aaa"}
                    onChangeText={setNameTemp}
                    onSubmitEditing={() => setName(nameTemp)}
                ></TextInput>
            </View>
        );
    }

    // const nameRef = useRef("Undefined");
    // useEffect(() => { nameRef.current = habitData.name; console.log("A CHANGE", habitData.name) }, [habitData.name]);
    // console.log("habitData: ", habitData);

    // useEffect(() => {
    //     console.log("Fetching data...");
    // }, []);

    // if (habitData.name === "Undefined") {
    //     const [textValue, setTextValue] = useState("Underdefined");
    //     const [loading, setLoading] = useState(false);
    //     if (loading) {
    //         console.log("Loading...", habitData.name);
    //         return (
    //             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //                 <ActivityIndicator size={100} color="tomato" />
    //             </View>
    //         );
    //     }
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <TextInput
    //                 style={{ borderWidth: 1 }}
    //                 clearTextOnFocus={true}
    //                 defaultValue={textValue}
    //                 onChangeText={(newData) => setTextValue(newData)}
    //             ></TextInput>
    //             <Pressable
    //                 onPress={() => {
    //                     DataHandler.getAllData(textValue, setHabitData);
    //                     console.log(textValue);
    //                     setLoading(true);
    //                 }}
    //             >
    //                 <Text>Load {textValue}</Text>
    //             </Pressable>
    //         </View>
    //     );
    // }




    // TODO: raw data rendering til component
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
