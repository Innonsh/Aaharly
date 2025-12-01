import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);

  const isLast = index === SLIDES.length - 1;

  const goToProfile = () => {
    navigation.replace(NavigationRoutes.PROFILE_STEP1);
  };

  const handleNext = () => {
    if (isLast) {
      goToProfile();
    } else {
      const nextIndex = index + 1;
      scrollRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setIndex(nextIndex);
    }
  };

  const handleMomentumEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Skip button (hidden on last screen) */}
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

      {/* Pager */}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {SLIDES.map((slide, i) => (
          <View key={slide.key} style={styles.slide}>
            {/* Illustration */}
            <View style={styles.illustrationWrapper}>
              <slide.Illustration width={wp("63%")} height={hp("32%")} />
            </View>

            {/* Dots */}
            <View style={styles.dotsWrapper}>
              {SLIDES.map((_, dotIdx) => {
                const inputRange = [
                  (dotIdx - 1) * SCREEN_WIDTH,
                  dotIdx * SCREEN_WIDTH,
                  (dotIdx + 1) * SCREEN_WIDTH,
                ];

                const animatedWidth = scrollX.interpolate({
                  inputRange,
                  outputRange: [8, 20, 8],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    key={dotIdx}
                    style={[
                      styles.dot,
                      {
                        width: animatedWidth,
                        backgroundColor:
                          dotIdx === index ? Colors.primary : "#D9D9D9",
                      },
                    ]}
                  />
                );
              })}
            </View>

            {/* Text */}
            <View style={styles.textWrapper}>
              <AppText variant="title" align="center">
                {slide.title}
              </AppText>

              <AppText variant="subtitle" align="center">
                {slide.subtitle}
              </AppText>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Bottom CTA: arrow or Get Started */}
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

  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },

  // Skip button
  skipButton: {
    position: "absolute",
    top: hp("5.5%"),
    right: wp("8.5%"),
    width: wp("12%"),
    height: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  skipLabel: {
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.8,
    lineHeight: 20,
    color: "#A9A9A9",
    textAlign: "center",
  },

  // Illustration
  illustrationWrapper: {
    position: "absolute",
    top: hp("12%"),
    width: "100%",
    alignItems: "center",
  },

  // Dots
  dotsWrapper: {
    position: "absolute",
    top: hp("54%"),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    height: 8,
    borderRadius: 100,
    backgroundColor: "#D9D9D9", // default for inactive
    marginHorizontal: 2,
  },

  // Text
  textWrapper: {
    position: "absolute",
    top: hp("59%"),
    left: wp("10.5%"),
    right: wp("10.5%"),
    alignItems: "center",
    gap: 10,
  },

  // Arrow button
  arrowButton: {
    position: "absolute",
    bottom: hp("11.5%"),
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

  // Get started button
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
