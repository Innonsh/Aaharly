import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import AppText from "../../components/AppText";  // your custom text
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OTP from "../../assets/login/otp screen image.svg";
import BackIcon from "../../assets/login/back arrow.svg";
import { translations } from "../../contexts/LocalizationContext";

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.OTP>;

const OTPVerificationScreen = ({ route, navigation }: Props) => {
  const { phone } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={16} height={16} />
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <OTP width={170} height={182} />
      </View>

     
      <AppText variant="title" style={styles.heading}>
        {translations.Verification.title}
      </AppText>

      {/* Subtext */}
      <AppText variant="subtitle">
        {translations.Verification.subtitle}{"\n"}
        +91{phone.slice(0, 2)}******{phone.slice(8)}
      </AppText>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      {/* Timer + Resend */}
      <View style={styles.bottomRow}>
        <AppText style={styles.timer}>
          {timer < 10 ? `00.0${timer}` : `00.${timer}`}
        </AppText>

        <AppText style={styles.didntReceive}>
          Didn’t receive code?
        </AppText>

        <TouchableOpacity
          disabled={isResendDisabled}
          onPress={() => {
            setTimer(30);
            setIsResendDisabled(true);
          }}
        >
          <AppText
            style={[
              styles.resend,
              isResendDisabled && { opacity: 0.4 }
            ]}
          >
            Resend
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 116,
  },

  backButton: {
    marginTop: 26,
  },

  backArrow: {
    fontSize: 26,
  },

  //   image: {
  //     width: "100%",
  //     height: 200,
  //     marginTop: 20,
  //   },

  heading: {
    textAlign: "center",
    // fontSize: 22,
    // fontWeight: "700",
    marginTop: 68,
  },

  subText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginTop: 8,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  otpBox: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "#FFD3C8",
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 12,
    fontSize: 20,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },

  timer: {
    fontSize: 14,
    marginRight: 10,
  },

  didntReceive: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },

  resend: {
    fontSize: 14,
    color: "#FF6A4D",
    fontWeight: "600",
  },
});
