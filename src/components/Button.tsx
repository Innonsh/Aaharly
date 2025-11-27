import React, { useEffect, ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Colors } from "../theme/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "third";
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  onChange?: (isDisabled: boolean) => void;
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
}: ButtonProps) {
  const theme = useTheme();

  useEffect(() => {
    if (onChange) {
      onChange(disabled);
    }
  }, [disabled, onChange]);

  // Decide text color based on variant + disabled
  const getTextColor = () => {
    if (disabled) {
      return Colors.background; // light text on disabled bg
    }

    switch (variant) {
      case "secondary":
        return Colors.primary;
      case "third":
      case "outline":
        return Colors.secondary;
      case "primary":
      default:
        // use paper theme onPrimary if available, else white
        return theme.colors?.onPrimary || "#ffffff";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        variant === "third" && styles.third,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <View style={styles.icon}>{icon}</View>
        )}

        {!!title && (
          <Text style={[styles.text, { color: getTextColor() }]}>
            {title}
          </Text>
        )}

        {/* Right Icon */}
        {icon && iconPosition === "right" && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primary: {
    width: 360,
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  secondary: {
    width: 360,
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 8,
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
    width: 360,
    alignSelf: "center",
  },
  disabled: {
    backgroundColor: Colors.primaryDisabled,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // `gap` not supported on all RN versions; margins in icon instead
  },
  icon: {
    marginHorizontal: 4,
  },
});