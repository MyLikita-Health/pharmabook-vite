import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

function PdfHeader() {
    return (
        <View style={styles.header}>
            <View>
                <Image
                    style={styles.image}
                    src={require("../../assets/img/logo-white-bg.png")}
                />
            </View>

            <View>
                <Text style={styles.text}>Noor Takaful Insurance Ltd</Text>
                <Text style={styles.text}>
                    170, Gbagada express way, 1st Pedro
                </Text>
                <Text style={styles.text}>
                    Bus stop, Gbagada, Lagos State Nigeria
                </Text>
                <Text style={styles.text}>TIN:18125767-000</Text>
                <Text style={styles.text}>www.noortakaful.ng</Text>
                <Text style={styles.text}>+2348099444448</Text>
                <Text style={styles.text}></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginBottom: 3,
        fontSize: 11
    },
    image: {
        width: 140,
        height: 100,
        marginTop: 0
    },
    header: {
        fontSize: 11,
        color: "grey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "between"
    }
});

export default PdfHeader;
