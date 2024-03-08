import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Button } from "react-native";
import { useState } from "react";

// TODO: Få emoji keyboard library til at virke. Det kunne være sejt
// TODO: Få picker til time section at virke. Det kunne også være sejt
// FIXME: Hvorfor skal der være en button før teksten bliver overført til app.js?
// FIXME: gem data selv når create habit ikke længere bliver vist

// Der skal være en return for hver stykke data vi vil sende. Hver input skal have sin egen return. 
//Jeg tror det betyder at den yderste container skal komme fra en anden klasse men jeg er ikke sikker


export default function CreateHabit({ transferHabitName, transferSymbol, saveHabit }) {
    // States
    const [habitName, setHabitName] = useState("");
    const [habitSymbol, setHabitSymbol] = useState("");

    // Functions
    const createHabit = () => {
        transferHabitName(habitName)
        transferSymbol(habitSymbol)
        //saveHabit()

    }

    return (
        <View style={styles.container}>

            {/* Title */}
            <View styles={styles.textContainer}>
                <Text style={styles.title}>New habit</Text>
            </View>

            {/* Habit name input */}
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
                </View>
            </View>

            {/* Habit props submit */}
            <Button title="Create Habit" onPress={createHabit} />
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
        shadowColor: 'rgba(0,0,0, .2)', // IOS
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
        flex: 1,
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