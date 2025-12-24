import React, { useState, useContext } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

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
import { WeightGoal } from "../../types/profile/profile";
import {
  useUpdateBasicProfile,
  useUpdatePhysicalStats,
  useUpdateGoalPreferences,
} from "../../hooks/useAccount";
import * as useAccount from "../../hooks/useAccount";
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

  const basicMutation = useUpdateBasicProfile();
  const statsMutation = useUpdatePhysicalStats();
  const goalMutation = useUpdateGoalPreferences();

  const { data: profileResponse } = useAccount.useProfile();

  const [goal, setGoal] = useState<WeightGoal | null>(null);
  const [diet, setDiet] = useState<"veg" | "non_veg" | "vegan" | null>(null);
  const [allergies, setAllergies] = useState("");

  const route = useRoute<any>();
  const isEdit = route.params?.isEdit;

  React.useEffect(() => {
    if (isEdit && profileResponse?.data?.goalPref) {
      const { weightGoal, dietType, allergies: pAllergies } = profileResponse.data.goalPref;
      setGoal(weightGoal as WeightGoal || null);
      setDiet(dietType as any || null);
      setAllergies(pAllergies || "");
    }
  }, [profileResponse, isEdit]);

  const [goalError, setGoalError] = useState(false);
  const [dietError, setDietError] = useState(false);

  const isNextDisabled = !goal || !diet;

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
                goalError && !goal && { borderColor: '#EF4444', borderWidth: 1.5 }
              ]}
              onPress={() => {
                setGoal(item.key);
                setGoalError(false);
              }}
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
              style={[
                styles.dietBtn,
                diet === "veg" && styles.dietSelected,
                dietError && !diet && { borderColor: '#EF4444', borderWidth: 1.5 }
              ]}
              onPress={() => {
                setDiet("veg");
                setDietError(false);
              }}
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
                dietError && !diet && { borderColor: '#EF4444', borderWidth: 1.5 }
              ]}
              onPress={() => {
                setDiet("non_veg");
                setDietError(false);
              }}
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
                dietError && !diet && { borderColor: '#EF4444', borderWidth: 1.5 }
              ]}
              onPress={() => {
                setDiet("vegan");
                setDietError(false);
              }}
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
            style={[styles.primaryBtn, isNextDisabled && { opacity: 0.5 }]}
            activeOpacity={0.8}
            onPress={async () => {
              if (!goal || !diet) {
                if (!goal) setGoalError(true);
                if (!diet) setDietError(true);
                Toast.show({
                  type: 'error',
                  text1: 'Required Selection',
                  text2: 'Please select both a goal and a diet preference.',
                  position: 'bottom'
                });
                return;
              }

              // Only pull from server if we are explicitly editing.
              // For a first-time setup, we want to ignore any partial server data.
              const profileData = isEdit ? profileResponse?.data : null;

              const basicData = {
                name: user?.basic?.name || profileData?.basic?.name || "User",
                age: Number(user?.basic?.age || profileData?.basic?.age) || 25,
                gender: user?.basic?.gender || profileData?.basic?.gender || 'male'
              };
              const statsData = {
                height: Number(user?.physicalStats?.height || profileData?.physicalStats?.height) || 170,
                weight: Number(user?.physicalStats?.weight || profileData?.physicalStats?.weight) || 70,
                activityLevel: (user?.physicalStats?.activityLevel || profileData?.physicalStats?.activityLevel || 'moderate') as any
              };
              const goalData = {
                weightGoal: goal || profileData?.goalPref?.weightGoal || 'maintain_weight',
                dietType: diet || profileData?.goalPref?.dietType || 'veg',
                allergies: allergies || profileData?.goalPref?.allergies || ""
              };

              try {
                const action = isEdit ? "Updating" : "Saving";
                console.log(`[DEBUG] Starting Profile ${isEdit ? "Update" : "Save"} Process...`);

                console.log(`[DEBUG] ${action} Basic Profile:`, JSON.stringify(basicData));
                await basicMutation.mutateAsync(basicData as any);
                console.log(`[DEBUG] Basic Profile ${action} SUCCESS`);

                console.log(`[DEBUG] ${action} Physical Stats:`, JSON.stringify(statsData));
                await statsMutation.mutateAsync(statsData as any);
                console.log(`[DEBUG] Physical Stats ${action} SUCCESS`);

                console.log(`[DEBUG] ${action} Goal Preferences:`, JSON.stringify(goalData));
                await goalMutation.mutateAsync(goalData as any);
                console.log(`[DEBUG] Goal Preferences ${action} SUCCESS`);

                console.log("[DEBUG] Fetching Refreshed Profile from Server...");
                const profileRes = await AccountService.getProfile();
                dispatch(setUserProfile(profileRes.data));
                console.log("[DEBUG] Profile Refresh and Redux Sync SUCCESS");

                if (isEdit) {
                  // If we came from Profile, return there with a success param
                  navigation.navigate(NavigationRoutes.PROFILE, { showUpdateSuccess: true });
                } else {
                  // For fresh setup, go to Overview and show "Goal updated"
                  navigation.navigate(NavigationRoutes.NUTRITIONAL_OVERVIEW);
                  Toast.show({
                    type: 'success',
                    text1: 'Goal updated',
                  });
                }
              } catch (err) {
                console.error("Failed to save profile", err);
              }
            }}
            disabled={isNextDisabled}
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
