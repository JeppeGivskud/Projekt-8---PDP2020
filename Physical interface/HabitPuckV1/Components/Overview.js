import { StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Overview({ props }) {
    const { count, habitName, target, streak, width, height, historyCounts } =
        props;

    return (
        <View style={styles.container}>
            <ProgressBar
                target={target}
                value={count}
                width={width}
                height={height}
            />
            <OverviewInformation
                value={count}
                target={target}
                habitName={habitName}
                width={width}
                height={height}
                streak={streak}
            />
            <WeekHistory values={historyCounts} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
