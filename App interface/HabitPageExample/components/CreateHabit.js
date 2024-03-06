import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Button } from "react-native";
import { useState } from "react";

// TODO: Send information ud af component
// TODO: fang information i "constructor" af habitBox

export default function CreateHabit({ }) {
    // States
    const [habitName, setHabitName] = useState("");
    const [habitSymbol, setHabitSymbol] = useState("");

    // Functions
    const displayhabitName = () => {
        console.log(habitName)
    };

    const displayhabitSymbol = () => {
        console.log(habitSymbol)
    };

    const createHabit = () => {
        // Socket send alle inputtede værdier (navn, tidspunkt osv) til database
        // Kør funktion der opdaterer habit overview?
        // Sæt creatingHabit = false i app.js så creation UI forsvinder
        console.log("nah man it don’t work yet")
    }

    return (
        <View style={styles.container}>
            {/* Title */}
            <View styles={styles.textContainer}>
                <Text style={styles.title}>New habit</Text>
            </View>


            {/* Habit name input TODO: inputBox skal have en fixed størrelse*/}
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.headingStyle}>Habit name</Text>
                </View>
                <View style={[styles.textContainer, { justifyContent: "flex-start" }]}>
                    <TextInput
                        style={styles.textInput}
                        blurOnSubmit={true}
                        placeholder="What should the habit be called?"
                        placeholderTextColor={"#888"}
                        enablesReturnKeyAutomatically={true}
                        maxLength={40}
                        selectTextOnFocus={true}
                        onSubmitEditing={text => setHabitName(text.nativeEvent.text)}
                    />
                    <Button title="Submit name" onPress={displayhabitName} />
                </View>
            </View>

            {/* Habit Symbol input */}
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.headingStyle}>Habit symbol</Text>
                </View>

                <View style={[styles.textContainer, { justifyContent: "flex-start" }]}>
                    <TextInput
                        style={styles.symbolInput}
                        blurOnSubmit={true}
                        placeholder="😏"
                        enablesReturnKeyAutomatically={true}
                        maxLength={40}
                        selectTextOnFocus={true}
                        onSubmitEditing={text => setHabitSymbol(text.nativeEvent.text)}
                    />
                    <Button title="Submit symbol" onPress={displayhabitSymbol} />
                </View>

            </View>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 12,
        //maxWidth: Dimensions.get("window").width / 2,
        width: Dimensions.get("window").width - 20,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        margin: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        elevation: 3, // Android
    },

    textContainer: {
        flexDirection: "row",
        justifyContent: "flex-start", // højre/venstre tror jeg
        alignContent: "center",
        alignItems: "center",
    },

    title: {
        color: "#222",
        fontWeight: "bold",
        fontSize: 24,
    },

    headingStyle: {
        color: "#222",
        fontSize: 18,
        paddingTop: 12,
    },

    textInput: {
        width: 250,
        marginTop: 8,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#d9d9d9",
    },

    symbolInput: {
        height: 100,
        width: 100,
        marginTop: 8,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#d9d9d9",
        fontSize: 80,
    },
});