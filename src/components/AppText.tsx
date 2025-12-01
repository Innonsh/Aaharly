import React, { useMemo } from "react";
import { StyleSheet, TextStyle, StyleProp } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { fonts } from "../theme/Fonts";
import { Colors } from "../theme/Colors";

// Variants for text
export type TextVariant =
  | "title"
  | "title1"
  | "subtitle"
  | "body"
  | "caption"
  | "button"
  | "label"
  | "labels";

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>; // UPDATED
  align?: "left" | "center" | "right";
  color?: string;
  numberOfLines?: number;
  allowFontScaling?: boolean; // ADDED
}

export default function AppText({
  children,
  variant = "body",
  style,
  align = "left",
  color,
  numberOfLines,
  allowFontScaling = true, // DEFAULT
}: AppTextProps) {
  const paperTheme = useTheme(); // GET COLORS FROM PAPER THEME

  const baseStyle = variantStyles(paperTheme)[variant];

  // useMemo to memoize combined style
  const memoizedStyle = useMemo(
    () => [
      styles.base,
      baseStyle,
      { textAlign: align },
      color ? { color } : null,
      style,
    ],
    [baseStyle, align, color, style]
  );

  return (
    <Text
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      style={memoizedStyle}
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

// USING PAPER THEME COLORS INSTEAD OF HARDCODE
const variantStyles = (theme: any): Record<TextVariant, TextStyle> => ({
  title: {
    fontFamily: fonts.Medium,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.onBackground,
  },
  title1:{
   fontFamily: fonts.Medium,
    fontSize: 20,
    lineHeight: 24,
    color: theme.colors.onBackgroun
  },
  subtitle: {
    fontFamily: fonts.Regular,
    fontSize: 12,
    lineHeight: 20,
    color: theme.colors.outline,
  },
  body: {
    fontFamily: fonts.Regular,
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.onBackground,
  },
  caption: {
    fontFamily: fonts.Light,
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.outlineVariant,
  },
  button: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,  //16
    lineHeight: 20,
    color: theme.colors.onPrimary,
  },
  label: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.secondary,
  },
 labels: {
  fontFamily: fonts.SemiBold,
  fontSize: 15,
  lineHeight: 19,
  color: theme.colors.secondary,
},

});
