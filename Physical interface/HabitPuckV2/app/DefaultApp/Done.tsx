import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import OverviewInformation from "./Components/OverviewInformation";
import WeekHistory from "./Components/WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Done({ props }) {
    const { habitName, streak, target, habitColor } = props;
    return (
        <View style={[styles.container, { backgroundColor: habitColor }]}>
            <OverviewInformation
                habitName={habitName}
                streak={streak}
                textColor="#fff"
                count={target}
                target={target}
            />
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
