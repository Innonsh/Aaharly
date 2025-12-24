import React, { useEffect, useMemo, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  UIManager,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BlurView } from "@sbaiahmed1/react-native-blur";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { fonts } from "../../theme/Fonts";
import { Colors } from "../../theme/Colors";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { styles } from "./homeStyle";
import { HomeNavProp } from "../../types/home/home";
import { MealCard } from "../../common/cards/mealCard";

import HomeBannerSVG from "../../assets/HomePage/home3.svg";
import CtaIllustration from "../../assets/HomePage/home1.svg";
import ProfileIcon from "../../assets/HomePage/profileicon.svg";
import ExploreIcon from "../../assets/HomePage/exploreicon.svg";
import SearchIcon from "../../assets/HomePage/Searchicon.svg";
import LocationIcon from "../../assets/HomePage/LocationIcon.svg";

import { useQuery } from "@tanstack/react-query";
import { MealService } from "../../services/MealServices";
import { useProfile, useProfileAnalysis } from "../../hooks/useAccount";

import { LocalizationContext } from "../../contexts/LocalizationContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  const { translations } = useContext(LocalizationContext);
  const { user: authUser } = useContext(AuthContext);
  const strings = translations as any;

  const { data: profileResponse } = useProfile();
  const { data: analysisData } = useProfileAnalysis();
  const userData = profileResponse?.data || {};
  const name = userData.basic?.name || "";
  const initial = name ? name.charAt(0).toUpperCase() : "";

  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meal-plans"],
    queryFn: MealService.getAllMealPlans,
  });

  const handleSetupProfile = () =>
    navigation.navigate(NavigationRoutes.PROFILE_SETUP1, {});

  const handleExplorePlans = () =>
    navigation.navigate(NavigationRoutes.EXPLORE_PLANS);

  const handleProfile = () =>
    navigation.navigate(NavigationRoutes.PROFILE, {});

  const ListHeader = useMemo(() => {
    return (
      <View>
        {/* Banner */}
        <View style={styles.bannerWrapper}>
          <View style={styles.bannerInner}>
            <HomeBannerSVG width={wp("100%")} height={hp("48%")} />
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#000" stopOpacity="0.5" />
                  <Stop offset="1" stopColor="#000" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>
          </View>

          <View style={styles.centerContainer}>

            <View style={styles.topHeader}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <LocationIcon width={23} height={23} color="#FFF" />
                  <AppText
                    variant="title"
                    style={{ color: "#fff", fontSize: 18, marginLeft: 6 }}
                  >
                    {strings.home.locationName}
                  </AppText>
                </View>

                <AppText variant="labels" style={{ color: "#fff", marginTop: 4 }}>
                  {strings.home.locationAddress}
                </AppText>
              </View>

              <TouchableOpacity
                onPress={handleProfile}
                style={initial ? styles.profileAvatarContainer : styles.profileIconContainer}
                activeOpacity={0.7}
              >
                {initial ? (
                  <AppText style={styles.avatarText}>{initial}</AppText>
                ) : (
                  <ProfileIcon width={24} height={24} color="#FF5722" />
                )}
              </TouchableOpacity>
            </View>


            <View style={styles.searchBox}>
              <BlurView blurAmount={16} blurType="light" style={StyleSheet.absoluteFill} />
              <View style={styles.searchContent}>
                <SearchIcon width={20} height={20} color="#FFF" />
                <AppText variant="body" style={{ color: "#fff", marginLeft: 10 }}>
                  {strings.home.searchPlaceholder}
                </AppText>
              </View>
            </View>


            <View style={styles.promoBox}>
              <BlurView blurAmount={6} blurType="light" style={StyleSheet.absoluteFill} />
              <View style={styles.promoContent}>
                <AppText
                  variant="title"
                  color="#fff"
                  style={{ textAlign: "center", fontSize: 24 }}
                >
                  {strings.home.promoTitle}
                </AppText>
                <AppText
                  variant="subtitle"
                  color="#fff"
                  style={{ textAlign: "center" }}
                >
                  {strings.home.promoSubtitle}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ctaCard}>
          <View style={[StyleSheet.absoluteFill, { borderRadius: 18, overflow: "hidden" }]}>
            <CtaIllustration width="100%" height="100%" />
            <BlurView blurAmount={0.4} blurType="light" style={StyleSheet.absoluteFill} />
          </View>

          <View style={styles.ctaContent}>
            <AppText variant="title" style={styles.ctaTitle}>
              {strings.home.ctaTitle}
            </AppText>

            <View style={styles.ctaButtonsRow}>
              <Button
                title={strings.home.setupProfile}
                onPress={handleSetupProfile}
                variant="primary"
                icon={<ProfileIcon width={20} height={20} color="#FFF" />}
                style={styles.setupBtn}
                textStyle={{ fontFamily: fonts.SemiBold, fontSize: wp("3.8%") }}
              />

              <Button
                title={strings.home.explorePlans}
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
          <AppText variant="title">
            {strings.home.popularTitle}
          </AppText>
          <AppText variant="caption">
            {strings.home.popularSubtitle}
          </AppText>
        </View>
      </View>
    );
  }, [strings]);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);

  const ListFooter = (
    <View style={styles.footerCard}>
      <AppText variant="title" color="#fff" style={{ textAlign: "center" }}>
        {strings.home.footerTitle}
      </AppText>

      <AppText
        variant="subtitle"
        color="#fff"
        style={{ marginTop: 8, textAlign: "center" }}
      >
        {strings.home.footerSubtitle}
      </AppText>

      <Button
        title={strings.home.footerButton}
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
