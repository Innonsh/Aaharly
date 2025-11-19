import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/ui/Button";
import AppText from "../components/ui/AppText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../components/ui/Card";

export default function ButtonDemoScreen() {
  const [disabledState, setDisabledState] = useState(false);

  return (
    <View style={styles.container}>

      
      <AppText size={20}  style={{ marginBottom: 20 }}>
        Button Variants Demo
      </AppText>

      {/* Primary Button */}
      <Button
        title="Primary Button"
        variant="primary"
        onPress={() => console.log("Primary pressed")}
        style={styles.btn}
      />

      {/* Secondary Button */}
      <Button
        title="cancle"
        variant="secondary"
        onPress={() => console.log("Secondary pressed")}
        style={styles.btn}
      />
      {/* <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <Inpi
              style={styles.input}
              // placeholder="Enter your mobile number"
              // placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View> */}

      {/* Outline Button */}
      <Button
        title="Outline Button"
        variant="outline"
        onPress={() => console.log("Outline pressed")}
        style={styles.btn}
      />

      {/* Button with Left Icon */}
      <Button
        title="Left Icon"
        variant="primary"
        icon={<Ionicons name="arrow-forward" size={18} color="#fff" />}
        iconPosition="left"
        onPress={() => {}}
        style={styles.btn}
      />

      <Button 
       title="male"
        variant="third"
        icon={<Ionicons name="male" size={18} color=" #374151" />}
        iconPosition="left"
        onPress={() => {}}
        style={styles.btn}
      />


      {/* Button with Right Icon */}
      <Button
        title="Right Icon"
        variant="primary"
        icon={<Ionicons name="arrow-forward" size={18} color="#fff" />}
        iconPosition="right"
        onPress={() => {}}
        style={styles.btn}
      />
      <Card>
        Welocme in my app 
      </Card>

      {/* Disabled Button */}
      <Button
        title="Disabled Button"
        variant="primary"
        disabled={true}
        onPress={() => {}}
        onChange={(s) => setDisabledState(s)}
        style={styles.btn}
      />

      {/* <Button
        title="Male"
        variant="outline"
        disabled={true}
        icon={<MaterialCommunityIcons name="gender-male" size={22} color="#fff" />}
        onPress={() => console.log("Male")}
        style={styles.btn}
      /> */}

      <AppText color="gray" size={14}>
        Disabled State: {disabledState ? "true" : "false"}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  btn: {
    marginBottom: 14,
  },
});
