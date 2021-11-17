import { NativeModules, Platform } from 'react-native'
import ClubType from '../types/ClubType'

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : Platform.OS === 'android'
    ? NativeModules.I18nManager.localeIdentifier
    : navigator.language

const fallback = 'fr-FR'

export default function getLocaleClubName(club: ClubType) {
  if (club.name[deviceLanguage]) {
    return club.name[deviceLanguage]
  } else if (club.name[fallback]) {
    return club.name[fallback]
  } else {
    return club.name[Object.keys(club.name)[0]]
  }
}
