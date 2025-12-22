// src/common/cards/mealCard.tsx
import React, { useState } from "react";
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

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const MealCard = ({ item }: { item: any }) => {
  const navigation = useNavigation<HomeNavProp>();
  const [expanded, setExpanded] = useState(false);

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
        <MealIllustration
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      {/* DETAILS */}
      <View
        style={[
          styles.detailsWrapper,
          { marginTop: expanded ? hp("-10%") : hp("-6.5%") },
        ]}
      >
        <AppText numberOfLines={1} style={styles.title}>
          {item.title}
        </AppText>

        <AppText style={styles.subTitle}>{item.subTitle}</AppText>

        {expanded && (
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>Healthy</AppText>
            </View>
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>{item.duration}</AppText>
            </View>
          </View>
        )}

        {/* PRICE + BUTTON */}
        <View style={styles.cardBottom}>
          <View style={styles.priceContainer}>
            <AppText style={styles.strikePrice}>
              ₹{item.originalPrice}/{item.duration}
            </AppText>

            <View style={styles.priceRow}>
              <AppText style={styles.finalPrice}>
                ₹{item.discountedPrice}
              </AppText>
              <AppText style={styles.durationSuffix}>
                /{item.duration}
              </AppText>
              <AppText style={styles.discountBadge}>
                {item.discountPercentage}% OFF
              </AppText>
            </View>

            <AppText style={styles.mealsText}>
              Includes {item.mealsPerDay} Meals/Day
            </AppText>
          </View>

          <Button
            title="Buy Plan"
            onPress={() =>
              navigation.navigate(NavigationRoutes.PROFILE_SETUP1)
            }
            variant="primary"
            style={styles.buyBtn}
            textStyle={styles.buyBtnText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
