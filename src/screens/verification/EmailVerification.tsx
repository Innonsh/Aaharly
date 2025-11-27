// 
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";

import BackIcon from "../../assets/login/back arrow.svg";
import EmailOtpImg from "../../assets/login/otp screen image (email).svg";
import { translations } from "../../contexts/LocalizationContext";

type Props = {
  route: {
    params: {
      email: string;
    };
  };
};

const EmailVerification: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const email = route?.params?.email ?? "s***1@gmail.com";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const intervalId = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const updateOtp = (value: string, index: number) => {
    if (value.length > 1) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
  };

  const handleLogin = () => {
    navigation.navigate(NavigationRoutes.LOGIN);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={16} height={16} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.title}>
          {translations.Verification.title}
        </AppText>
      </View>

      {/* Email OTP Illustration */}
      <View style={styles.imgWrap}>
        <EmailOtpImg width={160} height={160} />
      </View>

      {/* Description */}
      <AppText  variant="caption" align="center" style={styles.desc}>
        To confirm your email address, please enter the{"\n"}
        OTP we sent to {email}
      </AppText>

      {/* OTP Boxes */}
      <View style={styles.otpRow}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            value={digit}
            onChangeText={(t) => updateOtp(t, idx)}
            maxLength={1}
            keyboardType="numeric"
            style={styles.otpBox}
          />
        ))}
      </View>

      {/* Login button */}
      <Button
        title="Login"
        variant="primary"
        disabled={otp.join("").length !== 4}
        style={styles.loginBtn}
        onPress={handleLogin}
      />

      {/* Timer + Resend */}
      <View style={styles.resendRow}>
        <AppText>{`00.${timer < 10 ? "0" : ""}${timer}`}</AppText>

        <AppText style={styles.resendText}>
          Didn’t receive code?{" "}
          <AppText style={[styles.resendLink, { opacity: canResend ? 1 : 0.4 }]}>
            Resend
          </AppText>
        </AppText>
      </View>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  headerRow: {
    marginTop: 56,
    alignItems: "center",
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 0,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  imgWrap: {
    alignItems: "center",
    marginTop: 38,
  },

  desc: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 80,
    // color: "#000",
    lineHeight: 20,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 28,
    paddingHorizontal: 50,
  },

  otpBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD2C4",
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#FFF",
  },

  loginBtn: {
    width: "90%",
    alignSelf: "center",
    height: 55,
    borderRadius: 14,
    marginTop: 26,
  },

  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginTop: 32,
  },

  resendText: {
    color: "#666",
  },

  resendLink: {
    color: "#FF8A65",
  },
});
