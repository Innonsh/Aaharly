import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import {
  DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
  Text,
} from "react-native-paper";
import { ThemeMode } from "./src/models/interface";
import { fontConfig } from "./src/theme/Fonts";
import { Colors, themeColors } from "./src/theme/Colors";
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContent = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);

  const theme = useMemo(() => {
    if (themeMode === ThemeMode.Dark) {
      return {
        ...MD3DarkTheme,
        dark: true,
        fonts: fontConfig,
        roundness: 1,
        colors: {
          ...MD3DarkTheme.colors,
          primary: Colors.primary,
          accent: Colors.secondary,
          background: themeColors.dark.background,
          elevation: {
            level1: "red",
          },
        },
      };
    }
    return {
      ...DefaultTheme,
      dark: false,
      fonts: fontConfig,
      roundness: 1,
      colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        accent: Colors.secondary,
        background: themeColors.light.background,
      },
    };
  }, [themeMode]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <Text>App</Text>
        </SafeAreaView>
    </PaperProvider>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
