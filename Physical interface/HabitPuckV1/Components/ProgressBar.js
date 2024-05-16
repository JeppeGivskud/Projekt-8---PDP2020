import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

export default function ProgressBar({ count, target }) {
    // a circle has 360 degrees. We want 85*2 degrees to be the target amount. Find that fraction and find the count of the rest of the circle and then add 100 to that count such that the circle is complete
    var rotation = 75;
    var rotationtext = "-75deg";
    var circleMax =
        (target / (rotation + rotation)) * (360 - rotation * 2) + 100;
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
                    value={count}
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
