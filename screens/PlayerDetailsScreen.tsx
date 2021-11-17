import React from 'react'
import { View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/Navigation'
import formatPlayerName from '../utils/formatPlayerName'
import useFetch from '../hooks/useFetch'
import formatClubName from '../utils/formatClubName'
import { statsLabel } from '../utils/consants'
import styled from 'styled-components/native'
import MatchCard from '../components/MatchCard'
import Error from '../components/Error'
import Title from '../components/Title'
import Loader from '../components/Loader'
import Subtitle from '../components/Subtitle'

const StyledScrollView = styled.ScrollView`
  padding-horizontal: 10px;
`
const MainDataContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const StatContainer = styled.View`
  background: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`
const StyledImage = styled.Image`
  width: 80px;
  height: 80px;
`

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerDetails'>

export default function PlayerDetailsScreen({ route }: Props) {
  const { player, currentClub, clubs } = route.params
  const { data, loading, error } = useFetch(
    `https://api.mpg.football/api/data/championship-player-stats/${player.id}/summary`
  )
  const statsSeasons: string[] = data?.statsSeasons

  if (error) {
    return <Error />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <StyledScrollView>
      <MainDataContainer>
        <StyledImage source={{ uri: currentClub.defaultJerseyUrl }} />
        <View>
          <Title>{formatPlayerName(player)}</Title>
          <Title>Club actuel : {formatClubName(currentClub)}</Title>
        </View>
      </MainDataContainer>

      <StatContainer>
        <Subtitle>Statistiques du joueur</Subtitle>
        <Text>{statsSeasons && `Saisons : ${statsSeasons.map((stat, index) => ` ${stat}`)}`}</Text>
        {Object.keys(player.stats).map((key) => {
          if (statsLabel[key] && key !== 'matches') {
            let stat = player.stats[key]
            if (stat % 1 !== 0) stat = stat.toFixed(2)

            return <Text key={key}>{`${statsLabel[key]} : ${stat}`}</Text>
          }
        })}
      </StatContainer>

      {player.stats?.matches?.length > 0 && (
        <StatContainer>
          <Subtitle>Matchs joués</Subtitle>
          {player.stats.matches.map((match) => (
            <MatchCard key={match.matchId} clubs={clubs} match={match} />
          ))}
        </StatContainer>
      )}
    </StyledScrollView>
  )
}
