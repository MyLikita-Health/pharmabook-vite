import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

function ReceiptFooter() {
  return (
    <View style={styles.brainstorm}>
      <View style={styles.goodbyeTextContainer}>
        <Text style={styles.goodbyeText}>Thanks for patronizing us !</Text>
      </View>
      <View style={styles.goodbyeTextContainer}>
        <Text style={styles.goodbyeText}>Powered by:MyLikita Health</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  brainstorm: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  goodbyeText: {
    fontSize: 6,
    textTransform: "capitalize",
    textAlign: "center",
  },
  goodbyeTextContainer: { marginTop: 2 },
});
export default ReceiptFooter;
