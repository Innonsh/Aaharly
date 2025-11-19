import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import theme from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

export default function SetupProfile() {
  const [step, setStep] = useState(1);

  // 🔥 FINAL OBJECT TO SEND TO BACKEND
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "Male",

    height: "",
    weight: "",
    activityLevel: "Sedentary",

    fitnessGoal: "",
    dietary: "",
    allergies: "",
  });

  const updateField = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // 🔥 SEND TO BACKEND HERE
  const submitForm = () => {
    console.log("Send to backend:", form);

    // Example:
    // axios.post("/user/profile", form)
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Set Up Profile</Text>
        <Text style={styles.stepText}>Step {step} of 3</Text>

        {/* Progress Bar */}
        <View style={styles.progressWrapper}>
          <View style={[styles.progressBar, { width: `${(step / 3) * 100}%` }]} />
        </View>
      </View>

      {step === 1 && (
  <View>
    <Card style={styles.card}>
      <View style={styles.sectionIcon}>
        <Text style={styles.sectionIconText}>👤</Text>
      </View>

      <Text style={styles.sectionTitle}>Basic Information</Text>
      <Text style={styles.sectionSubtitle}>Let’s start by knowing you</Text>

      <Input
        label="Full Name"
        value={form.fullName}
        onChangeText={(v) => updateField("fullName", v)}
        placeholder="Enter your name"
      />

      <Input
        label="Age"
        value={form.age}
        onChangeText={(v) => updateField("age", v)}
        placeholder="Enter age"
      />

      {/* Gender Section */}
      <Text style={styles.label}>Gender</Text>

      <View style={styles.genderRow}>
        <Button
          title="Male"
          variant="third"
          icon={<Ionicons name="male" size={18} color="#374151" />}
          iconPosition="left"
          onPress={() => updateField("gender", "Male")}
          style={[
            styles.genderBtn,
            form.gender === "Male" && styles.genderBtnActive,
          ].filter(Boolean) as any}
        />

        <Button
          title="Female"
          variant="third"
          icon={<Ionicons name="female" size={18} color="#374151" />}
          iconPosition="left"
          onPress={() => updateField("gender", "Female")}
          style={[
            styles.genderBtn,
            form.gender === "Female" && styles.genderBtnActive,
          ].filter(Boolean) as any}
        />
      </View>
    </Card>

    {/* 🔥 BUTTONS OUTSIDE CARD */}
    <View style={styles.bottomButtons}>
      <Button
        title="Cancel"
        variant="secondary"
        onPress={() => {}}
        style={styles.bottomBtn}
      />

      <Button
        title="Next"
        variant="primary"
        onPress={() => setStep(2)}
        style={styles.bottomBtn}
      />
    </View>
  </View>
)}


      {/* ============================
          STEP 2 — PHYSICAL STATS
      ============================== */}
      {step === 2 && (
        <Card style={styles.card}>
          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>💪</Text>
          </View>

          <Text style={styles.sectionTitle}>Physical Stats</Text>
          <Text style={styles.sectionSubtitle}>Help us customise your plan</Text>

          <Input
            label="Height (cm)"
            value={form.height}
            onChangeText={(v) => updateField("height", v)}
            placeholder="180"
          />

          <Input
            label="Weight (kg)"
            value={form.weight}
            onChangeText={(v) => updateField("weight", v)}
            placeholder="65"
          />

          <Text style={styles.label}>Activity Level</Text>

          {["Sedentary", "Moderate", "Active"].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => updateField("activityLevel", level)}
              style={[
                styles.optionFull,
                form.activityLevel === level && styles.optionActiveFull,
              ]}
            >
              <Text
                style={[
                  styles.optionTextFull,
                  form.activityLevel === level && styles.optionTextFullActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.rowBtns}>
            <Button title="Back" variant="third" onPress={() => setStep(1)} />
            <Button title="Next" variant="primary" onPress={() => setStep(3)} />
          </View>
        </Card>
      )}

      {/* ============================
          STEP 3 — GOAL & PREFERENCES
      ============================== */}
      {step === 3 && (
        <Card style={styles.card}>
          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>🎯</Text>
          </View>

          <Text style={styles.sectionTitle}>Goal & Preferences</Text>

          {/* Fitness Goals */}
          <Text style={styles.label}>Fitness Goal</Text>

          {["Loose Weight", "Maintain Weight", "Gain Muscle"].map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => updateField("fitnessGoal", goal)}
              style={[
                styles.optionFull,
                form.fitnessGoal === goal && styles.optionActiveFull,
              ]}
            >
              <Text
                style={[
                  styles.optionTextFull,
                  form.fitnessGoal === goal && styles.optionTextFullActive,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Dietary Preference */}
          <Text style={styles.label}>Dietary Preference</Text>

          {["Vegetarian", "Non-Vegetarian", "Vegan"].map((diet) => (
            <TouchableOpacity
              key={diet}
              onPress={() => updateField("dietary", diet)}
              style={[
                styles.optionFull,
                form.dietary === diet && styles.optionActiveFull,
              ]}
            >
              <Text
                style={[
                  styles.optionTextFull,
                  form.dietary === diet && styles.optionTextFullActive,
                ]}
              >
                {diet}
              </Text>
            </TouchableOpacity>
          ))}

          <Input
            label="Allergies (optional)"
            placeholder="e.g. Nuts, Dairy"
            value={form.allergies}
            onChangeText={(v) => updateField("allergies", v)}
          />

          <View style={styles.rowBtns}>
            <Button title="Back" variant="third" onPress={() => setStep(2)} />
            <Button title="Generate Plan" variant="primary" onPress={submitForm} />
          </View>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 50 },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  stepText: { color: theme.textLight, marginTop: 4 },

  progressWrapper: {
    backgroundColor: theme.dotInactive,
    height: 6,
    borderRadius: 4,
    marginTop: 12,
    overflow: "hidden",
  },

  progressBar: {
    height: 6,
    backgroundColor: theme.primary,
    borderRadius: 4,
  },

  card: { margin: 20 },

  sectionIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF3EB",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIconText: { fontSize: 28 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  sectionSubtitle: {
    color: theme.textLight,
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  option: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.dotInactive,
    borderRadius: 8,
    alignItems: "center",
  },

  optionActive: {
    borderColor: theme.primary,
    backgroundColor: "#FFF4EE",
  },

  optionText: { color: theme.textLight },
  optionTextActive: { color: theme.primary, fontWeight: "700" },

  optionFull: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.dotInactive,
    borderRadius: 10,
    marginTop: 8,
  },

  optionActiveFull: {
    borderColor: theme.primary,
    backgroundColor: "#FFF4EE",
  },

  optionTextFull: { color: theme.textLight },
  optionTextFullActive: { color: theme.primary, fontWeight: "700" },

  rowBtns: {
    marginTop: 20,
    gap: 10,
  },
  genderRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},

genderBtn: {
  flex: 1,
  marginRight: 8,
  borderWidth: 1,
  borderColor: theme.dotInactive,
  borderRadius: 8,
},

genderBtnActive: {
  backgroundColor: "#FFF4EE",
  borderColor: theme.primary,
},

bottomButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 20,
  marginTop: 10,
},

bottomBtn: {

  width: "48%",
},

  
});
