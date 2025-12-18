import React, { useState, useContext, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import UserIcon from "../../assets/Icons/user_profile.svg";
import MaleIcon from "../../assets/Icons/male.svg";
import FemaleIcon from "../../assets/Icons/female.svg";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { useAppDispatch } from "../../store/hooks";
import { updateUserProfile } from "../../store/reducer/userSlice";

type Step1NavProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.PROFILE_SETUP1
>;

const ProfileStep1Screen: React.FC = () => {
  const navigation = useNavigation<Step1NavProp>();
  const dispatch = useAppDispatch();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const ageRef = useRef<any>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <BackIcon width={16} height={16} />
        </TouchableOpacity>

        <AppText variant="title" align="center">
          {strings.profile.setupTitle}
        </AppText>

        <View style={{ width: 44 }} />
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={24}
      >
        <AppText variant="labels" style={styles.stepText}>
          Step 1 of 3
        </AppText>

        <View style={styles.progressBar}>
          <View style={styles.active1} />
          <View style={styles.inactive1} />
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <UserIcon width={46} height={46} />
          </View>

          <AppText variant="title" align="center">
            {strings.profile.step1Title}
          </AppText>

          <AppText
            variant="subtitle"
            align="center"
            style={styles.subtitleSpacing}
          >
            {strings.profile.step1Subtitle}
          </AppText>

          <AppText variant="labels">{strings.profile.fullName}</AppText>
          <Input
            value={name}
            onChangeText={setName}
            style={styles.input}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => ageRef.current?.focus()}
          />

          <AppText variant="labels" style={styles.labelTop}>
            {strings.profile.age}
          </AppText>
          <Input
            ref={ageRef}
            value={age}
            onChangeText={(text: string) => {
              const cleaned = text.replace(/[^0-9]/g, "");
              setAge(cleaned);
            }}
            keyboardType="numeric"
            style={styles.input}
            returnKeyType="done"
          />

          <AppText variant="labels" style={styles.labelTop}>
            {strings.profile.gender}
          </AppText>
          <View style={styles.twoBtnRow}>
            <TouchableOpacity
              style={[styles.selectBtn, gender === "male" && styles.selected]}
              onPress={() => setGender("male")}
              activeOpacity={0.8}
            >
              <View style={styles.btnContent}>
                <MaleIcon width={18} height={18} />
                <AppText variant="label" style={styles.btnText}>
                  {strings.profile.male}
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectBtn,
                styles.lastSelectBtn,
                gender === "female" && styles.selected,
              ]}
              onPress={() => setGender("female")}
              activeOpacity={0.8}
            >
              <View style={styles.btnContent}>
                <FemaleIcon width={18} height={18} />
                <AppText variant="label" style={styles.btnText}>
                  {strings.profile.female}
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <AppText variant="button" color="#6B7280">
              {strings.profile.cancel}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(updateUserProfile({
                name,
                age: Number(age),
                gender: gender || 'male', // Default or validate
              }));
              navigation.navigate(NavigationRoutes.PROFILE_SETUP2);
            }}
          >
            <AppText variant="button" color="#FFFFFF">
              {strings.profile.next}
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileStep1Screen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1.8%"),
    paddingHorizontal: wp("6%"),
  },
  scrollContent: {
    paddingTop: hp("2.8%"),
    paddingBottom: hp("4.7%"),
  },
  stepText: {
    paddingHorizontal: wp("6%"),
  },
  progressBar: {
    flexDirection: "row",
    marginTop: hp("0.7%"),
    paddingHorizontal: wp("6%"),
  },
  active1: {
    width: "33%",
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  inactive1: {
    width: "67%",
    height: 6,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  card: {
    marginTop: hp("2.8%"),
    marginHorizontal: wp("4.1%"),
    borderRadius: 16,
    backgroundColor: "#FFF",
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 35,
    backgroundColor: "#FFE7D7",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  subtitleSpacing: {
    marginBottom: 20,
  },
  input: {
    marginTop: 4,
  },
  labelTop: {
    marginTop: 12,
  },
  twoBtnRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  selectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  lastSelectBtn: {
    marginRight: 0,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF3EB",
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btnText: {},
  btnRow: {
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: wp("4.1%"),
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
