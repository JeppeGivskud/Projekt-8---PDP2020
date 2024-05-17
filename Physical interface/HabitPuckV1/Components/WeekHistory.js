import { View, StyleSheet } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import DayCircle from "./DayCircle";
import convert from "color-convert";

function desaturateColor(habitColor) {
  // Convert hex to hsv
  let hsv = convert.hex.hsv(habitColor);
  // Reduce saturation to 5
  hsv[1] = 5;
  // Convert hsv back to hex
  let desaturatedColor = convert.hsv.hex(hsv);
  return `#${desaturatedColor}`;
}
//TODO: daycicles;
export default function WeekHistory({ historyCounts, habitColor }) {
  //This screen renders a bar in the bottom and then the DayCircles. An array of historyCounts should be parsed
  const circlestart = 101;
  const rotate = "-101deg";
  const circleSpace = (360 - circlestart * 2) / 6;

  const currentDate = new Date();
  const currentDayOfWeek = (currentDate.getDay() + 6) % 7; // Shift Sunday (0) to the end

  return (
    <View>
      <View style={[styles.Absolute, { transform: [{ rotate: rotate }] }]}>
        <CircularProgressBase
          value={-currentDayOfWeek * circleSpace}
          radius={250 / 2}
          duration={0}
          activeStrokeWidth={40}
          inActiveStrokeWidth={0}
          activeStrokeColor={desaturateColor(habitColor)}
          progressValueColor={"blue"} //textcolor
          maxValue={360}
        />
      </View>
      <DayCircle
        historyCounts={historyCounts}
        habitColor={habitColor}
      ></DayCircle>
    </View>
  );
}
const styles = StyleSheet.create({
  Absolute: {
    width: 250,
    height: 250,
    position: "absolute",
    zIndex: 2,
    elevation: 2,
  },
});
