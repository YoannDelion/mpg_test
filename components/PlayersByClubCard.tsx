import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import styled from 'styled-components/native'
import ClubType from '../types/ClubType'
import { PlayersByClubType } from '../types/PlayerByClubsType'
import formatClubName from '../utils/formatClubName'
import formatPlayerName from '../utils/formatPlayerName'
import Title from './Title'

const StyledContainer = styled.View`
  background: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

interface Props {
  playersByClub: PlayersByClubType
  clubs: { [key: string]: ClubType }
}

export default function PlayersByClubCard({ playersByClub, clubs }: Props) {
  const navigation = useNavigation<any>()

  return (
    <StyledContainer>
      <Title>{formatClubName(playersByClub.club)}</Title>
      {playersByClub.players.map((player) => (
        <Pressable
          key={player.id}
          onPress={() =>
            navigation.navigate('PlayerDetails', {
              player,
              currentClub: playersByClub.club,
              clubs,
              title: `${formatPlayerName(player)} - ${playersByClub.club.shortName}`,
            })
          }
        >
          <Text>{formatPlayerName(player)}</Text>
        </Pressable>
      ))}
    </StyledContainer>
  )
}
