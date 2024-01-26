interface TVShow {
  score: number
  show: ShowDetails
}

interface ShowDetails {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network
  externals: Externals
  image: Image | null
  summary: string
  updated: number
  _links: Links
}

interface Schedule {
  time: string
  days: string[]
}

interface Rating {
  average: number | null
}

interface Network {
  id: number
  name: string
  country: Country
  officialSite: string
}

interface Country {
  name: string
  code: string
  timezone: string
}

interface Externals {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

interface Image {
  medium: string
  original: string
}

interface Links {
  self: Url
  previousepisode: Url
}

interface Url {
  href: string
}
