// // import { ScreenContent } from 'components/ScreenContent';
// // import { StatusBar } from 'expo-status-bar';

// // import './global.css';

// // export default function App() {
// //   return (
// //     <>
// //       <ScreenContent title="Home" path="App.tsx"></ScreenContent>
// //       <StatusBar style="auto" />
// //     </>
// //   );
// // }
// import { View, Text } from 'react-native'
// import React from 'react'
// import './global.css';
// import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';

// const App = () => {
//   return (
//     // <View className='flex-1 bg-slate-600'>
//     //   {/* <Text>App</Text> */}
//     //   <OnboardingScreen/>
//     // </View>
//     <>
//     <OnboardingScreen/>
//     </>
//   )
// }


// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen";
// import ButtonDemoScreen from "@/screens/ButtonDemoScreen";
// import SetupProfile from "@/screens/SetupProfile";
// // import LoginScreen from "./src/screens/login/LoginScreen"; 

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="SetupProfile" component={SetupProfile}/>
//                <Stack.Screen name="Demo" component={ButtonDemoScreen} />

//         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//         {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return <RootNavigator />;
}


