import React, { useState, useContext, useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import BackIcon from "../../assets/login/back arrow.svg";
import LunchSvg from "../../assets/login/Login via email image.svg";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { TextInput } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.headerTitle}>
          {translations.Email.title}
        </AppText>

        <View style={{ width: wp("11%") }} />
      </View>

      <View style={styles.imageWrapper}>
        <LunchSvg width={wp("40%")} height={wp("40%")} />
      </View>

      <AppText variant="title" style={styles.label}>
        {translations.Email.subtitle}
      </AppText>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    marginTop: hp("6%"),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
  },

  headerTitle: {
    fontSize: wp("5%"),
    textAlign: "center",
    flex: 1,
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

  imageWrapper: {
    alignItems: "center",
    marginTop: hp("4%"),
    marginBottom: hp("2%"),
  },

  label: {
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
    marginLeft: wp("5%"),
    fontSize: wp("4.5%"),
  },
  continueText: {
    fontFamily: 'Matter-SemiBold',
    color: '#fff'
  },

  input: {
    width: wp("90%"),
    alignSelf: "center",
    backgroundColor: "#FFF",
    marginTop: hp("1.5%"),
    fontSize: wp("4%"),
  },

  button: {
    marginTop: hp("3%"),
    height: hp("5.9%"),
    borderRadius: wp("3%"),
    width: wp("90%"),
    alignSelf: "center",
  },
});
