// import React, { useEffect, useState, useRef } from "react";
// import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import AppText from "../../components/AppText";
// import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import OTP from "../../assets/login/otp screen image.svg";
// import BackIcon from "../../assets/login/back arrow.svg";
// import { translations } from "../../contexts/LocalizationContext";
// import { verifyOtp } from "../../services/firebaseAuth";


// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

// const OTPVerificationScreen = ({ route, navigation }: Props) => {
//   const { phone } = route.params;

//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   const inputRefs = [
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//   ];

//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;

//     if (timer > 0) {
//       interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     } else {
//       setIsResendDisabled(false);
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleOtpChange = (text: string, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = text.slice(-1);
//     setOtp(newOtp);

//     if (text && index < 3) inputRefs[index + 1].current?.focus();
//     if (!text && index > 0) inputRefs[index - 1].current?.focus();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerRow}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <BackIcon width={wp("4%")} height={wp("4%")} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.imageWrapper}>
//         <OTP width={wp("40%")} height={hp("20%")} /> {/* 🔄 */}
//       </View>

//       <AppText variant="title" style={styles.heading}>
//         {translations.Verification.title}
//       </AppText>

//       <AppText variant="subtitle" style={styles.subtext}>
//         {translations.Verification.subtitle}{"\n"}
//         +91{phone.slice(0, 2)}******{phone.slice(8)}
//       </AppText>

//       <View style={styles.otpContainer}>
//         {otp.map((value, index) => (
//           <TextInput
//             key={index}
//             ref={inputRefs[index]}
//             value={value}
//             style={styles.otpBox}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(text) => handleOtpChange(text, index)}
//           />
//         ))}
//       </View>

//       <View style={styles.bottomRow}>
//         <AppText style={styles.timer}>
//           {timer < 10 ? `00.0${timer}` : `00.${timer}`}
//         </AppText>

//         <AppText style={styles.didntReceive}>Didn’t receive code?</AppText>

//         <TouchableOpacity
//           disabled={isResendDisabled}
//           onPress={() => {
//             setTimer(30);
//             setIsResendDisabled(true);
//           }}
//         >
//           <AppText style={[styles.resend, isResendDisabled && { opacity: 0.4 }]}>
//             Resend
//           </AppText>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OTPVerificationScreen;

// // Styles with 🔄 responsive changes
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: wp("5%"), 
//   },

//   imageWrapper: {
//     alignItems: "center",
//     marginTop: hp("12%"), 
//   },

//   headerRow: {
//     marginTop: hp("6%"),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start", 
//     paddingHorizontal: wp("5%"),
//   },

//   backBtn: {
//     width: wp("11%"),
//     height: wp("11%"),
//     borderRadius: wp("6%"),
//     backgroundColor: "#FFF",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 2,
//   },


//   heading: {
//     textAlign: "center",
//     marginTop: hp("6%"), 
//     fontSize: wp("6%"),
//   },

//   subtext: {
//     textAlign: "center",
//     marginTop: hp("1%"), 
//     fontSize: wp("4%"), 
//   },

//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: hp("3%"), 
//   },

//   otpBox: {
//     width: wp("13%"), 
//     height: wp("13%"), 
//     borderWidth: 1,
//     borderColor: "#FFD3C8",
//     borderRadius: wp("3%"), 
//     textAlign: "center",
//     marginHorizontal: wp("3%"), 
//     fontSize: wp("5%"), 
//   },

//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: hp("4%"), 
//   },

//   timer: {
//     fontSize: wp("4%"), 
//     marginRight: wp("2%"), 
//   },

//   didntReceive: {
//     fontSize: wp("4%"), 
//     color: "#666",
//     marginRight: wp("1%"), 
//   },

//   resend: {
//     fontSize: wp("4%"), 
//     color: "#FF6A4D",
//     fontWeight: "600",
//   },
// });

import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OTP from "../../assets/login/otp screen image.svg";
import BackIcon from "../../assets/login/back arrow.svg";
import { translations } from "../../contexts/LocalizationContext";
import { verifyOtp } from "../../services/firebaseAuth";   // ✅ ADDED

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { phone, confirmation } = route.params;  // ✅ must receive confirmation object

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState(""); // ❤️ show error

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // TIMER
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // OTP CHANGE
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    setError(""); // clear error

    if (text && index < 3) inputRefs[index + 1].current?.focus();
    if (!text && index > 0) inputRefs[index - 1].current?.focus();
  };

  // ✅ OTP VERIFY FUNCTION
  const handleVerify = async () => {
    const enteredOtp = otp.join(""); // "1234"

    if (enteredOtp.length !== 4) {
      setError("Please enter valid 4-digit OTP");
      return;
    }

    try {
      const idToken = await verifyOtp(confirmation, enteredOtp); // FIREBASE VERIFY
      console.log("TOKEN:", idToken);

      // Optionally send to backend
      // await api("login", idToken);

      navigation.replace(NavigationRoutes.LOGIN);
    } catch (e) {
      setError("Invalid OTP, try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <OTP width={wp("40%")} height={hp("20%")} />
      </View>

      {/* TITLE */}
      <AppText variant="title" style={styles.heading}>
        {translations.Verification.title}
      </AppText>

      {/* SUBTEXT */}
      <AppText variant="subtitle" style={styles.subtext}>
        {translations.Verification.subtitle}{"\n"}
        +91{phone.slice(0, 2)}******{phone.slice(8)}
      </AppText>

      {/* OTP BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            value={value}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      {/* ERROR */}
      {error !== "" && (
        <AppText style={{ color: "red", textAlign: "center", marginTop: hp("1%") }}>
          {error}
        </AppText>
      )}

      {/* VERIFY BUTTON — ADDED */}
      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <AppText style={styles.verifyText}>Verify</AppText>
      </TouchableOpacity>

      {/* TIMER + RESEND */}
      <View style={styles.bottomRow}>
        <AppText style={styles.timer}>
          {timer < 10 ? `00.0${timer}` : `00.${timer}`}
        </AppText>

        <AppText style={styles.didntReceive}>Didn’t receive code?</AppText>

        <TouchableOpacity
          disabled={isResendDisabled}
          onPress={() => {
            setTimer(30);
            setIsResendDisabled(true);
            setError("");
          }}
        >
          <AppText style={[styles.resend, isResendDisabled && { opacity: 0.4 }]}>
            Resend
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: wp("5%"),
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: hp("12%"),
  },
  headerRow: {
    marginTop: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: wp("5%"),
  },
  backBtn: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("6%"),
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  heading: {
    textAlign: "center",
    marginTop: hp("6%"),
    fontSize: wp("6%"),
  },
  subtext: {
    textAlign: "center",
    marginTop: hp("1%"),
    fontSize: wp("4%"),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("3%"),
  },
  otpBox: {
    width: wp("13%"),
    height: wp("13%"),
    borderWidth: 1,
    borderColor: "#FFD3C8",
    borderRadius: wp("3%"),
    textAlign: "center",
    marginHorizontal: wp("3%"),
    fontSize: wp("5%"),
  },

  // 🔥 ADDED BUTTON STYLES
  verifyBtn: {
    marginTop: hp("4%"),
    backgroundColor: "#FF6A4D",
    paddingVertical: hp("1.8%"),
    borderRadius: wp("3%"),
    alignItems: "center",
  },
  verifyText: {
    fontSize: wp("4.5%"),
    color: "#FFF",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("4%"),
  },
  timer: {
    fontSize: wp("4%"),
    marginRight: wp("2%"),
  },
  didntReceive: {
    fontSize: wp("4%"),
    color: "#666",
    marginRight: wp("1%"),
  },
  resend: {
    fontSize: wp("4%"),
    color: "#FF6A4D",
    fontWeight: "600",
  },
});
