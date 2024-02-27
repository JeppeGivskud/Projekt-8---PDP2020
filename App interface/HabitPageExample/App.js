import { StatusBar } from "expo-status-bar";
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
} from "react-native";
//import Ellipsis from "./components/ellipsis";

export default function App() {
    return (
        <View style={{ flex: 1, backgroundColor: "pink" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.column}>
                            <Button title={"1"}></Button>
                            <Button title={"2"}></Button>
                            <Button title={"3"}></Button>
                            <Button title={"4"}></Button>
                        </View>
                        <View style={styles.column}>
                            <Button title={"5"}></Button>
                            <Button title={"6"}></Button>
                            <Button title={"7"}></Button>
                            <Button title={"8"}></Button>
                            <Text>
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                                Looooooooooooo Looooooooooooo Looooooooooooo
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
    },
});
