import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: hp("1.8%"),
        paddingHorizontal: wp("6%"),
    },
    scrollContent: {
        paddingTop: hp("2.8%"),
        paddingBottom: hp("4.7%"),
    },
    stepText: {
        paddingHorizontal: wp("6%"),
    },
    progressBar: {
        flexDirection: "row",
        marginTop: hp("0.7%"),
        paddingHorizontal: wp("6%"),
    },
    active1: {
        width: "33%",
        height: 6,
        borderRadius: 4,
        backgroundColor: Colors.primary,
    },
    inactive1: {
        width: "67%",
        height: 6,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },
    card: {
        marginTop: hp("2.8%"),
        marginHorizontal: wp("4.1%"),
        borderRadius: 16,
        backgroundColor: "#FFF",
        padding: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 35,
        backgroundColor: "#FFE7D7",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    subtitleSpacing: {
        marginBottom: 20,
    },
    input: {
        marginTop: 4,
    },
    labelTop: {
        marginTop: 12,
    },
    twoBtnRow: {
        flexDirection: "row",
        marginTop: 8,
    },
    selectBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 10,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "#FFFFFF",
    },
    lastSelectBtn: {
        marginRight: 0,
    },
    selected: {
        borderColor: Colors.primary,
        backgroundColor: "#FFF3EB",
    },
    btnContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    btnText: {},
    btnRow: {
        flexDirection: "row",
        marginTop: 24,
        marginHorizontal: wp("4.1%"),
    },
    secondaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    primaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
});
