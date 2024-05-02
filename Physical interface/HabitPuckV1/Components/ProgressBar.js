import { View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

export default function ProgressBar({ value }) {
    return (
        <View style={styles.container}>
            <View style={styles.Absolute}>
                <CircularProgress
                    value={100}
                    radius={250 / 2}
                    duration={0}
                    activeStrokeWidth={30}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#F2F8FF"}
                    progressValueColor={"#fff"}
                    maxValue={211.785}
                />
            </View>
            <View style={styles.Absolute}>
                <CircularProgress
                    value={value}
                    radius={250 / 2}
                    duration={1000}
                    activeStrokeWidth={30}
                    inActiveStrokeWidth={0}
                    activeStrokeColor={"#007AFF"}
                    progressValueColor={"#fff"}
                    maxValue={211.785}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        position: "absolute",
    },
    Absolute: {
        width: 250,
        height: 250,
        transform: [{ rotate: "-85deg" }],
        position: "absolute",
    },
});
