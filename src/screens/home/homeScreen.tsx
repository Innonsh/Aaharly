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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BlurView } from "@react-native-community/blur";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import { fonts } from "../../theme/Fonts";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";

import HomeBannerSVG from "../../assets/HomePage/home3.svg";
import CtaIllustration from "../../assets/HomePage/home1.svg";
import MealIllustration from "../../assets/HomePage/home2.svg";
import ProfileIcon from "../../assets/HomePage/profileicon.svg";
import ExploreIcon from "../../assets/HomePage/exploreicon.svg";
import SearchIcon from "../../assets/HomePage/Searchicon.svg";
import LocationIcon from "../../assets/HomePage/LocationIcon.svg";



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

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);


  useEffect(() => {
  
    setProfileExists(false);
    setProfileComplete(false);
  }, []);

  const handleSetupProfile = () => navigation.navigate(NavigationRoutes.PROFILE_SETUP1);
  const handleExplorePlans = () => navigation.navigate(NavigationRoutes.EXPLORE_PLANS);
  const ListHeader = useMemo(() => {
    return (
      <View>
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerInner}>
            {}
            <HomeBannerSVG
              width={wp("100%")}
              height={hp("48%")}
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

          <View style={styles.centerContainer}>
          
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

    
        <View style={styles.ctaCard}>
    
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
                textStyle={{ fontFamily: fonts.SemiBold, fontSize: wp("3.8%") }}
              />
              <Button
                title="Explore Plans"
                onPress={handleExplorePlans}
                variant="secondary"
                icon={<ExploreIcon width={20} height={20} color="#FF5722" />}
                style={styles.exploreBtn}
                textStyle={{ fontFamily: fonts.SemiBold, fontSize: wp("3.8%") }}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <AppText variant="title">Popular Meal Plans</AppText>
          <AppText variant="caption">Meals crafted for you</AppText>
        </View>
      </View>
    );
  }, [profileExists, profileComplete]);

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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  listContent: {
    padding: wp("4%"),
    paddingBottom: hp("4%"),
  },

  bannerWrapper: {
    width: wp("100%"),
    height: hp("48%"),
    marginLeft: wp("-4%"),
    marginTop: wp("-4%"),
    marginBottom: hp("1.5%"),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bannerInner: {
    width: wp("100%"),
    height: hp("48%"),
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  topHeader: {
    marginBottom: 0,
  },
  centerContainer: {
    position: "absolute",
    top: hp("7%"),
    left: wp("4%"),
    width: wp("92%"),
    gap: hp("1%"),
    flexDirection: "column",
  },
  searchBox: {
    width: wp("92%"),
    height: hp("6%"),
    borderRadius: 14,
    overflow: "hidden", 
    position: "relative",
    marginTop: 0, 
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("3%"),
    height: "100%",
  },
  promoBox: {
    width: wp("60%"), 
    height: hp("11%"),
    borderRadius: 18,
    overflow: "hidden", 
    alignSelf: "center",
    position: "relative",
    marginTop: 0, 
  },
  promoContent: {
    paddingTop: hp("3%"),
    paddingRight: wp("5%"),
    paddingBottom: hp("2%"),
    paddingLeft: wp("5%"),
    gap: hp("1.2%"),
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  ctaCard: {
    marginTop: hp("2%"),
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#EEE",
    position: "relative",
    overflow: "hidden",
    marginBottom: hp("1.5%"),
    height: hp("22%"), 
  },
  ctaBackground: {
    width: wp("92%"),
    height: hp("22%"),
  },
  ctaContent: {
    flex: 1,
    padding: wp("6%"), 
    justifyContent: "space-between", 
    alignItems: "center", 
  },
  ctaTitle: {
    color: "#FFFFFF",
    marginTop: 1,
    fontSize: wp("6%"),
    fontFamily: fonts.SemiBold,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  ctaButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"), 
  },
  setupBtn: {
    width: wp("40%"),
    height: hp("6%"),
    borderRadius: 14,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    gap: wp("2.5%"), 
    marginTop: 0,
  },
  exploreBtn: {
    width: wp("40%"),
    height: hp("6%"),
    borderRadius: 14,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    gap: wp("2.5%"), 
    marginTop: 0,
  },


  profilePrompt: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7EE",
    borderRadius: 12,
    padding: wp("3%"),
    marginBottom: hp("1.5%"),
    borderWidth: 1,
    borderColor: "#FFE6D1",
  },

  sectionHeader: { marginBottom: hp("1.2%") },

  largeMealCard: {
    backgroundColor: "transparent", 
    borderRadius: 20,
    padding: 0, 
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
    width: wp("92%"),
    height: hp("37%"),
    alignSelf: "center",
    position: "relative",   
  },
  largeMealImage: {
    width: wp("92%"),
    height: hp("37%"), 
    borderRadius: 20,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  largeMealDetails: {
    position: "absolute",
    top: hp("21.5%"),
    width: wp("92%"),
    height: hp("16%"),
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: wp("4%"),

  },
  cardBottom: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buyBtn: {
    backgroundColor: "#FF5722",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("1.2%"),
    borderRadius: 25, 
  },

  footerCard: {
    marginTop: hp("2%"),
    padding: wp("4.5%"),
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp("2%"),
    marginTop: hp("1.5%"),
  },
  badge: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.7%"),
    borderRadius: 100,
  },
  badgeText: {
    fontSize: wp("3%"),
    color: "#333",
    fontWeight: "500",
  },
});
