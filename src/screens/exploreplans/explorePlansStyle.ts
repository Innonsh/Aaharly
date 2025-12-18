import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";
import { fonts } from "../../theme/Fonts";

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: wp('100%'), // 393px
        height: hp('5.2%'), // 44px
        marginTop: hp('6.6%'), // 56px
        paddingHorizontal: wp('6.1%'), // 24px
        gap: wp('18%'), // 71px
    },
    backButton: {
    },
    headerTitle: {
        fontSize: wp('4.6%'), // 18px
        fontFamily: fonts.SemiBold,
    },
    filterContainer: {
        marginTop: hp('2.5%'), // 21px (from 121 - 100)
        marginLeft: wp('4%'), // 16px
        height: hp('4.5%'), // 38px
        width: wp('91.8%'), // 361px
    },
    filterContent: {
        gap: wp('2%'), // 8px
        alignItems: 'center',
    },
    filterButton: {
        // width: Hug (75px) -> minWidth handled by padding or set minWidth
        height: hp('4.5%'), // 38px
        borderRadius: wp('4%'), // 16px
        paddingVertical: hp('1.4%'), // 12px top/bottom
        paddingHorizontal: wp('4.6%'), // 18px left/right
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "transparent",
    },
    filterButtonActive: {
        backgroundColor: "#FF5722",
        borderColor: "#FF5722",
    },
    filterText: {
        fontSize: wp('3%'), // 12px
        color: "#666",
        fontFamily: fonts.Regular,
    },
    filterTextActive: {
        color: "#FFF",
        fontFamily: fonts.SemiBold,
    },
    mealListContainer: {
        marginTop: hp('2.1%'), // 18px (from 177 - 159)
        marginLeft: wp('4.1%'), // 16px
        width: wp('91.9%'), // 361px
        flex: 1, // To allow scrolling
    },
    listContent: {
        paddingTop: 0, // removed extra padding as we handled margin
        paddingBottom: hp('4%'),
    },

    largeMealCard: {
        backgroundColor: "transparent",
        borderRadius: wp('5.1%'), // 20px
        padding: 0,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: "center",
        width: wp('91.9%'), // 361px
        height: hp('40.2%'), // 317px
        alignSelf: "center",
        position: "relative",
    },
    largeMealImage: {
        width: wp('91.9%'),
        height: hp('40.2%'),
        borderRadius: wp('5.1%'), // 20px
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
    },
    largeMealDetails: {
        position: "absolute",
        bottom: 0,
        width: wp('91.9%'), // 361px
        backgroundColor: "#FFF",
        borderRadius: wp('4.6%'), // 18px
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: wp('4.1%'), // 16px
        justifyContent: "space-between",
    },
    cardBottom: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    buyBtn: {
        backgroundColor: "#FF5722",
        paddingHorizontal: wp('5.1%'), // 20px
        paddingVertical: hp('1.2%'), // 10px
        borderRadius: 25,
    },
    badgesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: wp('2%'), // 8px
        marginTop: hp('1.4%'), // 12px
    },
    badge: {
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp('3%'), // 12px
        paddingVertical: hp('0.7%'), // 6px
        borderRadius: 100,
    },
    badgeText: {
        fontSize: wp('3%'), // 12px
        color: "#333",
        fontWeight: "500",
    },
});
