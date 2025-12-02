export enum NavigationRoutes {
  SPLASH = "SPLASH",
  // ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
  OTP ="OTP",
  LoginWithEmail = "Email",
  EMAIL_VERIFICATION ="Email_Verification"
}
export type RootStackParamList = {
  [NavigationRoutes.SPLASH]:undefined;
  [NavigationRoutes.LOGIN]: undefined;
  [NavigationRoutes.OTP]: { phone: string };
  [NavigationRoutes.LoginWithEmail]:undefined;
  [NavigationRoutes.EMAIL_VERIFICATION]: {email: string};
  // [NavigationRoutes.ONBOARDING]: undefined;
};

