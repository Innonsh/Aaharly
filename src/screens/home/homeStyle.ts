import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { fonts } from "../../theme/Fonts";

export const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },

    listContent: {
        padding: wp("4%"),
        paddingBottom: hp("4%"),
    },

    bannerWrapper: {
        width: wp("100%"),
        height: hp("48%"),
        marginLeft: wp("-4%"),
        marginTop: wp("-4%"),
        marginBottom: hp("1.5%"),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    bannerInner: {
        width: wp("100%"),
        height: hp("48%"),
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    topHeader: {
        marginBottom: 0,
    },
    centerContainer: {
        position: "absolute",
        top: hp("7%"),
        left: wp("4%"),
        width: wp("92%"),
        gap: hp("1%"),
        flexDirection: "column",
    },
    searchBox: {
        width: wp("92%"),
        height: hp("6%"),
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        marginTop: 0,
    },
    searchContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: wp("3%"),
        height: "100%",
    },
    promoBox: {
        width: wp("60%"),
        height: hp("11%"),
        borderRadius: 18,
        overflow: "hidden",
        alignSelf: "center",
        position: "relative",
        marginTop: 0,
    },
    promoContent: {
        paddingTop: hp("3%"),
        paddingRight: wp("5%"),
        paddingBottom: hp("2%"),
        paddingLeft: wp("5%"),
        gap: hp("1.2%"),
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },

    ctaCard: {
        marginTop: hp("2%"),
        marginBottom: hp("2%"),
        width: wp("95%"),
        height: hp("20%"),
        borderRadius: 18,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#EEE",
        position: "relative",
    },
    ctaBackground: {
        width: wp("95%"),
        height: hp("20%"),
    },
    ctaContent: {
        flex: 1,
        padding: wp("6%"),
        justifyContent: "space-between",
        alignItems: "center",
    },
    ctaTitle: {
        color: "#FFFFFF",
        marginTop: hp("1%"),
        fontSize: wp("6%"),
        fontFamily: fonts.SemiBold,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
    ctaButtonsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("3%"),
    },
    setupBtn: {
        width: wp("40%"),
        height: hp("6%"),
        borderRadius: 14,
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("5%"),
        justifyContent: "center",
        alignItems: "center",
        gap: wp("2.5%"),
        marginTop: 0,
    },
    exploreBtn: {
        width: wp("40%"),
        height: hp("6%"),
        borderRadius: 14,
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("5%"),
        justifyContent: "center",
        alignItems: "center",
        gap: wp("2.5%"),
        marginTop: 0,
    },


    profilePrompt: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF7EE",
        borderRadius: 12,
        padding: wp("3%"),
        marginBottom: hp("1.5%"),
        borderWidth: 1,
        borderColor: "#FFE6D1",
    },

    sectionHeader: { marginBottom: hp("1.2%") },

    footerCard: {
        marginTop: hp("2%"),
        padding: wp("4.5%"),
        borderRadius: 14,
        backgroundColor: Colors.primary,
        alignItems: "center",
    }
});