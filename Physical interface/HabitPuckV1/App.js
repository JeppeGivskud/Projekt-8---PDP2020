import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button } from "react-native";

export default function App() {
    var [value, setValue] = useState(0);

    // Expose value and setValue to the global window object
    useEffect(() => {
        window.appState = { value, setValue };
    }, [value]);

    return (
        <View style={styles.container}>
            <Button
                onClick={() =>
                    window.appState.setValue(window.appState.value + 10)
                }
            >
                Increase Value
            </Button>
            <CircularProgress value={value} />

            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
//yarn http-server ./web-build -a 192.168.1.173
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
