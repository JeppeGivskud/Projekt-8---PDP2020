import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { useState } from "react";
import HabitPage from "./components/HabitPage";
import LogButton from "./components/LogButton";
import BottomBar from "./components/BottomBar";
import HabitBox from "./components/HabitBox";
import CreateHabit from "./components/CreateHabit";


export default function App() {
    const [safeAreaDimensions, setSafeAreaDimensions] = useState({
        x: 1,
        y: 1,
        width: 1,
        height: 1,
    });

    const handleSafeAreaLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setSafeAreaDimensions({ x, y, width, height });
        console.log("Height", height, "StartY", y);
    };


    // Jakobs states og funktioner
    const [creatingHabit, setCreatingHabit] = useState(false);

    const createHabit = () => {
        setCreatingHabit(true)
    }

    const saveHabit = () => {
        setCreatingHabit(false)
        // Send information til server?? eller er det wack at gøre her?
        // Kald noget der kan lave en ny habitBox med de data jeg inputter i CreateHabit siden
    }

    return (
        <View style={{ flex: 1, backgroundColor: "khaki" }}>
            {/*Actual app: */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }} onLayout={handleSafeAreaLayout}>
                    <HabitPage />
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                        <HabitBox color={"#007AFF"} name="Hej" symbol="🙋‍♀️" />
                        <HabitBox color={"#007AFF"} name="Hej" symbol="🙋‍♀️" />
                    </View>
                    <CreateHabit />
                    <BottomBar
                        safeAreaDimensions={safeAreaDimensions}
                        color={"tomato"}
                        opacity={0.66} //{0.96}
                    />
                </View>
            </SafeAreaView >
            {/*Actual app: */}

            {/*This button can log whatever */}
            <LogButton
                log={[safeAreaDimensions, Dimensions.get("window").height]}
            ></LogButton>
            {/*This button can log whatever */}
        </View >
    );
}

const styles = StyleSheet.create({});
