import React from 'react'
import { View, Text, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/Navigation'
import styled from 'styled-components/native'
import Title from '../components/Title'

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const TextContainer = styled.View`
  margin-vertical: 50px;
`

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  return (
    <StyledContainer>
      <Title>Test technique pour MonPetitGazon</Title>
      <TextContainer>
        <Text>L'appli contient une liste des joueurs regroupés par équipe.</Text>
        <Text>Cette liste est filtrable par nom et/ou par type de joueur</Text>
        <Text>
          Le clique sur le nom d'un joueur nous emmene sur sa fiche détaillées contenant ses
          statistiques.
        </Text>
      </TextContainer>
      <Button title='Voir la liste des joueurs' onPress={() => navigation.navigate('PlayerList')} />
    </StyledContainer>
  )
}
