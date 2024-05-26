import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="./DefaultApp/Overview" />
            <Stack.Screen name="./DefaultApp/Effort" />
            <Stack.Screen
                name="./DefaultApp/Done
            "
            />
        </Stack>
    );
}
