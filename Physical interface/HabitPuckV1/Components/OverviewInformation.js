import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function OverviewInformation({
  streak = { streak: 0, omissions: 0 },
  count = 0,
  target = 100,
  habitName = "Undefined",
  textColor = "#000000",
}) {
  const [streaksize, setStreakSize] = useState(100);
  const [omissionPercentage, setOmissionPercentage] = useState(
    (streak.omissions % 5) * 20
  );

  useEffect(() => {
    if (streak.omissions == 0) {
      setStreakSize("100%");
    } else {
      setOmissionPercentage((streak.omissions % 5) * 20);
      if (omissionPercentage == 0) {
        setStreakSize("0%");
      } else {
        setStreakSize(100 - omissionPercentage + "%");
      }
    }
  }, [streak]);

  console.log("streak", streak);
  console.log("streaksize", streaksize);
  console.log("omissionpercentage", omissionPercentage);
  return (
    <View style={styles.container}>
      <View style={[styles.smallContainer, { gap: 4 }]}>
        <Text style={[styles.upper, { color: textColor }]}>{count}</Text>
        <Text style={[styles.upper, { color: textColor }]}>/</Text>
        <Text style={[styles.upper, { color: textColor }]}>{target}</Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={[styles.habitName, { color: textColor }]}>
          {habitName}
        </Text>
      </View>
      <View style={styles.smallContainer}>
        <Text style={[styles.lower, { color: textColor, paddingLeft: 20 }]}>
          {streak.streak} days
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/StreakFlame.png")}
            style={{
              width: streaksize,
              height: streaksize,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  upper: {
    fontWeight: "light",
    fontSize: 20,
    color: "black",
  },
  habitName: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  lower: {
    fontWeight: "regular",
    fontSize: 20,
    color: "black",
  },
  smallContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    width: 20,
    height: 20,
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 250,
    height: 250,
    padding: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
