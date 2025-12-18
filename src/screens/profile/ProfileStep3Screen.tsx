import React, { useState, useContext } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import GoalsIcon from "../../assets/Icons/goal_preference.svg";
import VegIcon from "../../assets/Icons/veg.svg";
import NonVegIcon from "../../assets/Icons/nonveg.svg";
import VeganIcon from "../../assets/Icons/vegan.svg";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserProfile, updateUserProfile } from "../../store/reducer/userSlice";
import {
  useUpdateBasicProfile,
  useUpdatePhysicalStats,
  useUpdateGoalPreferences,
} from "../../hooks/useAccount";
import { AccountService } from "../../services/AccountService";

import { styles } from "./profileStep3Style";
import { ProfileNavProp } from "../../types/profile/profile";
import { getGoalOptions } from "./profileMock";

const ProfileStep3Screen: React.FC = () => {
  const navigation = useNavigation<ProfileNavProp>();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);

  // API Hooks
  const basicMutation = useUpdateBasicProfile();
  const statsMutation = useUpdatePhysicalStats();
  const goalMutation = useUpdateGoalPreferences();

  const [goal, setGoal] = useState<"lose" | "maintain" | "gain" | null>(null);
  const [diet, setDiet] = useState<"veg" | "non_veg" | "vegan" | null>(null);
  const [allergies, setAllergies] = useState("");

  const goalOptions = getGoalOptions(strings);

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

          {goalOptions.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.goalOption,
                goal === item.key && styles.goalSelected,
              ]}
              onPress={() => setGoal(item.key)}
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
                diet === "non_veg" && styles.dietSelected,
              ]}
              onPress={() => setDiet("non_veg")}
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
            onPress={async () => {
              if (!goal || !diet) {
                // Simple validation
                console.warn("Please select goal and diet");
                return;
              }

              // 1. Prepare Payload
              // Data from Redux (Steps 1 & 2 are now nested)
              const basicData = {
                name: user?.basic?.name || "User",
                age: Number(user?.basic?.age) || 25,
                gender: user?.basic?.gender || 'male'
              };

              const statsData = {
                height: Number(user?.physicalStats?.height) || 170,
                weight: Number(user?.physicalStats?.weight) || 70,
                activityLevel: (user?.physicalStats?.activityLevel || 'moderate') as any
              };

              // Map goal key to weightGoal backend format
              const weightGoalMap: Record<string, 'lose_weight' | 'maintain_weight' | 'gain_weight'> = {
                lose: 'lose_weight',
                maintain: 'maintain_weight',
                gain: 'gain_weight'
              };

              const goalData = {
                weightGoal: weightGoalMap[goal] || 'maintain_weight',
                dietType: diet,
                allergies: allergies
              };

              try {
                // 2. Call APIs sequentially
                await basicMutation.mutateAsync(basicData as any);
                await statsMutation.mutateAsync(statsData as any);
                await goalMutation.mutateAsync(goalData as any);

                // 3. FETCH FULL PROFILE (Unified Source of Truth)
                const profileRes = await AccountService.getProfile();

                // 4. Update Redux with the full unified object
                dispatch(setUserProfile(profileRes.data));

                // 5. Navigate
                navigation.navigate(NavigationRoutes.NUTRITIONAL_OVERVIEW);
              } catch (err) {
                console.error("Failed to save profile", err);
                // You might want to show an alert here
              }
            }}
          >
            <AppText variant="button" color="#FFFFFF">
              {basicMutation.isPending || statsMutation.isPending ? "Saving..." : strings.profile.generatePlan}
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileStep3Screen;
