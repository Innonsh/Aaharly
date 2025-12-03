import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";

import BackIcon from "../../assets/login/back arrow.svg";
import EmailOtpImg from "../../assets/login/otp screen image (email).svg";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { TextInput as RNTextInput } from "react-native";


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
  const { translations } = React.useContext(LocalizationContext);


  const email = route?.params?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
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

    const correctOtp = "1234"; 

    if (code !== correctOtp) {
      setIsError(true);
      return;
    }

    setIsError(false);
    navigation.navigate(NavigationRoutes.LOGIN);
  }, [otp, navigation]);

  const handleResend = useCallback(() => {
    if (!canResend) return;

    setOtp(["", "", "", ""]);
    setTimer(30);
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
              isError && { borderColor: "red" , color:"red"},
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  headerRow: {
    marginTop: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
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
  headerTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    textAlign: "center",
    flex: 1,               
  },
  imgWrap: {
    alignItems: "center",
    marginTop: hp("5%"), 
  },
  continueText: {
  fontFamily: 'Matter-SemiBold',
  color: '#fff'
},
  

  desc: {
    fontSize: wp("4%"), 
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
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp("4%"),
    borderWidth: 1,
    borderColor: "#FFD2C4",
    textAlign: "center",
    fontSize: wp("6%"), 
    backgroundColor: "#FFF",
  },
  errorText: {
  color: "red",
  textAlign: "left",       
  width: "78%",             
  alignSelf: "center",      
  marginTop: hp("1%"),
  fontSize: wp("3.5%"),
},

  loginBtn: {
    width: "90%",
    alignSelf: "center",
    height: hp("5.9%"), 
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
    fontSize: wp("4%"), 
  },
});
