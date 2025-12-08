import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, NavigationRoutes } from "../../navigation/NavigationRoutes";

export type EmailVerificationProps = {
    route: {
        params: {
            email: string;
        };
    };
};

export type OTPVerificationProps = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;
