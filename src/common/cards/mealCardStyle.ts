import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    largeMealCard: {
        backgroundColor: "transparent",
        borderRadius: 20,
        padding: 0,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: "center",
        width: wp("92%"),
        height: hp("37%"),
        alignSelf: "center",
        position: "relative",
    },
    largeMealImage: {
        width: wp("92%"),
        height: hp("37%"),
        borderRadius: 20,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
    },
    largeMealDetails: {
        position: "absolute",
        top: hp("21.5%"),
        width: wp("92%"),
        height: hp("16%"),
        backgroundColor: "#FFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: wp("4%"),

    },
    cardBottom: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    badgesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: wp("2%"),
        marginTop: hp("1.5%"),
    },
    badge: {
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("0.7%"),
        borderRadius: 100,
    },
    badgeText: {
        fontSize: wp("3%"),
        color: "#333",
        fontWeight: "500",
    },
    buyBtn: {
        backgroundColor: "#FF5722",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1.2%"),
        borderRadius: 25,
    },
});