import React from "react";
import { StyleSheet } from "react-native";
import { fonts } from "../theme/Fonts";
import { TextInput, TextInputProps } from "react-native-paper";

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    fontFamily: fonts.Regular,
    fontSize: 16,
    height: 48,
    textAlignVertical: "top",
    textAlign: "left",
  },
});

const Input = (props: TextInputProps) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

export default Input;
