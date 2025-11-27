export enum NavigationRoutes {
  SPLASH = "SPLASH",
  LOGIN = "LOGIN",
  OTP ="OTP",
  EMAIL = "Email",
  EMAIL_VERIFICATION ="Email_Verification"
}
export type RootStackParamList = {
  [NavigationRoutes.SPLASH]:undefined;
  [NavigationRoutes.LOGIN]: undefined;
  [NavigationRoutes.OTP]: { phone: string };
  [NavigationRoutes.EMAIL]:undefined;
  [NavigationRoutes.EMAIL_VERIFICATION]: {email: string};
};