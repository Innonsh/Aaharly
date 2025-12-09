import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";

export type ExplorePlansNavProp = NativeStackNavigationProp<RootStackParamList, NavigationRoutes.EXPLORE_PLANS>;

export type Meal = {
    id: string;
    title: string;
    pricePerWeek: string;
    subtitle?: string;
    image?: any;
};
