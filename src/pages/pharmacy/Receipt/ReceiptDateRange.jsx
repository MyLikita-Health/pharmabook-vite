import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import { formatNumber } from "../../../utils";

function ReceiptDateRange({ range = {}, agent='' , title = '', total='' }) {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{agent?`${agent}'s`:''} {title}</Text>
      <Text style={styles.dateText}>From: {range.from}</Text>
      <Text style={styles.dateText}>To: {range.to}</Text>
      <Text style={styles.dateText}>{total?`Of ${formatNumber(total)}`:''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 11,
    // textAlign: 'center',
    fontFamily: "CustomRoboto",
    marginVertical: 2,
  },
});
export default ReceiptDateRange;
