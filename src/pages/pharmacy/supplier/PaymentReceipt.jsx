import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import { headerInfo, toCamelCase } from "../../../components/UI/helpers";
import ReceiptHeader from "../Receipt/ReceiptHeader";
import { formatNumber } from "../../../utils";

export const facilityDetails = headerInfo;

export function DepositReceipt({
  depositDetails = {},
  receiptSN,
  user,
  activeBusiness = {},
  description=''
}) {
  return (
    <Document>
      <Page size={{ width: 200 }} style={styles.body}>
        <View>
          <ReceiptHeader activeBusiness={activeBusiness} />
          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Date:</Text>
            <Text>{moment(depositDetails.date).format("LL")}</Text>
          </View>
          <View style={styles.item}>
            <Text stylDepositReceipte={{ marginRight: 5 }}>Name:</Text>
            <View>
              <Text>{depositDetails.name}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text stylDepositReceipte={{ marginRight: 5 }}>Number:</Text>
            <View>
              <Text>{depositDetails.acct}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Description:</Text>
            <Text>
              {description?description:null}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Amount:</Text>
            <Text>{formatNumber(depositDetails.amount)}</Text>
          </View>

          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Mode of payment:</Text>
            <Text>{toCamelCase(depositDetails.modeOfPayment)}</Text>
          </View>

          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Receipt Number:</Text>
            <Text>{receiptSN}</Text>
          </View>
          <View style={styles.item}>
            <Text style={{ marginRight: 5 }}>Cashier:</Text>
            <Text>{user}</Text>
          </View>
          <Text style={styles.poweredBy}>Powered by:MyLikita Health</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: 3,
    fontSize: 8,
    paddingHorizontal: 5,
  },
  poweredBy: {
    fontSize: 8,
    marginTop: 6,
    textAlign: "center",
    fontFamily: "CustomRoboto",
    fontStyle: "italic",
  },
  title: {
    fontSize: 18,
    // textAlign: 'center',
    fontFamily: "CustomRoboto",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "CustomRoboto",
  },
  author: {
    fontSize: 12,
    marginBottom: 20,
  },
  subtitle2: {
    fontSize: 18,
    marginBottom: 30,
  },
  image: {
    height: 60,
    width: 50,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    marginVertical: 3,
  },
});
