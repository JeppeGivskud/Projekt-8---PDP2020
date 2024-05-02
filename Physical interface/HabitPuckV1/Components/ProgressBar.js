import { View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export default function ProgressBar({ value, goal }) {
    // a circle has 360 degrees. We want 85*2 degrees to be the goal amount. Find that fraction and find the value of the rest of the circle and then add 100 to that value such that the circle is complete
    var circleMax = (goal / (85 + 85)) * 190 + 100;
    return (
        <View>
            <View style={styles.Absolute}>
                <CircularProgress
                    value={100}
                    radius={250 / 2}
                    duration={0}
                    activeStrokeWidth={30}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"#fff"}
                    maxValue={circleMax}
                />
            </View>
            <View style={styles.Absolute}>
                <CircularProgress
                    value={value}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={30}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#007AFF"}
                    progressValueColor={"#fff"}
                    maxValue={circleMax}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    Absolute: {
        width: 250,
        height: 250,
        transform: [{ rotate: "-85deg" }],
        position: "absolute",
    },
});
