// src/screens/onboarding/OnboardingScreen.tsx

import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../theme/Colors";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { RootStackParamList } from "../../navigation/Navigator";
import Button from "../../components/Button";
import AppText from "../../components/AppText";

type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.ONBOARDING
>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  const handleNext = () => {
    navigation.replace(NavigationRoutes.LOGIN);
  };

  const handleSkip = () => {
    navigation.replace(NavigationRoutes.LOGIN);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <AppText variant="label">Skip</AppText>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/Onboarding/Image1.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Dots */}
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Text content */}
      <View style={styles.textContainer}>
        <AppText variant="title" align="center">
          Meals that match your goals
        </AppText>

        <AppText variant="subtitle" align="center">
          Personalized meals designed for your body and fitness goals.
        </AppText>
      </View>

      {/* Circular arrow button */}
      <View style={styles.bottomContainer}>
        <Button
          title=" "   // single space
          onPress={handleNext}
          variant="primary"
          icon={
            <AppText color="#fff" style={{ fontSize: 28 }}>
              {`\u2192`}
            </AppText>
          }
          iconPosition="right"
          style={styles.circleButton}
        />
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  illustrationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "80%",
    height: "80%",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 3,
  },
  dotActive: {
    width: 18,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  textContainer: {
    paddingHorizontal: 32,
    alignItems: "center",
    gap: 8,
  },
  bottomContainer: {
    paddingBottom: 40,
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
