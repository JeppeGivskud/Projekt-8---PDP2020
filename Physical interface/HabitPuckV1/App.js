import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import OverviewInformation from "./Components/OverviewInformation";
import WeekHistory from "./Components/WeekHistory";

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
    if (value < 0) {
        value = 0;
    }
    return (
        <View style={styles.container}>
            <ProgressBar goal={goal} value={value} width={width} height={height}></ProgressBar>
            <OverviewInformation
                value={value}
                goal={goal}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            ></OverviewInformation>
            <WeekHistory />
        </View>
    );
}
//yarn expo export:web
//yarn http-server ./web-build -a 192.168.1.173
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
