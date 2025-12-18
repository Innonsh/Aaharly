// src/navigation/Navigator.tsx
import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { ThemeMode } from "../models/interface";
import { Colors, themeColors } from "../theme/Colors";
import SplashScreen from "../screens/splash/SplashScreen";
import { fonts } from "../theme/Fonts";
import LoginScreen from "../screens/login/LoginScreen";
import { NavigationRoutes } from "./NavigationRoutes";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreens";
import ProfileStep1Screen from "../screens/profile/ProfileStep1Screen";
import ProfileStep2Screen from "../screens/profile/ProfileStep2Screen";
import ProfileStep3Screen from "../screens/profile/ProfileStep3Screen";

import homeScreeen from "../screens/home/homeScreen";
import ExplorePlansScreen from "../screens/exploreplans/explorePlans";
import NutritionalOverviewScreen from "../screens/nutritionaloverview/nutrition";
import WeeklyPlanScreen from "../screens/weeklyplan/plan";
import AddressScreen from "../screens/deladdress/address";
import DeliverySettingsScreen from "../screens/deladdress/delsettings";
import DeliverySettingsScreen2 from "../screens/deladdress/delsettings2";
import PaymentScreen from "../screens/payment/pay";

const Stack = createNativeStackNavigator<RootStackParamList>();
import OTPVerificationScreen from "../screens/verification/OTPVerificationScreen";
import { RootStackParamList } from "./NavigationRoutes";
import EmailLoginScreen from "../screens/login/EmailLoginScreen";
import EmailVerification from "../screens/verification/EmailVerification";


const Navigator = () => {
  const themeMode = ThemeMode.Light;

  const navigationTheme = useMemo<Theme>(() => {
    if (themeMode === ThemeMode.Light || themeMode === ThemeMode.Dark) {
      return {
        dark: true,
        colors: {
          primary: Colors.primary,
          background: themeColors.dark.background,
          card: "rgb(18, 18, 18)",
          text: "rgb(229, 229, 231)",
          border: "rgb(39, 39, 41)",
          notification: "rgb(255, 69, 58)",
        },
        fonts: {
          regular: {
            fontFamily: fonts.Regular,
            fontWeight: "normal",
          },
          medium: {
            fontFamily: fonts.SemiBold,
            fontWeight: "normal",
          },
          bold: {
            fontFamily: fonts.Bold,
            fontWeight: "bold",
          },
          heavy: {
            fontFamily: fonts.Bold,
            fontWeight: "bold",
          },
        },
      };
    }
    return {
      ...DefaultTheme,
      colors: {
        primary: Colors.primary,
        background: themeColors.light.background,
        card: "rgb(255, 255, 255)",
        text: "rgb(28, 28, 30)",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
      },
      fonts: {
        regular: {
          fontFamily: fonts.Regular,
          fontWeight: "normal",
        },
        medium: {
          fontFamily: fonts.SemiBold,
          fontWeight: "normal",
        },
        bold: {
          fontFamily: fonts.Bold,
          fontWeight: "bold",
        },
        heavy: {
          fontFamily: fonts.Bold,
          fontWeight: "bold",
        },
      },
    };
  }, [themeMode]);

  return (
    <NavigationContainer theme={navigationTheme as any}>
      <Stack.Navigator>
        <Stack.Screen
          name={NavigationRoutes.SPLASH}
          component={SplashScreen}
          options={{ headerShown: false, animation: "none" }}
        />

        <Stack.Screen
          name={NavigationRoutes.ONBOARDING}
          component={OnboardingScreen}
          options={{ headerShown: false, animation: "none" }}
        />

        <Stack.Screen
          name={NavigationRoutes.LOGIN}
          component={LoginScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.OTP}
          component={OTPVerificationScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.LoginWithEmail}
          component={EmailLoginScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.EMAIL_VERIFICATION}
          component={EmailVerification}
          options={{ headerShown: false, animation: "none" }} />

        {/* Main app / home */}
        <Stack.Screen
          name={NavigationRoutes.HOME}
          component={homeScreeen}
          options={{ headerShown: false, animation: "none" }}
        />

        <Stack.Screen
          name={NavigationRoutes.EXPLORE_PLANS}
          component={ExplorePlansScreen}
          options={{ headerShown: false, animation: "none" }}
        />

        {/* Profile setup flow */}
        <Stack.Screen
          name={NavigationRoutes.PROFILE_SETUP1}
          component={ProfileStep1Screen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.PROFILE_SETUP2}
          component={ProfileStep2Screen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.PROFILE_SETUP3}
          component={ProfileStep3Screen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.NUTRITIONAL_OVERVIEW}
          component={NutritionalOverviewScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.WEEKLY_PLAN}
          component={WeeklyPlanScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.DELIVERY_ADDRESS}
          component={AddressScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.DELIVERY_SETTINGS}
          component={DeliverySettingsScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.DELIVERY_SETTINGS_2}
          component={DeliverySettingsScreen2}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name={NavigationRoutes.PAYMENT}
          component={PaymentScreen}
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack.Navigator >
    </NavigationContainer >
  );
};

export default Navigator;
