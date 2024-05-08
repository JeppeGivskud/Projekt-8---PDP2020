import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Done({ props }) {
    const {
        todayValue,
        habitName,
        goal,
        streak,
        width,
        height,
        historyValues,
    } = props;

    return (
        <View style={styles.container}>
            <OverviewInformation
                value={todayValue}
                goal={goal}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
