import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Overview({
    todayValue,
    habitName,
    goal,
    streak,
    width,
    height,
    HistoryValues,
}) {
    return (
        <View style={styles.container}>
            <ProgressBar
                goal={goal}
                value={todayValue}
                width={width}
                height={height}
            />
            <OverviewInformation
                value={todayValue}
                goal={goal}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            />
            <WeekHistory values={HistoryValues} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
