import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import OverviewInformation from "./Components/OverviewInformation";
import DayCicles from "./Components/DayCircles";

export default function App() {
    var [value, setValue] = useState(90);
    var [habitName, setHabitName] = useState("Press Ups");
    var [goal, setgoal] = useState(100);
    var [streak, setStreak] = useState(7);
    var [width, setWidth] = "200";
    var [height, setHeight] = "200";
    // Expose value and setValue to the global window object
    // window.appState.setValue(window.appState.value + 10);

    useEffect(() => {
        window.appState = { value, setValue };
    }, [value]);
    if (value > 100) {
        value = 100;
    }
    return (
        <View style={styles.container}>
            <ProgressBar
                goal={goal}
                value={value}
                width={width}
                height={height}
            ></ProgressBar>
            <OverviewInformation
                value={value}
                goal={goal}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            ></OverviewInformation>
            <DayCicles></DayCicles>
        </View>
    );
}
//yarn http-server ./web-build -a 192.168.1.173
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
