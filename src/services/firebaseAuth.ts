import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// -------- PHONE OTP LOGIN --------
export const sendOtp = async (phone: string) => {
  return await auth().signInWithPhoneNumber(`+91${phone}`);
};

export const verifyOtp = async (confirmObj: any, code: string) => {
  const result = await confirmObj.confirm(code);
  return await result.user.getIdToken(); // Send this token to backend
};

// -------- EMAIL-PASSWORD LOGIN --------
export const signInWithEmail = async (email: string, password: string) => {
  const res = await auth().signInWithEmailAndPassword(email, password);
  return await res.user.getIdToken();
};

// // -------- GOOGLE LOGIN --------
export const googleLogin = async () => {
  try {
    console.log('🚀 Starting Google Login...');

    // Check if Play Services are available
    await GoogleSignin.hasPlayServices();
    console.log('✅ Play Services available');

    // Sign out from Google to ensure account chooser appears
    try {
      await GoogleSignin.signOut();
      console.log('✅ Signed out from Google');
    } catch (signOutError) {
      console.log('⚠️ No previous Google session to sign out from');
    }

    // Sign in with Google
    console.log('📱 Opening Google Sign-In...');
    const googleUser: any = await GoogleSignin.signIn();
    console.log('📱 Google Sign-In Response Type:', typeof googleUser);
    console.log('📱 Google Sign-In Response Keys:', Object.keys(googleUser));
    console.log('📱 Full Google Response:', JSON.stringify(googleUser, null, 2));

    // v16.x returns: { data: { idToken, user }, type: 'success' }
    // Try multiple paths to get the idToken
    const idToken =
      googleUser.data?.idToken ||  // v16.x structure
      googleUser.idToken ||        // Fallback for older versions
      null;

    console.log('🔑 ID Token extracted:', idToken ? `✅ Token found (${idToken.substring(0, 20)}...)` : '❌ Token NOT found');

    if (!idToken) {
      console.error('❌ Could not extract token from googleUser object');
      console.error('❌ googleUser.data:', googleUser.data);
      console.error('❌ googleUser.idToken:', googleUser.idToken);
      throw new Error("Failed to get Google ID Token from response");
    }

    // Create Firebase credential
    console.log('🔐 Creating Firebase credential...');
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in to Firebase
    console.log('🔥 Signing in to Firebase...');
    const result = await auth().signInWithCredential(googleCredential);
    console.log('✅ Firebase sign-in successful, User:', result.user.email);

    // Return Firebase JWT token (this is what you send to backend)
    console.log('🎫 Generating Firebase JWT token...');
    const firebaseToken = await result.user.getIdToken();
    console.log('🎫 Firebase JWT Token:', firebaseToken ? `✅ Generated (${firebaseToken.substring(0, 20)}...)` : '❌ Failed');

    return firebaseToken;
  } catch (error: any) {
    console.error('❌ ============ GOOGLE LOGIN ERROR ============');
    console.error('❌ Error Type:', error.constructor.name);
    console.error('❌ Error Code:', error.code);
    console.error('❌ Error Message:', error.message);
    console.error('❌ Full Error:', JSON.stringify(error, null, 2));
    console.error('❌ ==========================================');
    throw error;
  }
};
