import { useMutation } from "@tanstack/react-query";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { getIdToken, signInWithCredential, GoogleAuthProvider } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    NavigationRoutes,
    RootStackParamList,
} from "../navigation/NavigationRoutes";
import { useAppDispatch } from "../store/hooks";
import { signInSuccess } from "../store/reducer/authSlice";
import { setUserProfile } from "../store/reducer/userSlice";
import Toast from "react-native-toast-message";
import {
    AccountService,
    CreateAccountPayload,
} from "../services/AccountService";

export function useGoogleLogin() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    const googleSignInFlow = async () => {
        // =========================
        // 1️⃣ Google + Firebase sign-in
        // =========================
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut().catch(() => { });

        const userInfo = await GoogleSignin.signIn();
        if (!userInfo) throw new Error("Sign in cancelled");

        const userObj = userInfo as any;
        const rawIdToken = userObj.data?.idToken || userObj.idToken;
        if (!rawIdToken) throw new Error("No ID token found");

        const credential = GoogleAuthProvider.credential(rawIdToken);
        const userCredential = await signInWithCredential(auth(), credential);

        // =========================
        // 2️⃣ Get Firebase token (single source of truth)
        // =========================
        const firebaseToken = await getIdToken(userCredential.user);

        // =========================
        // 3️⃣ Save token to Redux FIRST (🔥 critical)
        // =========================
        dispatch(
            signInSuccess({
                accessToken: firebaseToken,
                idToken: firebaseToken,
            })
        );

        // =========================
        // 4️⃣ Prepare account payload
        // =========================
        const payload: CreateAccountPayload = {
            loginMethod: "google",
            email: userCredential.user.email ?? undefined,
            name: userCredential.user.displayName ?? undefined,
            phone: userCredential.user.phoneNumber ?? undefined,
        };

        // =========================
        // 5️⃣ Create / confirm account
        // =========================
        try {
            await AccountService.createAccount(payload);
        } catch (error: any) {
            // 409 = account already exists → OK
            // 404 = likely endpoint mismatch, but we might want to log it
            if (error.response?.status === 404) {
                console.warn("Account sync endpoint not found (404). Proceeding anyway...");
            } else if (error.response?.status !== 409) {
                throw new Error(
                    error.response?.data?.message || "Account sync failed (Server Error)"
                );
            }
        }

        // =========================
        // 6️⃣ Fetch profile (MANDATORY)
        // =========================
        let profileData = null;

        try {
            const profileResponse = await AccountService.getProfile();

            if (profileResponse?.success) {
                profileData = profileResponse.data;
                dispatch(setUserProfile(profileResponse.data));
            }
        } catch (error: any) {
            // ✅ 404 = profile not created yet → NORMAL
            if (error.response?.status !== 404) {
                throw error;
            }
        }

        // ✅ login succeeds regardless of profile
        return true;

    };

    return useMutation({
        mutationFn: googleSignInFlow,

        onSuccess: () => {
            navigation.navigate(NavigationRoutes.HOME);
            Toast.show({
                type: "success",
                text1: "Login Successful",
            });
        },

        onError: (error: any) => {
            const message =
                error?.code === "12501"
                    ? "Sign in cancelled"
                    : error?.response?.data?.message ||
                    error?.message ||
                    "Google Login Failed";

            console.error("Google Login Error:", String(message));

            Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: String(message), // ✅ ALWAYS STRING
            });
        },

    });
}
