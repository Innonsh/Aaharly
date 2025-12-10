import React, { useState, useContext, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import GoogleIcon from "../../assets/login/Google Icon.svg";
import AppleIcon from "../../assets/login/Apple Icon.svg";
import MailIcon from "../../assets/login/Mail Icon.svg";
import LoginIllustration from "../../assets/login/Login via phone SVG.svg";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { TextInput } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { sendOtp } from "../../services/firebaseAuth";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fonts } from "../../theme/Fonts";

interface Props {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: loginWithGoogle, isPending: isGoogleLoginPending } = useGoogleLogin();

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);


  const isValidPhone = useMemo(() => validatePhone(phone), [phone]);

  // 
  const handleContinue = async () => {
    setError("");

    if (!isValidPhone) {
      setError(translations.errors.invalidMobile);
      return;
    }

    setLoading(true);
    try {
      const confirmation = await sendOtp(phone);

      navigation.navigate(NavigationRoutes.OTP, {
        phone,
        confirmation, // send confirm object
      });
    } catch (e: any) {
      console.error("Phone Auth Error:", e);
      // Show specific error for debugging
      let errorCode = e.code || e.message || "Unknown Error";

      if (errorCode.includes("auth/billing-not-enabled")) {
        const formattedSent = `+91${phone.replace(/\D/g, '')}`;
        errorCode = `Billing Error. Firebase tried to send SMS to: ${formattedSent}\n\nEnsure EXACTLY "${formattedSent}" is added as a Test Number in Firebase Console.`;
      }

      setError(`${errorCode}`);
    }

    setLoading(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <LoginIllustration width={wp("50%")} height={wp("50%")} />
      </View>
      <AppText variant="title" style={styles.title}>
        {translations.login.title}
      </AppText>

      <AppText variant="subtitle" style={styles.subtitle}>
        {translations.login.subtitle}
      </AppText>

      <Input
        mode="outlined"
        value={phone}
        onChangeText={(t: string) => {
          setPhone(t.replace(/[^0-9]/g, ""));
          setError("");
        }}
        keyboardType="phone-pad"
        outlineStyle={{ borderRadius: wp("3%"), borderColor: "#FFE9E1" }}
        activeOutlineColor="#FFE9E1"
        style={styles.input}
        left={
          <TextInput.Affix
            text="+91 -"
            textStyle={{
              fontSize: 16,
              includeFontPadding: false,
              color: "#000",
            }}
          />
        }

        maxLength={10}
      />

      {error !== "" && <AppText style={styles.errorText}>{error}</AppText>}
      <Button
        title={translations.common.continue}
        onPress={handleContinue}
        disabled={!isValidPhone || loading || isGoogleLoginPending}
        variant="primary"
        style={styles.continueBtn}
        textStyle={styles.continueText}
      />

      <AppText variant="smallCenterd" style={styles.orText}>
        {translations.login.orLoginWith}
      </AppText>

      <View style={styles.socialRow}>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => loginWithGoogle()}
          disabled={isGoogleLoginPending}
        >
          {isGoogleLoginPending ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <GoogleIcon width={24} height={24} />
          )}
        </TouchableOpacity>

        <View style={styles.iconBox}>
          <AppleIcon width={24} height={24} />
        </View>

        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => navigation.navigate(NavigationRoutes.LoginWithEmail)}
        >
          <MailIcon width={24} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: wp("5%"),
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: hp("8.5%"),
  },

  title: {
    marginTop: hp("7%"),
    fontSize: 22,
    fontFamily: fonts.Bold,
  },

  subtitle: {
    marginTop: hp("1%"),
    marginBottom: hp("1.7%"),
    fontFamily: fonts.Regular,
  },

  input: {
    backgroundColor: "#FFF",
    marginTop: hp("0.5%"),
    borderRadius: wp("3.9%"),
    fontFamily: fonts.Regular,
    fontSize: 22,
    lineHeight: 22,
    includeFontPadding: false,
  },

  errorText: {
    color: "red",
    fontSize: wp("3.2%"),
    marginTop: hp("0.8%"),
    fontFamily: fonts.Regular,
  },

  continueBtn: {
    marginTop: hp("3%"),
    width: "100%",
    height: hp("5.9%"),
    borderRadius: wp("3%"),
  },

  continueText: {
    fontFamily: fonts.SemiBold,
    color: "#fff",
  },

  orText: {
    marginTop: hp("3.5%"),
    marginBottom: hp("1.5%"),
    textAlign: "center",
    fontFamily: fonts.Regular,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("7%"),
    marginTop: hp("2.5%"),
  },

  iconBox: {
    width: wp("12%"),
    height: wp("12%"),

    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: wp("2.8%"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
});
