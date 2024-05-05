import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import OverviewInformation from "./Components/OverviewInformation";
import WeekHistory from "./Components/WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web
const createHistoryValues = (TodayValue) => {
    const currentDayOfWeek = (new Date().getDay() + 6) % 7; // Shift Sunday (0) to the end
    // makes random numbers except for the todayavlue
    return {
        0: (randomValue = Math.floor(Math.random() * 100) + 1),
        1: (randomValue = Math.floor(Math.random() * 100) + 1),
        2: (randomValue = Math.floor(Math.random() * 100) + 1),
        3: (randomValue = Math.floor(Math.random() * 100) + 1),
        4: (randomValue = Math.floor(Math.random() * 100) + 1),
        5: (randomValue = Math.floor(Math.random() * 100) + 1),
        6: (randomValue = Math.floor(Math.random() * 100) + 1),
        [currentDayOfWeek]: TodayValue,
    };
};

export default function App() {
    const [TodayValue, setValue] = useState(50);
    const [habitName, setHabitName] = useState("Press Ups");
    const [goal, setGoal] = useState(100);
    const [streak, setStreak] = useState(7);
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    const [HistoryValues, setHistoryValues] = useState(
        createHistoryValues(TodayValue)
    );

    //This should make it possible to change values via the console
    useEffect(() => {
        window.appState = {
            TodayValue,
            setValue: (newValue) => setValue(newValue),
        }; // Update window.appState on each render
        // Update TodayValue in HistoryValues when it changes
        setHistoryValues((prevHistoryValues) => ({
            ...prevHistoryValues,
            [(new Date().getDay() + 6) % 7]: TodayValue,
        }));
    }, [TodayValue]);

    // Clamp TodayValue to be within the range [0, 100]
    const clampedTodayValue = Math.min(Math.max(TodayValue, 0), 100);
    return (
        <View style={styles.container}>
            <ProgressBar
                goal={goal}
                value={clampedTodayValue}
                width={width}
                height={height}
            />
            <OverviewInformation
                value={clampedTodayValue}
                goal={goal}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            />
            <WeekHistory values={HistoryValues} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
