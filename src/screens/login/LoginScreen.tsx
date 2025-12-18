import React, { useState, useContext, useMemo, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { sendOtp } from "../../services/firebaseAuth";
import GoogleIcon from "../../assets/login/Google Icon.svg";
import AppleIcon from "../../assets/login/Apple Icon.svg";
import MailIcon from "../../assets/login/Mail Icon.svg";
import LoginIllustration from "../../assets/login/Login via phone SVG.svg";
import { styles } from "./loginStyle";
import { LoginProps } from "../../types/login/login";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { Colors } from "../../theme/Colors";

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: loginWithGoogle, isPending: isGoogleLoginPending, isSuccess, isError, error: googleLoginError } = useGoogleLogin();

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);

  const isValidPhone = useMemo(() => validatePhone(phone), [phone]);

  // 
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(NavigationRoutes.HOME);
    }
    if (isError) {
      const message = googleLoginError?.response?.data?.message || googleLoginError?.message || "Google Login Failed";
      setError(String(message));
    }
  }, [isError, isSuccess])

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
