import React, { useEffect, ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Colors } from "../theme/Colors";
import { fonts } from "../theme/Fonts";
import AppText from "./AppText";

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "third";
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  onChange?: (isDisabled: boolean) => void;
  textStyle?: any;
}

export default function Button({
  title,
  onPress,
  icon,
  iconPosition = "left",
  variant = "primary",
  style,
  disabled = false,
  onChange,
  textStyle,
}: ButtonProps) {
  const theme = useTheme();

  useEffect(() => {
    onChange?.(disabled);
  }, [disabled, onChange]);

  const getTextColor = () => {
    if (disabled) return Colors.background;

    switch (variant) {
      case "secondary":
        return Colors.primary;
      case "third":
      case "outline":
        return Colors.secondary;
      default:
        return theme.colors?.onPrimary || "#fff";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        variant === "third" && styles.third,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.row}>
        {icon && iconPosition === "left" && (
          <View style={styles.icon}>{icon}</View>
        )}

        <AppText
          style={[
            styles.text,
            { color: getTextColor() },
            textStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </AppText>

        {icon && iconPosition === "right" && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,      // ✅ no vertical padding
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",   // ✅ centers text
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.background,
  },
  third: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: Colors.primaryDisabled,
  },
  text: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    lineHeight: 18, // ✅ ANDROID FIX
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 4,
  },
});
