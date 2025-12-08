import React, { useState, useContext, useMemo, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";

import BackIcon from "../../assets/login/back arrow.svg";
import LunchSvg from "../../assets/login/Login via email image.svg";

import { styles } from "./emailLoginStyle";

const EmailLoginScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { translations } = useContext(LocalizationContext);

  const [email, setEmail] = useState("");
  
  const isValidEmail = useMemo(() => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }, [email]);

  const handleContinue = useCallback(() => {
    if (!isValidEmail) return;

    navigation.navigate(NavigationRoutes.EMAIL_VERIFICATION, {
      email: email,
    });
  }, [isValidEmail, email, navigation]);

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.headerTitle}>
          {translations.Email.title}
        </AppText>

        <View style={{ width: wp("11%") }} />
      </View>

      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <LunchSvg width={wp("40%")} height={wp("40%")} />
      </View>

      {/* Label */}
      <AppText variant="title" style={styles.label}>
        {translations.Email.subtitle}
      </AppText>

      {/* Email Input */}
      <TextInput
        mode="outlined"
        placeholder="xyz@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        outlineStyle={{ borderRadius: wp("3%"), borderColor: "#FFE9E1" }}
        contentStyle={{ height: hp("6%") }}
      />

      {/* Button */}
      <Button
        title={translations.common.continue}
        variant="primary"
        onPress={handleContinue}
        disabled={!isValidEmail}
        style={styles.button}
        textStyle={styles.continueText}
      />
    </View>
  );
};

export default EmailLoginScreen;
