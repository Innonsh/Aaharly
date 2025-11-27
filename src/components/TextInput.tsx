// import React from "react";
// import { StyleSheet } from "react-native";
// import { fonts } from "../theme/Fonts";
// import { TextInput, TextInputProps } from "react-native-paper";

// const styles = StyleSheet.create({
//   input: {
//     borderRadius: 10,
//     fontFamily: fonts.Regular,
//     fontSize: 16,
//     height: 48,
//     textAlignVertical: "top",
//     textAlign: "left",
//   },
// });

//  const Input = (props: TextInputProps) => {
//   return <TextInput {...props} style={[styles.input, props.style]} />;
// };

// export default Input;


import React from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import { fonts } from "../theme/Fonts";

interface AppInputProps extends TextInputProps {
  error?: boolean;
}

export default function Input({ style, error, ...props }: AppInputProps) {
  return (
    <View
      style={[
        styles.wrapper,
        error ? styles.borderError : styles.borderNormal,
        style,
      ]}
    >
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#9E9E9E"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 52,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  borderNormal: {
    borderColor: "#D4D6DD", // soft gray border — PERFECT
  },

  borderError: {
    borderColor: "#FF5A5F", // red border on error
  },

  input: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: "#000000",
  },
});
