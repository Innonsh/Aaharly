import React, { useState, useContext, useRef } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import UserIcon from "../../assets/Icons/user_profile.svg";
import MaleIcon from "../../assets/Icons/male.svg";
import FemaleIcon from "../../assets/Icons/female.svg";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { useAppDispatch } from "../../store/hooks";
import { updateUserProfile } from "../../store/reducer/userSlice";

import { styles } from "./profileStep1Style";
import { Step1NavProp } from "../../types/profile/profile";

const ProfileStep1Screen: React.FC = () => {
  const navigation = useNavigation<Step1NavProp>();
  const dispatch = useAppDispatch();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const isNextDisabled = !name.trim() || !age || !gender;

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
            onChangeText={(text: string) => {
              setName(text.replace(/[^a-zA-Z\s]/g, ""));
              setNameError(false);
            }}
            outlineColor={nameError ? '#EF4444' : undefined}
            activeOutlineColor={nameError ? '#EF4444' : undefined}
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
              setAgeError(false);
            }}
            keyboardType="numeric"
            outlineColor={ageError ? '#EF4444' : undefined}
            activeOutlineColor={ageError ? '#EF4444' : undefined}
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
            style={[styles.primaryBtn, isNextDisabled && { opacity: 0.5 }]}
            activeOpacity={0.8}
            onPress={() => {
              const numAge = Number(age);
              const isNameEmpty = !name.trim();
              const isAgeInvalid = numAge < 15 || numAge > 80;

              if (isNameEmpty || isAgeInvalid) {
                if (isNameEmpty) {
                  setNameError(true);
                  Toast.show({
                    type: 'error',
                    text1: 'Please enter your full name',
                    position: 'bottom'
                  });
                }
                if (isAgeInvalid) {
                  setAgeError(true);
                  Toast.show({
                    type: 'error',
                    text1: 'Age must be between 15 and 80',
                    position: 'bottom'
                  });
                }
                return;
              }

              dispatch(updateUserProfile({
                basic: {
                  name,
                  age: numAge,
                  gender: gender || 'male',
                }
              }));
              navigation.navigate(NavigationRoutes.PROFILE_SETUP2);
            }}
            disabled={isNextDisabled}
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
