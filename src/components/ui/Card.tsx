import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;       // custom card styles
  onPress?: () => void;    // optional press
}

export default function Card({ children, style, onPress }: CardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper style={[styles.card, style]} onPress={onPress}>
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3, // Android shadow
    marginVertical: 10,
  },
});
