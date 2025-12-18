import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";

export type Meal = {
    id: string;
    title: string;
    pricePerWeek: string;
    subtitle?: string;
    image?: any;
};



export type HomeNavProp = NativeStackNavigationProp<RootStackParamList, NavigationRoutes.HOME>;