import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
    const [habitData, setHabitData] = useState({
        habitName: "Undefined",
        count: 0,
        target: 100,
        habitColor: "black",
        streak: { count: 0, omissions: 0 },
    });
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="./DefaultApp/Overview" {...{ habitData }} />
            <Stack.Screen name="./DefaultApp/Effort" />
            <Stack.Screen
                name="./DefaultApp/Done
            "
            />
        </Stack>
    );
}
