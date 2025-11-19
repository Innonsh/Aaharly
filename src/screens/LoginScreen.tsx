import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import colours from "@/styles/theme";
import typography from "../styles/typography";
import type { RootStackParamList } from "../navigation/RootNavigator";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [phone, setPhone] = useState("");

  const isValidPhone =
    phone.trim().length === 10 && /^[0-9]{10}$/.test(phone);

  const handleContinue = () => {
    if (isValidPhone) {
    //   navigation.navigate("Verification", { phone: "+91" + phone });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* 🟠 HEADER IMAGE */}
        <Image
          source={require("assets/bro.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* 🟠 LOGIN TEXT */}
        <View style={styles.loginTextBox}>
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.loginSubtitle}>
            Enter your phone number to continue!
          </Text>
        </View>

        {/* 🟠 INPUT FIELD */}
        <View style={styles.inputRow}>
          <Text style={styles.prefix}>+91</Text>

          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder=""
            keyboardType="phone-pad"
            maxLength={10}
            style={{ flex: 1 ,marginLeft: 8}}
          />
        </View>

        {/* 🟠 CONTINUE BUTTON (USING YOUR UI BUTTON) */}
        <Button
          title="Continue"
          variant="primary"
          onPress={handleContinue}
          disabled={!isValidPhone}
          style={styles.mainBtn}
        />

        {/* 🟠 OR LOGIN WITH */}
        <Text style={styles.orText}>Or login with</Text>

        {/* 🟠 SOCIAL LOGIN BUTTONS (Uses variant='third') */}
        <View style={styles.socialRow}>
          <Button
            title=""
            variant="third"
            icon={
              <Image
                source={require("")}
                style={styles.socialIcon}
              />
            }
            onPress={() => {}}
            style={styles.socialBtn}
          />

          <Button
            title=""
            variant="third"
            icon={
              <Image
                source={require("")}
                style={styles.socialIcon}
              />
            }
            onPress={() => {}}
            style={styles.socialBtn}
          />

          <Button
            title=""
            variant="third"
            icon={
              <Image
                source={require("")}
                style={styles.socialIcon}
              />
            }
            onPress={() => navigation.navigate("SetupProfile")}
            style={styles.socialBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    position: "relative",
  },

  /** IMAGE — EXACT FIGMA POSITION */
  image: {
    width: 260,
    height: 265,
    position: "absolute",
    top: 69,
    left: 66,
  },

  /** LOGIN TEXT */
  loginTextBox: {
    position: "absolute",
    top: 366,
    left: 16,
  },

  loginTitle: {
    fontSize: typography.title,
    fontWeight: "600",
    color: colours.text,
  },

  loginSubtitle: {
    fontSize: typography.small,
    color: colours.textLight,
    marginTop: 2,
  },

  /** INPUT FIELD ROW */
  inputRow: {
    position: "absolute",
    top: 428,
    left: 16,
    width: 361,
    height: 52,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 6,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  prefix: {
    fontSize: typography.text,
    fontWeight: "600",
    marginRight: 10,
    color: colours.text,
  },

  /** CONTINUE BUTTON */
  mainBtn: {
    position: "absolute",
    top: 508,
    left: 16,
    width: 361,
  },

  /** OR TEXT */
  orText: {
    position: "absolute",
    top: 625,
    left: 160,
    fontSize: typography.small,
    color: colours.textLight,
  },

  /** SOCIAL ICONS */
  socialRow: {
    position: "absolute",
    top: 675,
    left: 104,
    width: 184,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  socialIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
