// // import { StyleSheet, Text, View } from 'react-native'
// // import React, { useContext } from 'react'
// // import { LocalizationContext } from '../../contexts/LocalizationContext';

// // const styles = StyleSheet.create({})

// // const LoginScreen = () => {

// //   const { translations } = useContext(LocalizationContext);
// //   const {login} = translations

// //   return (
// //     <View>
// //       <Text>{login.title}</Text>
// //     </View>
// //   )
// // }

// // export default LoginScreen


import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
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
import TextInputAffix from "react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix";
import { TouchableOpacity } from "react-native";


interface Props {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { translations } = useContext(LocalizationContext);

  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // -----------------------------
  // Validate Indian Phone Number
  // -----------------------------
  const validatePhone = (num: string): boolean => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(num);
  };

  // -----------------------------
  // Continue Handler
  // -----------------------------
  const handleContinue = async () => {
    setError(" ");

    if (!validatePhone(phone)) {
      setError("Please enter a valid mobile number");
      return;
    }

    setLoading(true);

    try {
      // Fake API delay (add your API here)
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));

      const isRegistered = true; // Replace this with real backend response  

      if (!isRegistered) {
        setError("This number is not registered");
        setLoading(false);
        return;
      }

      // Navigate to OTP screen
      navigation.navigate(NavigationRoutes.OTP, { phone });

      setLoading(false);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <LoginIllustration width={230} height={230} />
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
        onChangeText={(text: string) => {
          setPhone(text.replace(/[^0-9]/g, "")); // accept only numbers
          setError("");
        }}
        keyboardType="phone-pad"
        outlineColor="#FFE9E1"
        activeOutlineColor="#FFE9E1"
        style={styles.input}
        left={<TextInput.Affix text="+91" />}
        // placeholder="Enter mobile number"
        maxLength={10}
      />

      {/* Error Message */}
      {error !== "" && (
        <AppText style={styles.errorText}>{error}</AppText>
      )}

      {/* Continue Button */}
      <Button
        title={translations.common.continue}
        onPress={handleContinue}
        disabled={!validatePhone(phone) || loading}
        variant="primary"
        style={styles.continueBtn}
      />

      {/* OR */}
      <AppText variant="subtitle" align="center" style={styles.orText}>
        {translations.login.orLoginWith}
      </AppText>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <View style={styles.iconBox}>
          <GoogleIcon width={24} height={24} />
        </View>

        <View style={styles.iconBox}>
          <AppleIcon width={20} height={24} />
        </View>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate(NavigationRoutes.EMAIL)}>
          <MailIcon width={24} height={19} />
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
    paddingHorizontal: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 69,
  },
  title: {
    marginTop: 67,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#FFF",
    marginTop: 14,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 6,
  },
  continueBtn: {
    marginTop: 26,
    width: "100%",
  },
  orText: {
    marginTop: 34,
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 26,
  },
  iconBox: {
    width: 44,
    height: 44,
    marginTop: 24,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
});
