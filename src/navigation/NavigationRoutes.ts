export enum NavigationRoutes {
  SPLASH = "SPLASH",
  // ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
  OTP = "OTP",
  LoginWithEmail = "Email",
  EMAIL_VERIFICATION = "Email_Verification",
  PROFILE_SETUP1 = "PROFILE_SETUP1",
  PROFILE_SETUP2 = "PROFILE_SETUP2",
  PROFILE_SETUP3 = "PROFILE_STEUP3",
  HOME = "HOME",
  ONBOARDING = "ONBOARDING",

  // HOME = "HOME", // optional – use whatever your main screen is
}
export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.LOGIN]: undefined;
  [NavigationRoutes.OTP]: { phone: string };
  [NavigationRoutes.LoginWithEmail]: undefined;
  [NavigationRoutes.EMAIL_VERIFICATION]: { email: string };
  [NavigationRoutes.ONBOARDING]: undefined;

  [NavigationRoutes.PROFILE_SETUP1]: undefined;
  [NavigationRoutes.PROFILE_SETUP2]: undefined;
  [NavigationRoutes.PROFILE_SETUP3]: undefined;
  [NavigationRoutes.HOME]: undefined;

  // [NavigationRoutes.HOME]: undefined;
};

