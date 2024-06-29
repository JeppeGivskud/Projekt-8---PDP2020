import { Text, View, StyleSheet } from "react-native";
import App from "./Components/App";

export default function Index() {
    return (
        <View style={styles.container}>
            <View style={styles.tutorialBox}>
                <Text style={styles.tutorialText}>
                    Try pressing the buttons below to edit. {"\n"}You can also make a script that connects to the
                    websocket in the browser or open:
                    {"\n"}"Projekt-8-PDP2020/Server/todayValueSocketJavscript/todayValueSocket.js"
                </Text>
                <Text style={[styles.tutorialText, { marginTop: 100 }]}>
                    This app is just for github pages. The actual app is habitpuckV1 but it only works with database up
                    and running.
                </Text>
            </View>
            <View style={{ top: 20, flex: 1 }}>
                <App />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row", // Aligns children horizontally
        backgroundColor: "#fff",
    },
    tutorialBox: {
        marginRight: 20, // Adds some space between the text and the App component
        width: 250,
    },
    tutorialText: {
        borderRadius: 10, // Rounded corners for the tutorial box
        top: 50,
        padding: 20,
        backgroundColor: "#f0f0f0", // Light grey background for the tutorial box
        textAlign: "left", // Aligns text to the left
    },
});
