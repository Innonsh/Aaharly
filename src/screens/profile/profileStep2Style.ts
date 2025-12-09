import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFF" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("1.8%"),
        paddingHorizontal: wp("6%"),
        alignItems: "center",
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
    active2: {
        width: "66%",
        height: 6,
        borderRadius: 4,
        backgroundColor: Colors.primary,
    },
    inactive2: {
        width: "34%",
        height: 6,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },
    card: {
        marginTop: hp("2.8%"),
        marginHorizontal: wp("4.1%"),
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        marginTop: 4,
    },
    sectionLabel: {
        marginTop: 16,
        marginBottom: 6,
    },
    option: {
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#FFF",
        marginTop: 8,
    },
    optionSubtitle: {
        marginTop: 2,
    },
    selected: {
        borderColor: Colors.primary,
        backgroundColor: "#FFF3EB",
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
