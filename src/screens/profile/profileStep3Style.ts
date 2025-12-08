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
    progressBarWrapper: {
        flexDirection: "row",
        marginTop: hp("0.7%"),
        paddingHorizontal: wp("6%"),
    },
    progressActive3: {
        width: "100%",
        height: 6,
        borderRadius: 4,
        backgroundColor: Colors.primary,
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
    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 35,
        backgroundColor: "#FFE7D7",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    cardTitle: {
        marginBottom: 4,
    },
    cardSubtitle: {
        marginBottom: 20,
    },
    sectionLabel: {
        marginTop: 16,
        marginBottom: 6,
    },
    goalOption: {
        marginTop: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
    },
    optionSubtitle: {
        marginTop: 2,
    },
    goalSelected: {
        borderColor: Colors.primary,
        backgroundColor: "#FFF3EB",
    },
    dietRow: {
        flexDirection: "row",
        marginTop: 8,
        justifyContent: "flex-start",
    },
    dietBtn: {
        width: wp("39%"),
        height: hp("10.6%"),
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        marginRight: wp("3%"),
        paddingTop: hp("2.3%"),
        paddingBottom: hp("2.3%"),
    },
    lastDietBtnInRow: {
        marginRight: 0,
    },
    singleDietBtn: {
        width: wp("39%"),
        height: hp("10.6%"),
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        marginRight: 0,
        marginTop: hp("1%"),
    },
    dietSelected: {
        borderColor: Colors.primary,
        backgroundColor: "#FFF3EB",
    },
    dietText: {
        marginTop: 6,
    },
    allergyInput: {
        marginTop: 4,
    },
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
