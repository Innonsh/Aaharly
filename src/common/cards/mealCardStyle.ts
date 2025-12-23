import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fonts } from "../../theme/Fonts";

export const styles = StyleSheet.create({
  cardOuterContainer: {
    width: wp("92%"),
    alignSelf: "center",
    // marginBottom: hp("3%"),
    backgroundColor: "#FFF",
    borderRadius:24,
    // THE OUTER BORDER seen in your screenshot
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden", // Ensures image follows card radius
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

  },

  imageWrapper: {
    width: "100%",
    height: hp("25%"), 
    backgroundColor: "#F0F0F0",
  },

  detailsWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2.5%"),
    paddingBottom: hp("2.2%"),
    width: "100%",
    
  },

  title: {
    fontFamily: fonts.Bold,
    fontSize: wp("5%"),
    color: "#1A1A1A",
    letterSpacing: 0.1,
  },

  subTitle: {
    fontFamily: fonts.Regular,
    color: "#777",
    fontSize: wp("3.6%"),
    marginTop: 2,
    marginBottom:0
  },

 badgesContainer: {
  flexDirection: "row",
  gap: wp("2.6%"),
  marginTop: hp("1%"),
},

badge: {
  width: wp("19.5%"),
  height: hp("3.6%"),
  borderRadius: 999,
  backgroundColor: "#F7F7F7",
  borderWidth: 1,
  borderColor: "#EDEDED",
  alignItems: "center",
  justifyContent: "center",
},



  badgeText: {
    fontFamily: fonts.Medium,
    fontSize: wp("2.8%"),
    color: "#666",
  },

 cardBottom: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginTop: 10, // ✅ IMPORTANT
  // marginBottom:12
},


  priceContainer: { 
    flex: 1,
  },

  strikePrice: {
    fontFamily: fonts.Regular,
    fontSize: wp("3%"),
    color: "#BCBCBC",
    textDecorationLine: "line-through",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: -2,
  },

  finalPrice: {
    fontFamily: fonts.Bold,
    fontSize: wp("6%"),
    color: "#000",
  },

  durationSuffix: {
    fontFamily: fonts.Medium,
    fontSize: wp("3.5%"),
    color: "#444",
  },

  discountBadge: {
    fontFamily: fonts.Bold,
    fontSize: wp("3.2%"),
    color: "#FF6D3F", 
    marginLeft: 8,
  },

  mealsText: {
    fontFamily: fonts.Regular,
    fontSize: wp("3.2%"),
    color: "#BCBCBC",
    // marginTop: 2,
  },

  buyBtn: {
    backgroundColor: "#FF6D3F",
    width: wp("32%"),
    height: hp("5.4%"),
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtnText: {
    fontFamily: fonts.Bold,
    fontSize: wp("5.5%"),
    color: "#FFF",
  },
});