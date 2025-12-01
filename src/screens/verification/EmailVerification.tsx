import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";

import BackIcon from "../../assets/login/back arrow.svg";
import EmailOtpImg from "../../assets/login/otp screen image (email).svg";
import { translations } from "../../contexts/LocalizationContext";

// 🔄 responsive imports
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
  const [isError, setIsError] = useState(false);

  // const inputRefs = useRef<TextInput[]>([]);
  const inputRefs = useRef<Array<TextInput | null>>([]);


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
    setIsError(false);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleLogin = () => {
    const code = otp.join("");
    if (code !== "1234") {
      setIsError(true);
      Alert.alert("Invalid OTP", "The code you entered is incorrect.");
      return;
    }

    Alert.alert("Success", "Login Successful!");
    navigation.navigate(NavigationRoutes.LOGIN);
  };

  const handleResend = () => {
    if (!canResend) return;

    setOtp(["", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setIsError(false);

    inputRefs.current[0]?.focus();
    Alert.alert("OTP Sent", "A new verification code has been sent.");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} /> {/* 🔄 responsive */}
        </TouchableOpacity>

        <AppText variant="title" style={styles.title}>
          {translations.Verification.title}
        </AppText>
      </View>

      {/* Image */}
      <View style={styles.imgWrap}>
        <EmailOtpImg width={wp("40%")} height={wp("40%")} /> {/* 🔄 responsive */}
      </View>

      {/* Description */}
      <AppText variant="caption" style={styles.desc}>
        To confirm your email address, please enter the{"\n"}
        OTP we sent to {email}
      </AppText>

      {/* OTP */}
      <View style={styles.otpRow}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
ref={(ref: TextInput | null) => {
  inputRefs.current[idx] = ref;
}}
            value={digit}
            onChangeText={(t) => updateOtp(t, idx)}
            maxLength={1}
            keyboardType="numeric"
            style={[
              styles.otpBox,
              isError && { borderColor: "red" },
            ]}
          />
        ))}
      </View>

      {/* Login */}
      <Button
        title="Login"
        variant="primary"
        disabled={otp.join("").length !== 4}
        style={styles.loginBtn}
        onPress={handleLogin}
      />

      {/* Resend */}
      <View style={styles.resendRow}>
        <AppText>{`00.${timer < 10 ? "0" : ""}${timer}`}</AppText>

        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <AppText style={[styles.resendLink, { opacity: canResend ? 1 : 0.4 }]}>
            Resend OTP
          </AppText>
        </TouchableOpacity>
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
    marginTop: hp("6%"), // 🔄 responsive
    alignItems: "center",
  },

  backBtn: {
    width: wp("11%"), // 🔄 responsive
    height: wp("11%"),
    borderRadius: wp("6%"),
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: wp("5%"),
    top: 0,
    elevation: 2,
  },

  title: {
    fontSize: wp("5%"), // 🔄 responsive
    fontWeight: "600",
  },

  imgWrap: {
    alignItems: "center",
    marginTop: hp("4%"), // 🔄 responsive
  },

  desc: {
    fontSize: wp("4%"), // 🔄 responsive
    marginTop: hp("8%"),
    lineHeight: hp("3%"),
    color: "#000000",
    textAlign: "center",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp("3%"),
    paddingHorizontal: wp("10%"),
  },

  otpBox: {
    width: wp("13%"), // 🔄 responsive
    height: wp("13%"),
    borderRadius: wp("4%"),
    borderWidth: 1,
    borderColor: "#FFD2C4",
    textAlign: "center",
    fontSize: wp("6%"), // 🔄 responsive
    backgroundColor: "#FFF",
  },

  loginBtn: {
    width: "90%",
    alignSelf: "center",
    height: hp("5.9%"), // 🔄 responsive
    borderRadius: wp("2.2%"),
    marginTop: hp("3%"),
  },

  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("8%"),
    marginTop: hp("4%"),
  },

  resendLink: {
    color: "#FF8A65",
    fontWeight: "600",
    fontSize: wp("4%"), // 🔄 responsive
  },
});
