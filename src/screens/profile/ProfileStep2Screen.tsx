import React, { useState, useContext, useRef } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import PhysicalIcon from "../../assets/Icons/physical_stat.svg";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import { LocalizationContext } from "../../contexts/LocalizationContext";

import { styles } from "./profileStep2Style";
import { Step2NavProp } from "../../types/profile/profile";
import { getActivityOptions } from "./profileMock";

const ProfileStep2Screen: React.FC = () => {
  const navigation = useNavigation<Step2NavProp>();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<
    "sedentary" | "moderate" | "active" | null
  >(null);

  const weightRef = useRef<any>(null);

  const activityOptions = getActivityOptions(strings);

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
          Step 2 of 3
        </AppText>

        <View style={styles.progressBar}>
          <View style={styles.active2} />
          <View style={styles.inactive2} />
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <PhysicalIcon width={46} height={46} />
          </View>

          <AppText variant="title" align="center">
            {strings.profile.step2Title}
          </AppText>
          <AppText
            variant="subtitle"
            align="center"
            style={styles.subtitleSpacing}
          >
            {strings.profile.step2Subtitle}
          </AppText>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <AppText variant="labels">
                {strings.profile.heightLabel}
              </AppText>
              <Input
                value={height}
                onChangeText={(text: string) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  setHeight(cleaned);
                }}
                keyboardType="numeric"
                style={styles.input}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => weightRef.current?.focus()}
              />
            </View>

            <View style={{ flex: 1 }}>
              <AppText variant="labels">
                {strings.profile.weightLabel}
              </AppText>
              <Input
                ref={weightRef}
                value={weight}
                onChangeText={(text: string) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  setWeight(cleaned);
                }}
                keyboardType="numeric"
                style={styles.input}
                returnKeyType="done"
              />
            </View>
          </View>

          <AppText variant="labels" style={styles.sectionLabel}>
            {strings.profile.activityLevelLabel}
          </AppText>

          {activityOptions.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.option,
                activity === item.key && styles.selected,
              ]}
              onPress={() => setActivity(item.key)}
              activeOpacity={0.8}
            >
              <AppText variant="label">{item.title}</AppText>
              <AppText variant="caption" style={styles.optionSubtitle}>
                {item.subtitle}
              </AppText>
            </TouchableOpacity>
          ))}
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
            onPress={() => navigation.navigate(NavigationRoutes.PROFILE_SETUP3)}
            activeOpacity={0.8}
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

export default ProfileStep2Screen;
