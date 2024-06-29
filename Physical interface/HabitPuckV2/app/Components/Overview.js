import { StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
import Confetti from "react-confetti";

export default function Overview({ props }) {
    const { count, habitName, target, width, historyCounts, habitColor, streak } = props;
    console.log(props.count);
    return (
        <View style={[styles.container]}>
            {!!(count == target) && <Confetti width={250} height={250} />}
            <ProgressBar count={count} target={target} habitColor={habitColor} />
            <OverviewInformation streak={streak} count={count} target={target} habitName={habitName} width={width} />
            <WeekHistory historyCounts={historyCounts} habitColor={habitColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
