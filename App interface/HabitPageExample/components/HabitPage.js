import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions,
    FlatList,
} from "react-native";
import HabitBox from "./HabitBox";

// TODO: The scrollable should keep scrolling for a little longer
function HabitPage() {
    const inputdata = [
        { color: "tomato", name: "Ostesovs", count: 1 },
        { color: "blue", name: "Ostesovs", count: 2 },
        { color: "navy", name: "Ostesovs", count: 3 },
        { color: "green", name: "Ostesovs", count: 4 },
        { color: "red", name: "Ostesovs", count: 5 },
        { color: "rgb(200,0,200)", name: "Ostesovs", count: 6 },
        { color: "rgb(0,200,200)", name: "Ostesovs", count: 7 },
        { color: "rgb(200,200,0)", name: "Ostesovs", count: 8 },
        { color: "rgb(100,0,100)", name: "Ostesovs", count: 9 },
        { color: "rgb(0,200,100)", name: "Ostesovs", count: 10 },
        { color: "rgb(200,0,100)", name: "Ostesovs", count: 11 },
        { color: "rgb(100,0,200)", name: "Ostesovs", count: 12 },
    ];

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <FlatList
                data={inputdata}
                renderItem={({ item }) => (
                    <HabitBox
                        color={item.color}
                        name={item.name}
                        count={item.count}
                    />
                )}
            />
            {/* <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
            >
                <View style={styles.container}>
                    <HabitBoxes style={styles.container} />
                </View>
            </ScrollView> */}
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
