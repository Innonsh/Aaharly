import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";

export type OnboardingNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    NavigationRoutes.ONBOARDING
>;

export type Slide = {
    key: string;
    Illustration: React.ComponentType<any>;
    title: string;
    subtitle: string;
};
