import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={{ marginTop: 30, flex:1, }}>
        <HomeScreen />
      </View>
    </>
  )
}
