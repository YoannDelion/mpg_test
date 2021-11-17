interface MatchType {
  playerClubId: string
  matchId: string
  gameWeekNumber: number
  date: string
  home: {
    clubId: string
    score: number
  }
  away: {
    clubId: string
    score: number
  }
  playerPerformance: {
    status: number
  }
}

export interface StatsType {
  averageRating: number
  totalGoals: number
  totalMatches: number
  totalStartedMatches: number
  totalPlayedMatches: number
  matches: MatchType[]
}

export default interface PlayerType {
  id: string
  firstName?: string
  lastName: string
  position: number
  ultraPosition: number
  quotation: number
  clubId: string
  stats: StatsType
}
