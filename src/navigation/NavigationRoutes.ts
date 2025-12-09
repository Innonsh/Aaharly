import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

export enum NavigationRoutes {
  SPLASH = "SPLASH",
  LOGIN = "LOGIN",
  OTP = "OTP",
  LoginWithEmail = "Email",
  EMAIL_VERIFICATION = "Email_Verification",
  PROFILE_SETUP1 = "PROFILE_SETUP1",
  PROFILE_SETUP2 = "PROFILE_SETUP2",
  PROFILE_SETUP3 = "PROFILE_STEUP3",
  HOME = "HOME",
  EXPLORE_PLANS = "EXPLORE_PLANS",
  NUTRITIONAL_OVERVIEW = "NUTRITIONAL_OVERVIEW",
  WEEKLY_PLAN = "WEEKLY_PLAN",
  ONBOARDING = "ONBOARDING",
  DELIVERY_ADDRESS = "DELIVERY_ADDRESS",
  DELIVERY_SETTINGS = "DELIVERY_SETTINGS",
  DELIVERY_SETTINGS_2 = "DELIVERY_SETTINGS_2",
  PAYMENT = "PAYMENT",


}

export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.LOGIN]: undefined;
  [NavigationRoutes.HOME]: undefined;

  [NavigationRoutes.OTP]: {
    phone: string;
    confirmation: FirebaseAuthTypes.ConfirmationResult;
  };

  [NavigationRoutes.LoginWithEmail]: undefined;

  [NavigationRoutes.EMAIL_VERIFICATION]: {
    email: string;
  };

  [NavigationRoutes.LoginWithEmail]: undefined;
  [NavigationRoutes.EMAIL_VERIFICATION]: { email: string };
  [NavigationRoutes.ONBOARDING]: undefined;

  [NavigationRoutes.PROFILE_SETUP1]: undefined;
  [NavigationRoutes.PROFILE_SETUP2]: undefined;
  [NavigationRoutes.PROFILE_SETUP3]: undefined;
  [NavigationRoutes.HOME]: undefined;
  [NavigationRoutes.EXPLORE_PLANS]: undefined;
  [NavigationRoutes.NUTRITIONAL_OVERVIEW]: undefined;
  [NavigationRoutes.WEEKLY_PLAN]: undefined;
  [NavigationRoutes.DELIVERY_ADDRESS]: undefined;
  [NavigationRoutes.DELIVERY_SETTINGS]: undefined;
  [NavigationRoutes.DELIVERY_SETTINGS_2]: undefined;
  [NavigationRoutes.PAYMENT]: undefined;

  // [NavigationRoutes.HOME]: undefined;
};



