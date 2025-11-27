import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../theme/Colors";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { RootStackParamList } from "../../navigation/NavigationRoutes";
import AppText from "../../components/AppText";

import Onboarding1 from "../../assets/Onboarding/Onboarding1.svg";
import Onboarding2 from "../../assets/Onboarding/Onboarding2.svg";
import Onboarding3 from "../../assets/Onboarding/Onboarding3.svg";
import NextArrowButton from "../../assets/Onboarding/Arrow.svg";
import strings from "../../localisation/content/en.json";

type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.ONBOARDING
>;

type Slide = {
  key: string;
  Illustration: React.ComponentType<any>;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    key: "meals",
    Illustration: Onboarding1,
    title: strings.onboarding.screen1Title,
    subtitle: strings.onboarding.screen1Subtitle,
  },
  {
    key: "screen1",
    Illustration: Onboarding2,
    title: strings.onboarding.screen2Title,
    subtitle: strings.onboarding.screen2Subtitle,
  },
  {
    key: "screen2",
    Illustration: Onboarding3,
    title: strings.onboarding.screen3Title,
    subtitle: strings.onboarding.screen3Subtitle,
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;
  const { Illustration, title, subtitle } = SLIDES[index];

  const goToLogin = () => {
    navigation.replace(NavigationRoutes.LOGIN);
  };

  const handleNext = () => {
    if (isLast) {
      goToLogin();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Skip */}
      {!isLast && (
        <TouchableOpacity onPress={goToLogin} style={styles.skipButton}>
          <AppText variant="label">{strings.common.skip}</AppText>
        </TouchableOpacity>
      )}

      {/* Main Image */}
      <View style={styles.illustrationWrapper}>
        <Illustration width={245} height={280} />
      </View>

      {/* Three dots */}
      <View style={styles.dotsWrapper}>
        {SLIDES.map((slide, i) => (
          <View
            key={slide.key}
            style={[styles.dot, i === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Text */}
      <View style={styles.textWrapper}>
        <AppText variant="title" align="center">
          {title}
        </AppText>

        <AppText variant="subtitle" align="center">
          {subtitle}
        </AppText>
      </View>

      {/* Bottom CTA: arrow (screens 1–2) or big "Get Started" (screen 3) */}
      {isLast ? (
        <TouchableOpacity
          style={styles.getStartedButton}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <AppText variant="button" align="center" color="#FFFFFF">
            {strings.onboarding.getStarted}
          </AppText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.arrowButton}
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <NextArrowButton width={20} height={20} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /* skip button absolute positioning */
  skipButton: {
    position: "absolute",
    top: 46,
    right: 34,
  },

  /* main illustration */
  illustrationWrapper: {
    position: "absolute",
    top: 91,
    left: 74,
    right: 74,
    height: 280,
    alignItems: "center",
  },

  /* pagination dots */
  dotsWrapper: {
    position: "absolute",
    top: 450,
    left: 174,
    right: 175,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 18,
    backgroundColor: Colors.primary,
  },

  /* text box */
  textWrapper: {
    position: "absolute",
    top: 500,
    left: 41,
    right: 41,
    alignItems: "center",
    gap: 10,
  },

  /* bottom arrow button (orange circle) */
  arrowButton: {
    position: "absolute",
    bottom: 96,
    alignSelf: "center",
    top: 692,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",

    // optional shadow to match Figma
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  /* full-width Get Started button for last screen */
  getStartedButton: {
    position: "absolute",
    bottom: 96,
    left: 24,
    right: 24,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
