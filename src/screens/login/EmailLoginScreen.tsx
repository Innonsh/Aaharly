// import React, { useState, useContext } from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import AppText from "../../components/AppText";
// import Button from "../../components/Button";
// import Input from "../../components/TextInput";
// import { Colors } from "../../theme/Colors";
// import { NavigationProp, useNavigation } from "@react-navigation/native";
// import { NavigationRoutes } from "../../navigation/NavigationRoutes";
// import BackIcon from "../../assets/login/back arrow.svg";
// import LunchSvg from "../../assets/login/Login via email image.svg"; // your SVG image
// import { LocalizationContext } from "../../contexts/LocalizationContext";
// import { TextInput } from "react-native-paper";


// const EmailLoginScreen = () => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const { translations } = useContext(LocalizationContext);

//     const [email, setEmail] = useState("");

//     const handleContinue = () => {
//         if (!email.includes("@")) return;
//         navigation.navigate(NavigationRoutes.EMAIL_VERIFICATION ,{email: "abc@gmail.com"} );
//     };

//     return (
//         <View style={styles.container}>

//             {/* Back Button */}
//             <View style={styles.row}>
//                 <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                     <BackIcon width={16} height={16} />
//                 </TouchableOpacity>

//                 {/* Title */}
//                 <AppText variant="title" align="center"  >
//                     {translations.Email.title}
//                 </AppText>
//             </View>

//             {/* Center Illustration */}
//             <View style={styles.imageWrapper}>
//                 <LunchSvg width={175} height={175} />
//             </View>

//             {/* Label */}
//             <AppText variant="title" style={styles.label}>
//                 {translations.Email.subtitle}
//             </AppText>

//             <TextInput
//                 mode="outlined"
//                 placeholder="xyz@gmail.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 style={styles.input}
//                 outlineStyle={{ borderRadius: 14, borderColor: "#FFE9E1" }}
//                 contentStyle={{ height: 55 }}
//             />


//             {/* Continue Button */}
//             <Button
//                 title="Continue"
//                 variant="primary"
//                 onPress={handleContinue}
//                 disabled={!email.includes("@")}
//                 style={styles.button}
//             />

//         </View>
//     );
// };

// export default EmailLoginScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.background,
//         // paddingHorizontal: 20,
//         // paddingTop: 80,
//     },
//     row: {
//         marginTop: 56,
//         alignItems: "center",
//     },
    
//     backBtn: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         backgroundColor: "#FFF",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "absolute",
//         left: 20,
//         top:0,  
//         elevation: 2,
//     },
    

//     imageWrapper: {
//         alignItems: "center",
//         marginTop: 42,
//         marginBottom: 20,
//     },

//     //   title: {
//     //     marginBottom: 30,
//     //   },

//     label: {
//         marginTop: 39,
//         marginBottom: 8,
//     },

//     input: {
//         width: 361,
//         alignSelf: "center",
//         backgroundColor: "#FFF",
//         marginTop: 14,
//     },


//     button: {
//         marginTop: 26,
//         height: 50,
//         borderRadius: 12,
//         width: "100%",
//     },
// });

import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/NavigationRoutes";
import BackIcon from "../../assets/login/back arrow.svg";
import LunchSvg from "../../assets/login/Login via email image.svg";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { TextInput } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EmailLoginScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { translations } = useContext(LocalizationContext);

  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email.includes("@")) return;
    navigation.navigate(NavigationRoutes.EMAIL_VERIFICATION, {
      email: email,
    });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={wp("4%")} height={wp("4%")} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.headerTitle}>
          {translations.Email.title}
        </AppText>
      </View>

      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <LunchSvg width={wp("40%")} height={wp("40%")} />
      </View>

      {/* Label */}
      <AppText variant="title" style={styles.label}>
        {translations.Email.subtitle}
      </AppText>

      {/* Email Input */}
      <TextInput
        mode="outlined"
        placeholder="xyz@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        outlineStyle={{ borderRadius: wp("3%"), borderColor: "#FFE9E1" }}
        contentStyle={{ height: hp("6%") }}
      />

      {/* Button */}
      <Button
        title={translations.common.continue}
        variant="primary"
        onPress={handleContinue}
        disabled={!email.includes("@")}
        style={styles.button}
      />

    </View>
  );
};

export default EmailLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header layout — perfect alignment
  headerContainer: {
    width: "100%",
    marginTop: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: wp("5%"),
  },

  backBtn: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("6%"),
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: wp("5%"),
    top: 0,
    elevation: 2,
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: hp("4%"),
    marginBottom: hp("2%"),
  },

  // Label aligned to the left — same as screenshot
  label: {
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
    marginLeft: wp("5%"),
    fontSize: wp("4.5%"),
  },

  input: {
    width: wp("90%"),
    alignSelf: "center",
    backgroundColor: "#FFF",
    marginTop: hp("1.5%"),
    fontSize: wp("4%"),
  },

  button: {
    marginTop: hp("3%"),
    height: hp("5.9%"),
    borderRadius: wp("3%"),
    width: wp("90%"),
    alignSelf: "center",
  },
});

