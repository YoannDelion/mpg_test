import React from 'react'
import { View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/Navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerDetails'>

export default function PlayerDetailsScreen({ route }: Props) {
  const { player, club } = route.params

  console.log('PlayerDetailsScreen')
  console.log(player)
  console.log(club)

  return (
    <View>
      <Text>PlayerDetailsScreen</Text>
    </View>
  )
}
