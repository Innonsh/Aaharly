import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../theme/Colors";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },

  backBtn: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
  },

  /* CATEGORY CONTAINER */
  categoryContainer: {
    flexDirection: "row",
    gap: wp("2%"),
    paddingHorizontal: wp("4%"),
    marginTop: hp("2%"),
  },

  categoryBox: {
    width: wp("22%"),
    height: hp("4.8%"),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },

  categoryBoxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  categoryText: {
    color: "#6B7280",
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  listContent: {
    paddingTop: hp("2%"),
    paddingBottom: hp("3%"),
  },
});
