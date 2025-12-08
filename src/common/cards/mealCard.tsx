import { useNavigation } from "@react-navigation/native";
import { LayoutAnimation } from "react-native";
import MealIllustration from "../../assets/HomePage/home2.svg";
import AppText from "../../components/AppText";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./mealCardStyle";
import { useState } from "react";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { HomeNavProp, Meal } from "../../types/home/home";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const MealCard = ({ item }: { item: Meal }) => {
  const navigation = useNavigation<HomeNavProp>();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={toggleExpand}
      style={styles.largeMealCard}
    >
      <View style={styles.largeMealImage}>
        <MealIllustration width={wp("92%")} height={hp("37%")} />
      </View>

      <View style={[
        styles.largeMealDetails,
        {
          height: expanded ? hp("25%") : hp("16%"),
          top: expanded ? hp("11.5%") : hp("21.5%"),
          gap: expanded ? hp("2.5%") : 0
        }
      ]}>
        <View>
          <AppText variant="title" numberOfLines={1} style={{ fontSize: 18 }}>
            {item.title}
          </AppText>
          <AppText variant="subtitle" style={{ marginTop: 4, color: "#666", fontSize: 14 }}>
            High-protein, low-carb meal
          </AppText>

          {expanded && (
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <AppText variant="labels" style={styles.badgeText}>High Proteins</AppText>
              </View>
              <View style={styles.badge}>
                <AppText variant="labels" style={styles.badgeText}>Low Carbs</AppText>
              </View>
              <View style={styles.badge}>
                <AppText variant="labels" style={styles.badgeText}>2 Meals/day</AppText>
              </View>
            </View>
          )}
        </View>

        <View style={styles.cardBottom}>
          <View>
            <AppText variant="labels" style={{ textDecorationLine: "line-through", color: "#999", fontSize: 12 }}>
              ₹1799/Week
            </AppText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText variant="title" style={{ fontSize: 18 }}>
                {item.pricePerWeek}
              </AppText>
              <AppText variant="labels" style={{ color: "#FF5722", marginLeft: 8, fontWeight: "bold" }}>
                20% OFF
              </AppText>
            </View>
            <AppText variant="caption" style={{ marginTop: 2, color: "#999" }}>
              {item.subtitle}
            </AppText>
          </View>

          <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85} onPress={() => navigation.navigate(NavigationRoutes.PROFILE_SETUP1)}>
            <AppText variant="button" color="#fff">
              Buy Plan
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};