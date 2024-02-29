import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

import { useState } from "react";
//import Ellipsis from "./components/ellipsis";
import TestButtons from "./TestButtons";
import LogButton from "./LogButton";
// TODO: The scrollable should keep scrolling for a little longer
function HabitPage() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1, marginBottom: 85 }}>
        <View style={styles.container}>
          <View style={styles.column}>
            <TestButtons></TestButtons>
          </View>
          <View style={styles.column}>
            <TestButtons></TestButtons>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HabitPage;
