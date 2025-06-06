import { LoginScreen } from 'app/features/login/screen'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false, // Hide header here
        }}
      />
      <View style={{ marginTop: 30, flex:1,}}>
        <LoginScreen />
      </View>
    </>
  )
}
