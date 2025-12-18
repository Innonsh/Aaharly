// src/screens/Onboarding/OnboardingScreens.tsx
import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Colors } from "../../theme/Colors";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import AppText from "../../components/AppText";

import NextArrowButton from "../../assets/Onboarding/Arrow.svg";
import strings from "../../localisation/content/en.json";

import { styles } from "./onboardingStyle";
import { SLIDES } from "./onboardingMock";
import { OnboardingNavigationProp } from "../../types/onboarding/onboarding";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [index, setIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);

  const isLast = index === SLIDES.length - 1;

  /**
   * Navigate to Home after onboarding.
   * Home will decide whether to prompt/redirect to profile setup.
   */
  const goToHome = () => {
    navigation.replace(NavigationRoutes.LOGIN);
  };

  const handleNext = () => {
    if (isLast) {
      goToHome();
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
      {!isLast && (
        <TouchableOpacity onPress={goToHome} style={styles.skipButton}>
          <AppText
            variant="label"
            style={styles.skipLabel}
            allowFontScaling={false}
          >
            {strings.common.skip}
          </AppText>
        </TouchableOpacity>
      )}

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
            <View style={styles.illustrationWrapper}>
              <slide.Illustration width={wp("63%")} height={hp("32%")} />
            </View>

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
