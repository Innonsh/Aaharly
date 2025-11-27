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
import PhysicalIcon from "../../assets/Icons/physical_stat.svg";
import strings from "../../localisation/content/en.json";

type Step2NavProp = NativeStackNavigationProp<
  RootStackParamList,
  NavigationRoutes.PROFILE_STEP2
>;

const ProfileStep2Screen: React.FC = () => {
  const navigation = useNavigation<Step2NavProp>();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<
    "sedentary" | "moderate" | "active" | null
  >(null);

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
        Step 2 of 3
      </AppText>
      <View style={styles.progressBar}>
        <View style={styles.active2} />
        <View style={styles.inactive2} />
      </View>

      {/* Main card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.cardContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.iconBox}>
              <PhysicalIcon width={36} height={36} />
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

            {/* Height & Weight */}
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <AppText variant="label">
                  {strings.profile.heightLabel}
                </AppText>
                <Input
                  mode="outlined"
                  placeholder={strings.profile.heightPlaceholder}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  outlineColor="#DCDCDC"
                  activeOutlineColor={Colors.primary}
                  style={styles.input}
                />
              </View>

              <View style={{ flex: 1 }}>
                <AppText variant="label">
                  {strings.profile.weightLabel}
                </AppText>
                <Input
                  mode="outlined"
                  placeholder={strings.profile.weightPlaceholder}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  outlineColor="#DCDCDC"
                  activeOutlineColor={Colors.primary}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Activity Level */}
            <AppText variant="label" style={styles.sectionLabel}>
              {strings.profile.activityLevelLabel}
            </AppText>

            {[
              {
                key: "sedentary",
                title: strings.profile.activitySedentaryTitle,
                subtitle: strings.profile.activitySedentarySubtitle,
              },
              {
                key: "moderate",
                title: strings.profile.activityModerateTitle,
                subtitle: strings.profile.activityModerateSubtitle,
              },
              {
                key: "active",
                title: strings.profile.activityActiveTitle,
                subtitle: strings.profile.activityActiveSubtitle,
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.option,
                  activity === item.key && styles.selected,
                ]}
                onPress={() => setActivity(item.key as any)}
                activeOpacity={0.8}
              >
                <AppText variant="label">{item.title}</AppText>
                <AppText variant="caption" style={styles.optionSubtitle}>
                  {item.subtitle}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomBtnRow}>
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
          onPress={() => navigation.navigate(NavigationRoutes.PROFILE_STEP3)}
          activeOpacity={0.8}
        >
          <AppText variant="button" color="#FFFFFF">
            {strings.profile.next}
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileStep2Screen;

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

  active2: {
    width: "66%",
    height: 6,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  inactive2: {
    width: "34%",
    height: 6,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },

  cardWrapper: {
    position: "absolute",
    top: 183,
    left: 16,
    right: 16,
    height: 528,
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

  subtitleSpacing: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    marginTop: 4,
  },

  sectionLabel: {
    marginTop: 16,
    marginBottom: 6,
  },

  option: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    marginTop: 8,
  },

  optionSubtitle: {
    marginTop: 2,
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
