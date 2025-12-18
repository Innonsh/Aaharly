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
        paddingHorizontal: wp("5%"),
    },

    imageWrapper: {
        alignItems: "center",
        marginTop: hp("8.5%"),
    },

    title: {
        marginTop: hp("7%"),
        fontSize: 22,
    },

    subtitle: {
        marginTop: hp("1%"),
        marginBottom: hp("1.7%"),
    },

    input: {
        backgroundColor: "#FFF",
        marginTop: hp("0.5%"),
        borderRadius: wp("3.9%"),
        fontFamily: "Matter-Regular",
        fontSize: 22,
        lineHeight: 22,
        includeFontPadding: false,
    },
    errorText: {
        color: "red",
        fontSize: wp("3.2%"),
        marginTop: hp("0.8%"),
    },

    continueBtn: {
        marginTop: hp("3%"),
        width: "100%",
        height: hp("5.9%"),
        borderRadius: wp("3%"),
    },
    continueText: {
        fontFamily: "Matter-SemiBold",
        color: "#fff",
    },

    orText: {
        marginTop: hp("3.5%"),
        marginBottom: hp("1.5%"),
        textAlign: "center",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: wp("7%"),
        marginTop: hp("2.5%"),
    },
    iconBox: {
        width: wp("12%"),
        height: wp("12%"),

        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: wp("2.8%"),
        alignItems: "center",
        justifyContent: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
    },
});
