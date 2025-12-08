import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: wp("5%"),
    },

    imageWrapper: {
        alignItems: "center",
        marginTop: hp("12%"),
    },

    headerRow: {
        marginTop: hp("6%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: wp("5%"),
    },

    backBtn: {
        width: wp("11%"),
        height: wp("11%"),
        borderRadius: wp("6%"),
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    heading: {
        textAlign: "center",
        marginTop: hp("6%"),
        fontSize: wp("6%"),
    },

    subtext: {
        textAlign: "center",
        marginTop: hp("1%"),
        fontSize: wp("4%"),
    },

    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("3%"),
    },

    otpBox: {
        width: wp("13%"),
        height: wp("13%"),
        borderWidth: 1,
        borderColor: "#FFD3C8",
        borderRadius: wp("3%"),
        textAlign: "center",
        marginHorizontal: wp("3%"),
        fontSize: wp("5%"),
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("4%"),
    },

    timer: {
        fontSize: wp("4%"),
        marginRight: wp("2%"),
    },

    didntReceive: {
        fontSize: wp("4%"),
        color: "#666",
        marginRight: wp("1%"),
    },

    resend: {
        fontSize: wp("4%"),
        color: "#FF6A4D",
        fontWeight: "600",
    },
});
