import { useMutation } from "@tanstack/react-query";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes, RootStackParamList } from "../navigation/NavigationRoutes";
import { useAppDispatch } from "../store/hooks";
import { signInSuccess } from "../store/reducer/authSlice";
import Toast from "react-native-toast-message";
import { AccountService } from "../services/AccountService";

async function googleSignInFlow() {
    try {
        await GoogleSignin.hasPlayServices();

        // Sign out from any previous session to force account chooser
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            // Ignore if not signed in
        }

        const userInfo = await GoogleSignin.signIn();

        if (!userInfo) {
            throw new Error('Sign in cancelled');
        }

        // Cast to any to safely access properties that might differ across versions
        const userObj = userInfo as any;
        const idToken = userObj.data?.idToken || userObj.idToken;

        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const accessToken = await userCredential.user.getIdToken();


        // Create account on backend
        const payload = {
            loginMethod: 'google',
            email: userCredential.user.email,
            name: userCredential.user.displayName,
        };

        try {
            await AccountService.createAccount(payload);
        } catch (apiError: any) {
            // Ignore 409 (Account already exists)
            if (apiError.response?.status !== 409) {
                console.error("API Error:", apiError);
                throw new Error(apiError.response?.data?.message || "Failed to sync account with server");
            }
        }

        return {
            accessToken,
            idToken,
            user: userCredential.user
        };
    } catch (error) {
        throw error;
    }
}

export function useGoogleLogin() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: googleSignInFlow,
        onSuccess: (data) => {
            dispatch(signInSuccess({ accessToken: data.accessToken, idToken: data.idToken }));
            navigation.navigate(NavigationRoutes.HOME);
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: `Welcome ${data.user.displayName || 'User'}!`
            });
        },
        onError: (error: any) => {
            let errorMessage = "Google Login Failed";
            if (error.code === '12501') { // SIGN_IN_CANCELLED
                errorMessage = "Sign in cancelled";
            } else {
                errorMessage = error.message || errorMessage;
            }

            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: errorMessage
            });
            console.error("Google Login Error:", error);
        }
    });
}
