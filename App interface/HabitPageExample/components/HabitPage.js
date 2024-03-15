import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from "react-native";
import TestButtons from "./testComponents/TestButtons";
import HabitBox from "./HabitBox";
import HabitBoxes from "./testComponents/HabitBoxes";
// TODO: The scrollable should keep scrolling for a little longer
function HabitPage() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
            >
                <View style={styles.container}>
                    <HabitBoxes style={styles.container} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    scrollview: {
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 20,
    },
});
export default HabitPage;
