import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native-paper";
import { fonts } from "../theme/Fonts";
import { Colors } from "../theme/Colors";

type TextVariant = "title" | "subtitle" | "body" | "caption" | "button" | "label";

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: TextStyle;
  align?: "left" | "center" | "right";
  color?: string;                    // override color if needed
  numberOfLines?: number;
}

export default function AppText({
  children,
  variant = "body",
  style,
  align = "left",
  color,
  numberOfLines,
}: AppTextProps) {
  const baseStyle = variantStyles[variant];

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        baseStyle,
        { textAlign: align },
        color ? { color } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.secondary,
  },
});

const variantStyles: Record<TextVariant, TextStyle> = {
  // Figma: onboarding title
  title: {
    fontFamily: fonts.Bold,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.secondary,
  },

  // Figma: onboarding subtitle
  subtitle: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    lineHeight: 20,
    color: "#A0A0A0",
  },

  // Default body text
  body: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.secondary,
  },

  // Small helper / gray text
  caption: {
    fontFamily: fonts.Light,
    fontSize: 12,
    lineHeight: 16,
    color: "#9CA3AF",
  },

  // Button label style
  button: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    lineHeight: 20,
    color: "#FFFFFF",
  },

  // Small label like “Skip”
  label: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    lineHeight: 18,
    color: "#B3B3B3",
  },
};
