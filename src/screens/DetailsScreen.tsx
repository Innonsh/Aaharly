import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }: any) {
  const id = route?.params?.id;
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg">Details screen for id: {id}</Text>
    </View>
  );
}