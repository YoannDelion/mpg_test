import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/Navigation'
import formatPlayerName from '../utils/formatPlayerName'
import useFetch from '../hooks/useFetch'
import formatClubName from '../utils/formatClubName'
import { statsLabel } from '../utils/consants'

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerDetails'>

export default function PlayerDetailsScreen({ route }: Props) {
  const { player, currentClub, clubs } = route.params
  const { data, loading, error } = useFetch(
    `https://api.mpg.football/api/data/championship-player-stats/${player.id}/summary`
  )
  const statsSeasons: string[] = data?.statsSeasons

  if (error) {
    return <Text>Une erreur est survenue</Text>
  }

  if (loading) {
    return <Text>Chargement ...</Text>
  }

  return (
    <View>
      <Image style={{ width: 80, height: 80 }} source={{ uri: currentClub.defaultJerseyUrl }} />
      <Text>{formatPlayerName(player)}</Text>
      <Text>Club actuel : {formatClubName(currentClub)}</Text>
      <Text>{statsSeasons && `Saisons : ${statsSeasons.map((stat, index) => ` ${stat}`)}`}</Text>

      {Object.keys(player.stats).map((key) => {
        if (statsLabel[key] && key !== 'matches') {
          let stat = player.stats[key]
          if (stat % 1 !== 0) stat = stat.toFixed(2)
          return <Text key={key}>{`${statsLabel[key]} : ${stat}`}</Text>
        } else if (key === 'matches') {
          return player.stats.matches.map((match) => (
            <View key={match.matchId}>
              <Text>{clubs && formatClubName(clubs[match.playerClubId])}</Text>
              <Text>Date {match.date}</Text>
              <Text>Semaine {match.gameWeekNumber}</Text>
              <View>
                <View>
                  <Text>Domicile</Text>
                  <Text>Équipe : {formatClubName(clubs[match.home.clubId])}</Text>
                  <Text>Score : {match.home.score}</Text>
                </View>
                <View>
                  <Text>Extérieur</Text>
                  <Text>Équipe : {formatClubName(clubs[match.away.clubId])}</Text>
                  <Text>Score : {match.away.score}</Text>
                </View>
              </View>
            </View>
          ))
        } else {
          // Should warn dev about this
          console.error('unknown player stat type')
        }
      })}
    </View>
  )
}
