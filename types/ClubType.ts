interface ClubNameType {
  [key: string]: string
}

interface ChampionshipType {
  [key: string]: {
    jerseys: {
      [key: string]: string
    }
    active: boolean
  }
}

export default interface ClubType {
  id: string
  name: ClubNameType
  shortName: string
  defaultJerseyUrl: string
  championships: ChampionshipType
}
