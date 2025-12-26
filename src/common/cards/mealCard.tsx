import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MealIllustration from "../../assets/HomePage/home2.svg";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { styles } from "./mealCardStyle";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { HomeNavProp } from "../../types/home/home";
import { fonts } from "../../theme/Fonts";
import { LocalizationContext } from "../../contexts/LocalizationContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  item: any;
};

export const MealCard = ({ item }: Props) => {
  const navigation = useNavigation<HomeNavProp>();
  const [expanded, setExpanded] = useState(false);

  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((p) => !p);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={toggleExpand}
      style={styles.cardOuterContainer}
    >
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <MealIllustration width="100%" height="100%" />
      </View>

      {/* DETAILS */}
      <View
        style={[
          styles.detailsWrapper,
          { marginTop: expanded ? hp("-10%") : hp("-6.5%") },
        ]}
      >
        <AppText variant="title" numberOfLines={1}>
          {item.title}
        </AppText>

        <AppText variant="subtitle" style={{ marginTop: 2 }}>
          {item.subTitle}
        </AppText>

        {/* BADGES */}
        {expanded && (
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <AppText variant="chip">
                {strings.home.healthy}
              </AppText>
            </View>

            <View style={styles.badge}>
              <AppText variant="chip">
                {item.duration}
              </AppText>
            </View>
          </View>
        )}

        {/* PRICE + CTA */}
        <View style={styles.cardBottom}>
          <View style={styles.priceContainer}>
            <AppText variant="caption" style={styles.strikePrice}>
              {strings.common.currencySymbol}
              {item.originalPrice}/{item.duration}
            </AppText>

            <View style={styles.priceRow}>
              <AppText variant="title">
                {strings.common.currencySymbol}
                {item.discountedPrice}
              </AppText>

              <AppText variant="title" style={{ marginLeft: 4 }}>
                /{item.duration}
              </AppText>

              <AppText variant="labels" style={styles.discountBadge}>
                {item.discountPercentage}
                {strings.common.percentOff}
              </AppText>
            </View>

            <AppText variant="caption" style={styles.mealsText}>
              {strings.home.includes} {item.mealsPerDay}{" "}
              {strings.home.mealsPerDay}
            </AppText>
          </View>

          <Button
            title={strings.home.buyPlan}
            onPress={() =>
              navigation.navigate(NavigationRoutes.PROFILE_SETUP1, {})
            }
            variant="primary"
            style={styles.buyBtn}
            textStyle={{
              fontFamily: fonts.SemiBold,

              fontSize: wp("3.8%"),
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
