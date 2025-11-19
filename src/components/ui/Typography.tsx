// import React from "react";
// import { Text, StyleSheet, TextStyle } from "react-native";
// import colours from "@/styles/theme";
// import typography from "../ui/AppText";

// interface TypographyProps {
//   children: React.ReactNode;
//   variant?: "heading" | "title" | "subtitle" | "body" | "small";
//   color?: string;
//   align?: "left" | "center" | "right";
//   style?: TextStyle;
// }

// export default function Typography({
//   children,
//   variant = "body",
//   color = colours.text,
// //   align = "left",
//   style,
// }: TypographyProps) {
//   return (
//     <Text
//       style={[
//         styles[variant],
//         { color, textAlign: align },
//         style
//       ]}
//     >
//       {children}
//     </Text>
//   );
// }

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: typography.heading,
//     fontWeight: "700",
//   },
//   title: {
//     fontSize: typography.title,
//     fontWeight: "600",
//   },
//   subtitle: {
//     fontSize: typography.subtitle,
//     fontWeight: "500",
//   },
//   body: {
//     fontSize: typography.text,
//     fontWeight: "400",
//   },
//   small: {
//     fontSize: typography.small,
//     fontWeight: "400",
//   },
// });
