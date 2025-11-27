export enum NavigationRoutes {
  SPLASH = "SPLASH",
  ONBOARDING = "ONBOARDING",
  LOGIN = "LOGIN",
}

export type RootStackParamList = {
  [NavigationRoutes.SPLASH]: undefined;
  [NavigationRoutes.ONBOARDING]: undefined;
  [NavigationRoutes.LOGIN]: undefined;
};
