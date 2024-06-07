import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import RenderData from "./components/RenderData";
import EditData from "./components/EditData";
import * as DataHandler from "./components/DataHandler";

export default function App() {
    const [habitData, setHabitData] = useState({
        name: "",
        count: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        target: 100,
        streak: { count: 0, omissions: 0 },
        routine: "",
        effort: 0,
    });
    const [name, setName] = useState("");
    const [nameTemp, setNameTemp] = useState("");
    const [loading, setLoading] = useState(true);

    // Loades data every time name changes
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

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <RenderData habitData={habitData}></RenderData>
                <EditData habitData={habitData} setHabitData={setHabitData}></EditData>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
