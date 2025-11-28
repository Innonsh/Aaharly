import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Colors } from "../../theme/Colors";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
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

  const goToProfile = () => {
    navigation.replace(NavigationRoutes.PROFILE_STEP1);
  };

  const goToIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= SLIDES.length) return;
    setIndex(newIndex);
  };

  const handleNext = () => {
    if (isLast) {
      goToProfile();
    } else {
      goToIndex(index + 1);
    }
  };

  // 🔥 Animation setup
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // reset then animate in whenever `index` changes
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [index, anim]);

  const animatedSlideStyle = {
    opacity: anim,
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0], // start slightly right, slide to position
        }),
      },
    ],
  };

  // 👇 Swipe left/right to change slide
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return (
          Math.abs(gesture.dx) > Math.abs(gesture.dy) &&
          Math.abs(gesture.dx) > 10
        );
      },
      onPanResponderRelease: (_, gesture) => {
        // swipe left → next
        if (gesture.dx < -40) {
          goToIndex(index + 1);
        }
        // swipe right → previous
        else if (gesture.dx > 40) {
          goToIndex(index - 1);
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.flex} {...panResponder.panHandlers}>
        {/* Skip (hidden on last) */}
        {!isLast && (
          <TouchableOpacity onPress={goToProfile} style={styles.skipButton}>
            <AppText
              variant="label"
              style={styles.skipLabel}
              allowFontScaling={false}
            >
              {strings.common.skip}
            </AppText>
          </TouchableOpacity>
        )}

        {/* 🔥 Animated content wrapper */}
        <Animated.View style={[styles.slideContainer, animatedSlideStyle]}>
          {/* Main Image */}
          <View style={styles.illustrationWrapper}>
            <Illustration width={wp("63%")} height={hp("32%")} />
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
        </Animated.View>

        {/* Bottom CTA: arrow (screens 1–2) or "Get Started" (screen 3) */}
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
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },

  slideContainer: {
    flex: 1,
  },

  // Skip button (top-right)
  skipButton: {
    position: "absolute",
    top: hp("5.5%"), // ~46px
    right: wp("8.5%"), // ~34px
    width: wp("12%"),
    height: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  skipLabel: {
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.8, // 4% of 20px
    lineHeight: 20,
    color: "#A9A9A9",
    textAlign: "center",
  },

  // Main illustration
  illustrationWrapper: {
    position: "absolute",
    top: hp("12%"), // ~91px
    width: "100%",
    alignItems: "center",
  },

  // Pagination dots
  dotsWrapper: {
    position: "absolute",
    top: hp("54%"), // ~450px
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 2,
  },

  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },

  // Text block (title + subtitle)
  textWrapper: {
    position: "absolute",
    top: hp("59%"), // ~500px
    left: wp("10.5%"),
    right: wp("10.5%"),
    alignItems: "center",
    gap: 10,
  },

  // bottom arrow button (orange circle)
  arrowButton: {
    position: "absolute",
    bottom: hp("11.5%"), // ~96px
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  // full-width Get Started button for last screen
  getStartedButton: {
    position: "absolute",
    bottom: hp("11.5%"),
    left: wp("6.5%"),
    right: wp("6.5%"),
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
