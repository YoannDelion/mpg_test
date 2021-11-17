import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import ClubType from '../types/ClubType'
import { MatchType } from '../types/MatchType'
import formatClubName from '../utils/formatClubName'

const MatchContainer = styled.View`
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 5px;
  margin-vertical: 5px;
`
const ResultContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
  justify-content: space-around;
`
const TeamResultContainer = styled.View`
  align-items: center;
`
const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`

interface Props {
  match: MatchType
  clubs: { [key: string]: ClubType }
}

// Should probably use a context to get clubs and share them between PlayerListScreen and this component
// Seems a bit of an overkill for this small app
export default function MatchCard({ match, clubs }: Props) {
  return (
    <MatchContainer key={match.matchId}>
      <Text>Match joué pour {clubs && formatClubName(clubs[match.playerClubId])}</Text>
      <Text>
        Le {new Date(match.date).toLocaleDateString()} - Semaine {match.gameWeekNumber}
      </Text>
      <ResultContainer>
        <TeamResultContainer>
          <Text>Domicile</Text>
          <Text>{formatClubName(clubs[match.home.clubId])}</Text>
          <StyledImage source={{ uri: clubs[match.home.clubId].defaultJerseyUrl }} />
          <Text>Score : {match.home.score}</Text>
        </TeamResultContainer>
        <TeamResultContainer>
          <Text>Extérieur</Text>
          <Text>{formatClubName(clubs[match.away.clubId])}</Text>
          <StyledImage source={{ uri: clubs[match.away.clubId].defaultJerseyUrl }} />
          <Text>Score : {match.away.score}</Text>
        </TeamResultContainer>
      </ResultContainer>
    </MatchContainer>
  )
}
