import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Picker } from '@react-native-community/picker'
import useFetch from '../hooks/useFetch'
import PlayerType from '../types/PlayerType'
import formatPlayerName from '../utils/formatPlayerName'
import { POSITIONS } from '../utils/consants'
import { PlayersByClubsType } from '../types/PlayerByClubsType'
import styled from 'styled-components/native'
import Loader from '../components/Loader'
import Subtitle from '../components/Subtitle'
import PlayersByClubCard from '../components/PlayersByClubCard'
import Error from '../components/Error'

const StyledContainer = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`
const StyledTextInput = styled.TextInput`
  margin-top: 10px;
  border: 1px solid lightgray;
  padding: 5px 10px;
  background: white;
  height: 30px;
`

export default function PlayerListScreen() {
  const [input, setInput] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<number | string>('')
  const [positions, setPositions] = useState<number[]>([])

  const { data: clubsData, error: clubsError } = useFetch(
    'https://api.mpg.football/api/data/championship-clubs'
  )
  const { data: playersData, error: playersError } = useFetch(
    'https://api.mpg.football/api/data/championship-players-pool/1'
  )
  const clubs = clubsData?.championshipClubs

  // Filtre les players
  let players: PlayerType[] = playersData?.poolPlayers
  players = players
    ?.filter((player) => {
      if (selectedPosition === '') return true
      return player.ultraPosition == selectedPosition
    })
    .filter((player) => formatPlayerName(player).toLowerCase().includes(input.toLowerCase().trim()))

  // Renvoie les données sous forme { club_id : club: {}, players: [] } pour les affichers par club
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

  // Récupère la liste des positions depuis la liste des joueurs
  const getpositions = () => {
    const positionsList = playersData?.poolPlayers.reduce(
      (acc: number[], elem: PlayerType) =>
        acc.includes(elem.ultraPosition) ? acc : acc.concat(elem.ultraPosition),
      []
    )
    setPositions(positionsList)
  }

  useEffect(() => {
    getpositions()
  }, [playersData])

  if (clubsError || playersError) {
    return <Error />
  }

  if (!playersByClubs) {
    return <Loader />
  }

  return (
    <StyledContainer>
      <StyledTextInput
        onChangeText={setInput}
        value={input}
        placeholder='Rechercher un joueur...'
      />
      <Picker
        selectedValue={selectedPosition}
        onValueChange={(itemValue) => setSelectedPosition(itemValue)}
      >
        <Picker.Item label={'Sélectionner une position'} value={''} />
        {positions?.map(
          (position) =>
            POSITIONS[position] && (
              <Picker.Item key={position} label={POSITIONS[position]} value={position} />
            )
        )}
      </Picker>
      <ScrollView>
        {playersByClubs && Object.values(playersByClubs).length === 0 ? (
          <Subtitle>Aucun résultat</Subtitle>
        ) : (
          Object.values(playersByClubs).map((playersByClub, index) => (
            <PlayersByClubCard key={index} playersByClub={playersByClub} clubs={clubs} />
          ))
        )}
      </ScrollView>
    </StyledContainer>
  )
}
