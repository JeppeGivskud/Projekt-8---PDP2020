import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
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
//TODO: Add habitcolor

export default function App() {
    //Screen
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    //HabitData
    const [habitName, setHabitName] = useState("Pushups");
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(100);
    const [effortCount, setEffortCount] = useState(0);
    const [pressed, setPressed] = useState(false);
    //Database
    const [encoderValue, setEncoderValue] = useState(0);

    const [loadingStreak, setLoadingStreak] = useState(true);
    const [loadingCounts, setLoadingCounts] = useState(true);
    // const [historyCounts, setHistoryCounts] = useState(History.getHistory(History.dummyDatasimple));
    // const [streak, setStreak] = useState(History.calculateStreak(History.dummyDatasimple));
    const [historyCounts, setHistoryCounts] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    });
    const [streak, setStreak] = useState({ streak: 8, omissions: 0 });

    const [currentScreen, setCurrentScreen] = useState({
        Overview: true,
        Effort: false,
        Done: false,
    });

    // Ref to hold the latest count value
    const countRef = useRef(count);
    const effortCountRef = useRef(effortCount);
    const currentScreenRef = useRef(currentScreen);



    // Get all data and set state countHistory and streak
    useEffect(() => {
        Database.getAllData()
            .then(data => {
                History.getHistory(data)
                    .then(history => {
                        console.log("history = ", history);
                        console.log("data = ", data);
                        setHistoryCounts(history);
                        setLoadingCounts(false);
                        const todaysday = (new Date().getDay() + 6) % 7; // Shift Sunday to the end
                        setCount(history[todaysday]);
                        const lastKey = Object.keys(data)[Object.keys(data).length - 1];
                        setEffortCount(data[lastKey].effort);
                        console.log(effortCount);
                    })
                    .catch(error => console.error(error));

                History.calculateStreak(data)
                    .then(streak => {
                        console.log("streak = ", streak);
                        setStreak(streak);
                        setLoadingStreak(false);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, []);

    console.log("Component rendered");

    // Update the ref's value whenever count changes
    useEffect(() => {
        countRef.current = count;
    }, [count]);
    useEffect(() => {
        effortCountRef.current = effortCount;
    }, [effortCount]);
    useEffect(() => {
        console.log("Current screen", currentScreen);
        currentScreenRef.current = currentScreen;
    }, [currentScreen]);

    // Log the current count whenever encoder changes and update the count or effortCount
    useEffect(() => {
        console.log("Current counts", encoderValue, count, effortCount);
        if (currentScreen.Overview) {
            setCount(FloorValue(encoderValue));
        } else if (currentScreen.Effort) {
            setEffortCount(FloorValue(encoderValue));
        }
        setHistoryCounts((prevhistoryCounts) => {
            return {
                ...prevhistoryCounts,
                [(new Date().getDay() + 6) % 7]: FloorValue(count),
            };
        });

        if (currentScreen.Effort) {
            if (encoderValue < -3) {
                setCurrentScreen({
                    Overview: true,
                    Effort: false,
                    Done: false,
                });
            }
        }
    }, [encoderValue]);

    // Update the screen whenever the button is pressed
    useEffect(() => {
        if (pressed) {
            setCurrentScreen((prevScreen) => {
                // Determine the new screen based on the previous screen
                let newScreen;
                if (prevScreen.Overview) {
                    newScreen = { Overview: false, Effort: true, Done: false };
                } else if (prevScreen.Effort) {
                    if (count < target) {
                        console.log("Count is less than target", count, target);
                        newScreen = {
                            Overview: true,
                            Effort: false,
                            Done: false,
                        };
                    } else {
                        newScreen = {
                            Overview: false,
                            Effort: false,
                            Done: true,
                        };
                    }
                } else if (prevScreen.Done) {
                    newScreen = { Overview: true, Effort: false, Done: false };
                }

                console.log("Switching screen to", newScreen);
                return newScreen;
            });
            setPressed(false);
        }
    }, [pressed]);

    const [hasConnection, setConnection] = useState(false);
    useEffect(() => {
        const socket = io(socketEndpoint, {
            transports: ["websocket"],
        });

        socket.on("connect", () => setConnection(true));
        socket.on("disconnect", () => setConnection(false));
        socket.on("getCount", (data) => {
            if (currentScreenRef.current.Overview) {
                socket.emit("sendCount", countRef.current);
            } else if (currentScreenRef.current.Effort) {
                socket.emit("sendCount", effortCountRef.current);
            }
        });
        socket.on("encoder", (data) => {
            setEncoderValue(data);
        });
        socket.on("pressed", (data) => {
            setPressed(true);
        });

        // Clean up the effect
        return () => socket.disconnect();
    }, []); // Empty array means this effect runs once on mount and clean up on unmount

    const FloorValue = (input) => {
        if (input < 0) {
            return 0;
        } else if (input > 100) {
            return 100;
        } else return input;
    };

    if (loadingStreak && loadingCounts) {
        return <div>Loading...</div>; // Replace this with your loading component or spinner
    }

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
                        historyCounts: historyCounts,
                    }}
                />
            )}

            {!!currentScreen.Effort && (
                <EffortScreen
                    props={{
                        effortCount: effortCount,
                        habitName: habitName,
                        width: width,
                        height: height,
                        currentScreen: currentScreen,
                        setCurrentScreen: setCurrentScreen,
                        count: count,
                        target: target,
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
                    }}
                />
            )}
            <View
                style={{
                    position: "absolute",
                    top: 280,
                    width: 250,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                }}
            >
                <Pressable
                    style={{
                        justifyContent: "center",
                        height: 20,
                        backgroundColor: "cyan",
                    }}
                    onPress={() => {
                        setEncoderValue(encoderValue - 1);
                    }}
                >
                    <Text style={{ fontSize: 10 }}>Counterclockwise</Text>
                </Pressable>
                <Pressable
                    style={{
                        justifyContent: "center",
                        height: 20,
                        backgroundColor: "cyan",
                    }}
                    onPress={() => {
                        setPressed(true);
                    }}
                >
                    <Text style={{ fontSize: 10 }}>Pressed</Text>
                </Pressable>
                <Pressable
                    style={{
                        justifyContent: "center",
                        height: 20,
                        backgroundColor: "cyan",
                    }}
                    onPress={() => {
                        setEncoderValue(encoderValue + 1);
                    }}
                >
                    <Text style={{ fontSize: 10 }}>Clockwise</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
