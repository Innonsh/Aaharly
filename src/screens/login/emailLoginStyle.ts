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
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
    },

    headerTitle: {
        fontSize: wp("5%"),
        textAlign: "center",
        flex: 1,
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

    imageWrapper: {
        alignItems: "center",
        marginTop: hp("4%"),
        marginBottom: hp("2%"),
    },

    label: {
        marginTop: hp("3%"),
        marginBottom: hp("1%"),
        marginLeft: wp("5%"),
        fontSize: wp("4.5%"),
    },
    continueText: {
        fontFamily: "Matter-SemiBold",
        color: "#fff",
    },

    input: {
        width: wp("90%"),
        alignSelf: "center",
        backgroundColor: "#FFF",
        marginTop: hp("1.5%"),
        fontSize: wp("4%"),
    },

    button: {
        marginTop: hp("3%"),
        height: hp("5.9%"),
        borderRadius: wp("3%"),
        width: wp("90%"),
        alignSelf: "center",
    },
});
