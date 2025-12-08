import React, { useEffect, useRef, useState, useCallback, useContext } from "react";
import { View, TouchableOpacity, TextInput as RNTextInput } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import BackIcon from "../../assets/login/back arrow.svg";
import EmailOtpImg from "../../assets/login/otp screen image (email).svg";
import { LocalizationContext } from "../../contexts/LocalizationContext";

import { styles } from "./emailVerificationStyle";
import { EmailVerificationProps } from "../../types/verification/verification";
import { CORRECT_OTP, RESEND_TIMER_DURATION } from "./verificationMock";

const EmailVerification: React.FC<EmailVerificationProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { translations } = useContext(LocalizationContext);


  const email = route?.params?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(RESEND_TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputRefs = useRef<Array<RNTextInput | null>>([]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const id = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);


  const updateOtp = useCallback(
    (value: string, index: number) => {
      if (value.length > 1) return;

      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      setIsError(false);

      if (value && index < 3) inputRefs.current[index + 1]?.focus();
      if (!value && index > 0) inputRefs.current[index - 1]?.focus();
    },
    [otp]
  );


  const handleLogin = useCallback(() => {
    const code = otp.join("");

    if (code.length !== 4) {
      setIsError(true);
      return;
    }

    if (code !== CORRECT_OTP) {
      setIsError(true);
      return;
    }

    setIsError(false);
    navigation.navigate(NavigationRoutes.LOGIN);
  }, [otp, navigation]);

  const handleResend = useCallback(() => {
    if (!canResend) return;

    setOtp(["", "", "", ""]);
    setTimer(RESEND_TIMER_DURATION);
    setCanResend(false);
    setIsError(false);
    inputRefs.current[0]?.focus();
  }, [canResend]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.headerTitle}>
          {translations.Verification.title}
        </AppText>

      </View>
      <View style={styles.imgWrap}>
        <EmailOtpImg width={wp("40%")} height={wp("40%")} />
      </View>

      {/* DESCRIPTION */}
      <AppText variant="caption" style={styles.desc}>
        {translations.EmailVerification.subtitle} {"\n"}
        {email}
      </AppText>

      {/* OTP BOXES */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <RNTextInput
            key={index}
            ref={(ref: RNTextInput | null) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(t) => updateOtp(t, index)}
            maxLength={1}
            keyboardType="numeric"
            style={[
              styles.otpBox,
              isError && { borderColor: "red", color: "red" },
            ]}
          />

        ))}
      </View>
      {isError && (
        <AppText style={styles.errorText}>
          Incorrect code. Try again
        </AppText>
      )}


      {/* LOGIN */}
      <Button
        title={translations.login.title}
        variant="primary"
        disabled={otp.join("").length !== 4}
        style={styles.loginBtn}
        onPress={handleLogin}
        textStyle={styles.continueText}
      />

      {/* RESEND ROW */}
      <View style={styles.resendRow}>
        <AppText>{`00.${timer < 10 ? "0" : ""}${timer}`}</AppText>

        <TouchableOpacity onPress={handleResend} disabled={!canResend}>
          <AppText style={[styles.resendLink, { opacity: canResend ? 1 : 0.4 }]}>
            {translations.EmailVerification.resend}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerification;
