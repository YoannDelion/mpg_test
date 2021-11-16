import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import ClubListScreen from '../screens/ClubListScreen'
import PlayerListScreen from '../screens/PlayerListScreen'

export type RootTabParamList = {
  Home: undefined
  ClubList: undefined
  PlayerList: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={() => ({
          tabBarActiveTintColor: 'green',
        })}
      >
        <Tab.Screen
          name='ClubList'
          component={ClubListScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='futbol' color={color} />,
          }}
        />
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
          }}
        />
        <Tab.Screen
          name='PlayerList'
          component={PlayerListScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name='running' color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name']
  color: string
}) {
  return <FontAwesome5 size={25} {...props} />
}
