import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleContinue = async () => {
    setError("");

    if (!validatePhone(phone)) {
      setError("Please enter a valid mobile number");
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
        <LoginIllustration width={wp("60%")} height={wp("60%")} />
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
        onChangeText={(t) => {
          setPhone(t.replace(/[^0-9]/g, ""));
          setError("");
        }}
        keyboardType="phone-pad"
        outlineColor="#FFE9E1"
        activeOutlineColor="#FFE9E1"
        style={styles.input}
        left={<TextInput.Affix text="+91" />}
        maxLength={10}
      />

      {/* Error Message */}
      {error !== "" && <AppText style={styles.errorText}>{error}</AppText>}

      {/* Continue Button */}
      <Button
        title={translations.common.continue}
        onPress={handleContinue}
        disabled={!validatePhone(phone) || loading}
        variant="primary"
        style={styles.continueBtn}
      />

      {/* OR */}
      <AppText align="center" style={styles.orText}>
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
          onPress={() => navigation.navigate(NavigationRoutes.EMAIL)}
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
  },

  subtitle: {
    marginTop: hp("1%"),
    marginBottom: hp("1.7%"),
  },

  input: {
    backgroundColor: "#FFF",
    marginTop: hp("1.7%"),
    borderRadius: wp("3.9%"), // 14px responsive
  },

  errorText: {
    color: "red",
    fontSize: wp("3.2%"),
    marginTop: hp("0.8%"),
  },

  continueBtn: {
    marginTop: hp("3%"),
    width: "100%",
    height: hp("5.9%"),       // 48px responsive
    borderRadius: wp("2.2%"), // 8px responsive
  },

  orText: {
    marginTop: hp("4%"),
    marginBottom: hp("1.5%"),
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("7%"),
  },

  iconBox: {
    width: wp("12%"),
    height: wp("12%"),
    marginTop: hp("3%"),
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
