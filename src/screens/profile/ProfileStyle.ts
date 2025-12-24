import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        height: hp("11%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("6%"),
        backgroundColor: "#F9FAFB",
    },
    backButton: {
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
    headerTitle: {
        color: "#000000",
        flex: 1,
        textAlign: "center",
    },
    scrollContent: {
        paddingBottom: hp("2%"),
    },
    profileCard: {
        backgroundColor: "#FFFFFF",

        width: wp("89.82%"),
        height: hp("26.17%"),
        alignSelf: "center",
        marginTop: hp("4.56%"),
        borderRadius: 20,
        paddingTop: hp("2.82%"),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },


    avatarContainer: {
        width: wp("16.29%"),       // 64px
        height: wp("16.29%"),
        borderRadius: 32,

        backgroundColor: "#FFF3EB",
        justifyContent: "center",
        alignItems: "center",

        marginBottom: hp("1.88%"), // 16px
    },

    avatarText: {
        fontSize: 24,
        fontWeight: "600",
        color: Colors.primary,
    },

    userName: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: hp("0.47%"), // 4px
    },

    userEmail: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: hp("2.11%"),
    },
    userPhone: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: hp("2.11%"),
    },
    editBtn: {
        width: wp("31.04%"),
        height: hp("4.23%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("3.56%"),
        gap: hp("1.17%"),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    editBtnText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
    },
    menuSection: {
        width: wp("89.82%"),
        alignSelf: "center",
        marginTop: hp("3%"),
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        height: hp("6.5%"),
        paddingHorizontal: wp("4%"),
    },
    iconContainer: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: wp("4%"),
        color: "#374151",
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    logoutBtn: {
        width: wp("60%"),
        height: hp("6.1%"),
        alignSelf: "center",
        marginTop: hp("4%"),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoutText: {
        color: "#EF4444",
        fontWeight: "600",
    },
});
