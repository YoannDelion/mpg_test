import { MatchType } from './MatchType'

export interface StatsType {
  averageRating: number
  totalGoals: number
  totalMatches: number
  totalStartedMatches: number
  totalPlayedMatches: number
  matches: MatchType[]
}
