import React from 'react';
import { View, Text } from 'react-native';
import UIButton from '../components/UIButton';

export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Welcome</Text>
      <UIButton label="Go to details" onPress={() => navigation.navigate('Details', { id: '42' })} />
    </View>
  );
}