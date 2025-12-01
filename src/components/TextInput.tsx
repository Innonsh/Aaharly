import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { fonts } from "../theme/Fonts";
import { Colors } from "../theme/Colors";

const styles = StyleSheet.create({
  input: {
    height: 52,            // Figma height
    borderRadius: 14,      // Figma radius
    backgroundColor: "#FFFFFF",
    fontFamily: fonts.Medium, // Matter Medium
    fontSize: 16,          // 16px
    paddingHorizontal: 16, // Figma padding
  },
});

const Input = (props: any) => {
  return (
    <TextInput
      {...props}
      mode={props.mode ?? "outlined"}
      outlineColor={props.outlineColor ?? "#E6E6E6"} // light gray border
      activeOutlineColor={props.activeOutlineColor ?? Colors.primary}
      placeholderTextColor={props.placeholderTextColor ?? "#9E9E9E"}
      theme={{ roundness: 14 }} // make outline corners rounded
      style={[styles.input, props.style]}
    />
  );
};

export default Input;
