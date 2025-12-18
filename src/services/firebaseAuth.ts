import auth, {
  getIdToken,
  onIdTokenChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  GoogleAuthProvider
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

export const sendOtp = async (phone: string) => {

  const cleaned = phone.replace(/\D/g, '');

  let formattedPhone = `+${cleaned}`;
  if (cleaned.length === 10) {
    formattedPhone = `+91${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    formattedPhone = `+${cleaned}`;
  }

  console.log(`📱 Sending OTP to: ${formattedPhone}`);
  return await signInWithPhoneNumber(auth(), formattedPhone);
};

export const verifyOtp = async (confirmObj: any, code: string) => {
  const result = await confirmObj.confirm(code);
  return await getIdToken(result.user);
}

export const signInWithEmail = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth(), email, password);
  return await getIdToken(res.user);
};

export const googleLogin = async () => {
  try {
    console.log('Starting Google Login...');


    await GoogleSignin.hasPlayServices();
    console.log('Play Services available');

    try {
      await GoogleSignin.signOut();
      console.log('Signed out from Google');
    } catch (signOutError) {
      console.log('No previous Google session to sign out from');
    }

    const googleUser: any = await GoogleSignin.signIn();
    console.log('Google Sign-In Response Type:', typeof googleUser);
    console.log('Google Sign-In Response Keys:', Object.keys(googleUser));
    console.log('Full Google Response:', JSON.stringify(googleUser, null, 2));


    const idToken =
      googleUser.data?.idToken ||
      googleUser.idToken ||
      null;

    console.log('🔑 ID Token extracted:', idToken ? `✅ Token found (${idToken.substring(0, 20)}...)` : '❌ Token NOT found');

    if (!idToken) {
      console.error('Could not extract token from googleUser object');
      console.error('googleUser.data:', googleUser.data);
      console.error('googleUser.idToken:', googleUser.idToken);
      throw new Error("Failed to get Google ID Token from response");
    }


    console.log('🔐 Creating Firebase credential...');
    const googleCredential = GoogleAuthProvider.credential(idToken);


    const result = await signInWithCredential(auth(), googleCredential);
    console.log('✅ Firebase sign-in successful, User:', result.user.email);

    const firebaseToken = await getIdToken(result.user);
    // console.log('🎫 Firebase JWT Token:', firebaseToken ? ` Generated (${firebaseToken.substring(0, 20)}...)` : '❌ Failed');
    console.log("FULL TOKEN:", firebaseToken);

    Alert.alert("Firebase Token", firebaseToken);
    return firebaseToken;
  } catch (error: any) {
    console.error(' Error Type:', error.constructor.name);
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error(' Full Error:', JSON.stringify(error, null, 2));
    throw error;
  }
};
