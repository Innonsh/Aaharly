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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import Input from "../../components/TextInput";
import { Colors } from "../../theme/Colors";
import PhysicalIcon from "../../assets/Icons/physical_stat.svg";
import {
  NavigationRoutes,
  RootStackParamList,
} from "../../navigation/NavigationRoutes";
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
      {/* Header fixed */}
     <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        activeOpacity={0.7}
      >
        <BackIcon width={18} height={18} />
      </TouchableOpacity>

      <AppText variant="title" align="center">
        {strings.profile.setupTitle}
      </AppText>

      <View style={{ width: 44 }} /> {/* layout balance */}
    </View>


      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step indicator */}
        <AppText variant="labels" style={styles.stepText}>
          Step 2 of 3
        </AppText>

        <View style={styles.progressBar}>
          <View style={styles.active2} />
          <View style={styles.inactive2} />
        </View>

        {/* Card */}
        <View style={styles.card}>
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
              <AppText variant="labels">
                {strings.profile.heightLabel}
              </AppText>
              <Input
                // placeholder={strings.profile.heightPlaceholder}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={{ flex: 1 }}>
              <AppText variant="labels">
                {strings.profile.weightLabel}
              </AppText>
              <Input
                // placeholder={strings.profile.weightPlaceholder}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>

          {/* Activity Level */}
          <AppText variant="labels" style={styles.sectionLabel}>
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
        </View>

        {/* Bottom Buttons */}
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
            onPress={() => navigation.navigate(NavigationRoutes.PROFILE_STEP3)}
            activeOpacity={0.8}
          >
            <AppText variant="button" color="#FFFFFF">
              {strings.profile.next}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileStep2Screen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("1.8%"),
    paddingHorizontal: wp("6%"),
    alignItems: "center",
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

  card: {
    marginTop: hp("2.8%"),
    marginHorizontal: wp("4.1%"),
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    // backgroundColor: "#F8F8F8",
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

  // soft floating shadow
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},

});
