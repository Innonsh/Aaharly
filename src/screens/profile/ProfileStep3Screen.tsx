import React, { useState, useContext } from "react";
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
import GoalsIcon from "../../assets/Icons/goal_preference.svg";
import VegIcon from "../../assets/Icons/veg.svg";
import NonVegIcon from "../../assets/Icons/nonveg.svg";
import VeganIcon from "../../assets/Icons/vegan.svg";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";

type ProfileNavProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.PROFILE_SETUP3
>;

const ProfileStep3Screen: React.FC = () => {
  const navigation = useNavigation<ProfileNavProp>();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [goal, setGoal] = useState<"lose" | "maintain" | "gain" | null>(null);
  const [diet, setDiet] = useState<"veg" | "nonveg" | "vegan" | null>(null);
  const [allergies, setAllergies] = useState("");

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
          Step 3 of 3
        </AppText>

        <View style={styles.progressBarWrapper}>
          <View style={styles.progressActive3} />
        </View>

        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <GoalsIcon width={46} height={46} />
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

          <AppText variant="labels" style={styles.sectionLabel}>
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
              <AppText variant="labels">{item.title}</AppText>
              <AppText variant="caption" style={styles.optionSubtitle}>
                {item.subtitle}
              </AppText>
            </TouchableOpacity>
          ))}

          <AppText variant="labels" style={styles.sectionLabel}>
            {strings.profile.dietPreferenceLabel}
          </AppText>

          <View style={styles.dietRow}>
            <TouchableOpacity
              style={[styles.dietBtn, diet === "veg" && styles.dietSelected]}
              onPress={() => setDiet("veg")}
              activeOpacity={0.8}
            >
              <VegIcon width={20} height={20} />
              <AppText variant="labels" style={styles.dietText}>
                {strings.profile.dietVeg}
              </AppText>
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
              <NonVegIcon width={20} height={20} />
              <AppText variant="labels" style={styles.dietText}>
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
              <VeganIcon width={20} height={20} />
              <AppText variant="labels" style={styles.dietText}>
                {strings.profile.dietVegan}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppText variant="labels" style={styles.sectionLabel}>
            {strings.profile.allergiesLabel}
          </AppText>
          <Input
            placeholder={strings.profile.allergiesPlaceholder}
            value={allergies}
            onChangeText={setAllergies}
            style={styles.allergyInput}
            returnKeyType="done"
          />
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <AppText variant="button" color="#6B7280">
              {strings.profile.back}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(NavigationRoutes.NUTRITIONAL_OVERVIEW)}
          >
            <AppText variant="button" color="#FFFFFF">
              {strings.profile.generatePlan}
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileStep3Screen;

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
  progressBarWrapper: {
    flexDirection: "row",
    marginTop: hp("0.7%"),
    paddingHorizontal: wp("6%"),
  },
  progressActive3: {
    width: "100%",
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.primary,
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
  iconWrapper: {
    width: 64,
    height: 64,
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
    paddingVertical: 12,
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
    justifyContent: "flex-start",
  },
  dietBtn: {
    width: wp("39%"),
    height: hp("10.6%"),
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: wp("3%"),
    paddingTop: hp("2.3%"),
    paddingBottom: hp("2.3%"),
  },
  lastDietBtnInRow: {
    marginRight: 0,
  },
  singleDietBtn: {
    width: wp("39%"),
    height: hp("10.6%"),
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 0,
    marginTop: hp("1%"),
  },
  dietSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF3EB",
  },
  dietText: {
    marginTop: 6,
  },
  allergyInput: {
    marginTop: 4,
  },
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
