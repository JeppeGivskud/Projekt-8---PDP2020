import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import DayCircle from "./DayCircle";

//TODO: daycicles;
export default function WeekHistory({ values = [30, 50, 50, 40, 50, 70, 40] }) {
    //This screen renders a bar in the bottom and then the DayCircles. An array of values should be parsed
    const circlestart = 101;
    const rotate = "-101deg";
    const circleSpace = (360 - circlestart * 2) / 6;

    const currentDate = new Date();
    const currentDayOfWeek = (currentDate.getDay() + 6) % 7; // Shift Sunday (0) to the end

    return (
        <View>
            <View
                style={[styles.Absolute, { transform: [{ rotate: rotate }] }]}
            >
                <CircularProgressBase
                    value={-currentDayOfWeek * circleSpace}
                    radius={250 / 2}
                    duration={0}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"blue"} //textcolor
                    maxValue={360}
                />
            </View>
            <DayCircle values={values}></DayCircle>
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
