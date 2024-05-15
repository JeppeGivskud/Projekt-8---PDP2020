import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

// TODO: Flyt de her funktioner ud af App.js!
// TODO: Variabel for IP-adresse

const IP = `http://192.168.1.173:5000`;

export default function App() {
    const [allData, setAllData] = useState();
    const [habitData, setHabitData] = useState({});
    const [date, setDate] = useState("2024-05-10");
    const [habitName, setHabitName] = useState("Pushups");
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState();
    const [effort, setEffort] = useState(10);
    const [routine, setRoutine] = useState(``);

    // Create table if not exists
    const createTable = () => {
        fetch(`${IP}/createTable`)
            .then((response) => response.text())
            .catch((error) => console.error("Error:", error));
    };

    // Get all data
    const getAllData = () => {
        fetch(`${IP}/getData`)
            .then((response) => response.json())
            .then((data) => setAllData(data))
            .catch((error) => console.error("Error:", error));
    };

    // Post count
    const postCount = (habitName) => {
        fetch(`${IP}/setCount?habitName=${encodeURIComponent(habitName)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ count: count }),
        })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error));
    };

    // Post effort
    const postEffort = (habitName) => {
        fetch(`${IP}/setEffort?habitName=${encodeURIComponent(habitName)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ effort: effort }),
        })
            .then((response) => response.json())
            .then((data) => setEffort(data))
            .catch((error) => console.error("Error:", error));
    };

    // Get target from latest habit row with same habitName. Bruges i newHabitRow til at få target med i den nye række
    async function getTarget(habitName) {
        const response = await fetch(
            `${IP}/getTarget?habitName=${encodeURIComponent(habitName)}`
        );
        const data = await response.json();
        setTarget(data);
        console.log(data);
        return data;
    }

    // Get routine from latest habit row with same habitName. Bruges i newHabitRow til at få rutine med i den nye række
    async function getRoutine(habitName) {
        const response = await fetch(
            `${IP}/getRoutine?habitName=${encodeURIComponent(habitName)}`
        );
        const data = await response.json();
        setRoutine(data);
        console.log(data);
        return data;
    }

    // Create new habit row if it doesn't already exist for today. Tager target og routine fra seneste habit row med samme navn
    async function newHabitRow(habitName) {
        const target = await getTarget(habitName);
        const routine = await getRoutine(habitName);
        fetch(`${IP}/newHabitRow?habitName=${encodeURIComponent(habitName)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                target: target,
                routine: routine,
            }),
        }).catch((error) => console.error("Error:", error));
    }

    // GUI til at se og styre værdier
    return (
        <View style={styles.container}>
            <Button title="Refresh Data" onPress={getAllData} />
            <Button title="Get target" onPress={() => getTarget(habitName)} />
            <Button title="Get routine" onPress={() => getRoutine(habitName)} />

            <TextInput
                style={styles.textColor}
                placeholder="Count"
                onChangeText={setCount}
                onSubmitEditing={() => postCount(habitName)}
            />

            <TextInput
                style={styles.textColor}
                placeholder="Effort"
                onChangeText={setEffort}
                onSubmitEditing={() => postEffort(habitName)}
            />

            <Text style={styles.textColor}>Target = {target}</Text>
            <Text style={styles.textColor}>Routine = {routine}</Text>

            {Object.entries(habitData).map(([key, value]) => (
                <Text
                    style={styles.textColor}
                    key={key}
                >{`${key}: ${value} `}</Text>
            ))}

            <Button
                title="New habit row"
                onPress={() => newHabitRow(habitName)}
            />
            <Button title="Create table" onPress={createTable} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        alignItems: "center",
        justifyContent: "center",
    },

    textColor: {
        color: "#fff",
        fontSize: 20,
    },
});
