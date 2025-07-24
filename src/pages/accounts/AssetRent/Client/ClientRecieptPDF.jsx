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
import customRobotoNormal from "../../../../fonts/Roboto-Regular.ttf";
import customRobotoBold from "../../../../fonts/Roboto-Bold.ttf";
import {
  formatNumber,
  headerInfo,
  remedix,
} from "../../../../components/UI/helpers";
import Logo from "../../../../assets/images/loogo.png";
// import { formatNumber } from '../../utilities';

const ClientRecieptPDF = ({
  data = [],
  // total = 0,
  client = {},
}) => {
  // let remedix = {
  //   title: "Rashmedix Pharmacy Ltd.",
  //   sub1: "Pompomari bypass opposite kotoloma filling station",
  //   sub2: "Maiduguri.",
  //   acronym: "RPL",
  // };
  const total = data
    .map((item) => parseFloat(item.quantity) * parseFloat(item.cost_price))
    ?.reduce((sum, init = 0) => sum + init);
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View>
          <View style={styles.headerContainer}>
            <Image style={styles.image} alt="logo" src={Logo} />
            <Text style={styles.title}>{headerInfo.title}</Text>
            <Text style={styles.subtitle}>{headerInfo.sub1}</Text>
            <Text style={styles.subtitle}>{headerInfo.sub2}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text>from: {moment(client.from).format("DD/MM/YYYY")}</Text>
            <Text>from: {moment(client.to).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCol1Header, width: 30 }}>
                <Text style={{ ...styles.tableCellHeader, width: 30 }}>SN</Text>
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
                <Text style={styles.tableCellHeader}>Cost Of Items (₦)</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount paid (₦)</Text>
              </View>
            </View>

            {data.map((item, i) => (
              <View style={styles.tableRow}>
                <View style={{ ...styles.tableCol1Header, width: 30 }}>
                  <Text style={{ ...styles.tableCellHeader, width: 30 }}>
                    {i + 1}
                  </Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>{item.description}</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={[styles.tableCellHeader, styles.textCenter]}>
                    {item.quantity ? item.quantity : "-"}
                  </Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={[styles.tableCellHeader, styles.text_right]}>
                    {item.cost_price ? formatNumber(item.cost_price) : "-"}
                  </Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={[styles.tableCellHeader, styles.text_right]}>
                    {item.cr ? formatNumber(item.cr) : "-"}
                  </Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.text_right}>
                    {formatNumber(
                      parseInt(item.quantity) * parseFloat(item.cost_price)
                    )}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell} />
              </View>

              <View style={[styles.tableColTotal, styles.fontWeightBold]}>
                <Text style={[styles.tableCell, styles.textRight]}>
                  {`₦ ${formatNumber(total)}`}
                </Text>
              </View>
            </View>

            {/* <View style={[styles.tableRow, styles.mt1]}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Discount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell} />
              </View>

              <View style={[styles.tableColTotal, styles.fontWeightBold]}>
                <Text style={[styles.tableCell, styles.textRight]}>
                  {`₦ ${discount.toLocaleString()}`}
                </Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.mt1]}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>Grand Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell} />
              </View>

              <View style={[styles.tableColTotal, styles.fontWeightBold]}>
                <Text
                  style={[
                    styles.tableCell,
                    styles.textRight,
                    styles.grandTotal,
                  ]}
                >
                  {`₦ ${formatNumber(total - discount) || 0}`}
                </Text>
              </View>
            </View> */}
          </View>

          {/* <View style={styles.item}>
            <Text style={styles.mr5}>Mode of payment:</Text>
            <Text>{modeOfPayment}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Receipt Number:</Text>
            <Text>{receiptNo}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.mr5}>Cashier:</Text>
            <Text>{cashier}</Text>
          </View> */}
        </View>

        <View style={styles.goodbyeTextContainer}>
          <Text style={styles.goodbyeText}>Thanks for patronizing us !</Text>
        </View>
        <View style={styles.goodbyeTextContainer}>
          <Text style={styles.goodbyeText}>Powered by:MyLikita Health</Text>
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

const COL1_WIDTH = 40;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;

const styles = StyleSheet.create({
  body: {
    paddingVertical: 10,
    fontSize: 10,
    paddingHorizontal: 10,
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
    width: "100%",
    marginVertical: 6,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowTotal: {
    flexDDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
  },
  tableCol: {
    width: COLN_WIDTH + "%",
  },
  tableColTotal: {
    width: 2 * COLN_WIDTH + "%",
  },
  tableCellHeader: {
    marginRight: 5,
    fontWeight: "bold",
  },
  tableCell: {
    marginVertical: 1,
    marginRight: 4,
    display: "flex",
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

export default ClientRecieptPDF;
