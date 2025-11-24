import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;                // Accept icon
  iconPosition?: "left" | "right"; // Icon alignment
  variant?: "primary" | "secondary" | "outline" | "third";
  style?: ViewStyle |ViewStyle[] ;
  disabled?: boolean;
  onChange?: (isDisabled: boolean) => void; // Extra event callback
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

  // Call onChange whenever disabled changes
  useEffect(() => {
    if (onChange) {
      onChange(disabled);
    }
  }, [disabled]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        variant === "third"  && styles.third,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left Icon */}
        {icon && iconPosition === "left" && <View style={styles.icon}>{icon}</View>}

        <Text
          style={[
            styles.text,
            variant === "secondary" && {color:"#FF6B35"},
            variant === "third"  && { color: "#000" },
            variant === "outline" && {color:" #000000"},
            disabled && { color: "#ffffff" },
          ]}
        >
          {title}
        </Text>

        {/* Right Icon */}
        {icon && iconPosition === "right" && <View style={styles.icon}>{icon}</View>}
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
    backgroundColor: "#FF6B3C",
    borderRadius: 8,
    
  },
  secondary: {
    width: 360,
    alignSelf: "center",
    marginTop: 50,
     borderRadius: 8,
    backgroundColor: " #FFFFFF",
    borderWidth:1,
    borderColor:"#FF6B35",
  },
  outline: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#ffffff",
  },
  third:{
     borderWidth:1,
     borderColor: "#D9D9D9",
     backgroundColor: "transparent",
     width: 360,
    alignSelf: "center",



  },
  disabled: {
    backgroundColor: "#FFA98A",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  icon: {
    marginHorizontal: 4,
  },
});