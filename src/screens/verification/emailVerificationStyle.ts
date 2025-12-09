import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    headerRow: {
        marginTop: hp("6%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
    headerTitle: {
        fontSize: wp("5%"),
        fontWeight: "600",
        textAlign: "center",
        flex: 1,
    },
    imgWrap: {
        alignItems: "center",
        marginTop: hp("5%"),
    },
    continueText: {
        fontFamily: 'Matter-SemiBold',
        color: '#fff'
    },

    desc: {
        fontSize: wp("4%"),
        marginTop: hp("8%"),
        lineHeight: hp("3%"),
        color: "#000000",
        textAlign: "center",
    },

    otpRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: hp("3%"),
        paddingHorizontal: wp("10%"),
    },

    otpBox: {
        width: wp("13%"),
        height: wp("13%"),
        borderRadius: wp("4%"),
        borderWidth: 1,
        borderColor: "#FFD2C4",
        textAlign: "center",
        fontSize: wp("6%"),
        backgroundColor: "#FFF",
    },
    errorText: {
        color: "red",
        textAlign: "left",
        width: "78%",
        alignSelf: "center",
        marginTop: hp("1%"),
        fontSize: wp("3.5%"),
    },

    loginBtn: {
        width: "90%",
        alignSelf: "center",
        height: hp("5.9%"),
        borderRadius: wp("2.2%"),
        marginTop: hp("3%"),
    },

    resendRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("8%"),
        marginTop: hp("4%"),
    },

    resendLink: {
        color: "#FF8A65",
        fontWeight: "600",
        fontSize: wp("4%"),
    },
});
