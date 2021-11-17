interface PositionType {
  [key: number]: string
}
export const POSITIONS: PositionType = {
  10: 'Gardien',
  20: 'Defenseur',
  21: 'Lateral',
  30: 'Milieu défensif',
  31: 'Milieu offensif',
  40: 'Attaquant',
}

interface StatsLabelType {
  [key: string]: string
}
export const statsLabel: StatsLabelType = {
  averageRating: 'Score moyen du joueur',
  totalGoals: 'Total de buts',
  totalMatches: 'Total de matchs',
  totalStartedMatches: 'Matchs commencés',
  totalPlayedMatches: 'Total des matchs joués ',
  matches: 'Matches',
}
