import React from "react";
import { View, StyleSheet } from "react-native";
import {Shimmer} from "react-native-fast-shimmer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MealCardShimmer = () => {
  return (
    <View style={styles.container}>
      {/* Image shimmer */}
      <Shimmer style={styles.image} />

      {/* Content shimmer */}
      <View style={styles.content}>
        <Shimmer style={styles.title} />
        <Shimmer style={styles.subtitle} />

        <View style={styles.bottomRow}>
          <View style={{ flex: 1 }}>
            <Shimmer style={styles.priceSmall} />
            <Shimmer style={styles.priceLarge} />
            <Shimmer style={styles.priceSmall} />
          </View>

          <Shimmer style={styles.button} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("92%"),
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: hp("25%"),
    borderRadius: 0,
  },

  content: {
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },

  title: {
    width: "70%",
    height: 18,
    borderRadius: 6,
  },

  subtitle: {
    width: "50%",
    height: 14,
    borderRadius: 6,
    marginTop: 8,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  priceSmall: {
    width: "40%",
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },

  priceLarge: {
    width: "60%",
    height: 20,
    borderRadius: 6,
    marginBottom: 6,
  },

  button: {
    width: wp("34%"),
    height: hp("6%"),
    borderRadius: 16,
  },
});
