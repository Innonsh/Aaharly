import React from "react";
import { TextInput, StyleSheet, View, Text, TextStyle ,} from "react-native";

interface InputProps {
  label?: string;
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?:"default" | "number-pad" | "email-address" | "phone-pad";
  maxLength?:number;
  onChangeText: (text: string) => void;
  style?:TextStyle;
}

export default function Input({
  label,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
          maxLength,
  onChangeText,
  style,
}: InputProps) {
  return (
    <View style={{ marginVertical: 10 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: "500",
    // color:"#374151",
  },
  input: {
    borderWidth: 1,
    backgroundColor:"#FCFCFC",
    borderColor: "#D9D9D9",
    borderRadius: 6,
    padding: 16,
    fontSize: 16,
  },
});
