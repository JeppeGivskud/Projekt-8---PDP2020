import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
// History
import * as History from "./Functions/History";
import * as Database from "./Functions/Database";
//Screens
import OverviewScreen from "./Components/Overview";
import EffortScreen from "./Components/Effort";
import DoneScreen from "./Components/Done";

//Websocket
import io from "socket.io-client";
const socketEndpoint = "http://localhost:3000";

//Code for starting the server
//yarn expo export -p web
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//TODO: Implement variable target (progress bars and floor and maybe more)
//TODO: Implement effort
//TODO: implement done
//TODO: Get history from database
//TODO: Send data to database
//FIXME: Screen switch only updates whenever the count is changed. dunno why

export default function App() {
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    //HabitData
    const [habitName, setHabitName] = useState("Pushups");
    const [count, setCount] = useState(50);
    const [target, setTarget] = useState(100);
    const [effortCount, setEffortCount] = useState(50);
    //Database
    const [streak, setStreak] = useState(
        History.calculateStreak(Database.getAllData)
    );
    const [historyValues, setHistoryValues] = useState(
        History.getHistory(Database.getAllData)
    );

    //Screen navigation
    const [currentScreen, setCurrentScreen] = useState({
        Overview: true,
        Effort: false,
        Done: false,
    });
    const switchScreen = () => {
        if (currentScreen.Overview) {
            currentScreen.Overview = false;
            currentScreen.Effort = true;
            currentScreen.Done = false;
        } else if (currentScreen.Effort) {
            currentScreen.Overview = false;
            currentScreen.Effort = false;
            currentScreen.Done = true;
        } else if (currentScreen.Done) {
            currentScreen.Overview = true;
            currentScreen.Effort = false;
            currentScreen.Done = false;
        }
    };

    //Websocket
    useEffect(function didMount() {
        socketStuff();
    }, []);
    const socketStuff = () => {
        const socket = io(socketEndpoint, {
            transports: ["websocket"],
        });
        socket.io.on("open", () => setConnection(true));
        socket.io.on("close", () => setConnection(false));

        socket.on("encoder", (data) => {
            changevalue(data);
        });

        socket.on("pressed", (data) => {
            console.log("Pressed");

            switchScreen();
        });

        return function didUnmount() {
            socket.disconnect();
            socket.removeAllListeners();
        };
    };
    const changevalue = (newValue) => {
        console.log("new today value");
        if (currentScreen.Overview) {
            setCount(FloorValue(newValue));
        }
        if (currentScreen.Effort) {
            setEffortCount(FloorValue(newValue));
        }

        setHistoryValues((prevHistoryValues) => ({
            ...prevHistoryValues,
            [(new Date().getDay() + 6) % 7]: FloorValue(newValue),
        }));
    };
    const FloorValue = (count) => {
        if (count < 0) {
            return 0;
        }
        if (count > 100) {
            return 100;
        } else return count;
    };

    return (
        <View style={styles.container}>
            {!!currentScreen.Overview && (
                <OverviewScreen
                    props={{
                        count: count,
                        habitName: habitName,
                        target: target,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
            {!!currentScreen.Effort && (
                <EffortScreen
                    props={{
                        count: effortCount,
                        habitName: habitName,
                        target: target,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
            {!!currentScreen.Done && (
                <DoneScreen
                    props={{
                        count: count,
                        habitName: habitName,
                        target: target,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
