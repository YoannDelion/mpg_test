import { StatsType } from './StatsType'

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
