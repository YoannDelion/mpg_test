import PlayerType from '../types/PlayerType'

export default function formatPlayerName(player: PlayerType) {
  return player.firstName ? `${player.firstName} ${player.lastName}` : player.lastName
}
