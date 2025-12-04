import type { FirebaseAuthTypes } from "@react-native-firebase/auth";

export enum NavigationRoutes {
  SPLASH = "SPLASH",
  LOGIN = "LOGIN",
  OTP = "OTP",
  LoginWithEmail = "Email",
  EMAIL_VERIFICATION = "Email_Verification",
  HOME = "HOME",
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
};



