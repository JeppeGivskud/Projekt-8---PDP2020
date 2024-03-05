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

//import Ellipsis from "./components/ellipsis";
import TestButtons from "./TestComponents/TestButtons";
import LogButton from "./LogButton";
// TODO: The scrollable should keep scrolling for a little longer
function HabitPage() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview}>
        <View>
          <TestButtons style={styles.container}></TestButtons>
        </View>
        <View>
          <TestButtons style={styles.container}></TestButtons>
        </View>
        <View>
          <TestButtons style={styles.container}></TestButtons>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  scrollview: {
    justifyContent: "flex-start",
    gap: 20,
  },
});
export default HabitPage;
