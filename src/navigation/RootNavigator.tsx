import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
// import OnboardingScreen from "../screens/OnboardingScreen";
// import LoginScreen from "../screens/LoginScreen";
// import ProfileSetupScreen from "../screens/ProfileSetupScreen";
// import HomeScreen from "../screens/HomeScreen";
import SetupProfile from "../screens/SetupProfile";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParamList = {
    SetupProfile: undefined;
    Onboarding: undefined;
    Login: undefined;
    ProfileSetup: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}

            >

                {/* Onboarding */}
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SetupProfile" component={SetupProfile} />



                {/* Login */}

                {/* Profile Setup (Your Card + Input + Button UI) */}
                {/* <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} /> */}

                {/* Home */}
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}
