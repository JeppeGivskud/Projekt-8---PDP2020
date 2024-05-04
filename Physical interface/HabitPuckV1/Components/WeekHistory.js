import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import DayCircle from "./DayCircle";

//TODO: daycicles;
export default function WeekHistory({ value, goal }) {
    const circlestart = 101;
    const rotate = "-101deg";
    const circleSpace = (360 - 101 * 2) / 6;
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    return (
        <View>
            <View
                style={[styles.Absolute, { transform: [{ rotate: rotate }] }]}
            >
                <CircularProgressBase
                    value={(-currentDayOfWeek + 1) * circleSpace}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"blue"} //textcolor
                    maxValue={360}
                />
            </View>
            <DayCircle value={value}></DayCircle>
        </View>
    );
}
const styles = StyleSheet.create({
    Absolute: {
        width: 250,
        height: 250,
        position: "absolute",
        zIndex: 2,
        elevation: 2,
    },
});
