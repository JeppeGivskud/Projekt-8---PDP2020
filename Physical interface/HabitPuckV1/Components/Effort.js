import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import ReactCurvedText from 'react-curved-text';


import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Effort({ props }) {
    const {
        effortCount,
        habitName,
        width,
        height,
        historyValues,
    } = props;

    const effortBarColor = {
        green: "#02D46A",
        greenBackground: "#E6FBF0",
        orange: "#FF9500",
        orangeBackground: "#FFFAF2",
        red: "#FF3B2F",
        redBackground: "#FFF3F2",
    }


    return (
        <View style={styles.container} >

            <ReactCurvedText
                width={100}
                height={100}
                cx={125}
                cy={125}
                rx={125}
                ry={125}
                startOffset={110}
                reversed={false}
                text="Initiation effort"
                textProps={{ style: { fontSize: 24, textAlign: "center" } }}
                textPathProps={null}
                tspanProps={null}
                ellipseProps={null}
                svgProps={null}
                style={styles.absolute}
            />

            <CircularProgressBase
                rotation={180}
                goal={100}
                value={effortCount}
                radius={250 / 2}
                duration={700}
                activeStrokeWidth={40}
                inActiveStrokeWidth={40}
                maxValue={100}
                activeStrokeColor={effortCount < 33 ? effortBarColor.green : effortCount < 66 ? effortBarColor.orange : effortBarColor.red} //Denne skal måske flyttes til en funktion
                inActiveStrokeColor={effortCount < 33 ? effortBarColor.greenBackground : effortCount < 66 ? effortBarColor.orangeBackground : effortBarColor.redBackground}
                style={styles.absolute}
            />

        </View >


    );
}

const styles = StyleSheet.create({

    Absolute: {
        width: 250,
        height: 250,
        position: "absolute",
        zIndex: 1,
        elevation: 1,
    },

    container: {
        flex: 1,
        position: 'relative', // This is important
    },

});
