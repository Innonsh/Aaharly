
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
import OTPVerificationScreen from "../screens/verification/OTPVerificationScreen";
import { RootStackParamList } from "./NavigationRoutes";
import EmailLoginScreen from "../screens/login/EmailLoginScreen";
import EmailVerification from "../screens/verification/EmailVerification";
import HomeScreen from "../screens/home/HomeScreen";

const Navigator = () => {
  // const Stack = createNativeStackNavigator();
  const Stack = createNativeStackNavigator<RootStackParamList>();

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

        <Stack.Screen
          name={NavigationRoutes.HOME}
          component={HomeScreen}
          options={{ headerShown: false, animation: "none" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
