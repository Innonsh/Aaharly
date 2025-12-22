import { StyleSheet } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import {
  DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from "react-native-paper";
import { ThemeMode } from "./src/models/interface";
import { fontConfig } from "./src/theme/Fonts";
import { Colors, themeColors } from "./src/theme/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./src/navigation/Navigator";
import { LocalizationProvider } from "./src/contexts/LocalizationContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/CustomToast";
import { useAppDispatch } from "./src/store/hooks";
import { listenForTokenRefresh } from "./src/services/tokenManager";
import { setAccessToken } from "./src/store/reducer/authSlice";


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const queryClient = new QueryClient();

const AppContent = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = listenForTokenRefresh((token) => {
      if (token) {
        dispatch(setAccessToken(token));
        console.log("Token refreshed");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <LocalizationProvider>
              <Navigator />
            </LocalizationProvider>
          </SafeAreaView>
        </PaperProvider>
        <Toast config={toastConfig} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "720163295302-ambs6u0f0l7ml18gldvae28ais3okn9b.apps.googleusercontent.com", // From Firebase Console
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
