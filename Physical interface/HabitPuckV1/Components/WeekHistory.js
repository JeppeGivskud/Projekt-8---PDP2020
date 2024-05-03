import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import DayCicle from "./DayCircle";

//TODO: daycicles;
export default function WeekHistory({ value, goal, day = 2 }) {
    const circlestart = 101;
    const rotate = "-101deg";
    const circleSpace = (360 - 101 * 2) / 7;
    return (
        <View>
            <View style={[styles.Absolute, { transform: [{ rotate: rotate }] }]}>
                <CircularProgressBase
                    value={-day * circleSpace}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"blue"} //textcolor
                    maxValue={360}
                />
            </View>
            <DayCicle></DayCicle>
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
