import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
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
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    //HabitData
    const [habitName, setHabitName] = useState("Pushups");
    const [count, setCount] = useState(50);
    const [target, setTarget] = useState(100);
    const [effortCount, setEffortCount] = useState(50);
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

    useEffect(() => {
        Database.getAllData()
            .then(data => {
                const history = History.getHistory(data);
                const streak = History.calculateStreak(data);
                setHistoryCounts(history);
                setStreak(streak);
                setLoadingStreak(false);
                setLoadingCounts(false);
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
                    newScreen = { Overview: false, Effort: false, Done: true };
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

            <Button
                title="Counterclockwise"
                onPress={() => {
                    switchScreen();
                    setReload(!reload);
                }}
            />
            <Button
                title="Pressed"
                onPress={() => {
                    switchScreen();
                    setReload(!reload);
                }}
            />
            <Button
                title="Clockwise"
                onPress={() => {
                    switchScreen();
                    setReload(!reload);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

// import { useState, useEffect } from "react";
// import { StyleSheet, View } from "react-native";
// // History
// import * as History from "./Functions/History";
// import * as Database from "./Functions/Database";
// //Screens
// import OverviewScreen from "./Components/Overview";
// import EffortScreen from "./Components/Effort";
// import DoneScreen from "./Components/Done";

// //Websocket
// import io from "socket.io-client";
// const socketEndpoint = "http://localhost:3000";

// //Code for starting the server
// //yarn expo export -p web
// //yarn http-server ./dist-withCirclesNew -a 192.168.1.173
// //TODO: Implement variable target (progress bars and floor and maybe more)
// //TODO: Implement effort
// //TODO: implement done
// //TODO: Get history from database
// //TODO: Send data to database
// //FIXME: Screen switch only updates whenever the count is changed. dunno why

// export default function App() {
//     const [width, setWidth] = useState("200");
//     const [height, setHeight] = useState("200");
//     //HabitData
//     const [habitName, setHabitName] = useState("Pushups");
//     const [count, setCount] = useState(50);
//     const [target, setTarget] = useState(100);
//     const [effortCount, setEffortCount] = useState(50);

//     //Database
//     const [streak, setStreak] = useState(
//         History.calculateStreak(History.dummyDatasimple2)
//     );
//     const [historyCounts, setHistoryCounts] = useState(
//         History.getHistory(History.dummyDatasimple2)
//     );

//     //Screen navigation
//     const [currentScreen, setCurrentScreen] = useState({
//         Overview: true,
//         Effort: false,
//         Done: false,
//     });
//     const switchScreen = () => {
//         console.log("Changing screen");
//         if (currentScreen.Overview) {
//             currentScreen.Overview = false;
//             currentScreen.Effort = true;
//             currentScreen.Done = false;
//         } else if (currentScreen.Effort) {
//             currentScreen.Overview = false;
//             currentScreen.Effort = false;
//             currentScreen.Done = true;
//         } else if (currentScreen.Done) {
//             currentScreen.Overview = true;
//             currentScreen.Effort = false;
//             currentScreen.Done = false;
//         }
//     };

//     //Websocket
//     const [hasConnection, setConnection] = useState(false);
//     useEffect(function didMount() {
//         socketStuff();
//     }, []);

//     const socketStuff = () => {
//         const socket = io(socketEndpoint, {
//             transports: ["websocket"],
//         });
//         socket.io.on("open", () => setConnection(true));
//         socket.io.on("close", () => setConnection(false));

//         socket.on("encoder", (data) => {
//             updateCount(data);
//         });

//         socket.on("pressed", (data) => {
//             switchScreen();
//         });

//         return function didUnmount() {
//             socket.disconnect();
//             socket.removeAllListeners();
//         };
//     };

//     const updateCount = (newValue) => {
//         if (currentScreen.Overview) {
//             setCount(FloorValue(newValue));
//         }
//         if (currentScreen.Effort) {
//             setEffortCount(FloorValue(newValue));
//         }
//         setHistoryCounts((prevhistoryCounts) => ({
//             ...prevhistoryCounts,
//             [(new Date().getDay() + 6) % 7]: FloorValue(newValue),
//         }));
//     };
//     const FloorValue = (count) => {
//         if (count < 0) {
//             return 0;
//         }
//         if (count > 100) {
//             return 100;
//         } else return count;
//     };

//     return (
//         <View style={styles.container}>
//             {!!currentScreen.Overview && (
//                 <OverviewScreen
//                     props={{
//                         count: count,
//                         habitName: habitName,
//                         target: target,
//                         streak: streak,
//                         width: width,
//                         height: height,
//                         historyCounts: historyCounts,
//                     }}
//                 />
//             )}
//             {!!currentScreen.Effort && (
//                 <EffortScreen
//                     props={{
//                         count: effortCount,
//                         habitName: habitName,
//                         target: target,
//                         streak: streak,
//                         width: width,
//                         height: height,
//                     }}
//                 />
//             )}
//             {!!currentScreen.Done && (
//                 <DoneScreen
//                     props={{
//                         count: count,
//                         habitName: habitName,
//                         target: target,
//                         streak: streak,
//                         width: width,
//                         height: height,
//                     }}
//                 />
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
// });
