import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, NavigationRoutes } from "../../navigation/NavigationRoutes";

export type Step1NavProp = NativeStackNavigationProp<
    RootStackParamList,
    NavigationRoutes.PROFILE_SETUP1
>;

export type Step2NavProp = NativeStackNavigationProp<
    RootStackParamList,
    NavigationRoutes.PROFILE_SETUP2
>;

export type ProfileNavProp = NativeStackNavigationProp<
    RootStackParamList,
    NavigationRoutes.PROFILE_SETUP3
>;

export interface ActivityOption {
    key: "sedentary" | "moderate" | "active";
    title: string;
    subtitle: string;
}

export type WeightGoal =
    | "lose_weight"
    | "maintain_weight"
    | "gain_weight";

export interface GoalOption {
    key: WeightGoal;
    title: string;
    subtitle: string;
}
