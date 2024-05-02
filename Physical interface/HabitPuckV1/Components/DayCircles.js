import { View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
//TODO: daycicles;
export default function DayCicles({ value, goal }) {
    const circlestart = 101;
    const circleSpace = (360 - 101 * 2) / 7;
    return (
        <View>
            <View style={styles.Absolute}>
                <CircularProgress
                    value={-1 * circleSpace}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"#fff"} //textcolor
                    maxValue={360}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    Absolute: {
        width: 250,
        height: 250,
        transform: [{ rotate: "-101deg" }],
        position: "absolute",
    },
});
