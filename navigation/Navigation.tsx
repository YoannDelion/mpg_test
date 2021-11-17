import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import PlayerListScreen from '../screens/PlayerListScreen'

export type RootStackParamList = {
  Home: undefined
  PlayerList: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='PlayerList'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='PlayerList' component={PlayerListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
