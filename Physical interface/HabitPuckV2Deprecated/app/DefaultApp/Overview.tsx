import { StyleSheet, View } from "react-native";
import ProgressBar from "./Components/ProgressBar";
import OverviewInformation from "./Components/OverviewInformation";
import WeekHistory from "./Components/WeekHistory";
import Confetti from "react-confetti";

interface OverviewProps {
    habitName?: string;
    count?: number;
    target?: number;
    habitColor?: string;
    streak?: { streak: number; omissions: number };
    historyCounts?: { [key: number]: number };
}

export default function Overview({
    habitName = "Undefined",
    count = 0,
    target = 100,
    habitColor = "black",
    streak = { streak: 0, omissions: 0 },
    historyCounts = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    },
}: OverviewProps) {
    return (
        <View style={[styles.container]}>
            {!!(count == target) && <Confetti width={250} height={250} />}
            <ProgressBar {...{ count, target, habitColor }} />
            <OverviewInformation {...{ habitName, count, target, streak }} />{" "}
            <WeekHistory {...{ historyCounts, habitColor }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
