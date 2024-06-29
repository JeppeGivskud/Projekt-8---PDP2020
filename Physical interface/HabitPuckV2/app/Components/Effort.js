import { StyleSheet, View, Text, Image } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

export default function Effort({ props }) {
    const { effortCount, habitName, setCurrentScreen, count, target } = props;

    // Pressed skal komme fra socket?
    // if (pressed) {
    //     // Post effort to database

    //     if (count >= target) {
    //         setCurrentScreen({ Overview: false, Effort: false, Done: true });
    //     }
    // }

    //FIXME: This font shid don’t work
    // Custom fonts
    // const [fontsLoaded] = useFonts({
    //     'SF-Pro-Rounded-Bold': require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    //     'SF-Pro-Rounded-Regular': require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    //     'SF-Pro-Rounded-Thin': require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
    // });
    // if (!fontsLoaded) {
    //     console.log("Loading fonts...");
    //     return <Text>Loading...</Text>;
    // }

    const effortBarColor = {
        green: "#02D46A",
        greenBackground: "#E6FBF0",
        orange: "#FF9500",
        orangeBackground: "#FFFAF2",
        red: "#FF3B2F",
        redBackground: "#FFF3F2",
    };

    return (
        <View style={styles.container}>
            {/* Progress bar background */}
            <View style={styles.progressContainer}>
                <CircularProgressBase
                    rotation={200}
                    goal={100}
                    value={89}
                    radius={250 / 2}
                    duration={0}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    maxValue={100}
                    activeStrokeColor={
                        effortCount < 33
                            ? effortBarColor.greenBackground
                            : effortCount < 66
                            ? effortBarColor.orangeBackground
                            : effortBarColor.redBackground
                    }
                />
            </View>

            {/* Progress bar foreground */}
            <View style={styles.progressContainer}>
                <CircularProgressBase
                    rotation={200}
                    goal={100}
                    value={effortCount > 0 ? effortCount / 1.264 : 0.1}
                    radius={250 / 2}
                    duration={200}
                    activeStrokeWidth={40}
                    inActiveStrokeWidth={0}
                    maxValue={89}
                    activeStrokeColor={
                        effortCount < 33
                            ? effortBarColor.green
                            : effortCount < 66
                            ? effortBarColor.orange
                            : effortBarColor.red
                    }
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/EffortText.png")}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                    }}
                />
            </View>
            {/* Initiation effort */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={90}
                    ry={90}
                    startOffset={85}
                    reversed={false}
                    text="Initiation effort"
                    textProps={{
                        style: {
                            fontSize: 18,
                            textAlign: "center",
                            fontFamily: "sans-serif",
                        },
                    }}
                />
            </View> */}

            {/* TODO: Teksten skal være tyndere og rund. Verbal label: Easy  */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={90}
                    ry={90}
                    startOffset={0}
                    reversed={false}
                    text="Easy"
                    textProps={{ style: styles.verbalLabelStyle }}
                    textPathProps={{ fill: "#7c7c7c" }}
                />
            </View> */}

            {/* Divider dot left: ·  */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={90}
                    ry={90}
                    startOffset={513}
                    reversed={false}
                    text="·"
                    textProps={{ style: styles.dividerDotStyle }}
                    textPathProps={{ fill: "#C1C1C1" }}
                />
            </View> */}

            {/* TODO: Teksten skal være tyndere og rund. Verbal label: Moderate  */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={80}
                    ry={80}
                    startOffset={90}
                    reversed={true}
                    text="Moderate"
                    textProps={{ style: styles.verbalLabelStyle }}
                    textPathProps={{ fill: "#7c7c7c" }}
                />
            </View> */}

            {/* Divider dot right: ·  */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={90}
                    ry={90}
                    startOffset={330}
                    reversed={false}
                    text="·"
                    textProps={{ style: styles.dividerDotStyle }}
                    textPathProps={{ fill: "#C1C1C1" }}
                />
            </View> */}

            {/* TODO: Teksten skal være tyndere og rund. Verbal label: Hard  */}
            {/* <View style={styles.textContainer}>
                <ReactCurvedText
                    width={200}
                    height={200}
                    cx={100}
                    cy={100}
                    rx={90}
                    ry={90}
                    startOffset={249}
                    reversed={false}
                    text="Hard"
                    textProps={{ style: styles.verbalLabelStyle }}
                    textPathProps={{ fill: "#7c7c7c" }}
                />
            </View> */}

            {/* Effort tal i midten af cirkel */}
            <View style={styles.textContainer}>
                <Text style={styles.effortCountStyle}>{effortCount > 0 ? effortCount : 0}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    progressContainer: {
        width: 250,
        height: 250,
        position: "absolute",
    },

    container: {
        flex: 1,
    },

    textContainer: {
        width: 250,
        height: 250,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 1,
        overflow: "visible",
    },

    effortCountStyle: {
        fontFamily: "sans-serif",
        fontSize: 64,
        fontWeight: "bold",
    },

    verbalLabelStyle: {
        fontFamily: "sans-serif",
        fontSize: 16,
        fontWeight: "lighter",
    },

    dividerDotStyle: {
        fontFamily: "sans-serif",
        fontSize: 20,
    },
    imageContainer: {
        width: 250,
        height: 250,
        padding: 20,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});
