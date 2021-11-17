import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import PlayerListScreen from '../screens/PlayerListScreen'
import PlayerDetailsScreen from '../screens/PlayerDetailsScreen'
import PlayerType from '../types/PlayerType'
import ClubType from '../types/ClubType'

export type RootStackParamList = {
  Home: undefined
  PlayerList: undefined
  PlayerDetails: {
    player: PlayerType
    club: ClubType
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='PlayerList' component={PlayerListScreen} />
        <Stack.Screen name='PlayerDetails' component={PlayerDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
