import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Pressable } from "react-native";
import { postCount, postEffort } from "./DataHandler";

// TODO: fix border omkring edit Habit data


export default function EditData({ habitData, setHabitData }) {

    const todayIndex = (new Date().getDay() + 6) % 7
    const [countTemp, setCountTemp] = useState(habitData.count[todayIndex]);
    const [effortTemp, setEffortTemp] = useState(habitData.effort);

    // Updates habitData with the new count and effort from input fields
    const updateHabitData = (countTemp, effortTemp) => {
        const updatedHabitData = {
            ...habitData,
            count: {
                ...habitData.count,
                [todayIndex]: countTemp,
            },
            effort: effortTemp,
        };
        setHabitData(updatedHabitData);
        console.log("Habit data updating...");
    };

    // Data postes til database når den opdaterede version af habitData er ændret
    useEffect(() => {
        postCount(habitData);
        postEffort(habitData);
        console.log("Data posted to database");
        console.log(habitData);
    }, [habitData]);

    return (
        <View style={styles.container}>
            <View style={styles.textFieldsContainer}>
                <Text style={styles.title}>Edit todays count and effort</Text>

                {/* Count input felt */}
                <View style={styles.nameInputFieldContainer}>
                    <Text style={{ width: 50 }}>Count: </Text>
                    <TextInput
                        style={styles.textField}
                        placeholder={habitData.count[todayIndex]}
                        placeholderTextColor={"#aaa"}
                        onChangeText={(text) => setCountTemp(Number(text))}
                    />
                </View>

                {/* effort input felt */}
                <View style={styles.nameInputFieldContainer}>
                    <Text style={{ width: 50 }}>Effort: </Text>
                    <TextInput
                        style={styles.textField}
                        placeholder={habitData.effort}
                        placeholderTextColor={"#aaa"}
                        onChangeText={(text) => setEffortTemp(Number(text))}
                    />
                </View>
            </View>

            {/* Save button */}
            <Button
                title={"Save changes"}
                onPress={() => { updateHabitData(countTemp, effortTemp) }}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
    },

    nameInputFieldContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
    },

    textFieldsContainer: {
        flexDirection: "column",
        padding: 10,
    },

    textField: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});