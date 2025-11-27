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
import GoalsIcon from "../../assets/Icons/goal_preference.svg";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
import strings from "../../localisation/content/en.json";

type ProfileNavProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.PROFILE_STEP3
>;

const ProfileStep3Screen: React.FC = () => {
  const navigation = useNavigation<ProfileNavProp>();

  const [goal, setGoal] = useState<"lose" | "maintain" | "gain" | null>(null);
  const [diet, setDiet] = useState<"veg" | "nonveg" | "vegan" | null>(null);
  const [allergies, setAllergies] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      {/* FIXED HEADER (not scrolling) */}
      <View style={styles.header}>
        <View style={{ width: 22 }} />
        <AppText variant="title" align="center">
          {strings.profile.setupTitle}
        </AppText>
        <View style={{ width: 22 }} />
      </View>

      {/* EVERYTHING BELOW SCROLLS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step indicator */}
        <AppText variant="label" style={styles.stepText}>
          Step 3 of 3
        </AppText>

        <View style={styles.progressBarWrapper}>
          <View style={styles.progressActive3} />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <GoalsIcon width={36} height={36} />
          </View>

          <AppText variant="title" align="center" style={styles.cardTitle}>
            {strings.profile.step3Title}
          </AppText>

          <AppText
            variant="subtitle"
            align="center"
            style={styles.cardSubtitle}
          >
            {strings.profile.step3Subtitle}
          </AppText>

          {/* Fitness goals */}
          <AppText variant="label" style={styles.sectionLabel}>
            {strings.profile.fitnessGoalsLabel}
          </AppText>

          {[
            {
              key: "lose",
              title: strings.profile.goalLoseTitle,
              subtitle: strings.profile.goalLoseSubtitle,
            },
            {
              key: "maintain",
              title: strings.profile.goalMaintainTitle,
              subtitle: strings.profile.goalMaintainSubtitle,
            },
            {
              key: "gain",
              title: strings.profile.goalGainTitle,
              subtitle: strings.profile.goalGainSubtitle,
            },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.goalOption,
                goal === item.key && styles.goalSelected,
              ]}
              onPress={() => setGoal(item.key as any)}
              activeOpacity={0.8}
            >
              <AppText variant="label">{item.title}</AppText>
              <AppText variant="caption" style={styles.optionSubtitle}>
                {item.subtitle}
              </AppText>
            </TouchableOpacity>
          ))}

          {/* Diet preference */}
          <AppText variant="label" style={styles.sectionLabel}>
            {strings.profile.dietPreferenceLabel}
          </AppText>

          <View style={styles.dietRow}>
            <TouchableOpacity
              style={[styles.dietBtn, diet === "veg" && styles.dietSelected]}
              onPress={() => setDiet("veg")}
              activeOpacity={0.8}
            >
              <AppText variant="label">{strings.profile.dietVeg}</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dietBtn,
                styles.lastDietBtnInRow,
                diet === "nonveg" && styles.dietSelected,
              ]}
              onPress={() => setDiet("nonveg")}
              activeOpacity={0.8}
            >
              <AppText variant="label">
                {strings.profile.dietNonVeg}
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.dietRow}>
            <TouchableOpacity
              style={[
                styles.dietBtn,
                styles.singleDietBtn,
                diet === "vegan" && styles.dietSelected,
              ]}
              onPress={() => setDiet("vegan")}
              activeOpacity={0.8}
            >
              <AppText variant="label">{strings.profile.dietVegan}</AppText>
            </TouchableOpacity>
          </View>

          {/* Allergies */}
          <AppText variant="label" style={styles.sectionLabel}>
            {strings.profile.allergiesLabel}
          </AppText>
          <Input
            placeholder={strings.profile.allergiesPlaceholder}
            value={allergies}
            onChangeText={setAllergies}
            style={styles.allergyInput}
          />
        </View>

        {/* Buttons - scroll with page */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <AppText variant="button" color={Colors.primary}>
              {strings.profile.back}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            // onPress={() => navigation.replace(NavigationRoutes.HOME)}
            activeOpacity={0.8}
          >
            <AppText variant="button" color="#FFFFFF">
              {strings.profile.generatePlan}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileStep3Screen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // fixed header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 24,
  },

  // scrollable area
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },

  stepText: {
    paddingHorizontal: 24,
  },

  progressBarWrapper: {
    flexDirection: "row",
    marginTop: 6,
    paddingHorizontal: 24,
  },

  progressActive3: {
    width: "100%",
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  card: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FFF",
    padding: 24,

    // shadow (box-shadow: 0 0 10px #0000001A)
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 6,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFE7D7",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  cardTitle: {
    marginBottom: 4,
  },

  cardSubtitle: {
    marginBottom: 20,
  },

  sectionLabel: {
    marginTop: 16,
    marginBottom: 6,
  },

  goalOption: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  optionSubtitle: {
    marginTop: 2,
  },

  goalSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF3EB",
  },

  dietRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  dietBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },

  lastDietBtnInRow: {
    marginRight: 0,
  },

  singleDietBtn: {
    marginRight: 0,
  },

  dietSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF3EB",
  },

  allergyInput: {
    marginTop: 4,
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: 16,
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
