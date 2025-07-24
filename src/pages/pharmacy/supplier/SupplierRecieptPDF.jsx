import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";
import customRobotoNormal from "../../../fonts/Roboto-Regular.ttf";
import customRobotoBold from "../../../fonts/Roboto-Bold.ttf";
import { formatNumber, headerInfo } from "../../../components/UI/helpers";
// import { formatNumber } from '../../utilities';
// import Logo from "../../../assets/images/loogo.png";
import ReceiptHeader from "../Receipt/ReceiptHeader";
import ReceiptDateRange from "../Receipt/ReceiptDateRange";
// import { useQuery } from "../../../hooks";

const SupplierRecieptPDF = ({
  data = [],
  name = "",
  type = "",
  balance = 0,
  phone = 0,
  client = {},
  activeBusiness = {},
  agent = "",
  title = "",
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <ReceiptHeader activeBusiness={activeBusiness} />
          <View style={styles.name}>
            <Text>Name: {name}</Text>
            <Text>Date: {moment().format("YYYY-MM-DD")}</Text>
          </View>
          <View style={styles.name}>
            <Text>Phone: {phone}</Text>
          </View>
          <View style={styles.name}>
            <Text>Balance: {formatNumber(balance)}</Text>
          </View>
          <ReceiptDateRange range={client} agent={agent} title={title} />
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCol1Header }}>
                <Text style={[styles.tableCellHeader, styles.textCenter]}>
                  S/N
                </Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={[styles.tableCellHeader, styles.textCenter]}>
                  Qty
                </Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={[styles.tableCellHeader, styles.text_right]}>
                  Cost Of Items (₦)
                </Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={[styles.tableCellHeader, styles.text_right]}>
                  Amount paid (₦)
                </Text>
              </View>
            </View>
            {type !== "supplier"
              ? data.map((item, i) => (
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCol1Header }}>
                      <Text style={[styles.tableCellHeader1, styles.textCenter]}>
                        {i + 1}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader1}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.textCenter]}>
                        {item.quantity ? item.quantity : "-"}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.text_right]}>
                        {item.dr ? formatNumber(item.dr) : "-"}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.text_right]}>
                        {item.cr ? formatNumber(item.cr) : "-"}
                      </Text>
                    </View>
                  </View>
                ))
              : data.map((item, i) => (
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCol1Header }}>
                      <Text style={{ ...styles.tableCellHeader1 }}>{i + 1}</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader1}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.textCenter]}>
                        {item.quantity ? item.quantity : "-"}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.text_right]}>
                        {item.cr ? formatNumber(item.cr) : "-"}
                      </Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={[styles.tableCellHeader1, styles.text_right]}>
                        {item.dr ? formatNumber(item.dr) : "-"}
                      </Text>
                    </View>
                  </View>
                ))}
          </View>
        </View>
        <View style={styles.brainstorm}>
          <View style={styles.goodbyeTextContainer}>
            <Text style={styles.goodbyeText}>Thanks for patronizing us !</Text>
          </View>
          <View style={styles.goodbyeTextContainer}>
            <Text style={styles.goodbyeText}>Powered by:MyLikita Health</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "CustomRoboto",
  fonts: [
    { src: customRobotoNormal },
    {
      src: customRobotoBold,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  ],
});

const COL1_WIDTH = 20;
const COL2_WIDTH = 38;
const COL3_WIDTH = 10;
const COLN_WIDTH = (108 - COL2_WIDTH - COL3_WIDTH) / 3;
const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const styles = StyleSheet.create({
  body: {
    paddingVertical: 7,
    fontSize: 10,
    paddingHorizontal: 7,
    fontFamily: "CustomRoboto",
  },
  image: {
    height: 50,
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
  brainstorm: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  title: {
    fontSize: 11,
    // textAlign: 'center',
    fontFamily: "CustomRoboto",
    marginVertical: 2,
  },
  title1: {
    fontSize: 12,
    alignItems: "left",
    // textAlign: 'center',
    fontFamily: "CustomRoboto",
  },
  subtitle: {
    fontSize: 10,
    fontFamily: "CustomRoboto",
  },
  receipt: {
    fontSize: 6,
    fontFamily: "CustomRoboto",
    marginLeft: 10,
  },
  address: {
    fontSize: 6,
    fontFamily: "CustomRoboto",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: "10px",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowTotal: {
    flexDDirection: "row",
  },
  tableCol1Header: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderLeftColor: "#000",
    borderTopColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  tableColHeader: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    border: "1px solid black",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColTotal: {
    width: 2 * COLN_WIDTH + "%",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCellHeader1: {
    margin: 5,
    // fontSize: 12,
    // fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  goodbyeText: {
    fontSize: 6,
    textTransform: "capitalize",
    textAlign: "center",
  },
  goodbyeTextContainer: { marginTop: 2 },
  docTitle: {
    marginVertical: 6,
    fontSize: 11,
    fontWeight: "bold",
  },
  textRight: { textAlign: "right" },
  textCenter: { textAlign: "center" },
  mr5: { marginRight: 5 },
  fontWeightBold: { fontWeight: "bold" },
  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
    paddingTop: 3,
  },
  mt1: {
    marginTop: 2,
  },
  text_right: { textAlign: "right" },
});

export default SupplierRecieptPDF;
