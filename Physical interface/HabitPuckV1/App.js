import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Overview from "./Components/Overview";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web
const createHistoryValues = (todayValue) => {
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
        [currentDayOfWeek]: todayValue,
    };
};

export default function App() {
    const [todayValue, setValue] = useState(50);
    const [habitName, setHabitName] = useState("Press Ups");
    const [goal, setGoal] = useState(100);
    const [streak, setStreak] = useState(7);
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    const [historyValues, setHistoryValues] = useState(
        createHistoryValues(todayValue)
    );
    //Runs when the value in [] is changed (so it only runs once)
    useEffect(() => {
        setHistoryValues((prevHistoryValues) => ({
            ...prevHistoryValues,
            [(new Date().getDay() + 6) % 7]: todayValue,
        }));
    }, []);

    // Clamp TodayValue to be within the range [0, 100]
    if (todayValue < 0) {
        setValue(0);
    }
    if (todayValue > 100) {
        setValue(100);
    }
    return (
        <View style={styles.container}>
            <Overview
                todayValue={todayValue}
                habitName={habitName}
                goal={goal}
                streak={streak}
                width={width}
                height={height}
                HistoryValues={historyValues}
            ></Overview>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
