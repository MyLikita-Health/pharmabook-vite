import React from "react";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
export default function ReceiptHeader({ activeBusiness = {} }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        cache={false}
        src={activeBusiness.pharmacy_logo}
        style={styles.image}
        alt="logo"
      />
      <Text style={styles.title}>{activeBusiness?.pharmacy_name}</Text>
      <Text style={styles.subtitle}>{activeBusiness?.pharmacy_address}</Text>
      <Text style={styles.subtitle}>
        {activeBusiness.residance_name},{activeBusiness.state_of_practice}.
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottom: 1,
          borderBottomColor: "#000000",
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
});
