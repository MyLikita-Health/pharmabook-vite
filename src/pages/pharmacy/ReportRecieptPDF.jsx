import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";
import { formatNumber } from "../../components/UI/helpers";
import ReceiptFooter from "./Receipt/ReceiptFooter";
import ReceiptHeader from "./Receipt/ReceiptHeader";
// import Logo from "../../assets/images/loogo.png";
import ReceiptDateRange from "./Receipt/ReceiptDateRange";
// import { formatNumber } from "../utils/helpers";

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 9.99;
const COL2_WIDTH = 38;
const COL3_WIDTH = 10;
const COLN_WIDTH = (100 - COL2_WIDTH - COL3_WIDTH) / 3;
const COLN_WIDTH2 = (100 - COL2_WIDTH - COL3_WIDTH);

function ReportRecieptPDF({ list = [], branch = "", title = "", range = {}, agent='', activeBusiness={}}) {
  return (
    <PDFViewer height="567" width="1000">
      <Document>
        <Page size="A4" style={styles.body}>
          <ReceiptHeader  activeBusiness={activeBusiness} />
          <ReceiptDateRange title={title} agent={agent} range={range} />
          {list.length?
          <View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3Header}>
                <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
                  S/N
                </Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
                  Description
                </Text>
              </View>
              {!title.includes('Discount')?<View style={!title.includes('Discount')?styles.tableColHeader:styles.tableColHeaderAlt}>
                <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
                  Quantity
                </Text>
              </View>:null}
              {!title.includes('Discount')?<View style={!title.includes('Discount')?styles.tableColHeader:styles.tableColHeaderAlt}>
                <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
                  Cost Price
                </Text>
              </View>:null}
              <View style={!title.includes('Discount')?styles.tableColHeader:styles.tableColHeaderAlt}>
                <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>
                {!title.includes('Discount')?'Total':'Amount'}
                </Text>
              </View>
            </View>           
            {list.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol3}>
                  <Text style={[styles.tableCell, { textAlign: "center" }]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>{item.description}</Text>
                </View>
                {!title.includes('Discount')?<View style={!title.includes('Discount')?styles.tableCol:styles.tableColAlt}>
                  <Text style={[styles.tableCell, { textAlign: "center" }]}>
                    {item.qty?formatNumber(item.qty) :item.quantity?formatNumber(item.quantity): 0}
                  </Text>
                </View>:null}
                {!title.includes('Discount')?<View style={!title.includes('Discount')?styles.tableCol:styles.tableColAlt}>
                  <Text style={[styles.tableCell, { textAlign: "right" }]}>
                    {item.unit_price?formatNumber(item.unit_price):item.debit? formatNumber(item.debit): 0}
                  </Text>
                </View>:null}
                <View style={!title.includes('Discount')?styles.tableCol:styles.tableColAlt}>
                  <Text style={[styles.tableCell, { textAlign: "right" }]}>
                    {title.includes('Discount')?
                    formatNumber(item.credit)
                    :title.includes('Expenses')?
                    formatNumber(item.debit)
                    :formatNumber(
                      parseFloat(item.unit_price) * parseFloat(item.qty)
                    )}
                  </Text>
                </View>
                {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.location_from}</Text>
              </View> */}
              </View>
            ))}
          </View>
          <Text style={styles.total}>
            Total:{' '}
            {list &&
            !title.includes('Discount')?  formatNumber(
                list.reduce(
                  (a, b) => a + parseFloat(b.unit_price) * parseFloat(b.qty),
                  0
                )
              ):title.includes('Expenses')?
              formatNumber(
                list.reduce(
                  (a, b) => a + parseFloat(b.debit),
                  0
                )
              )
              :formatNumber(
                list.reduce(
                  (a, b) => a + parseFloat(b.credit),
                  0
                )
              )}
          </Text>
          </View>:<View>
          <Text style={[styles.tableCell, { textAlign: "center" }]}>
                   NO REPORT AVAILABLE
                  </Text>
            </View>}
          <ReceiptFooter />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ReportRecieptPDF;

const styles = StyleSheet.create({
  body: {
    padding: 30,
  },
  total: {
    textAlign: "right",
    fontSize: 12,
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
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  new: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 18,
    // textAlign: "center",
    margin: 2,
    fontWeight: "bold",
  },
  new2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 18,
    // textAlign: "center",
    margin: 2,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2Header: {
    width: COL2_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3Header: {
    width: COL3_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeaderAlt: {
    width: COLN_WIDTH2 + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: COL2_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    paddingBottom: 2,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: COL3_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    paddingBottom: 2,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColAlt: {
    width: COLN_WIDTH2 + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 1,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 1,
    fontSize: 10,
  },
  tableCell1: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 10,
  },
});
