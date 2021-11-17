import ClubType from '../types/ClubType'
import getLocaleClubName from './deviceLanguage'

export default function formatClubName(club: ClubType) {
  return `${getLocaleClubName(club)} - ${club.shortName}`
}
