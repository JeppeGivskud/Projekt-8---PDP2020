import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
const forsjovHabit = {
    "Sat May 04 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 1,
        currentDate: "2024-05-03T22:00:00.000Z",
        habitName: "Bench Press",
        count: 7,
        target: null,
        effort: null,
        routine: null,
    },
    "Sun May 05 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 2,
        currentDate: "2024-05-04T22:00:00.000Z",
        habitName: "Bench Press",
        count: 8,
        target: null,
        effort: null,
        routine: null,
    },
    "Mon May 06 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 3,
        currentDate: "2024-05-05T22:00:00.000Z",
        habitName: "Bench Press",
        count: 9,
        target: null,
        effort: null,
        routine: null,
    },
    "Tue May 07 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 4,
        currentDate: "2024-05-06T22:00:00.000Z",
        habitName: "Bench Press",
        count: 10,
        target: null,
        effort: null,
        routine: null,
    },
    "Wed May 08 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 6,
        currentDate: "2024-05-07T22:00:00.000Z",
        habitName: "Bench Press",
        count: 20,
        target: 100,
        effort: 100,
        routine: "Morning",
    },
    "Thu May 09 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 8,
        currentDate: "2024-05-08T22:00:00.000Z",
        habitName: "Pushups",
        count: 220,
        target: 100,
        effort: 10,
        routine: "Morning",
    },
};
const getHistory = (habitHistory) => {
    var historyValues = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };
    const todaysday = (new Date().getDay() + 6) % 7; // Shift Sunday to the end

    //i takes the number of the last thing
    //i then makes a number starting from todays date
    for (
        i = Object.keys(habitHistory).length - 1;
        i >= Object.keys(habitHistory).length - todaysday - 1;
        i--
    ) {
        var daycircle = (i + todaysday) % (todaysday + 2);
        var value = habitHistory[Object.keys(habitHistory)[i]].count;
        historyValues[daycircle] = value;
    }
    return historyValues;
};

export default function App() {
    console.log(getHistory(forsjovHabit));
    for (i = 0; i < Object.keys(forsjovHabit).length; i++) {
        console.log(
            i,
            forsjovHabit[Object.keys(forsjovHabit)[i]].currentDate,
            forsjovHabit[Object.keys(forsjovHabit)[i]].count
        );
    }
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});