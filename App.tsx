// import { ScreenContent } from 'components/ScreenContent';
// import { StatusBar } from 'expo-status-bar';

// import './global.css';

// export default function App() {
//   return (
//     <>
//       <ScreenContent title="Home" path="App.tsx"></ScreenContent>
//       <StatusBar style="auto" />
//     </>
//   );
// }
import { View, Text } from 'react-native'
import React from 'react'
import './global.css';

const App = () => {
  return (
    <View className='flex-1 bg-slate-600'>
      <Text>App</Text>
    </View>
  )
}

export default App