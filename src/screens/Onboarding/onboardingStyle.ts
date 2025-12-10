import { StyleSheet, Dimensions } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    slide: {
        width: SCREEN_WIDTH,
        flex: 1,
    },

    skipButton: {
        position: "absolute",
        top: hp("5.5%"),
        right: wp("8.5%"),
        width: wp("12%"),
        height: hp("3%"),
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },

    skipLabel: {
        fontSize: 20,
        fontWeight: "400",
        letterSpacing: 0.8,
        lineHeight: 20,
        color: "#A9A9A9",
        textAlign: "center",
    },

    illustrationWrapper: {
        position: "absolute",
        top: hp("12%"),
        width: "100%",
        alignItems: "center",
    },

    dotsWrapper: {
        position: "absolute",
        top: hp("54%"),
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    dot: {
        height: 8,
        borderRadius: 100,
        backgroundColor: "#D9D9D9",
        marginHorizontal: 2,
    },

    textWrapper: {
        position: "absolute",
        top: hp("59%"),
        left: wp("10.5%"),
        right: wp("10.5%"),
        alignItems: "center",
        gap: 10,
    },

    arrowButton: {
        position: "absolute",
        bottom: hp("11.5%"),
        alignSelf: "center",
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },

    getStartedButton: {
        position: "absolute",
        bottom: hp("11.5%"),
        left: wp("6.5%"),
        right: wp("6.5%"),
        height: 56,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
});
