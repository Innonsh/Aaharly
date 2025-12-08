import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import OTP from "../../assets/login/otp screen image.svg";
import BackIcon from "../../assets/login/back arrow.svg";
import { translations } from "../../contexts/LocalizationContext";

import { styles } from "./otpVerificationStyle";
import { OTPVerificationProps } from "../../types/verification/verification";
import { RESEND_TIMER_DURATION } from "./verificationMock";

const OTPVerificationScreen = ({ route, navigation }: OTPVerificationProps) => {
  const { phone } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(RESEND_TIMER_DURATION);
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

      <Button
        title="Verify"
        onPress={() => navigation.replace(NavigationRoutes.HOME)}
        style={{ marginTop: hp("5%") }}
      />
    </View>
  );
};

export default OTPVerificationScreen;
