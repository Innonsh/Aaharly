import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";

import { ThemeMode } from "../models/interface";
import { Colors, themeColors } from "../theme/Colors";
import { fonts } from "../theme/Fonts";

import SplashScreen from "../screens/splash/SplashScreen";
import LoginScreen from "../screens/login/LoginScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreens";
import { NavigationRoutes } from "./NavigationRoutes";

export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.ONBOARDING]: undefined;
  [NavigationRoutes.LOGIN]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const themeMode: ThemeMode = ThemeMode.Light;

  const navigationTheme = useMemo<Theme>(() => {
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
    };
  }, [themeMode]);

  return (
    <NavigationContainer theme={navigationTheme as any}>
      <Stack.Navigator initialRouteName={NavigationRoutes.SPLASH} screenOptions={{ headerShown: false}}>
        
        <Stack.Screen
          name={NavigationRoutes.SPLASH}
          component={SplashScreen}
        />

        <Stack.Screen
          name={NavigationRoutes.ONBOARDING}
          component={OnboardingScreen}
        />

        <Stack.Screen
          name={NavigationRoutes.LOGIN}
          component={LoginScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
