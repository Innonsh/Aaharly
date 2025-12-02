export enum NavigationRoutes {
  SPLASH = "SPLASH",
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",

  PROFILE_SETUP1 = "PROFILE_SETUP1",
  PROFILE_SETUP2 = "PROFILE_SETUP2",
  PROFILE_SETUP3 = "PROFILE_STEUP3",

  // HOME = "HOME", // optional – use whatever your main screen is
}

export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.ONBOARDING]: undefined;
  [NavigationRoutes.LOGIN]: undefined;

  [NavigationRoutes.PROFILE_SETUP1]: undefined;
  [NavigationRoutes.PROFILE_SETUP2]: undefined;
  [NavigationRoutes.PROFILE_SETUP3]: undefined;

  // [NavigationRoutes.HOME]: undefined;
};
