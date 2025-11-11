import React from 'react';
import { Pressable, Text } from 'react-native';

export default function UIButton({ label, onPress, style }: any) {
  return (
    <Pressable onPress={onPress} className="px-4 py-2 bg-blue-600 rounded-md" style={style}>
      <Text className="text-white text-base">{label}</Text>
    </Pressable>
  );
}