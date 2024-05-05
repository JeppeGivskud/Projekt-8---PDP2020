import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

export default function ProgressBar({ value, goal }) {
    // a circle has 360 degrees. We want 85*2 degrees to be the goal amount. Find that fraction and find the value of the rest of the circle and then add 100 to that value such that the circle is complete
    var rotation = 75;
    var rotationtext = "-75deg";
    var circleMax = (goal / (rotation + rotation)) * (360 - rotation * 2) + 100;
    return (
        <View>
            <View
                style={[
                    styles.Absolute,
                    { transform: [{ rotate: rotationtext }] },
                ]}
            >
                <CircularProgressBase
                    value={100}
                    radius={250 / 2}
                    duration={0}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    maxValue={circleMax}
                />
            </View>
            <View
                style={[
                    styles.Absolute,
                    { transform: [{ rotate: rotationtext }] },
                ]}
            >
                <CircularProgressBase
                    value={value}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#007AFF"}
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
        position: "absolute",
        zIndex: 1,
        elevation: 1,
    },
});
