import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Done({ props }) {
  const { habitName, streak, target } = props;
  const teststreak = { streak: 2, omissions: 0 };
  return (
    <View style={styles.container}>
      <OverviewInformation
        habitName={habitName}
        streak={teststreak}
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
