import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import ReceiptFooter from "./Receipt/ReceiptFooter";
import ReceiptHeader from "./Receipt/ReceiptHeader";
import ReceiptDateRange from "./Receipt/ReceiptDateRange";

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 9.99;
const COL2_WIDTH = 38;
const COL3_WIDTH = 10;
const COLN_WIDTH = (100 - COL2_WIDTH - COL3_WIDTH) / 2;
function RegisteredDrugPDF({
  list = [],
  title = "",
  range = {},
  total = "",
  activeBusiness = {},
}) {
  return (
    <PDFViewer height="567" width="1000">
      <Document>
        <Page size="A4" style={styles.body}>
          <ReceiptHeader activeBusiness={activeBusiness} />
          <ReceiptDateRange title={title} range={range} total={total} />
          {list.length ? (
            <View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol3Header}>
                    <Text
                      style={[styles.tableCellHeader, { textAlign: "center" }]}
                    >
                      S/N
                    </Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text
                      style={[styles.tableCellHeader, { textAlign: "center" }]}
                    >
                      Drug name
                    </Text>
                  </View>
                  <View style={styles.tableColHeader}>
                    <Text
                      style={[styles.tableCellHeader, { textAlign: "center" }]}
                    >
                      Generic name
                    </Text>
                  </View>
                  <View style={styles.tableColHeader}>
                    <Text
                      style={[styles.tableCellHeader, { textAlign: "center" }]}
                    >
                      Formulation
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
                      <Text style={styles.tableCell}>{item.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, { textAlign: "left" }]}>
                        {item.generic_name ? (
                          item.generic_name
                        ) : (
                          <Text style={{ textAlign: "center" }}>-</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, { textAlign: "left" }]}>
                        {item.formulation ? (
                          item.formulation
                        ) : (
                          <Text style={{ textAlign: "center" }}>-</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View>
              <Text style={[styles.tableCell, { textAlign: "center" }]}>
                NO REPORT AVAILABLE
              </Text>
            </View>
          )}
          <ReceiptFooter />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default RegisteredDrugPDF;

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
    margin: 5,
    fontWeight: "bold",
  },
  new2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 18,
    // textAlign: "center",
    margin: 5,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    fontSize: 9,
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
    borderRadius: 0,
    paddingBottom: 2,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: COL3_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderRadius: 0,
    paddingBottom: 2,
    borderWidth: 1,
    margin: 0,
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
  tableCellHeader: {
    margin: 0,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 0,
    fontSize: 10,
  },
  tableCell1: {
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 10,
  },
});
