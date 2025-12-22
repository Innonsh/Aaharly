
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  UIManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BlurView } from "@sbaiahmed1/react-native-blur";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { fonts } from "../../theme/Fonts";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBannerSVG from "../../assets/HomePage/home3.svg";
import CtaIllustration from "../../assets/HomePage/home1.svg";
import ProfileIcon from "../../assets/HomePage/profileicon.svg";
import ExploreIcon from "../../assets/HomePage/exploreicon.svg";
import SearchIcon from "../../assets/HomePage/Searchicon.svg";
import LocationIcon from "../../assets/HomePage/LocationIcon.svg";
import { styles } from "./homeStyle";
import { HomeNavProp } from "../../types/home/home";
import { MealCard } from "../../common/cards/mealCard";

import { useQuery } from "@tanstack/react-query";
import { MealService } from "../../services/MealServices";

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  
  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);

  useEffect(() => {
    setProfileExists(false);
    setProfileComplete(false);
  }, []);

  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meal-plans"],
    queryFn: MealService.getAllMealPlans,
    select: (data) => data.filter((m) => m.isActive),
  });

  const handleSetupProfile = () =>
    navigation.navigate(NavigationRoutes.PROFILE_SETUP1);

  const handleExplorePlans = () =>
    navigation.navigate(NavigationRoutes.EXPLORE_PLANS);

  const ListHeader = useMemo(() => {
    return (
      <View>
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerInner}>
            <HomeBannerSVG width={wp("100%")} height={hp("48%")} />
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#000000" stopOpacity="0.5" />
                  <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#grad)" />
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
              <BlurView blurAmount={16} blurType="light" style={StyleSheet.absoluteFill} />
              <View style={styles.searchContent}>
                <SearchIcon width={20} height={20} color="#FFF" />
                <AppText variant="body" style={{ color: "#fff", marginLeft: 10 }}>
                  Search for Meal
                </AppText>
              </View>
            </View>

            <View style={styles.promoBox}>
              <BlurView blurAmount={6} blurType="light" style={StyleSheet.absoluteFill} />
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
          <View style={[StyleSheet.absoluteFill, { borderRadius: 18, overflow: "hidden" }]}>
            <CtaIllustration
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style={styles.ctaBackground}
            />
            <BlurView blurAmount={0.4} blurType="light" style={StyleSheet.absoluteFill} />
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
    if (Platform.OS === "android") {
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

      <Button
        title="Get Started Now"
        onPress={handleSetupProfile}
        variant="primary"
        style={{ marginTop: 16, width: "100%" }}
      />
    </View>
  );

 
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={meals}
        keyExtractor={(it) => it.id || it._id}
        renderItem={({ item }) => <MealCard item={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </SafeAreaView>
  );
}
