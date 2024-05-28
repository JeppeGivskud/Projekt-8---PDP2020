import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default function RenderData({ habitData }) {
    const [data, setData] = useState(habitData);
    const today = new Date().getDay();

    const incrementCount = () => {
        setData((prevData) => ({
            ...prevData,
            count: {
                ...prevData.count,
                [today]: prevData.count[today] + 1,
            },
        }));
    };
    const changeHabitData = (newData) => {
        habitData.habitName = newData;
    };

    const incrementEffort = () => {
        setData((prevData) => ({
            ...prevData,
            effort: prevData.effort + 1,
        }));
    };
    return (
        <View>
            <Text>Habit Data for :{habitData.habitName}</Text>
            <Text>Count: {data.count[today]}</Text>
            <Text>Effort: {data.effort}</Text>
            <Button title="Increment Count" onPress={incrementCount} />
            <Button
                title="Increment Effort"
                onPress={() => {
                    incrementEffort;
                    changeHabitData("ost");
                }}
            />
        </View>
    );
}
