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
    SectionList,
} from "react-native";
import HabitBox from "./HabitBox";

// TODO: The scrollable should keep scrolling for a little longer
function HabitPage() {
    const inputdata = [
        { color: "tomato", name: "Ostesovs", type: "Morning", count: 1 },
        { color: "blue", name: "Anton", type: "Morning", count: 2 },
        { color: "navy", name: "Oskar", type: "Morning", count: 3 },
        { color: "green", name: "Gustav", type: "Midday", count: 4 },
        { color: "red", name: "Ostesovs", type: "Midday", count: 5 },
        { color: "rgb(200,0,200)", name: "Ostesovs", type: "Midday", count: 6 },
        { color: "rgb(0,200,200)", name: "Ostesovs", type: "Midday", count: 7 },
        { color: "rgb(200,200,0)", name: "Ostesovs", type: "Afternoon", count: 8 },
        { color: "rgb(100,0,100)", name: "Ostesovs", type: "Afternoon", count: 9 },
        { color: "rgb(0,200,100)", name: "Ostesovs", type: "Afternoon", count: 10 },
        { color: "rgb(200,0,100)", name: "Ostesovs", type: "Afternoon", count: 11 },
        { color: "rgb(100,0,200)", name: "Ostesovs", type: "Afternoon", count: 12 },
        { color: "rgb(100,0,200)", name: "Ostesovs", type: "Night", count: 12 },
    ];

    const sectionData = [
        {
            title: "Morning",
            data: inputdata.filter((item) => item.type === "Morning"),
        },
        {
            title: "Midday",
            data: inputdata.filter((item) => item.type === "Midday"),
        },
        {
            title: "Afternoon",
            data: inputdata.filter((item) => item.type === "Afternoon"),
        },
        {
            title: "Night",
            data: inputdata.filter((item) => item.type === "Night"),
        },
    ];
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            {/* <FlatList
                data={inputdata}
                renderItem={({ item }) => <HabitBox color={item.color} name={item.name} count={item.count} />}
            /> */}
            <SectionList
                sections={sectionData}
                renderItem={({ item }) => <HabitBox color={item.color} name={item.name} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontSize: 32, backgroundColor: "khaki" }}>{title}</Text>
                )}
                stickySectionHeadersEnabled={true}
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
