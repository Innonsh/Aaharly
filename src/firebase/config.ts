// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";

// // export const initializeFirebase = () => {
// //   GoogleSignin.configure({
// //     webClientId: "YOUR_WEB_CLIENT_ID_FROM_FIREBASE", // Required for Google Login
// //   });
// // };


// export const firebaseAuth = auth();
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";

// export const initializeFirebase = () => {
//   GoogleSignin.configure({
//     webClientId: "YOUR_WEB_CLIENT_ID", // From Firebase Console
//   });
// };
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const initializeFirebase = () => {
  GoogleSignin.configure({
    webClientId: "720163295302-ambs6u0f0l7ml18gldvae28ais3okn9b.apps.googleusercontent.com", // From Firebase Console
  });
};
