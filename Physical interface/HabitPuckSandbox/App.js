import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
const forsjovHabit = {
    "Sat May 04 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 1,
        currentDate: "2024-05-03T22:00:00.000Z",
        habitName: "Bench Press",
        count: 2,
        target: null,
        effort: null,
        routine: null,
    },
    "Sun May 05 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 2,
        currentDate: "2024-05-04T22:00:00.000Z",
        habitName: "Bench Press",
        count: 4,
        target: null,
        effort: null,
        routine: null,
    },
    "Mon May 06 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 3,
        currentDate: "2024-05-05T22:00:00.000Z",
        habitName: "Bench Press",
        count: 3,
        target: null,
        effort: null,
        routine: null,
    },
    "Tue May 07 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 4,
        currentDate: "2024-05-06T22:00:00.000Z",
        habitName: "Bench Press",
        count: 7,
        target: null,
        effort: null,
        routine: null,
    },
    "Wed May 08 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 6,
        currentDate: "2024-05-07T22:00:00.000Z",
        habitName: "Bench Press",
        count: 2,
        target: 100,
        effort: 100,
        routine: "Morning",
    },
    "Thu May 09 2024 00:00:00 GMT+0200 (Central European Summer Time)": {
        id: 8,
        currentDate: "2024-05-08T22:00:00.000Z",
        habitName: "Pushups",
        count: 4,
        target: 100,
        effort: 10,
        routine: "Morning",
    },
};
const historyValues = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
};

//Sort habitinputs by date
//Find todays date 0-6
//Fill all circles lower than that date
//for (i=todays date-1;i=0,i--){forsjovHabit[todaysdat-i].count}
////Take object[todaysday -i].count
export default function App() {
    var now = new Date();
    const keys = Object.keys(forsjovHabit);
    console.log(keys);
    for (i = 0; i < Object.keys(forsjovHabit).length; i++) {
        console.log(
            "date: ",
            forsjovHabit[Object.keys(forsjovHabit)[i]].currentDate,
            forsjovHabit[Object.keys(forsjovHabit)[i]].count
        );
    }
    console.log("Raw", forsjovHabit);

    const todaysday = (now.getUTCDay() + 6) % 7; // Shift Sunday to the end
    const daysbeforetoday = todaysday;
    console.log(
        daysbeforetoday,
        Object.keys(forsjovHabit).length - daysbeforetoday
    );
    console.log("days", Object.keys(forsjovHabit).length);
    console.log("before", historyValues);
    for (
        i = Object.keys(forsjovHabit).length - 1;
        i >= Object.keys(forsjovHabit).length - daysbeforetoday;
        i--
    ) {
        console.log((i % Object.keys(forsjovHabit).length) - 1);
        console.log("chatgpt", (i + todaysday) % daysbeforetoday);
        console.log(
            "key: ",
            i,
            " is: ",
            forsjovHabit[Object.keys(forsjovHabit)[i]].count
        );
        historyValues[(i + todaysday) % daysbeforetoday] =
            forsjovHabit[Object.keys(forsjovHabit)[i]].count;
    }
    console.log("after", historyValues);

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
