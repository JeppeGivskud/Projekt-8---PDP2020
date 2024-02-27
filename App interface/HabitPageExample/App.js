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

import { useState } from "react";
//import Ellipsis from "./components/ellipsis";

export default function App() {
    const [safeAreaDimensions, setSafeAreaDimensions] = useState({
        x: 1,
        y: 1,
        width: 1,
        height: 1,
    });

    const handleSafeAreaLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setSafeAreaDimensions({ x, y, width, height });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "pink",
                alignContent: "space-around",
            }}
        >
            <SafeAreaView style={{ flex: 1 }} onLayout={handleSafeAreaLayout}>
                <StatusBar
                    hidden={false}
                    barStyle="dark-content"
                    networkActivityIndicatorVisible={false}
                    showHideTransition="fade"
                ></StatusBar>
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
                <Text>
                    hi the safe is x{safeAreaDimensions.x}y
                    {safeAreaDimensions.y}h{safeAreaDimensions.height}w
                    {safeAreaDimensions.width}
                </Text>
            </SafeAreaView>
            <View
                style={[
                    styles.overlayBottom,
                    {
                        width: safeAreaDimensions.width,
                        top: safeAreaDimensions.height,
                        height: 200,
                    },
                ]}
            ></View>
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
    overlayBottom: {
        position: "absolute",
        width: "100%",
        backgroundColor: "rgba(255,100,200,0.8)", // semi-transparent red
        zIndex: 10, // ensure it's above other components
    },
});
