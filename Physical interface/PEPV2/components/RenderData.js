import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import EditableData from "./EditableData";

export default function RenderData({ habitData, setHabitData }) {
    const today = new Date().getDay();

    const changeName = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            habitName: newData,
        }));
    };
    const changeCount = (day, newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            count: { ...prevData.count, [day]: newData },
        }));
    };
    const changeTarget = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            target: newData,
        }));
    };
    const changeStreak = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            streak: { ...prevData.streak, count: newData },
        }));
    };
    const changeRoutine = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            routine: newData,
        }));
    };
    const changeEffort = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            effort: newData,
        }));
    };

    return (
        <View style={{ borderColor: "tomato", borderWidth: 2 }}>
            <EditableData Name={"HabitName: "} Data={habitData.habitName} setData={changeName}></EditableData>
            {Object.entries(habitData.count).map(([key, value]) => (
                <View key={key} style={{ paddingLeft: 20, flexDirection: "row" }}>
                    <EditableData
                        Name={"Day " + key + ":"}
                        Data={habitData.count[key]}
                        setData={(newData) => changeCount(Number(key), newData)}
                    ></EditableData>
                </View>
            ))}
            <EditableData Name={"Target: "} Data={habitData.target} setData={changeTarget}></EditableData>
            <EditableData Name={"Streak: "} Data={habitData.streak.count} setData={changeStreak}></EditableData>
            <EditableData Name={"Routine: "} Data={habitData.routine} setData={changeRoutine}></EditableData>
            <EditableData Name={"Effort: "} Data={habitData.effort} setData={changeEffort}></EditableData>
        </View>
    );
}
