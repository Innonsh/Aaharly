import React, { useState, useContext, useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import AppText from "../../components/AppText";
import Button from "../../components/Button";
import Input from "../../components/TextInput";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";

import GoogleIcon from "../../assets/login/Google Icon.svg";
import AppleIcon from "../../assets/login/Apple Icon.svg";
import MailIcon from "../../assets/login/Mail Icon.svg";
import LoginIllustration from "../../assets/login/Login via phone SVG.svg";

import { styles } from "./loginStyle";
import { LoginProps } from "../../types/login/login";

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);

  const isValidPhone = useMemo(() => validatePhone(phone), [phone]);

  const handleContinue = async () => {
    setError("");

    if (!isValidPhone) {
      setError(translations.errors.invalidMobile);
      return;
    }

    setLoading(true);

    await new Promise<void>((resolve) => setTimeout(resolve, 1200));

    navigation.navigate(NavigationRoutes.OTP, { phone });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <LoginIllustration width={wp("50%")} height={wp("50%")} />
      </View>

      {/* Title */}
      <AppText variant="title" style={styles.title}>
        {translations.login.title}
      </AppText>

      {/* Subtitle */}
      <AppText variant="subtitle" style={styles.subtitle}>
        {translations.login.subtitle}
      </AppText>

      {/* Phone Input */}
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

      {/* Error Message */}
      {error !== "" && <AppText style={styles.errorText}>{error}</AppText>}

      {/* Continue Button */}
      <Button
        title={translations.common.continue}
        onPress={handleContinue}
        disabled={!isValidPhone || loading}
        variant="primary"
        style={styles.continueBtn}
        textStyle={styles.continueText}
      />

      {/* OR */}
      <AppText variant="smallCenterd" style={styles.orText}>
        {translations.login.orLoginWith}
      </AppText>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <View style={styles.iconBox}>
          <GoogleIcon width={24} height={24} />
        </View>

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
