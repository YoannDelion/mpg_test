import ClubType from './ClubType'
import PlayerType from './PlayerType'

export interface PlayersByClubsType {
  [key: string]: PlayersByClubType
}

export interface PlayersByClubType {
  club: ClubType
  players: PlayerType[]
}
