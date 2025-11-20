import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native-paper";

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  weight?: "regular" | "bold" | "semi";
  size?: number;
  color?: string;
  align?: "left" | "center" | "right";
}

export default function AppText({
  children,
  style,
  weight = "regular",
  size = 16,
  color = "#000",
  align = "left",
}: AppTextProps) {
  return (
    <Text
      style={[
        { fontSize: size, color, textAlign: align },
        weight === "bold" && styles.bold,
        weight === "semi" && styles.semi,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: { fontWeight: "700" },
  semi: { fontWeight: "600" },
});