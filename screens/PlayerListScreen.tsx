import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import useFetch from '../hooks/useFetch'

// const POSITIONS = {
//   10: 'Gardien',
//   20: 'Defenseur',
//   21: 'Lateral',
//   30: 'Milieu défensir',
//   31: 'Milieu offensif',
//   40: 'Attaquant',
// }

// const positions = playersData?.poolPlayers.reduce(
//   (acc, elem) => (acc.includes(elem.ultraPosition) ? acc : acc.concat(elem.ultraPosition)),
//   []
// )

const formatPlayerName = (player) =>
  player.firstName ? `${player.firstName} ${player.lastName}` : player.lastName

export default function PlayerListScreen() {
  const [input, setInput] = useState('')

  const { data: clubsData, error: clubsError } = useFetch(
    'https://api.mpg.football/api/data/championship-clubs'
  )
  const { data: playersData, error: playersError } = useFetch(
    'https://api.mpg.football/api/data/championship-players-pool/1'
  )
  const clubs = clubsData?.championshipClubs
  const players = playersData?.poolPlayers
    .filter((player) => formatPlayerName(player).toLowerCase().includes(input.toLowerCase().trim()))
    .sort((a, b) => a.ultraPosition - b.ultraPosition)

  const playersByClubs =
    clubs &&
    players?.reduce(
      (acc, elem) =>
        acc.hasOwnProperty(elem.clubId)
          ? {
              ...acc,
              [elem.clubId]: {
                ...acc[elem.clubId],
                players: [...acc[elem.clubId]['players'], elem],
              },
            }
          : { ...acc, [elem.clubId]: { club: clubs[elem.clubId], players: [elem] } },
      {}
    )

  console.log(playersByClubs)

  if (clubsError || playersError) {
    return <Text>Une erreur est survenue</Text>
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={setInput} value={input} />
      <ScrollView>
        {!playersByClubs ? (
          <Text>Chargement ...</Text>
        ) : Object.values(playersByClubs).length === 0 ? (
          <Text>Aucun résultat</Text>
        ) : (
          Object.values(playersByClubs).map((playerByClub, index) => (
            <View key={index} style={{ border: '1px solid black', margin: 2, padding: 2 }}>
              <Text style={styles.title}>{playerByClub.club.shortName}</Text>
              {playerByClub.players.map((player) => (
                <Text key={player.id}>{formatPlayerName(player)}</Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
