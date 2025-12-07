import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OTP from "../../assets/login/otp screen image.svg";
import BackIcon from "../../assets/login/back arrow.svg";
import { translations } from "../../contexts/LocalizationContext";
import { verifyOtp } from "../../services/firebaseAuth";
import auth from "@react-native-firebase/auth";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { phone, confirmation } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
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

    setError("");
    setIsOtpInvalid(false);

    if (text && index < 5) inputRefs[index + 1].current?.focus();
    if (!text && index > 0) inputRefs[index - 1].current?.focus();

    if (text && index === 5) {
      const fullOtp = [...newOtp];
      fullOtp[index] = text.slice(-1);
      const enteredOtp = fullOtp.join("");
      if (enteredOtp.length === 6) {
        handleVerify(enteredOtp);
      }
    }
  };

  const handleVerify = async (otpString?: string) => {
    const enteredOtp = otpString || otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter valid 6-digit OTP");
      return;
    }

    try {
      const idToken = await verifyOtp(confirmation, enteredOtp);
      console.log("TOKEN:", idToken);

      navigation.replace(NavigationRoutes.HOME);
    } catch (e) {
      setError("Invalid OTP, try again.");
      setIsOtpInvalid(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <OTP width={wp("40%")} height={hp("20%")} />
      </View>

      <AppText variant="title" style={styles.heading}>
        {translations.Verification.title}
      </AppText>

      <AppText variant="subtitle" style={styles.subtext}>
        {translations.Verification.subtitle}{"\n"}
        code sent to +91{phone.slice(0, 2)}******{phone.slice(8)}
      </AppText>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            value={value}
            style={[
              styles.otpBox,
              isOtpInvalid && { borderColor: "#FF0000", color: "#FF0000" }
            ]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      {error !== "" && (
        <AppText style={{ color: "red", textAlign: "center", marginTop: hp("2%") }}>
          {error}
        </AppText>
      )}

      <View style={styles.bottomRow}>
        <AppText style={styles.timer}>
          {timer < 10 ? `00.0${timer}` : `00.${timer}`}
        </AppText>

        <View style={styles.resendRow}>
          <AppText style={styles.didntReceive}>Didn't receive code? </AppText>
          <TouchableOpacity
            disabled={isResendDisabled}
            onPress={() => {
              setTimer(30);
              setIsResendDisabled(true);
              setError("");
              setIsOtpInvalid(false);
            }}
          >
            <AppText style={[styles.resend, isResendDisabled && { opacity: 0.4 }]}>
              Resend
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: wp("5%"),
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: hp("3.5%"),
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
    marginTop: hp("5.5%"),
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
    marginHorizontal: wp("1.5%"),
    fontSize: wp("5%"),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("4%"),
    paddingHorizontal: wp("5%"),
  },
  timer: {
    fontSize: wp("3.8%"),
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  didntReceive: {
    fontSize: wp("3.5%"),
    color: "#666",
  },
  resend: {
    fontSize: wp("3.5%"),
    color: "#FF6A4D",
    fontWeight: "600",
  },
});
