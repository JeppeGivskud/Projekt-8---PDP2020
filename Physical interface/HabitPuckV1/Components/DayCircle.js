import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
//TODO: daycicles;
function DayCircleInformation({
    CircleDayOfWeek = "6",
    Coords,
    Completion = 50,
}) {
    const CompletionPercentage = `${Completion}%`;
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // e.g., 2 (Tuesday)
    var overCircleWidth = 0;
    console.log(CircleDayOfWeek, currentDayOfWeek, CompletionPercentage);
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
            <View style={[styles.Circle]}>
                <View
                    style={[
                        styles.circleFill,
                        {
                            height: CompletionPercentage,
                        },
                    ]}
                />
                <Text>{CircleDayOfWeek}</Text>
            </View>
            <View
                style={[styles.overCircle, { borderWidth: overCircleWidth }]}
            />
        </View>
    );
}

export default function DayCircle({
    circleSize = 220,
    totalDays = 7,
    circleStart = 101,
    value = 30,
}) {
    //The circle starts at 11 degrees positive.
    //The active area is a circle minus 180 and the size of the corners
    //The space between is six parts of the active area
    //Calculating xy locations is done via x=r(cos(angle)) and y=r(sin(angle))
    //The rest is formatting

    const newCircleStart = circleStart - 90;
    const activearea = 360 - (newCircleStart * 2 + 180);

    const spaceBetween = activearea / 6; //minus one because the first day is at 0 degrees

    const spaceBetweenRadians = (spaceBetween * Math.PI) / 180;
    const circleStartRadians = -(newCircleStart * Math.PI) / 180;

    // Calculate the x and y coordinates of each day using trigonometric functions
    const calculateCoordinates = (dayIndex) => {
        const angle = circleStartRadians - spaceBetweenRadians * dayIndex;
        // console.log(angle);

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
    console.log("newCircleStart", newCircleStart);
    // console.log("activearea", activearea);
    // console.log("spaceBetween", spaceBetween);

    // console.log("circleStartRadians", circleStartRadians);
    // console.log("spaceBetweenRadians", spaceBetweenRadians);
    // console.log(locations);

    return (
        <View style={styles.Container}>
            <DayCircleInformation
                Coords={locations[`day${0}`]}
                Completion={value}
                CircleDayOfWeek="7"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${1}`]}
                Completion={value}
                CircleDayOfWeek="6"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${2}`]}
                Completion={value}
                CircleDayOfWeek="5"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${3}`]}
                Completion={value}
                CircleDayOfWeek="4"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${4}`]}
                Completion={value}
                CircleDayOfWeek="3"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${5}`]}
                Completion={value}
                CircleDayOfWeek="2"
            ></DayCircleInformation>
            <DayCircleInformation
                Coords={locations[`day${6}`]}
                Completion={value}
                CircleDayOfWeek="1"
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
