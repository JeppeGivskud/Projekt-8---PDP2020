import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import EditableData from "./EditableData";

export default function RenderData({ habitData, setHabitData }) {
    const changeName = (newData) => {
        setHabitData((prevData) => ({
            ...prevData,
            name: newData,
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
    const today = (new Date().getDay() + 6) % 7;

    return (
        <View style={{ borderColor: "tomato", borderWidth: 2 }}>
            <EditableData Name={"HabitName: "} Data={habitData.name} setData={changeName}></EditableData>
            <EditableData
                Name={"Count:"}
                Data={habitData.count[today]}
                setData={(newData) => changeCount(today, newData)}
            ></EditableData>

            <EditableData Name={"Target: "} Data={habitData.target} setData={changeTarget}></EditableData>
            <EditableData Name={"Streak: "} Data={habitData.streak.count} setData={changeStreak}></EditableData>
            <EditableData Name={"Routine: "} Data={habitData.routine} setData={changeRoutine}></EditableData>
            <EditableData Name={"Effort: "} Data={habitData.effort} setData={changeEffort}></EditableData>
        </View>
    );
}
