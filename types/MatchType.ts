export interface MatchType {
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
