// src/screens/home/HomeScreen.tsx
import React, { useEffect, useCallback, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BlurView } from "@react-native-community/blur";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";

import HomeBannerSVG from "../../assets/HomePage/home3.svg";
import CtaIllustration from "../../assets/HomePage/home1.svg";
import MealIllustration from "../../assets/HomePage/home2.svg";
import ProfileIcon from "../../assets/HomePage/profileicon.svg";
import ExploreIcon from "../../assets/HomePage/exploreicon.svg";
import SearchIcon from "../../assets/HomePage/Searchicon.svg";
import LocationIcon from "../../assets/HomePage/LocationIcon.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Meal = {
  id: string;
  title: string;
  pricePerWeek: string;
  subtitle?: string;
  image?: any;
};

const DUMMY_MEALS: Meal[] = [
  {
    id: "1",
    title: "Weekly Fat Loss Plan",
    pricePerWeek: "₹1439/Week",
    subtitle: "Includes 2 meals/day",
    image: null,
  },
  {
    id: "2",
    title: "Weekly Balanced Plan",
    pricePerWeek: "₹1499/Week",
    subtitle: "Includes 3 meals/day",
    image: null,
  },
  {
    id: "3",
    title: "Weekly Muscle Gain Plan",
    pricePerWeek: "₹1559/Week",
    subtitle: "Includes 4 meals/day",
    image: null,
  },
  {
    id: "4",
    title: "Weekly Keto Plan",
    pricePerWeek: "₹1619/Week",
    subtitle: "Includes 2 meals/day",
    image: null,
  },
  {
    id: "5",
    title: "Weekly Vegan Plan",
    pricePerWeek: "₹1679/Week",
    subtitle: "Includes 3 meals/day",
    image: null,
  },
  {
    id: "6",
    title: "Weekly Paleo Plan",
    pricePerWeek: "₹1739/Week",
    subtitle: "Includes 3 meals/day",
    image: null,
  },
  {
    id: "7",
    title: "Weekly Detox Plan",
    pricePerWeek: "₹1799/Week",
    subtitle: "Includes 2 meals/day",
    image: null,
  },
];

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, NavigationRoutes.HOME>;

const MealCard = ({ item }: { item: Meal }) => {
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
        <MealIllustration width={359} height={216} />
      </View>

      <View style={[
        styles.largeMealDetails,
        {
          height: expanded ? 210 : 135, // Increased height to fit content
          top: expanded ? 97 : 182,     // Adjusted top to expand upwards (182 - (220-135))
          gap: expanded ? 20 : 0
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

          <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85} onPress={() => Alert.alert("Buy Plan", "Purchase flow")}>
            <AppText variant="button" color="#fff">
              Buy Plan
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);

  const checkProfile = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("userProfile");
      if (!json) {
        setProfileExists(false);
        setProfileComplete(false);
        return;
      }
      const profile = JSON.parse(json);
      setProfileExists(true);
      setProfileComplete(Boolean(profile?.setupComplete));
    } catch (err) {
      console.warn("Error reading profile:", err);
      setProfileExists(false);
      setProfileComplete(false);
    }
  }, []);

  useEffect(() => {
    checkProfile();
  }, [checkProfile]);

  const handleSetupProfile = () => navigation.navigate(NavigationRoutes.PROFILE_SETUP1);
  const handleExplorePlans = () => Alert.alert("Explore Plans", "Wire to plans screen");

  // Header component for FlatList (banner + CTA + prompt + section header)
  const ListHeader = useMemo(() => {
    return (
      <View>
        {/* Banner wrapper - fixed height and position:relative */}
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerInner}>
            {/* put SVG to fill the wrapper area. Using explicit width/height so it measures properly */}
            <HomeBannerSVG
              width={SCREEN_WIDTH}
              height={405}
            />
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#000000" stopOpacity="0.5" />
                  <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>
          </View>

          {/* Center Screen Container - Absolute (Highlighted Box) */}
          <View style={styles.centerContainer}>
            {/* Header Section */}
            <View style={styles.topHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AppText variant="labels" style={{ color: "#fff", fontSize: 16, marginRight: 8 }}>
                  <LocationIcon width={23} height={23} color="#FFF" />
                </AppText>

                <AppText variant="title" style={{ color: "#fff", fontSize: 18 }}>
                  Baner
                </AppText>
              </View>
              <AppText variant="labels" style={{ color: "#fff", marginTop: 4 }}>
                Nandan Spectra, Pune, 411045
              </AppText>
            </View>

            {/* Search Box */}
            <View style={styles.searchBox}>
              <BlurView
                blurAmount={16}
                blurType="light"
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.searchContent}>
                <SearchIcon width={20} height={20} color="#FFF" />
                <AppText variant="body" style={{ color: "#fff", marginLeft: 10 }}>Search for Meal</AppText>
              </View>
            </View>

            {/* Promo Box */}
            <View style={styles.promoBox}>
              <BlurView
                blurAmount={6}
                blurType="light"
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.promoContent}>
                <AppText variant="title" color="#fff" style={{ textAlign: "center", fontSize: 24 }}>
                  Flat 20% OFF
                </AppText>
                <AppText variant="subtitle" color="#fff" style={{ textAlign: "center" }}>
                  on your first plan!
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* CTA card */}
        <View style={styles.ctaCard}>
          {/* Background illustration fills the card */}
          <View style={StyleSheet.absoluteFill}>
            <CtaIllustration
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style={styles.ctaBackground}
            />
            <BlurView
              blurAmount={0.4}
              blurType="light"
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Foreground content on top of the blurred background */}
          <View style={styles.ctaContent}>
            <AppText variant="title" style={styles.ctaTitle}>
              Eat Clean, Transform Faster
            </AppText>

            <View style={styles.ctaButtonsRow}>
              <Button
                title="Set Up Profile"
                onPress={handleSetupProfile}
                variant="primary"
                icon={<ProfileIcon width={20} height={20} color="#FFF" />}
                style={styles.setupBtn}
              />
              <Button
                title="Explore Plans"
                onPress={handleExplorePlans}
                variant="secondary"
                icon={<ExploreIcon width={20} height={20} color="#FF5722" />}
                style={styles.exploreBtn}
              />
            </View>
          </View>
        </View>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <AppText variant="title">Popular Meal Plans</AppText>
          <AppText variant="caption">Meals crafted for you</AppText>
        </View>
      </View>
    );
  }, [profileExists, profileComplete]);

  // Enable LayoutAnimation for Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const ListFooter = (
    <View style={styles.footerCard}>
      <AppText variant="title" color="#fff" style={{ textAlign: "center" }}>
        Ready to Transform Your Diet?
      </AppText>
      <AppText variant="subtitle" color="#fff" style={{ marginTop: 8, textAlign: "center" }}>
        Join thousands who've improved their fitness with personalized nutrition.
      </AppText>

      <Button title="Get Started Now" onPress={handleSetupProfile} variant="primary" style={{ marginTop: 16, width: "100%" }} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={DUMMY_MEALS}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <MealCard item={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      // remove nested scroll issues — FlatList handles the scrolling
      />
    </SafeAreaView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  listContent: {
    padding: 16,
    paddingBottom: 32,
  },

  /* Banner wrapper: fixed height + relative positioning */
  bannerWrapper: {
    width: SCREEN_WIDTH,
    height: 405,
    marginLeft: -16,
    marginTop: -16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bannerInner: {
    width: SCREEN_WIDTH,
    height: 405,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  topHeader: {
    // Removed absolute positioning to let it flow in the container
    marginBottom: 0,
  },
  centerContainer: {
    position: "absolute",
    top: 58,
    left: 16,
    width: 362,
    // height: 202, // Hug height (auto)
    gap: 8,
    flexDirection: "column",
  },
  searchBox: {
    width: 362,
    height: 50,
    borderRadius: 14,
    overflow: "hidden", // For BlurView
    position: "relative",
    marginTop: 0, // Reset margin
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    height: "100%",
  },
  promoBox: {
    width: 223,
    height: 90,
    borderRadius: 18,
    overflow: "hidden", // For BlurView
    alignSelf: "center",
    position: "relative",
    marginTop: 0, // Reset margin
  },
  promoContent: {
    paddingTop: 25,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  /* CTA card */
  ctaCard: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EEE",
    position: "relative",
    overflow: "hidden",
    marginBottom: 14,
    height: 180, // Fixed height for the card
  },
  // background SVG
  ctaBackground: {
    width: 361,
    height: 180,
  },
  // foreground content
  ctaContent: {
    flex: 1,
    padding: 25, // Reduced padding to fit the fixed-width buttons
    justifyContent: "space-between", // Push text to top, buttons to bottom
    alignItems: "center", // Center content horizontally
  },
  ctaTitle: {
    color: "#FFFFFF",
    marginTop: 1,
    fontSize: 23,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  ctaButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Gap between buttons
  },
  setupBtn: {
    width: 164,
    height: 48,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 21,
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Gap between icon and text
    marginTop: 0,
  },
  exploreBtn: {
    width: 164,
    height: 48,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 21,
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Gap between icon and text
    marginTop: 0,
  },


  /* Profile prompt */
  profilePrompt: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7EE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FFE6D1",
  },

  /* Section header */
  sectionHeader: { marginBottom: 10 },

  /* Meal card */
  largeMealCard: {
    backgroundColor: "transparent", // Image provides background
    borderRadius: 20,
    padding: 0, // Remove padding to allow full-size image/overlay
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
    width: 350,
    height: 315,
    alignSelf: "center",
    position: "relative", // For absolute positioning of children
  },
  largeMealImage: {
    width: 361,
    height: 317, // Full height image
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  largeMealDetails: {
    position: "absolute",
    top: 182,
    width: 361,
    height: 135,
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 16,

  },
  cardBottom: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buyBtn: {
    backgroundColor: "#FF5722",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25, // More rounded as per image
  },

  /* Footer CTA */
  footerCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  badge: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});
