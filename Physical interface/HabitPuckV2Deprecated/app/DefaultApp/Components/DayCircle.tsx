import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import convert from "color-convert";

function desaturateColor(habitColor: string) {
    // Convert hex to hsv
    let hsv = convert.hex.hsv(habitColor);
    // Reduce saturation to 5
    hsv[1] = 5;
    // Convert hsv back to hex
    let desaturatedColor = convert.hsv.hex(hsv);
    return `#${desaturatedColor}`;
}

function DayCircleInformation({
    CircleDayOfWeek = "None",
    Coords = NaN,
    CompletionPercent = NaN,
    habitColor = "#000",
}) {
    const CompletionPercentage = `${CompletionPercent}%`;

    //Labels days correctly
    const currentDate = new Date();
    var currentDayOfWeek = (currentDate.getDay() + 6) % 7; // Shift Sunday (0) to the end
    var TextToShow = "none";
    if (CircleDayOfWeek == "6") {
        TextToShow = "S";
    } else if (CircleDayOfWeek == "5") {
        TextToShow = "S";
    } else if (CircleDayOfWeek == "4") {
        TextToShow = "F";
    } else if (CircleDayOfWeek == "3") {
        TextToShow = "T";
    } else if (CircleDayOfWeek == "2") {
        TextToShow = "W";
    } else if (CircleDayOfWeek == "1") {
        TextToShow = "T";
    } else if (CircleDayOfWeek == "0") {
        TextToShow = "M";
    }
    //Makes the today circle have a border
    var overCircleWidth;
    if (CircleDayOfWeek == currentDayOfWeek) {
        overCircleWidth = 2;
    } else {
        overCircleWidth = 0;
    }

    return (
        <View
            style={[
                styles.CircleContainer,
                {
                    top: Coords.y,
                    left: Coords.x,
                },
            ]}
        >
            <View style={[styles.Circle, { backgroundColor: desaturateColor(habitColor, 25) }]}>
                <View
                    style={[
                        styles.circleFill,
                        {
                            height: CompletionPercentage,
                        },
                        { backgroundColor: habitColor },
                    ]}
                />
                <Text style={{ color: "#fff" }}>{TextToShow}</Text>
            </View>
            <View style={[styles.overCircle, { borderWidth: overCircleWidth, borderColor: habitColor }]} />
        </View>
    );
}

export default function DayCircle({ circleSize = 220, totalDays = 7, circleStart = 101, historyCounts, habitColor }) {
    //The circle starts at 11 degrees positive.
    //The active area is a circle minus 180 and the size of the corners
    //The space between is six parts of the active area
    //Calculating xy locations is done via x=r(cos(angle)) and y=r(sin(angle))
    //The circles are reversed so day 1 is circle 7 (but the arrays are 0 indexed)
    //The rest is formatting

    const newCircleStart = circleStart - 90;
    const activearea = 360 - (newCircleStart * 2 + 180);

    const spaceBetween = activearea / 6; //minus one because the first day is at 0 degrees

    const spaceBetweenRadians = (spaceBetween * Math.PI) / 180;
    const circleStartRadians = -(newCircleStart * Math.PI) / 180;

    // Calculate the x and y coordinates of each day using trigonometric functions
    const calculateCoordinates = (dayIndex) => {
        const angle = circleStartRadians - spaceBetweenRadians * dayIndex;
        const x = (circleSize / 2) * Math.cos(angle);
        const y = (circleSize / 2) * Math.sin(angle);
        return { x, y };
    };

    // Calculate x y location for each day
    let locations = {};
    for (let i = 0; i < totalDays; i++) {
        const { x, y } = calculateCoordinates(i);
        locations[`day${i}`] = { x: x, y: y };
    }

    // Redefine positions accordingly
    for (let i = 0; i < totalDays; i++) {
        locations[`day${i}`].x = locations[`day${i}`].x + circleSize / 2;
        locations[`day${i}`].y = locations[`day${i}`].y * -1 + circleSize / 2;
    }

    return (
        <View style={styles.Container}>
            <DayCircleInformation
                Coords={locations[`day${0}`]}
                CompletionPercent={historyCounts[6]}
                CircleDayOfWeek="6"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${1}`]}
                CompletionPercent={historyCounts[5]}
                CircleDayOfWeek="5"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${2}`]}
                CompletionPercent={historyCounts[4]}
                CircleDayOfWeek="4"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${3}`]}
                CompletionPercent={historyCounts[3]}
                CircleDayOfWeek="3"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${4}`]}
                CompletionPercent={historyCounts[2]}
                CircleDayOfWeek="2"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${5}`]}
                CompletionPercent={historyCounts[1]}
                CircleDayOfWeek="1"
                habitColor={habitColor}
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${6}`]}
                CompletionPercent={historyCounts[0]}
                CircleDayOfWeek="0"
                habitColor={habitColor}
            ></DayCircleInformation>
        </View>
    );
}
const styles = StyleSheet.create({
    Container: {
        width: 250,
        height: 250,
        zIndex: 4,
        elevation: 4,
        position: "absolute",
    },
    CircleContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
    },
    overCircle: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        borderWidth: 2,
        borderColor: "#007AFF",
        zIndex: 7,
        elevation: 7,
        backgroundColor: "transparent",
    },
    Circle: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 30, // Adjusted width to account for margin
        height: 30, // Adjusted height to account for margin
        borderRadius: 30 / 2,
        overflow: "hidden",
        zIndex: 4,
        elevation: 4,
        margin: 1.5,
        backgroundColor: "#BFDEFF",
    },
    circleFill: {
        width: "100%",
        bottom: 0,
        position: "absolute",
        backgroundColor: "#007AFF",
    },
});
