import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Done({ props }) {
    const { habitName, streak } = props;

    return (
        <View style={styles.container}>
            <OverviewInformation habitName={habitName} streak={streak} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        backgroundColor: "#007AFF",
        borderRadius: 250 / 2,
    },
});
