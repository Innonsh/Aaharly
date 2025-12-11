import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
import { useAppSelector } from "../../store/hooks";
import HttpClient from "../../services/HttpClient";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({});

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await HttpClient.get('/');
        console.log("Server Health Check: OK");
      } catch (error) {
        console.warn("Server Health Check: Failed", error);
        Toast.show({
          type: 'error',
          text1: 'Server Unreachable',
          text2: 'Please check your internet connection.',
          visibilityTime: 4000,
        });
      } 

      setTimeout(() => {
        if (accessToken) {
          navigation.replace(NavigationRoutes.HOME);
        } else {
          navigation.replace(NavigationRoutes.ONBOARDING);
        }
      }, 1000);
    };
    checkLogin();
  }, [accessToken, navigation]);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
