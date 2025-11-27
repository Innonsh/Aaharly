import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
import UserIcon from "../../assets/Icons/user_profile.svg";
import strings from "../../localisation/content/en.json";

type Step1NavProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.PROFILE_STEP1
>;

const ProfileStep1Screen: React.FC = () => {
  const navigation = useNavigation<Step1NavProp>();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 22 }} />
        <AppText variant="title" align="center">
          {strings.profile.setupTitle}
        </AppText>
        <View style={{ width: 22 }} />
      </View>

      {/* Progress */}
      <AppText variant="label" style={styles.stepText}>
        Step 1 of 3
      </AppText>
      <View style={styles.progressBar}>
        <View style={styles.active1} />
        <View style={styles.inactive1} />
      </View>

      {/* Main card (fixed size, scrollable content) */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.cardContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.iconBox}>
              <UserIcon width={36} height={36} />
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

            {/* Full Name */}
            <AppText variant="label">{strings.profile.fullName}</AppText>
            <Input
              mode="outlined"
              placeholder={strings.profile.fullNamePlaceholder}
              value={name}
              onChangeText={setName}
              outlineColor="#DCDCDC"
              activeOutlineColor={Colors.primary}
              style={styles.input}
            />

            {/* Age */}
            <AppText variant="label" style={styles.labelTop}>
              {strings.profile.age}
            </AppText>
            <Input
              mode="outlined"
              placeholder={strings.profile.agePlaceholder}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              outlineColor="#DCDCDC"
              activeOutlineColor={Colors.primary}
              style={styles.input}
            />

            {/* Gender */}
            <AppText variant="label" style={styles.labelTop}>
              {strings.profile.gender}
            </AppText>
            <View style={styles.twoBtnRow}>
              <TouchableOpacity
                style={[
                  styles.selectBtn,
                  gender === "male" && styles.selected,
                ]}
                onPress={() => setGender("male")}
                activeOpacity={0.8}
              >
                <AppText variant="label">{strings.profile.male}</AppText>
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
                <AppText variant="label">{strings.profile.female}</AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomBtnRow}>
        <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
          <AppText variant="button" color={Colors.primary}>
            {strings.profile.cancel}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(NavigationRoutes.PROFILE_STEP2)}
        >
          <AppText variant="button" color="#FFFFFF">
            {strings.profile.next}
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileStep1Screen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  stepText: {
    marginTop: 30,
    paddingHorizontal: 24,
  },

  progressBar: {
    flexDirection: "row",
    marginTop: 6,
    paddingHorizontal: 24,
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

  // main box measurements
  cardWrapper: {
    position: "absolute",
    top: 183,
    left: 16,
    right: 16,
    height: 528, // fixed height
  },

 card: {
  flex: 1,
  borderRadius: 16,
  backgroundColor: "#FFFFFF",

  // iOS shadow
  shadowColor: "#000000",
  shadowOpacity: 0.10,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 10,

  // Android shadow
  elevation: 6,

  overflow: "hidden",
},


  cardContent: {
    padding: 24,
  },

  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFE7D7",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  subtitleSpacing: { marginBottom: 20 },

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

  // bottomBtnRow: {
  //   flexDirection: "row",
  //   marginTop: 30,
  //   marginHorizontal: 24,
  // },
  bottomBtnRow: {
  position: "absolute",
  bottom: 77,
  left: 16,
  right: 16,
  flexDirection: "row",
},


  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
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
});
