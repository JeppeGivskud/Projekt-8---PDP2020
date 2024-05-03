import { View, StyleSheet } from "react-native";
import { useState } from "react";
//TODO: daycicles;
export default function DayCicle({ circleSize = 220, totalDays = 7, circleStart = 101, currentDay = 2 }) {
    //The circle starts at 11 degrees positive.
    //The active area is a circle minus 180 and the new circle starts

    const newCircleStart = circleStart - 90;
    const activearea = 360 - (newCircleStart * 2 + 180);

    const spaceBetween = activearea / 6; //minus one because the first day is at 0 degrees

    const spaceBetweenRadians = (spaceBetween * Math.PI) / 180;
    const circleStartRadians = -(newCircleStart * Math.PI) / 180;

    // Calculate the x and y coordinates of each day using trigonometric functions
    const calculateCoordinates = (dayIndex) => {
        const angle = circleStartRadians - spaceBetweenRadians * dayIndex;
        console.log(angle);

        const x = (circleSize / 2) * Math.cos(angle);
        const y = (circleSize / 2) * Math.sin(angle);
        return { x, y };
    };

    // Initialize state for day locations
    let locations = {};
    for (let i = 0; i < totalDays; i++) {
        const { x, y } = calculateCoordinates(i);
        locations[`day${i}`] = { x: x, y: y };
    }

    for (let i = 0; i < totalDays; i++) {
        locations[`day${i}`].x = locations[`day${i}`].x + circleSize / 2;
        locations[`day${i}`].y = locations[`day${i}`].y * -1 + circleSize / 2;
    }
    console.log("newCircleStart", newCircleStart);
    console.log("activearea", activearea);
    console.log("spaceBetween", spaceBetween);

    console.log("circleStartRadians", circleStartRadians);
    console.log("spaceBetweenRadians", spaceBetweenRadians);
    console.log(locations);
    // y = r(sin()) 250*(Math.cos((101*2)/7+101) = -123.9926555873
    // 250*(cos(101+1*22.5) <- correct
    // text += cars[i] + "<br>";

    return (
        <View style={styles.Absolute}>
            <View style={[styles.circle, { top: locations[`day${0}`].y, left: locations[`day${0}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${1}`].y, left: locations[`day${1}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${2}`].y, left: locations[`day${2}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${3}`].y, left: locations[`day${3}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${4}`].y, left: locations[`day${4}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${5}`].y, left: locations[`day${5}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
            <View style={[styles.circle, { top: locations[`day${6}`].y, left: locations[`day${6}`].x }]}>
                <View style={[styles.circleFill, { height: "100%" }]} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    Absolute: {
        width: 250,
        height: 250,
        zIndex: 4,
        elevation: 4,
        position: "absolute",
    },
    circle: {
        position: "absolute",
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        overflow: "hidden",
        zIndex: 5,
        elevation: 5,
    },
    circleFill: {
        backgroundColor: "#007AFF",
        width: "100%",
        bottom: 0,
        position: "absolute",
    },
});
