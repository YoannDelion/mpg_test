import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import { Picker } from '@react-native-community/picker'
import useFetch from '../hooks/useFetch'
import { FontAwesome5 } from '@expo/vector-icons'
import PlayerType from '../types/PlayerType'
import formatPlayerName from '../utils/formatPlayerName'
import { POSITIONS } from '../utils/consants'
import { PlayersByClubsType } from '../types/PlayerByClubs'

export default function PlayerListScreen() {
  const [input, setInput] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const { data: clubsData, error: clubsError } = useFetch(
    'https://api.mpg.football/api/data/championship-clubs'
  )
  const { data: playersData, error: playersError } = useFetch(
    'https://api.mpg.football/api/data/championship-players-pool/1'
  )
  const clubs = clubsData?.championshipClubs

  let players: PlayerType[] = playersData?.poolPlayers
  players = players
    ?.filter((player) => {
      if (selectedValue === '') return true
      return player.ultraPosition === parseInt(selectedValue)
    })
    .filter((player) => formatPlayerName(player).toLowerCase().includes(input.toLowerCase().trim()))
    .sort((a, b) => a.ultraPosition - b.ultraPosition)

  const playersByClubs: PlayersByClubsType =
    clubs &&
    players?.reduce(
      (acc: PlayersByClubsType, elem: PlayerType) =>
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

  const positions: number[] = playersData?.poolPlayers.reduce(
    (acc: number[], elem: PlayerType) =>
      acc.includes(elem.ultraPosition) ? acc : acc.concat(elem.ultraPosition),
    []
  )

  const clearInput = () => setInput('')

  if (clubsError || playersError) {
    return <Text>Une erreur est survenue</Text>
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <TextInput style={styles.input} onChangeText={setInput} value={input} />
        <Pressable style={{ position: 'absolute', right: 25 }} onPress={clearInput}>
          <FontAwesome5 name='times' />
        </Pressable>
      </View>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue.toString())}
      >
        <Picker.Item label={'Sélectionner'} value={''} />
        {positions?.map(
          (position) =>
            POSITIONS[position] && (
              <Picker.Item key={position} label={POSITIONS[position]} value={position} />
            )
        )}
      </Picker>
      <ScrollView>
        {!playersByClubs ? (
          <Text>Chargement ...</Text>
        ) : Object.values(playersByClubs).length === 0 ? (
          <Text>Aucun résultat</Text>
        ) : (
          Object.values(playersByClubs).map((playerByClub, index) => (
            <View key={index} style={styles.card}>
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
  card: { border: '1px solid black', margin: 2, padding: 2 },
})
