// import React, { useEffect, useState, useRef } from "react";
// import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import AppText from "../../components/AppText";
// import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import OTP from "../../assets/login/otp screen image.svg";
// import BackIcon from "../../assets/login/back arrow.svg";
// import { translations } from "../../contexts/LocalizationContext";

// type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

// const OTPVerificationScreen = ({ route, navigation }: Props) => {
//   const { phone } = route.params;

//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   // 🔥 Refs for auto-next focus
//   const inputRefs = [
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//     useRef<TextInput>(null),
//   ];

//   // Timer Logic
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;

//     if (timer > 0) {
//       interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     } else {
//       setIsResendDisabled(false);
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   // OTP Box Change Handler
//   const handleOtpChange = (text: string, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = text.slice(-1);
//     setOtp(newOtp);

//     // 👉 Move to next input automatically
//     if (text && index < 3) {
//       inputRefs[index + 1].current?.focus();
//     }

//     // 👉 If user clears (backspace), go to previous box
//     if (!text && index > 0) {
//       inputRefs[index - 1].current?.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <BackIcon width={16} height={16} />
//       </TouchableOpacity>

//       {/* Illustration */}
//       <View style={styles.imageWrapper}>
//         <OTP width={170} height={182} />
//       </View>

//       <AppText variant="title" style={styles.heading}>
//         {translations.Verification.title}
//       </AppText>

//       <AppText variant="subtitle" style={styles.subtext}>
//         {translations.Verification.subtitle}{"\n"}
//         +91{phone.slice(0, 2)}******{phone.slice(8)}
//       </AppText>

//       {/* OTP Boxes */}
//       <View style={styles.otpContainer}>
//         {otp.map((value, index) => (
//           <TextInput
//             key={index}
//             ref={inputRefs[index]} // 🔥 attach ref
//             value={value}
//             style={styles.otpBox}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(text) => handleOtpChange(text, index)}
//           />
//         ))}
//       </View>

//       {/* Timer + Resend */}
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

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//   },
//   imageWrapper: {
//     alignItems: "center",
//     marginTop: 116,
//   },
//   backButton: {
//     marginTop: 26,
//   },
//   heading: {
//     textAlign: "center",
//     marginTop: 68,
//   },
  
//   subtext:{
//     textAlign:"center",
//     marginTop:8,

//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 28,
//   },
//   otpBox: {
//     width: 52,
//     height: 52,
//     borderWidth: 1,
//     borderColor: "#FFD3C8",
//     borderRadius: 10,
//     textAlign: "center",
//     marginHorizontal: 12,
//     fontSize: 20,
//   },
//   bottomRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 32,
//   },
//   timer: {
//     fontSize: 14,
//     marginRight: 10,
//   },
//   didntReceive: {
//     fontSize: 14,
//     color: "#666",
//     marginRight: 4,
//   },
//   resend: {
//     fontSize: 14,
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

// 🔄 Responsive imports
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { phone } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    if (text && index < 3) inputRefs[index + 1].current?.focus();
    if (!text && index > 0) inputRefs[index - 1].current?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={wp("4%")} height={wp("4%")} /> {/* 🔄 */}
      </TouchableOpacity>

      <View style={styles.imageWrapper}>
        <OTP width={wp("40%")} height={hp("20%")} /> {/* 🔄 */}
      </View>

      <AppText variant="title" style={styles.heading}>
        {translations.Verification.title}
      </AppText>

      <AppText variant="subtitle" style={styles.subtext}>
        {translations.Verification.subtitle}{"\n"}
        +91{phone.slice(0, 2)}******{phone.slice(8)}
      </AppText>

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

// Styles with 🔄 responsive changes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: wp("5%"), // 🔄
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: hp("12%"), // 🔄
  },

  backButton: {
    marginTop: hp("3%"), // 🔄
  },

  heading: {
    textAlign: "center",
    marginTop: hp("6%"), // 🔄
    fontSize: wp("6%"), // 🔄 responsive font
  },

  subtext: {
    textAlign: "center",
    marginTop: hp("1%"), // 🔄
    fontSize: wp("4%"), // 🔄
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("3%"), // 🔄
  },

  otpBox: {
    width: wp("13%"), // 🔄
    height: wp("13%"), // 🔄
    borderWidth: 1,
    borderColor: "#FFD3C8",
    borderRadius: wp("3%"), // 🔄
    textAlign: "center",
    marginHorizontal: wp("3%"), // 🔄
    fontSize: wp("5%"), // 🔄
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("4%"), // 🔄
  },

  timer: {
    fontSize: wp("4%"), // 🔄
    marginRight: wp("2%"), // 🔄
  },

  didntReceive: {
    fontSize: wp("4%"), // 🔄
    color: "#666",
    marginRight: wp("1%"), // 🔄
  },

  resend: {
    fontSize: wp("4%"), // 🔄
    color: "#FF6A4D",
    fontWeight: "600",
  },
});
