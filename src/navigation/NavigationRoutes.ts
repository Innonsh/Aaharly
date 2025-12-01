export enum NavigationRoutes {
  SPLASH = "SPLASH",
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",

  PROFILE_STEP1 = "PROFILE_STEP1",
  PROFILE_STEP2 = "PROFILE_STEP2",
  PROFILE_STEP3 = "PROFILE_STEP3",

  // HOME = "HOME", // optional – use whatever your main screen is
}

export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.ONBOARDING]: undefined;
  [NavigationRoutes.LOGIN]: undefined;

  [NavigationRoutes.PROFILE_STEP1]: undefined;
  [NavigationRoutes.PROFILE_STEP2]: undefined;
  [NavigationRoutes.PROFILE_STEP3]: undefined;

  // [NavigationRoutes.HOME]: undefined;
};
