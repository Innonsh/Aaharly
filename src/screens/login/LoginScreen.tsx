import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LocalizationContext } from '../../contexts/LocalizationContext';

const styles = StyleSheet.create({})

const LoginScreen = () => {

  const { translations } = useContext(LocalizationContext);
  const {login} = translations

  return (
    <View>
      <Text>{login.test}</Text>
    </View>
  )
}

export default LoginScreen
